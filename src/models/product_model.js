const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    photoUri: { type: String, required: false }
});

module.exports = mongoose.model("products", productSchema);

/* 
  // produtos
    {
        "products": {
            "id": "",
            "name": "",
            "price": "",
            "photo": "",
            "acquiredAt": { "drugstoreName": "", "drugstoreId": "" }
        }
    },
*/
