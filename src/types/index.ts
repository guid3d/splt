export type BillData = {
  avatar: string;
  name: string;
  description: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
  }[];
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
