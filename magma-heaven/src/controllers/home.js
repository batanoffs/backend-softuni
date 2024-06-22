const { Router } = require("express");
const { login } = require("../services/user");
const { createToken } = require("../services/jwt");

// TODO replace with real router according to description
const homeRouter = Router();

homeRouter.get("/", async (req, res) => {
    console.log(req.user);

    // created token and saves it in cookies
    // const result = await login("Dani", "123456");
    // const token = createToken(result);
    // res.cookie("token", token);

    res.render("home");
});
module.exports = {
    homeRouter,
};
