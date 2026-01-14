import { IAccount } from "../interface.account";
import { IInventory } from "../inventory/inventory.interface";
import { ILoanTranx } from "../loan/loan.interface";
import { IWarehouse } from "../warehouse/warehouse.interface";

export interface ISellItem {
  id: string;
  unitPrice: number;
  quantity: number;
  inventoryId: string;
  warehouseId?: string;
}

export interface IPaymentItem {
  amount: number;
  description?: string;
  accountId: string;
}

export interface ICashPayment {
  amount: number;
  description?: string;
}

export interface INewSale {
  description?: string;
  partnerId: string;
  warehouseId?: string;
  purchaseItems: ISellItem[];
  paymentItems: IPaymentItem[];
  cashPayments?: ICashPayment;
}

export interface IPartner {
  name: string;
  phone: string;
}

export interface ISaleInventory {
  name: string;
}

export interface ISale {
  id: string;
  orderDate: string;
  receiveDate: string;
  description?: string;
  partnerId?: string;
  partner?: IPartner;
  saleItems: {
    id: string;
    inventory: ISaleInventory;
    unitPrice: number | string;
    quantity: number;
    warehouse?: {
      name: string;
    };
  }[];
  total: number;
}

export interface ISaleFormProps {
  selectedSaleId?: string | undefined;
}

export interface ISaleResponse {
  data: ISale[];
}

export interface ISaleDailyResponse {
  totalPaidByBank: number;
  totalPaidByCash: number;
  totalLoan: number;
}

export interface ISaleView extends ISale {
  partner?: IPartner;
  saleItems: SaleItem[];
  salePayment: ISalePaymentItem[];
  saleCashPayment?: ICashPayment;
  loan?: ILoanTranx;
}

export interface SaleItem {
  id: string;
  unitPrice: number;
  quantity: number;
  createdAt: Date;
  inventory: IInventory;
  warehouse: IWarehouse;
}

export interface ISalePaymentItem {
  id: string;
  amount: number;
  description?: string;
  accountId: string;
  account: IAccount;
  createdAt: Date;
}
