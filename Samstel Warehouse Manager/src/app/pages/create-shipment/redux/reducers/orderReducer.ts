import * as types from "../actions/actionTypes";
import initialState from "../../../../../setup/redux/initialState";
import { OrderModel } from "../../models/OrderModel";
import { ActionWithPayload } from "./../../../../../setup/redux/util";

export interface IOrderState {
  order: OrderModel;
}

export default function orderReducer(
  state = initialState.orders,
  action: ActionWithPayload<IOrderState>
) {
  switch (action.type) {
    case types.CREATE_ORDER:
      return {
        orders: {
          savedOrders: state.savedOrders,
          newOrders: [...state.newOrders, { ...action.payload?.order }],
        },
      };

    default:
      return state;
  }
}
