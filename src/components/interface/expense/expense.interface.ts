export interface IExpense {
  id: string;
  amount: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExpenseDetail extends IExpense {
  expensePayments: {
    id: string;
    accountId: string;
    amount: number;
    account: {
      id: string;
      name: string;
    };
  }[];
  expenseCashPayments: {
    amount: number;
  };
}

export interface INewExpensePayment {
  accountId: string;
  amount: number;
}

export interface INewExpenseCashPayment {
  amount: number;
}

export interface INewExpense {
  amount: number;
  description?: string;
  items?: INewExpensePayment[];
  cashItems: INewExpenseCashPayment;
}

export interface IExpenseFormProps {
  selectedExpenseId?: string;
}
