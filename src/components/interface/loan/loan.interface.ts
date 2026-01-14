import { IPartner } from "../partner/partner.interfacce";

export interface ILoanPartner extends IPartner {
  balance: number;
}

export interface ILoanPartnerResponse {
  data: ILoanPartner[];
}

export interface ILoanTranx {
  id: string;
  partnerId: string;
  txType: LoanTxType;
  amount: number;
  notes?: string;
  dueDate?: Date | null;
  createdAt?: Date;
}

export type LoanTxType =
  | "loan_given"
  | "loan_taken"
  | "payment"
  | "adjustment"
  | "invoice_link";

export interface ILoanTranxResponse {
  data: { transactions: ILoanTranx[]; balance: number };
}

export interface ICreatePartnerAndInitialLoanTranx {
  createPartnerDto: Omit<IPartner, "id">;
  createLoanTransactionDto: Omit<ILoanTranx, "id" | "partnerId" | "createdAt">;
}

export interface INewLoanTranx {
  partnerId: string;
  txType: LoanTxType;
  amount: number;
  notes?: string;
  dueDate?: Date | null;
}

export interface ILoanTranxFormProps {
  modalOpen?: boolean;
  closeModal?: () => void;
  selectedTranxId?: string | undefined;
  onEdit?: (value: any) => void;
  item?: ILoanTranx | null;
}
