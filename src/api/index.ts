import {
  GroupData,
  GroupFormValues,
  ModifiedGroupFormValues,
  ModifiedTransactionFormValues,
  ParticipantFormValues,
  TotalSpendData,
  TransactionFormValues,
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

const pb = new PocketBase("http://127.0.0.1:8090");

const useTransactions = (groupId: string) => {
  const query = useQuery<PbHooksTransactionsList, Error>({
    queryKey: ["transactions", groupId],
    queryFn: async () => {
      const res = await fetch(
        `http://127.0.0.1:8090/api/splt/transactions?groupId=${groupId}`
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
        const filteredOldHistory = oldHistory.filter(
          (group) => group !== query.data.expand.groupInfo.id
        );
        return [query.data.expand.groupInfo.id, ...filteredOldHistory];
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

const useCreateGroup = () => {
  const mutation = useMutation<any, Error, ModifiedGroupFormValues>({
    mutationKey: ["createGroup"],

    mutationFn: (groupForm: ModifiedGroupFormValues) =>
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

const useGroup = (groupId: string) => {
  const query = useQuery<GroupData, Error>({
    queryKey: ["group", groupId],
    queryFn: () => pb.collection("groups").getOne(groupId),
  });
  return query;
};

const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<any, Error, ModifiedTransactionFormValues>({
    mutationKey: ["createTransaction"],

    mutationFn: (transactionForm: ModifiedTransactionFormValues) =>
      pb.collection("expenses").create(transactionForm),
    onSuccess: () => {
      // Update all simulations query
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
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
  useCreateTransaction,
};
