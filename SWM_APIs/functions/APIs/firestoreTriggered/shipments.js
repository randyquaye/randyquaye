const functions = require("firebase-functions");
const { db } = require("../../util/admin");

exports.createMetrics = functions.firestore
  .document("shipments/{shipmentID}")
  .onCreate((change, context) => {
    writeMetrics(change, context);
  });

exports.updateMetrics = functions.firestore
  .document("shipments/{shipmentID}")
  .onUpdate((change, context) => {
    writeMetrics(change, context);
  });

function writeMetrics(change, context) {
  const shipmentID = context.params.shipmentID;

  let categories = {},
    ctnPerCat = {},
    pricePerCat = {};

  let shipmentCost = 0,
    noCtns = 0;

  return db
    .collection(`shipments/${shipmentID}/orders`)
    .get()
    .then((orders) => {
      orders.forEach((order) => {
        const data = order.data();
        categories[data.category] = 1 + (categories[data.category] || 0);
        shipmentCost += data.totalCost;
        noCtns += data.quantity;
        ctnPerCat[data.category] =
          data.quantity + (ctnPerCat[data.category] || 0);
        pricePerCat[data.category] =
          data.price * data.quantity + (pricePerCat[data.category] || 0);
      });
      console.log("processing stats");
    })
    .then(() => {
      console.log("writing stats");

      return db.doc(`shipments/${shipmentID}`).update({
        categories,
        shipmentCost,
        noCtns,
        pricePerCat,
        ctnPerCat,
      });
    });
}
