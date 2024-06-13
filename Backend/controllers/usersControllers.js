const AccountRequest = require("../models/accountRequestModel");

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateUsersToken } = require("../helpers/generateUsersToken");

//@desc   >>>> Get All Users
//@route  >>>> GET /api/users
//@Access >>>> private(admins)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "_id user_id user_name email phone nid_no verified_nid_no verified_phone user_status no_of_account"
    ).sort({ _id: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Get one User
//@route  >>>> GET /api/users/:id
//@Access >>>> private(User)
const getOneUser = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    res.status(200).json({
      name: user.user_name,
      email: user.email,
      address: user.full_addresse,
      id: user.id,
      user_id: user.user_id,
      accountsCount: user.no_of_account,
      createdAt: user.createdAt,
      userStatus: user.user_status,
      nid: user.nid_no,
      phone: user.phone,
      accounts: user.accounts,
      reqBank: user.reqBank,
      verified_nid_no: user.verified_nid_no,
      verified_phone: user.verified_phone,
      notifications: user.notifications,
    });
  } catch (error) {
    if (!user) return res.status(404).send("User Not Found!");
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Create one User
//@route  >>>> POST /api/users/:id
//@Access >>>> public
const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      user_name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      full_addresse: req.body.addresse,
      nid_no: req.body.nid,
      reqBank: req.body.reqBank,
    });
    user.user_id = user._id;
    await user.save();
    res.status(201).json({
      id: user.id,
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      token: "",
    });
  } catch (error) {
    console.log(66, error)
    if (error.message.match(/(email|password|name|nid|phone|addresee)/gi)) {
      return res.status(400).send(error.message);
    }
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> user login
//@route  >>>> GET /api/users/login
//@Access >>>> public
const userLogin = async (req, res) => {
  //check for empty body
  if (!req.body.email || !req.body.password)
    return res.status(404).send("empty body request");
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
    //ckeck for password
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateUsersToken(user.id, user.email),
      });
    } else {
      return res.status(404).send("Wrong Credintials - wrong password");
    }
  } catch (error) {
    if (!user || !isCorrectPassword)
      return res
        .status(404)
        .send("Wrong Credintials - wrong email or password");
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> UPDATE User info
//@route  >>>> PUT /api/users/:id
//@Access >>>> private(for User only)
const updateUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //get user
    const user = await User.findById(req.params.id);
    //update user with new values
    user.email = req.body.email;
    user.markModified("email");
    user.password = hashedPassword;
    user.markModified("password");
    user.phone = req.body.phone;
    user.markModified("phone");
    user.full_addresse = req.body.addresse;
    user.markModified("full_addresse");
    user.nid_no = req.body.nid;
    user.markModified("nid_no");

    //get updated user info & send it back
    const updatedUser = await user.save();

    res.status(200).json({
      name: updatedUser.user_name,
      email: updatedUser.email,
      address: updatedUser.full_addresse,
      id: updatedUser.id,
      accountsCount: updatedUser.no_of_account,
      createdAt: updatedUser.createdAt,
      userStatus: updatedUser.user_status,
      nid: updatedUser.nid_no,
      phone: updatedUser.phone,
      accounts: updatedUser.accounts,
      reqBank: updatedUser.reqBank,
      verified_nid_no: updatedUser.verified_nid_no,
      verified_phone: updatedUser.verified_phone,
      notifications: updatedUser.notifications,
    });
  } catch (error) {
    if (error.message.match(/(email|password|name|nid|phone|addresee)/gi))
      return res.status(400).send(error.message);
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Notification isSeen update
//@route  >>>> PUT /api/users/notifications/:id
//@Access >>>> private(for User only)
const notificationUpdate = async (req, res) => {
  try {
    //get user
    const user = req.user;
    //update notification status
    user.notifications = user.notifications.map((notification) => {
      if (notification.id === req.params.id) {
        return { ...notification, isSeen: true };
      }
      return notification;
    });
    user.markModified("notifications");

    //get updated user info & send it back
    const updatedUser = await user.save();

    res.status(200).json({
      name: updatedUser.user_name,
      email: updatedUser.email,
      address: updatedUser.full_addresse,
      id: updatedUser.id,
      accountsCount: updatedUser.no_of_account,
      createdAt: updatedUser.createdAt,
      userStatus: updatedUser.user_status,
      nid: updatedUser.nid_no,
      phone: updatedUser.phone,
      accounts: updatedUser.accounts,
      verified_nid_no: updatedUser.verified_nid_no,
      verified_phone: updatedUser.verified_phone,
      notifications: updatedUser.notifications,
    });
  } catch (error) {
    if (error.message.match(/(notification)/gi))
      return res.status(400).send(error.message);
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Delete one User
//@route  >>>> DELETE /api/users/:id
//@Access >>>> private(for admins only)
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: deletedUser.id });
  } catch (error) {
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

//@desc   >>>> Update User's Status
//@route  >>>> put /api/users/:id/updatestatus
//@Access >>>> private(for admins only)
const updateUserStatus = async (req, res, next) => {
  //check if new status is actually the old status
  if (req.body.newStatus === req.body.oldStatus) {
    return res.status(400).send("Please Specify New Status For That User");
  }
  try {
    //get user
    const user = await User.findById(req.params.id);
    //update user with new Status
    if(req.body.newStatus>2){
      if(req.body.newStatus === 3)
        user.verified_phone = 1
      if(req.body.newStatus === 4)
        user.verified_nid_no = 1
      if(req.body.newStatus === 5){ //verified by branch
        try {
          const accountRequest = await AccountRequest.create({
            client_id: user.id,
            initial_balance: Math.floor(Math.random() * 6000) + 1000,
          });
          //go to notification with data
          req.created = { account_id: accountRequest.id };
          user.user_id = user.user_id.indexOf(req.admin.org_id) === -1 ? req.admin.org_id +"-"+ user.user_id : user.user_id;
          //get updated user info & send it back
          const updatedUser = await user.save();
          return res.status(200).json({
            _id: updatedUser.id,
            user_id: updatedUser.user_id,
            user_name: updatedUser.user_name,
            email: updatedUser.email,
            no_of_account: updatedUser.no_of_account,
            user_status: updatedUser.user_status,
            reqBank: updatedUser.reqBank,
            verified_phone: updatedUser.verified_phone,
            verified_nid_no: updatedUser.verified_nid_no,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).send("Ooops!! Something Went Wrong, Try again...");
        }
      } 
        
    }else{
      user.user_status = req.body.newStatus;
      user.markModified("user_status");
    }

    user.user_id = user.user_id.indexOf(req.admin.org_id) === -1 ? req.admin.org_id +"-"+ user.user_id : user.user_id;
    //get updated user info & send it back
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser.id,
      user_id: updatedUser.user_id,
      user_name: updatedUser.user_name,
      email: updatedUser.email,
      no_of_account: updatedUser.no_of_account,
      user_status: updatedUser.user_status,
      reqBank: updatedUser.reqBank,
      verified_phone: updatedUser.verified_phone,
      verified_nid_no: updatedUser.verified_nid_no,
    });
  } catch (error) {
    if (error.message.match(/(email|password|name|nid|phone|addresee)/gi))
      return res.status(400).send(error.message);
    res.status(500).send("Ooops!! Something Went Wrong, Try again...");
  }
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  userLogin,
  updateUser,
  deleteUser,
  updateUserStatus,
  notificationUpdate,
};
