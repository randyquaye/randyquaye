const { admin, db } = require("../../util/admin");
const { request, response, json } = require("express");

exports.getSomeProducts = (request, response) => {
  db.collection("products")
    .orderBy("updatedAt", "desc")
    .limit(parseInt(request.params.limit))
    .get()
    .then((data) => {
      let products = [];
      data.forEach((doc) => {
        let product = doc.data();
        products.push({
          productID: doc.id,
          name: product.name,
          modelNo: product.modelNo,
          factoryPrice: product.price,
          category: product.category,
          retailPrice: product.retailPrice,
          perCtn: product.perCtn,
          ctnQty: product.ctnQty,
          stockCount: product.stockCount,
          onHold: product.onHold,
          reorderLevel: product.reorderLevel,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        });
      });
      return response.json({ products });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.getProduct = (request, response) => {
  db.doc(`products/${request.params.id}`)
    .get()
    .then((product) => {
      return response.json(product.data());
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.updateProduct = (request, response) => {
  db.doc(`products/${request.body.id}`)
    .set(
      { ...request.body.details, updatedAt: new Date().toISOString() },
      { merge: true }
    )
    .then(() => {
      // const updatedOrders = doc.numOrders;
      return response.json("Write done");
    })
    .catch((err) => {
      response
        .status(500)
        .json({ error: "Something went wrong in updating details" });
      console.error(err);
    });
};

exports.deleteProduct = (request, response) => {
  const document = db.doc(`products/${request.params.id}`);

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Product not found" });
      }
      return document.delete();
      //delete all the order documents under a particular shipment
    })
    .then(() => {
      return response.json({ message: "Delete successful" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
