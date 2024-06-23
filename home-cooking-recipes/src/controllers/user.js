const { Router } = require("express");

const { login, register } = require("../services/user");
const { createToken } = require("../services/jwt");

const { isGuest } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const { parseError } = require("../utils.js");

const userRouter = Router();

userRouter.get("/register", isGuest(), async (req, res) => {
    res.render("register");
});

userRouter.post( "/register", isGuest(),
    body("username").trim().isLength({ min: 2, max: 20 }).withMessage("The name should be between 2 and 20 characters long"),
    body("email").trim().isEmail().isLength({ min: 10 }).withMessage("The email should be at least 10 characters long"),
    body("password").trim().isLength({ min: 4 }).withMessage("The password should be at least 4 characters long"),
    body("repass").trim().custom((value, { req }) => value == req.body.password).withMessage("passwords don't match"),
    async (req, res) => {
        const { email, password, username } = req.body;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await register(username, email, password );
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

userRouter.get("/login", isGuest(), async (req, res) => {
    res.render("login");
});

userRouter.post("/login", isGuest(),
    body("email").trim(),
    body("password").trim(),
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

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
    res.redirect("/"); 
});

module.exports = {
    userRouter,
};
