const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { getAll, getById, recommend } = require("../services/recipe");

const homeRouter = Router();

homeRouter.get("/", async (req, res) => {
    const all = await getAll();
    const featured = all.slice(0, 3);
    res.render("home", { featured });
});

homeRouter.get("/catalog", async (req, res) => {
    const recepies = await getAll();
    res.render("catalog", { recepies });
});

homeRouter.get("/catalog/:id", async (req, res) => {
    const recipe = await getById(req.params.id);

    if (!recipe) {
        res.render("404");
        return;
    }

    const isOwner = req.user?._id == recipe.owner.toString();
    const hasRecommended = Boolean(recipe.recommendList.find((l) => req.user?._id == l.toString()));
    res.render("details", { recipe, isOwner, hasRecommended });
});

homeRouter.get("/catalog/recommend/:id", isUser(), async (req, res) => {
    const recipeId = req.params.id;

    const result = await recommend(recipeId, req.user._id);

    res.redirect("/catalog/" + recipeId);
});

module.exports = {
    homeRouter,
};
