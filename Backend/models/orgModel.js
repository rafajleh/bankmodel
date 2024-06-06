const mongoose = require("mongoose");
const { autoIncrement } = require("mongoose-plugin-autoinc");

//Define User Schema
const organizationSchema = new mongoose.Schema(
  {
    org_name: {
      type: String,
      required: [true, "Please Type A Organization Name!"],
    },
    organization_status: {
      type: Number,
      default: 1, //active , 1 >> unactive, 2 >>suspended
    },
  },
  {
    timestamps: true,
    collection: "Organizations",
  }
);

//handle duplicate 'Key' error when 'SAVING' a Organization
organizationSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    let dupKeys = Object.keys(error.keyPattern);
    next(new Error(`This ${dupKeys} is Already Used By Another Organization!`));
  } else {
    next();
  }
});

//handle duplicate 'Key' error when 'UPDATING' a Organization
organizationSchema.post("updateOne", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    let dupKeys = Object.keys(error.keyPattern);
    next(new Error(`This ${dupKeys} is Already Used By Another Organization!`));
  } else {
    next();
  }
});

//Auto Increament organizations ID Plugin
organizationSchema.plugin(autoIncrement, {
  model: "Organization",
  startAt: 2525500300,
  incrementBy: 1,
});

//Define organization Model
const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
