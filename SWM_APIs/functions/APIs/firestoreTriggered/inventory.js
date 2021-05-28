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
  db.collection(`shipments/${shipmentID}`)
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        return db
          .doc(`products/${doc.modelNo}`)
          .get()
          .then((product) => {
            if (product.exists) {
              let updatedProduct = {
                ctnQty: product.data().ctnQty + doc.quantity,
                stockCount:
                  doc.quantity * doc.perCtn + product.data().stockCount,
                factoryPrice: doc.price,
                updatedAt: new Date().toISOString(),
              };
              return db
                .doc(`products/${doc.modelNo}`)
                .update({ ...updatedProduct });
            } else {
              let newProduct = {
                name: doc.productName,
                modelNo: doc.modelNo,
                factoryPrice: doc.price,
                category: doc.category,
                retailPrice: doc.price * 1.05,
                perCtn: doc.perCtn,
                ctnQty: doc.quantity,
                stockCount: doc.quantity * doc.perCtn,
                onHold: false,
                reorderLevel: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };

              return db
                .doc(`products/${doc.modelNo}`)
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
