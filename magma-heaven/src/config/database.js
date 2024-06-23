const mongoose = require("mongoose");
require('../models/User')
require('../models/Volcano') 
//TODO import models

async function configDatabase() {
    const connectionString = "mongodb://localhost:27017/magma-heaven";

    await mongoose.connect(connectionString);

    console.log("Databse connected");
}

module.exports = { configDatabase };
