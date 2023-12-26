export interface GroupFormValues {
  avatar: StoreEmojiData;
  name: string;
  description: string;
  password: string;
  currency: string;
  participant: Participant[];
}

export type GroupData = {
  avatar: string;
  name: string;
  description: string;
  participant: Participant[];
  totalAmount: number;
  currency: string;
  debts: {
    from: {
      name: string;
      avatar: string;
    };
    to: {
      name: string;
      avatar: string;
    };
    amount: number;
  }[];
};

export type TransactionsData = PaybackTransactionData | ExpenseTransactionData;

export type ExpenseTransactionData = {
  type: "expense";
  avatar: string;
  amount: number;
  name: string;
  date: number;
  description: string;
  category: string;
};

export type PaybackTransactionData = {
  type: "payback";
  from: {
    name: string;
    avatar: string;
  };
  to: {
    name: string;
    avatar: string;
  };
  amount: number;
  date: number;
};

export type StoreEmojiData = {
  emoji: string;
  unified: string;
};

export type Participant = {
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
