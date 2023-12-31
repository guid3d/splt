import {
  GroupData,
  GroupFormValues,
  ModifiedGroupFormValues,
  ParticipantFormValues,
  TotalSpendData,
  TransactionFormValues,
  TransactionsData,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import PocketBase from "pocketbase";

type PbTransactionsList = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: TransactionsData[];
};

const pb = new PocketBase("http://127.0.0.1:8090");

const useTransactions = (groupId: string) => {
  const query = useQuery<PbTransactionsList, Error>({
    queryKey: ["transactions", groupId],
    queryFn: () =>
      pb.collection("transactions").getList(1, 50, {
        sort: "-transactionDateTime",
        expand:
          "expenseTransaction, paybackTransaction.fromPerson, paybackTransaction.toPerson",
        fields: "id, group, type, transactionDateTime, expand",
        filter: `group.id="${groupId}"`,
        // "id, avatar, amount, name, date, description, category, expenseDateTime",
      }),
    // .then((res) => {
    //   console.log(res);
    //   return res;
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

export { useTransactions, useTotalSpend, useCreateGroup, useCreateParticipant };
