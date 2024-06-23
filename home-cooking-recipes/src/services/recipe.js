const { Recipe } = require("../models/Recipe");

async function getAll() {
    return Recipe.find().lean();
}

async function getById(id) {
    return Recipe.findById(id).lean();
}

async function create(data, authorId) {
    const recipe = new Recipe({
        title: data.title,
        description: data.description,
        ingredients: data.ingredients,
        instructions: data.instructions,
        image: data.imageUrl,
        owner: authorId,
    });

    await recipe.save();
    return recipe;
}

async function update(id, data, userId) {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
        throw new ReferenceError(`Reacord not found ${id}`);
    }

    if (recipe.owner.toString() != userId) {
        throw new Error("Access denied");
    }

    (recipe.title = data.title),
        (recipe.description = data.description),
        (recipe.ingredients = data.ingredients),
        (recipe.instructions = data.instructions),
        (recipe.image = data.imageUrl);

    await recipe.save();
    return recipe;
}

async function deleteById(id, userId) {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
        throw new ReferenceError(`Reacord not found ${id}`);
    }

    if (recipe.owner.toString() != userId) {
        throw new Error("Access denied");
    }

    await Recipe.findByIdAndDelete(id);
}

async function recommend(id, userId) {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
        throw new ReferenceError(`Reacord not found ${id}`);
    }

    if (recipe.recommendList.includes(userId)) {
        throw new Error("You have already recommended this recipe");
    }

    recipe.recommendList.push(userId);
    await recipe.save();
    return recipe;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    recommend,
};
