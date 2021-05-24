import { OrderModel } from "./OrderModel";

export interface ShipmentModel {
  shipmentID?: string;
  name: string;
  trackNo?: string;
  orders?: OrderModel[];
  status: "Ordering" | "En Route" | "Delivered";
  createdAt?: any;
  updatedAt?: any;
  numOrders?: number;
}
