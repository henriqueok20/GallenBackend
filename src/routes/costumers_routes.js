const express = require("express");
const router = express.Router();
const authValidation = require("../middlewares/auth_validation");

const CostumerController = require("../controllers/costumer_controller");

/* router.post("/signup", CostumerController.costumer_signup);
router.post("/login", CostumerController.costumer_login); */
//router.delete("/:userID", authValidation, CostumerController.costumer_delete);

module.exports = router;
