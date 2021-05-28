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
