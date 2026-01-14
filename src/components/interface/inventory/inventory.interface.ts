import { IPurchaseItem } from "../purchase/purchase.interface";
import { ISale, ISellItem } from "../sells/interface.sells";
import { IWarehouse } from "../warehouse/warehouse.interface";

export interface INewInventory {
  sku: string;
  name: string;
  boughtPrice: number;
  sellingPrice: number;
  brand?: string;
  unit?: string;
  initialQuantity: number;
}

export interface INewInventoryWarehouseQuantity {
  quantity: number;
  reorderQuantity: number;
  inventoryId: string;
  warehouseId: string;
  warehouseInventories: INewInventory[];
}

export interface IWarehouseInventory {
  id: string;
  quantity: number;
  reorderQuantity: number;
  inventoryId: string;
  warehouseId: string;
  warehouse: IWarehouse;
}

export interface IInventory {
  id: string;
  sku: string;
  name: string;
  boughtPrice: number;
  sellingPrice: number;
  brand?: string;
  unit?: string;
  initialQuantity: number;
  warehouseInventories: IWarehouseInventory[];
}

export interface IInventoryResponse {
  data: IInventory[];
}

export interface IInventoryDetail extends IInventory {
  purchaseItems: IPurchaseItem[];
  saleItems: ISellItem[];
  warehouseInventories: {
    id: string;
    quantity: number;
    reorderQuantity: number;
    inventoryId: string;
    warehouseId: string;
    warehouse: IWarehouse;
  }[];
}

export interface IInventoryFormProps {
  selectedInventoryId?: string | undefined;
  onEdit?: (value: any) => void;
  item?: IInventory | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export interface IQuickInventoryFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export interface IQuickInventory {
  sku: string;
  name: string;
  boughtPrice: number;
  sellingPrice: number;
  brand?: string;
  unit?: string;
}

export interface IWarehouseInventorySelector {
  id: string;
  inventoryId: string;
  warehouseId: string;
  quantity: string;
}

export interface IInventorySelector {
  id: string;
  name: string;
  warehouseInventories: IWarehouseInventorySelector[];
}

export interface IInventorySelectorResponse {
  data: IInventorySelector[];
}

export interface ISelectorWarehouseInventory {
  quantity: string | number;
  inventory: {
    name: string;
    id: string;
  };
  warehosue: {
    name: string;
    id: string;
  };
}

export interface ISelectorWarehouseInventoryResponse {
  data: ISelectorWarehouseInventory[];
}

export interface IInventoryReport {
  totalMoneyInventory: number;
  totalItems: number;
}
