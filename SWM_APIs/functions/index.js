const functions = require("firebase-functions");

const cors = require("cors")({ origin: true });

const app = require("express")();
app.use(cors);

//Shipment Functions
const {
  getAllShipments,
  getSomeShipments,
  getShipment,
  postShipment,
  deleteShipment,
  postOrder,
  removeOrder,
} = require("./APIs/shipments");

app.get("/shipments", getAllShipments);
app.get("/shipment/:id", getShipment);
app.get("/shipments/:limit", getSomeShipments);
app.post("/shipments/create", postShipment);
app.delete("/shipment/:shipmentID", deleteShipment);
app.post("/shipment/order", postOrder);
app.delete("/shipment/:shipmentID/order/:orderID", removeOrder);

// Users
const {
  loginUser,
  signUpUser,
  getUserDetail,
  resetPassword,
} = require("./APIs/users");

app.post("/auth/login", loginUser);
app.post("/auth/signup", signUpUser);
app.get("/auth/user", getUserDetail);
app.post("/auth/forgot-password", resetPassword);

exports.api = functions.https.onRequest(app);

// const fsShipments = require("./FireStore/shipmentTriggers");

exports.metrics = require("./FireStore/shipmentTriggers");
