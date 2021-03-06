export interface OrderModel {
  productName: string;
  modelNo: string;
  perCtn: number;
  price: number;
  totalCost?: number;
  quantity: number;
  shipmentID: string;
  category: string;
}
