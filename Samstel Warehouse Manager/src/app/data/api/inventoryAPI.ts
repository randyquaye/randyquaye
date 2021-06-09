import { ShipmentModel } from "../models/ShipmentModel";
import { OrderModel } from "../models/OrderModel";
import axios from "axios";
import { IProduct } from "../../pages/product-details/components/product-details/ProductModel";

const API_URL = process.env.REACT_APP_API_URL;
const PRODUCTS_URL = `${API_URL}/inventory`;
const PRODUCT_URL = `${API_URL}/product`;

export function getSomeProducts(limit: number = 5) {
  return axios.get(`${PRODUCTS_URL}/${limit}`);
}

export function getProduct(productID: string) {
  return axios.get(`${PRODUCT_URL}/${productID}`);
}

export function updateProduct(product: Partial<IProduct>, id: string) {
  return axios.put(`${PRODUCT_URL}/update`, { details: product, id });
}

export function deleteProduct(id: string) {
  return axios.delete(`${PRODUCT_URL}/${id}`);
}
