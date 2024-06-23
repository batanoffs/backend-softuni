const express = require("express");

const { configDatabase } = require("./config/database");
const { configExpress } = require("./config/express");
const { configHandlebars } = require("./config/hbs");
const { configRoutes } = require("./config/routes");

// const { register, login } = require("./services/user");
// const { createToken, verifyToken } = require("./services/jwt");

start();

async function start() {
    const app = express();

    await configDatabase();
    configHandlebars(app);
    configExpress(app);
    configRoutes(app);

    app.listen(3000, () => {
        console.log("Server started on http://localhost:3000");
        // test();
    });
}

// async function test() {
//     try {
//         // const result = await register("daniel@gmail.com", "Dani", "123456");
//         const result = await login("daniel@gmail.com", "123456");

//         // console.log(result);

//         const token = createToken(result);
//         console.log(token);
//     } catch (error) {
//         console.error("Caught Error: " + error.message);
//     }
// }
