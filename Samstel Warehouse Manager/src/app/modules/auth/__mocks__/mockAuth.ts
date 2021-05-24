import MockAdapter from "axios-mock-adapter";
import { UserModel } from "../models/UserModel";
import {
  LOGIN_URL,
  GET_USER_BY_TOKEN,
  REGISTER_URL,
  REQUEST_PASSWORD_URL,
} from "../redux/AuthCRUD";
import { UsersTableMock } from "./usersTableMock";

export function mockAuth(mock: MockAdapter) {
  return;
}
