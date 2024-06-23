const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { isGuest } = require("../middlewares/guards");
const { login, register } = require("../services/user");
const { createToken } = require("../services/jwt");
const { parseError } = require("../utils");

// TODO replace with real router according to description

const userRouter = Router();

userRouter.get("/register", isGuest(), (req, res) => {
    res.render("register");
});

userRouter.post(
    "/register",
    isGuest(),
    body("email")
        .trim()
        .isEmail()
        .isLength({ min: 10 })
        .withMessage("email must be at least 10 char long"),
    body("password")
        .trim()
        .isLength({ min: 4 })
        .withMessage("password must be at least 4 char long"),
    body("repass")
        .trim()
        .custom((value, { req }) => value == req.body.password)
        .withMessage("passowrds dont match"),
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await register(email, password);
            const token = createToken(result);

            res.cookie("token", token);

            res.redirect("/");
        } catch (error) {
            res.render("register", {
                data: { email },
                errors: parseError(error).errors,
            });
        }
    }
);

userRouter.get("/login", isGuest(), (req, res) => {
    res.render("login");
});

userRouter.post( "/login", isGuest(),
    body("email").trim(),
    body("password").trim(),

    async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = await login(email, password);
            const token = createToken(result);

            res.cookie("token", token);

            res.redirect("/");
        } catch (error) {
            res.render("login", {
                data: { email },
                errors: parseError(error).errors,
            });
        }
    }
);

userRouter.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.render("login");
});

module.exports = {
    userRouter,
};
