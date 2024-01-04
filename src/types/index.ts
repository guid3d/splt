export type ModifiedGroupFormValues = {
  name: string;
  avatar: StoreEmojiData;
  description: string;
  password: string;
  currency: string;
  participants: string[]; // Make this string because create new record need participant id
};

export type GroupFormValues = {
  name: string;
  avatar: StoreEmojiData;
  description: string;
  password: string;
  currency: string;
  participants: Participant[];
};

export enum SplitType {
  Equal = "equal",
  Percent = "percent",
  Amount = "amount",
}

export type ModifiedTransactionFormValues = {
  groupInfo: string;
  amount: number;
  transactionDateTime: string;
  name: string;
  avatar: StoreEmojiData;
  description: string;
  // category: string;
  paidBy: string;
  splitType: SplitType.Equal | SplitType.Percent | SplitType.Amount;
  everyoneIsParticipant: boolean;
  participants: string[];
};

export type TransactionFormValues = {
  groupInfo: string;
  amount: number;
  transactionDateTime: Date;
  name: string;
  avatar: StoreEmojiData;
  description: string;
  // category: string;
  paidBy: string;
  splitType: SplitType.Equal | SplitType.Percent | SplitType.Amount;
  everyoneIsParticipant: boolean;
  participants: string[];
};

export type TotalSpendData = {
  id: string;
  groupInfo: string;
  expand: {
    groupInfo: GroupData;
  };
  sumExpenses: number;
};

export type GroupData = {
  avatar: StoreEmojiData;
  currency: string;
  description: string;
  expand: {
    participants: Participant[];
  };
  id: string;
  name: string;
};

export type TransactionsData = ExpenseTransactionData & PaybackTransactionData;

export type ExpenseTransactionData = {
  amount: number;
  amountPerPerson?: number;
  avatar: StoreEmojiData;
  created: string;
  expand: {
    groupInfo: GroupData;
    participants: Participant[];
    paidBy: Participant;
  };
  description: string;
  everyoneIsParticipant: boolean;
  groupInfo: string;
  id: string;
  name: string;
  paidBy: string;
  participants: string[];
  splitType: SplitType;
  transactionDateTime: string;
  updated: string;
};

export type PaybackTransactionData = {
  amount: number;
  collectionId: string;
  collectionName: string;
  created: string;
  expand: {
    groupInfo: GroupData;
    fromPerson: Participant;
    toPerson: Participant;
  };
  fromPerson: string;
  groupInfo: string;
  id: string;
  toPerson: string;
  transactionDateTime: string;
  updated: string;
};

// export type TransactionsData = {
//   id: string;
//   groupInfo: string;
//   type: "expenses" | "paybacks";
//   transactionDateTime: string;
//   expand: {
//     paybackTransaction?: PaybackTransactionData;
//     expenseTransaction?: ExpenseTransactionData;
//   };
// };

// export type ExpenseTransactionData = {
//   amount: number;
//   avatar: StoreEmojiData;
//   collectionId: string;
//   collectionName: string;
//   created: string;
//   description: string;
//   everyoneIsParticipant: boolean;
//   groupInfo: string;
//   id: string;
//   name: string;
//   paidBy: string;
//   participant: string[];
//   splitType: SplitType;
//   transactionDateTime: string;
//   updated: string;
// };

// export type PaybackTransactionData = {
//   amount: number;
//   collectionId: string;
//   collectionName: string;
//   created: string;
//   expand: {
//     fromPerson: Participant;
//     toPerson: Participant;
//   };
//   fromPerson: string;
//   groupInfo: string;
//   id: string;
//   toPerson: string;
//   transactionDateTime: string;
//   updated: string;
// };

export type StoreEmojiData = {
  emoji: string;
  unified: string;
};

export type Participant = {
  id?: string;
  avatar: StoreEmojiData;
  name: string;
  accountName: string;
  selectedPaymentMethod: PaymentMethodType;
  paymentMethod: {
    iban: string;
    paypal: string;
  };
};

export type ParticipantFormValues = {
  avatar: StoreEmojiData;
  name: string;
  accountName: string;
  selectedPaymentMethod: PaymentMethodType;
  paymentMethod: {
    iban: string;
    paypal: string;
  };
};

export enum PaymentMethodType {
  Iban = "iban",
  Paypal = "paypal",
  Cash = "cash",
}
