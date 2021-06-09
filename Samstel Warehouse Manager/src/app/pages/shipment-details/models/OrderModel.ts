export interface OrderModel {
  productName: string;
  modelNo: string;
  perCtn: number;
  price: number;
  totalCost?: number;
  shipmentID: string;
  quantity: number;
  category: string;
}
