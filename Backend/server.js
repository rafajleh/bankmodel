require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

//connect to mongodb
const { connectToMongoose } = require("./config/db");

//middlewares
//express json parser middleware
app.use(express.json());

//cors middleware
const corsOptions = {
  origin: true,
  // "preflightContinue": true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));
// const { corsProOptions } = require("./config/corsConfig");
// app.use(cors(corsProOptions));

// Apply the rate limiting middleware to API calls only
const {
  apiLimiter,
} = require("./middlewares/rateLimitMiddleware/rateLimitMiddleware");
app.use("/api", apiLimiter);

//setup Router
const setupRoute = require("./routes/setupRoutes");
app.use("/api/setup", setupRoute);

//qrcode Router
const qrcodeRoute = require("./routes/qrcodeRoutes");
app.use("/api/qrcode", qrcodeRoute);

//users Router
const usersRoute = require("./routes/usersRoutes");
app.use("/api/users", usersRoute);

//admins Router
const adminsRoute = require("./routes/adminRoutes");
app.use("/api/admins", adminsRoute);

//account Router
const accountRoute = require("./routes/accountRoutes");
app.use("/api/account", accountRoute);

//account requests Router
const accountRequestRoute = require("./routes/accountRequestRoutes");
app.use("/api/request", accountRequestRoute);

//serve Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "Frontend", "dist", "index.html")
    )
  );
}

connectToMongoose()
  .then(() => {
    app.listen(process.env.PORT || 5555, process.env.IP || 'localhost', () => {
      console.log(`server is running at ${process.env.IP}:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
