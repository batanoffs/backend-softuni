const { Recipe } = require("../models/Recipe");

async function searchRecipesByName(search) {
    const recipes = await Recipe.find({ title: new RegExp(search, "i") })
        .select("title")
        .lean();
    return recipes.length ? recipes : null;
}

module.exports = {
    searchRecipesByName,
};
