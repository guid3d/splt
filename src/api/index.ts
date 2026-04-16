import {
  DebtData,
  ExpenseTransactionData,
  GroupData,
  GroupFormValues,
  ModifiedTransactionFormValues,
  Participant,
  ParticipantFormValues,
  PaybackFormValues,
  PaybackTransactionData,
  TotalSpendData,
  TransactionsData,
} from "@/types";
import { useAuth } from "@/providers/AuthProvider";
import { pb, spltPocketHost } from "@/lib/pb";
import { useLocalStorage } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type PbHooksTransactionsList = {
  transactions: TransactionsData[];
};

type ServerGroupHistoryItem = {
  id: string;
  userId: string;
  groupId: string;
  visitedAt: string;
  expand: {
    groupId: GroupData;
  };
};

const useTransactions = (groupId: string) => {
  const query = useQuery<PbHooksTransactionsList, Error>({
    queryKey: ["transactions", groupId],
    queryFn: async () => {
      const res = await fetch(
        `${spltPocketHost}/api/splt/transactions?groupId=${groupId}`,
      );
      return res.json();
    },
  });
  return query;
};

const useExpense = (expenseId: string) => {
  const query = useQuery<ExpenseTransactionData, Error>({
    queryKey: ["expense", expenseId],
    queryFn: async () => {
      // TODO: handle error when expenseId is not found
      const res = await fetch(
        `${spltPocketHost}/api/splt/expense?expenseId=${expenseId}`,
      );
      // console.log(res.json());
      return res.json();
    },
  });
  return query;
};

const usePayback = (paybackId: string) => {
  const query = useQuery<PaybackTransactionData, Error>({
    queryKey: ["payback", paybackId],
    queryFn: async () => {
      // TODO: handle error when paybackId is not found
      const res = await fetch(
        `${spltPocketHost}/api/splt/payback?paybackId=${paybackId}`,
      );
      // console.log(res.json());
      return res.json();
    },
  });
  return query;
};

const useDebts = (groupId: string) => {
  const query = useQuery<DebtData[], Error>({
    queryKey: ["debts", groupId],
    queryFn: async () => {
      // TODO: handle error when paybackId is not found
      const res = await fetch(
        `${spltPocketHost}/api/splt/hasSpent?groupId=${groupId}`,
      );
      // console.log(res.json());
      return res.json();
    },
  });
  return query;
};

const useUpsertGroupHistory = () => {
  return useMutation<unknown, Error, { groupId: string }>({
    mutationKey: ["upsertGroupHistory"],
    mutationFn: async ({ groupId }) => {
      const res = await fetch(`${spltPocketHost}/api/splt/upsertGroupHistory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: pb.authStore.token,
        },
        body: JSON.stringify({ groupId }),
      });
      if (!res.ok) throw new Error("Failed to upsert group history");
      return res.json();
    },
  });
};

const useServerGroupHistory = () => {
  const { isAuthenticated } = useAuth();
  return useQuery<ServerGroupHistoryItem[], Error>({
    queryKey: ["serverGroupHistory"],
    queryFn: () =>
      pb.collection("userGroupHistory").getFullList({
        expand: "groupId",
        sort: "-visitedAt",
      }),
    enabled: isAuthenticated,
  });
};

const useClaimGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<GroupData, Error, string>({
    mutationKey: ["claimGroup"],
    mutationFn: (groupId: string) =>
      pb.collection("groups").update(groupId, { owner: pb.authStore.model!.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["totalSpendData"] });
      queryClient.invalidateQueries({ queryKey: ["group"] });
    },
  });
};

const useVerifyGroupPin = () => {
  return useMutation<{ valid: boolean }, Error, { groupId: string; pin: string }>({
    mutationKey: ["verifyGroupPin"],
    mutationFn: async ({ groupId, pin }) => {
      const res = await fetch(`${spltPocketHost}/api/splt/verifyGroupPin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId, pin }),
      });
      if (!res.ok) throw new Error("Failed to verify PIN");
      return res.json();
    },
  });
};

