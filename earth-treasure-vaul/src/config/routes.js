//TODO import routers

const { homeRouter } = require("../controllers/home");
const { stoneRouter } = require("../controllers/stone");
const { userRouter } = require("../controllers/user");

function configRoutes(app) {
    //TODO register route

    app.use(homeRouter);
    app.use(userRouter);
    app.use(stoneRouter);
}

module.exports = { configRoutes };
