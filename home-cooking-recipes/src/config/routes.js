const { recipeRouter } = require("../controllers/recipe");
const { homeRouter } = require("../controllers/home");
const { userRouter } = require("../controllers/user");
const { searchRouter } = require("../controllers/search");

function configRoutes(app) {
    app.use(homeRouter);
    app.use(userRouter);
    app.use(recipeRouter);
    app.use(searchRouter);
}

module.exports = { configRoutes };
