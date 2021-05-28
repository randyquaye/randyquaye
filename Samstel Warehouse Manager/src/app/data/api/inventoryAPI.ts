import { ShipmentModel } from "../models/ShipmentModel";
import { OrderModel } from "../models/OrderModel";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const PRODUCTS_URL = `${API_URL}/inventory`;
const PRODUCT_URL = `${API_URL}/product`;

export function getSomeProducts(limit: number = 5) {
  return axios.get(`${PRODUCTS_URL}/${limit}`);
}