const useTotalSpend = (groupId: string) => {
  const { isAuthenticated } = useAuth();
  const upsertGroupHistory = useUpsertGroupHistory();
  const [groupHistory, setGroupHistory] = useLocalStorage({
    key: "splt-group-history",
    defaultValue: [] as string[],
  });

  const query = useQuery<TotalSpendData, Error>({
    queryKey: ["totalSpendData", groupId],
    queryFn: () =>
      pb.collection("totalSpend").getFirstListItem(`id="${groupId}"`, {
        expand: "groupInfo, groupInfo.participants",
        fields: "id, groupInfo, expand, sumExpenses",
        filter: `groupInfo.id="${groupId}"`,
      }),
  });
  useEffect(() => {
    if (query.data) {
      // Add visited group to local storage for history
      setGroupHistory((oldHistory) => {
        const filteredOldHistory = oldHistory.filter((group) => {
          const parsedGroup: GroupData = JSON.parse(group);
          return parsedGroup.id !== query.data.expand.groupInfo.id;
        });
        return [
          JSON.stringify(query.data.expand.groupInfo),
          ...filteredOldHistory,
        ];
      });
      // Also update server-side history when logged in
      if (isAuthenticated) {
        upsertGroupHistory.mutate({ groupId });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data, setGroupHistory, isAuthenticated]);
  return query;
};

const useCreateParticipant = () => {
  const mutation = useMutation<any, Error, ParticipantFormValues>({
    mutationKey: ["createParticipant"],

    mutationFn: (participantForm: ParticipantFormValues) =>
      pb.collection("participants").create(participantForm),
    onSuccess: () => {
      // Update all simulations query
      // queryClient.invalidateQueries({ queryKey: ["simulations"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

const useUpdateParticipant = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Participant, Error, Participant>({
    mutationKey: ["createParticipant"],

    mutationFn: (participantForm: Participant) =>
      pb
        .collection("participants")
        .update(participantForm.id!, participantForm),
    onSuccess: () => {
      // Update all simulations query
      queryClient.invalidateQueries({ queryKey: ["totalSpendData"] });
      queryClient.invalidateQueries({ queryKey: ["group"] });
      queryClient.invalidateQueries({ queryKey: ["participant"] });
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

const useCreateGroup = () => {
  const mutation = useMutation<GroupData, Error, GroupFormValues>({
    mutationKey: ["createGroup"],

    mutationFn: (groupForm: GroupFormValues) =>
      pb.collection("groups").create(groupForm),
    onSuccess: () => {
      // Update all simulations query
      // queryClient.invalidateQueries({ queryKey: ["simulations"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<GroupData, Error, GroupFormValues>({
    mutationKey: ["updateGroup"],

    mutationFn: (groupForm: GroupFormValues) =>
      pb.collection("groups").update(groupForm.id!, groupForm),
    onSuccess: () => {
      // Update all simulations query
      queryClient.invalidateQueries({ queryKey: ["totalSpendData"] });
      queryClient.invalidateQueries({ queryKey: ["group"] });
      queryClient.invalidateQueries({ queryKey: ["participant"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

const useGroup = (groupId: string) => {
  const query = useQuery<GroupData, Error>({
    queryKey: ["group", groupId],
    queryFn: () =>
      pb.collection("groups").getOne(groupId, {
        expand: "participants",
      }),
  });
  return query;
};

const useParticipant = (participantId: string) => {
  const query = useQuery<Participant, Error>({
    queryKey: ["participant", participantId],
    queryFn: () => pb.collection("participants").getOne(participantId),
  });
  return query;
};

const useCreateExpense = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, ModifiedTransactionFormValues>({
    mutationKey: ["createExpense"],

    mutationFn: async (transactionForm: ModifiedTransactionFormValues) => {
      const res = await fetch(`${spltPocketHost}/api/splt/expense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionForm),
      });
      if (!res.ok) throw new Error("Failed to create expense");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["totalSpendData"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, ModifiedTransactionFormValues>({
    mutationKey: ["updateExpense"],

    mutationFn: async (transactionForm: ModifiedTransactionFormValues) => {
      const res = await fetch(
        `${spltPocketHost}/api/splt/expense/${transactionForm.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transactionForm),
        },
      );
      if (!res.ok) throw new Error("Failed to update expense");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["totalSpendData"] });
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<boolean, Error, string>({
    mutationKey: ["deleteExpense"],

    mutationFn: async (expenseId) => {
      const res = await fetch(`${spltPocketHost}/api/splt/expense/${expenseId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete expense");
      return res.json();
    },
    onSuccess: () => {
      // Update all simulations query
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["totalSpendData"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

const useCreatePayback = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, PaybackFormValues>({
    mutationKey: ["createPayback"],

    mutationFn: (paybackFrom: PaybackFormValues) =>
      pb.collection("paybacks").create(paybackFrom),
    onSuccess: () => {
      // Update all simulations query
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["totalSpendData"],
      // });
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

const useDeletePayback = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<boolean, Error, string>({
    mutationKey: ["deletePayback"],

    mutationFn: (paybackId) => pb.collection("paybacks").delete(paybackId),
    onSuccess: () => {
      // Update all simulations query
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["totalSpendData"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

export {
  useTransactions,
  useTotalSpend,
  useCreateGroup,
  useCreateParticipant,
  useGroup,
  useCreateExpense,
  useExpense,
  usePayback,
  useUpdateParticipant,
  useParticipant,
  useUpdateGroup,
  useDebts,
  useCreatePayback,
  useDeleteExpense,
  useDeletePayback,
  useUpdateExpense,
  useServerGroupHistory,
  useClaimGroup,
  useVerifyGroupPin,
};
