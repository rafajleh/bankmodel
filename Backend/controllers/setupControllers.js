const Organization = require("../models/orgModel");

//@desc   >>>> org
//@route  >>>> GET /api/users/login
//@Access >>>> public
const orgInfo = async (req, res) => {
  try {
    const org = await Organization.create({
      org_name: req.body.name
    });
    res.status(201).json({
      id: org.id,
      org_name: org.org_name
    });
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

const getOrgInfo = async (req, res) => {
  try {
    const org = await Organization.findOne({});
    res.status(200).json(org);
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  orgInfo,
  getOrgInfo
};
