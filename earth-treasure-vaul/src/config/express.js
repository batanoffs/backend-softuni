const express = require("express");
const cookieParser = require("cookie-parser");

function configExpress(app) {
    app.use(cookieParser);
    //TODO add session middleware

    app.use("/static", express.static("static"));
    app.use(express.urlencoded({ extended: true }));
}

module.exports = { configExpress };
