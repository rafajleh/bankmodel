const express = require("express");
const router = express.Router();

const {
  orgInfo,
  getOrgInfo,
  welcome
} = require("../controllers/setupControllers");

router.route("/hi").get(welcome);
router.route("/orginfo").get(getOrgInfo);
router.route("/orginfo").post(orgInfo);

module.exports = router;
