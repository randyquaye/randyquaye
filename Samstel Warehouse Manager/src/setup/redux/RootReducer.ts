import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../../app/modules/auth/redux/AuthRedux";
import * as orderReducer from "../../app/pages/create-shipment/redux/reducers/orderReducer";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  orders: orderReducer.default,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([auth.saga()]);
}
