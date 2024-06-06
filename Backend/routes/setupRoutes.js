const express = require("express");
const router = express.Router();

const {
  orgInfo,
  getOrgInfo
} = require("../controllers/setupControllers");

router.route("/orginfo").get(getOrgInfo);
router.route("/orginfo").post(orgInfo);

module.exports = router;
