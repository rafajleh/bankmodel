const Account = require("../models/accountModel");
const User = require("../models/userModel");

const userData = async (req, res) => {
  try {
    let user = await User.findOne({nid_no: req.query.nid, phone: req.query.mobile}).lean();
    user['trnxHistory'] = []
    user['trnxHistory'] = await Account.findOne({client_id: user._id});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

const addpayment = async (req, res) => {
  try {
    let account = await Account.findOne({client_id: req.query.uid});
    let amt = Math.floor(Math.random() * 6000) + 1000
    account.balance += +amt;
    account.markModified("balance");

    //update user's withdraw logs with new deposit log
    account.deposit_logs.push({
      depositted_amount: +amt,
    });
    account.markModified("deposit_logs");

    //Save Deposit operation
    const updatedAccount = await account.save();
    res.status(200).json(updatedAccount);
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  userData,
  addpayment
};
