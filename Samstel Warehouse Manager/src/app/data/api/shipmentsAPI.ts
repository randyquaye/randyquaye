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
  console.log(shipment);
  return axios.post(ADD_SHIPMENT_URL, shipment);
}
