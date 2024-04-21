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
import { useLocalStorage } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PocketBase from "pocketbase";
import { useEffect } from "react";

// type PbTransactionsList = {
//   page: number;
//   perPage: number;
//   totalPages: number;
//   totalItems: number;
//   items: TransactionsData[];
// };

type PbHooksTransactionsList = {
  transactions: TransactionsData[];
};

const spltPocketHost =
  process.env.NEXT_PUBLIC_DB_HOST || "https://splt.pockethost.io";

const pb = new PocketBase(spltPocketHost);

const useTransactions = (groupId: string) => {
  const query = useQuery<PbHooksTransactionsList, Error>({
    queryKey: ["transactions", groupId],
    queryFn: async () => {
      const res = await fetch(
        `${spltPocketHost}/api/splt/transactions?groupId=${groupId}`
      );
      return res.json();
    },
    // pb.collection("transactions").getList(1, 50, {
    //   sort: "-transactionDateTime",
    //   expand:
    //     "expenseTransaction, paybackTransaction.fromPerson, paybackTransaction.toPerson",
    //   fields: "id, group, type, transactionDateTime, expand",
    //   filter: `group.id="${groupId}"`,
    // }),
  });
  return query;
};

const useExpense = (expenseId: string) => {
  const query = useQuery<ExpenseTransactionData, Error>({
    queryKey: ["expense", expenseId],
    queryFn: async () => {
      // TODO: handle error when expenseId is not found
      const res = await fetch(
        `${spltPocketHost}/api/splt/expense?expenseId=${expenseId}`
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
        `${spltPocketHost}/api/splt/payback?paybackId=${paybackId}`
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
        `${spltPocketHost}/api/splt/hasSpent?groupId=${groupId}`
      );
      // console.log(res.json());
      return res.json();
    },
  });
  return query;
};

// const useGroup = (groupId: string) => {
//   const query = useQuery<GroupData, Error>({
//     queryKey: ["group", groupId],
//     queryFn: () =>
//       pb.collection("groups").getFirstListItem(`id="${groupId}"`, {
//         expand: "participants",
//         fields: "id, avatar, name, description, currency, expand",
//         // "id, avatar, amount, name, date, description, category, expenseDateTime",
//       }),
//     // pb.collection("groups").getList(1, 50),
//   });
//   return query;
// };

const useTotalSpend = (groupId: string) => {
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
        // "id, avatar, amount, name, date, description, category, expenseDateTime",
      }),
    // pb.collection("groups").getList(1, 50),
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
    }
  }, [query.data, setGroupHistory]);
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

    mutationFn: (transactionForm: ModifiedTransactionFormValues) =>
      pb.collection("expenses").create(transactionForm),
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

const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<GroupData, Error, ModifiedTransactionFormValues>(
    {
      mutationKey: ["updateExpense"],

      mutationFn: (transactionForm: ModifiedTransactionFormValues) =>
        pb.collection("expenses").update(transactionForm.id!, transactionForm),
      onSuccess: () => {
        // Update all simulations query
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        queryClient.invalidateQueries({ queryKey: ["totalSpendData"] });
        queryClient.invalidateQueries({ queryKey: ["expense"] });
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  return mutation;
};

const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<boolean, Error, string>({
    mutationKey: ["deleteExpense"],

    mutationFn: (expenseId) => pb.collection("expenses").delete(expenseId),
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
};
