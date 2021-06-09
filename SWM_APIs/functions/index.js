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
  updateShipment,
  deleteShipment,
  postOrder,
  deleteOrder,
} = require("./APIs/http/shipments");

app.get("/shipments", getAllShipments);
app.get("/shipment/:id", getShipment);
app.get("/shipments/:limit", getSomeShipments);
app.post("/shipments/create", postShipment);
app.put("/shipment/update", updateShipment);
app.delete("/shipment/:shipmentID", deleteShipment);
app.post("/shipment/order", postOrder);
app.post("/shipment/delete-order", deleteOrder);

//Inventory
const {
  getSomeProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("./APIs/http/inventory");

app.get("/inventory/:limit", getSomeProducts);
app.get("/product/:id", getProduct);
app.put("/product/update", updateProduct);
app.delete("/product/:id", deleteProduct);

// Users
const {
  loginUser,
  signUpUser,
  getUserDetail,
  resetPassword,
} = require("./APIs/http/users");

app.post("/auth/login", loginUser);
app.post("/auth/signup", signUpUser);
app.get("/auth/user", getUserDetail);
app.post("/auth/forgot-password", resetPassword);

exports.api = functions.https.onRequest(app);
exports.metrics = require("./APIs/firestoreTriggered/shipments");
exports.products = require("./APIs/firestoreTriggered/inventory");
