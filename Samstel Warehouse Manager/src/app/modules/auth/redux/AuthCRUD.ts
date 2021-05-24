import axios from "axios";
import { AuthModel } from "../models/AuthModel";
import { UserModel } from "../models/UserModel";

const API_URL = process.env.REACT_APP_API_URL;

export const GET_USER_BY_TOKEN = `${API_URL}/auth/user`;
export const LOGIN_URL = `${API_URL}/auth/login`;
export const REGISTER_URL = `${API_URL}/auth/signup`;
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgot-password`;

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post(LOGIN_URL, { email, password });
}

// Server should return AuthModel
export function register(email: string, companyName: string, password: string) {
  return axios.post<AuthModel>(REGISTER_URL, {
    email,
    companyName,
    password,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<UserModel>(GET_USER_BY_TOKEN);
}
