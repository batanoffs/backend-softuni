const express = require("express");
const { homeControler } = require("./controllers/home");
const { configDatabase } = require("./config/database");
const { configExpress } = require("./config/express");
const { configHandlebars } = require("./config/hbs");
const { configRoutes } = require("./config/routes");
const { register, login } = require("./services/user");

start();

async function start() {
    const app = express();

    await configDatabase();
    configHandlebars(app);
    configExpress(app);
    configRoutes(app);

    app.listen(3000, () => {
        console.log("Server started on http://localhost:3000");
        test();
    });
}

async function test() {
    try {
        const result = await login("george", "123456");
        console.log(result);
    } catch (error) {
        console.error('Caught Error: ' + error.message);
    }
}

// app.get("/", homeControler);
