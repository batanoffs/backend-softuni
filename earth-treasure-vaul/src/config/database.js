const mongoose = require("mongoose");
require("../models/User");
require("../models/Stone");

async function configDatabase() {
    const connectionString = "mongodb://localhost:27017/earth-tresure";

    await mongoose.connect(connectionString);

    console.log("Databse connected");
}

module.exports = { configDatabase };
