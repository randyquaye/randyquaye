import { ShipmentModel } from "../models/ShipmentModel";
import { OrderModel } from "../models/OrderModel";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const SHIPMENTS_URL = `${API_URL}/shipments`;
const SHIPMENT_URL = `${API_URL}/shipment`;
const ADD_SHIPMENT_URL = `${API_URL}/shipments/create`;

export function getSomeShipments(limit: number = 5) {
  return axios.get(`${SHIPMENTS_URL}/${limit}`);
}

export function getAllShipments() {
  return axios.get(SHIPMENTS_URL);
}

export function getShipment(id: string) {
  return axios.get(`${SHIPMENT_URL}/${id}`);
}

export function addShipment(shipment: ShipmentModel) {
  return axios.post(ADD_SHIPMENT_URL, shipment);
}

export function addOrders(shipmentID: string, orders: any[]) {
  return axios.post(`${SHIPMENT_URL}/order`, { shipmentID, orders });
}

export function deleteOrder(shipmentID: string, orderID: string) {
  return axios.post(`${SHIPMENT_URL}/delete-order`, { shipmentID, orderID });
}

export function updateShipment(shipment: any) {
  return axios.put(`${SHIPMENT_URL}/update`, { ...shipment });
}
