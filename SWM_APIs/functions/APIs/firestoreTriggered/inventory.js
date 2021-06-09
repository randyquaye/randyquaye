const functions = require("firebase-functions");
const { db } = require("../../util/admin");

exports.checkProduct = functions.firestore
  .document("shipments/{shipmentID}")
  .onWrite((change, context) => {
    //check whether status of shipment is delivered
    if (!change.after.exists) return;
    else if (change.after.data().status == "Delivered") {
      doCheckProduct(change, context);
    }
  });

function doCheckProduct(change, context) {
  const shipmentID = context.params.shipmentID;

  //Get all orders in delivered shipment
  db.collection(`shipments/${shipmentID}/orders`)
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        const order = doc.data();
        return db
          .doc(`products/${order.modelNo}`)
          .get()
          .then((product) => {
            if (product.exists) {
              let updatedProduct = {
                ctnQty: product.data().ctnQty + order.quantity,
                stockCount:
                  order.quantity * order.perCtn + product.data().stockCount,
                factoryPrice: order.price,
                updatedAt: new Date().toISOString(),
              };
              return db
                .doc(`products/${order.modelNo}`)
                .update({ ...updatedProduct });
            } else {
              let newProduct = {
                name: order.productName,
                modelNo: order.modelNo,
                factoryPrice: order.price,
                category: order.category,
                retailPrice: order.price * 1.05,
                perCtn: order.perCtn,
                ctnQty: order.quantity,
                stockCount: order.quantity * order.perCtn,
                onHold: false,
                reorderLevel: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };

              return db
                .doc(`products/${order.modelNo}`)
                .set(newProduct, { merge: true });
            }
          })
          .then(() => {
            change.after.ref.update({ status: "Fulfilled" });
          })
          .catch((err) => {
            console.error(err);
          });
      });
    });
}
