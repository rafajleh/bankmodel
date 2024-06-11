const express = require("express");
const router = express.Router();

const {
    userData,
    addpayment
} = require("../controllers/qrControllers");

router.route("/getuserdatabyqr").get(userData);
router.route("/addpayment").get(addpayment);

module.exports = router;
