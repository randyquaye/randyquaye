import * as types from "./actionTypes";
import * as shipmentApi from "../../data/ShipmentCRUD";
import { OrderModel } from "../../models/OrderModel";

export function createOrder(order: OrderModel) {
  return { types: types.CREATE_ORDER, order };
}
