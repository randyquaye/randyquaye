//shipments.js

const { admin, db } = require("../util/admin");
const { request, response } = require("express");

exports.getAllShipments = (request, response) => {
  db.collection("shipments")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let shipments = [];
      data.forEach((doc) => {
        shipments.push({
          shipmentID: doc.id,
          name: doc.data().name,
          status: doc.data().status,
          trackNo: doc.data().trackNo,
          numOrders: doc.data().numOrders,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
        });
      });
      return response.json({ shipments });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.getSomeShipments = (request, response) => {
  db.collection("shipments")
    .orderBy("updatedAt", "desc")
    .limit(parseInt(request.params.limit))
    .get()
    .then((data) => {
      let shipments = [];
      data.forEach((doc) => {
        shipments.push({
          shipmentID: doc.id,
          name: doc.data().name,
          trackNo: doc.data().trackNo,
          status: doc.data().status,
          numOrders: doc.data().numOrders,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
        });
      });
      return response.json({ shipments });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.getShipment = (request, response) => {
  db.doc(`shipments/${request.params.id}`)
    .get()
    .then(async (doc) => {
      let shipment = doc.data();
      let orders = [];
      await db
        .collection(`shipments/${request.params.id}/orders`)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            orders.push({
              id: doc.id,
              ...doc.data(),
            });
          });
        });
      return { ...shipment, orders };
    })
    .then((shipment) => {
      return response.json(shipment);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.postShipment = (request, response) => {
  const newShipment = {
    name: request.body.name,
    trackNo: request.body.trackNo === "" ? "Not Tracked" : request.body.trackNo,
    status: request.body.status,
    numOrders: request.body.orders.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.collection("shipments")
    .add(newShipment)
    .then(async (doc) => {
      await uploadOrders(request.body.orders, doc.id);
      const responseShipment = newShipment;
      responseShipment.id = doc.id;
      return response.json(responseShipment);
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
};

exports.postOrder = (request, response) => {
  const orders = request.body.orders;
  const shipmentID = request.body.shipmentID;

  uploadOrders(orders, shipmentID)
    .then(() => {
      db.collection("shipments")
        .doc(shipmentID)
        .update({
          numOrders: admin.firestore.FieldValue.increment(orders.length),
        });
    })
    .then(() => {
      // const updatedOrders = doc.numOrders;
      return response.json("Write done");
    })
    .catch((err) => {
      response
        .status(500)
        .json({ error: "Something went wrong in adding order" });
      console.error(err);
    });
};

const uploadOrders = async (orders, id) => {
  orders.forEach((order) => {
    const newOrder = {
      productName: order.productName,
      category: order.category,
      modelNo: order.modelNo,
      quantity: order.quantity,
      perCtn: order.perCtn,
      price: order.price,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.collection(`shipments/${id}/orders`).add(newOrder);
    //create  something to show if all ipdates worked
  });
};

exports.removeOrder = (request, response) => {
  const document = db.doc(
    `/shipments/${request.params.shipmentID}/orders/${request.params.orderID}`
  );
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Order not found" });
      }
      return document.delete();
    })
    .then(() => {
      db.collection("shipments")
        .doc(request.params.shipmentID)
        .update({ numOrders: admin.firestore.FieldValue.increment(-1) });
    })
    .then(() => {
      response.json({ message: "Delete successful" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.deleteShipment = (request, response) => {
  const document = db.doc(`/shipments/${request.params.shipmentID}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Shipment not found" });
      }
      return document.delete();
      //delete all the order documents under a particular shipment
    })
    .then(() => {
      response.json({ message: "Delete successfull" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
