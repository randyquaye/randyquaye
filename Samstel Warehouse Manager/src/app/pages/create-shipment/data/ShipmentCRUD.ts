import { ShipmentModel } from "../models/ShipmentModel";
import { OrderModel } from "../models/OrderModel";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const SHIPMENTS_URL = `${API_URL}/shipMents`;
const ADD_SHIPMENT_URL = `${API_URL}/shipments/create`;

export function addShipment(shipment: ShipmentModel) {
  console.log(shipment);
  return axios.post(ADD_SHIPMENT_URL, shipment);
}
