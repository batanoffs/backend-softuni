const { Router } = require("express");
const { searchRecipesByName } = require("../services/search");
const { parseError } = require("../utils");

const searchRouter = Router();

searchRouter.get("/search", (req, res) => {
    res.render("search");
});

searchRouter.post("/search", async (req, res) => {
    try {
        const searchTerm = req.params.search;
        const recipes = await searchRecipesByName(searchTerm);
        res.render("search", { searchTerm, recipes });
    } catch (error) {
        res.render("search", {
            data: req.body,
            errors: parseError(error).errors,
        });
    }
});

module.exports = {
    searchRouter,
};

