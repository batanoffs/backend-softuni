const { Router } = require("express");
const { body, validationResult } = require("express-validator");

const { parseError } = require("../utils");
const { isUser } = require("../middlewares/guards");
const { create, getById, update, deleteById } = require("../services/recipe");

const recipeRouter = Router();

recipeRouter.get("/create", isUser(), async (req, res) => {
    res.render("create");
});

recipeRouter.post("/create", isUser(),
    body("title").trim().isLength({ min: 2 }).withMessage("The Title should be at least 2 characters"),
    body("description").trim().isLength({ min: 10, max: 100 }).withMessage("The Description should be between 10 and 100 characters long"),
    body("ingredients").trim().isLength({ min: 10, max: 200 }).withMessage("The Ingredients should be between 10 and 200 characters long"),
    body("instructions").trim().isLength({ min: 10}).withMessage("The Instuctions should be at least 10 characters long"),
    body("imageUrl").trim().isURL({ require_tld: false }).withMessage("image must start with http:// or https://"),
    
    async (req, res) => {
        const authorId = req.user._id;
        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            await create(req.body, authorId);

            res.redirect("/catalog");
        } catch (error) {
            res.render("create", {
                data: req.body,
                errors: parseError(error).errors,
            });
        }
    }
);


recipeRouter.get("/catalog/edit/:id", isUser(), async (req, res) => {
    const recipe = await getById(req.params.id)

    if(!recipe) {
        res.render('404')
        return;
    }

    const isOwner = req.user?._id == recipe.owner.toString();

    if(!isOwner) {
        res.redirect('/login')
        return
    }
    res.render("edit", { recipe });
});

recipeRouter.post("/catalog/edit/:id", isUser(),
    body("title").trim().isLength({ min: 2 }).withMessage("The Title should be at least 2 characters"),
    body("description").trim().isLength({ min: 10, max: 100 }).withMessage("The Description should be between 10 and 100 characters long"),
    body("ingredients").trim().isLength({ min: 10, max: 200 }).withMessage("The Ingredients should be between 10 and 200 characters long"),
    body("instructions").trim().isLength({ min: 10}).withMessage("The Instuctions should be at least 10 characters long"),
    body("imageUrl").trim().isURL({ require_tld: false }).withMessage("image must start with http:// or https://"),
    async (req, res) => {
        const recipeId = req.params.id;
        const userId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await update(recipeId, req.body, userId);

            res.redirect("/catalog/" + recipeId);
        } catch (error) {
            res.render("edit", {
                data: req.body,
                errors: parseError(error).errors,
            });
        }
    }
);


recipeRouter.get("/catalog/delete/:id", isUser(), async (req, res) => {
    const recipe = await getById(req.params.id)
    const recipeId = req.params.id;
    const userId = req.user._id;
    const isOwner = userId == recipe.owner.toString();

    if(!isOwner) {
        res.redirect('/catalog')
        return
    }

    try {
        await deleteById(recipeId, userId);
        res.redirect("/catalog");
    } catch (error) {
        res.redirect ("/catalog/" + req.params.id );
    }
});

module.exports = {
    recipeRouter,
};
