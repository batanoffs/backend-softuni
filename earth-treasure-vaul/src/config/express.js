const express = require("express");
const cookieParser = require("cookie-parser");
const { secret } = require("../constants/identity");
const { session } = require("../middlewares/session");

function configExpress(app) {
    app.use(cookieParser({ secret })); //remove curly brackets CHECK
    app.use(session())
    //TODO add session middleware

    app.use("/static", express.static("static"));
    app.use(express.urlencoded({ extended: true }));
}

module.exports = { configExpress };
