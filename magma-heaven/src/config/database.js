const mongoose = require("mongoose");
require('../models/User')
require('../models/Data') //TODO import specific model and change name
//TODO import models

async function configDatabase() {
    // TODO set database name
    const connectionString = "mongodb://localhost:27017/exam-db";

    await mongoose.connect(connectionString);

    console.log("Databse connected");
}

module.exports = { configDatabase };
