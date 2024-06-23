//TODO import routers

const { homeRouter } = require("../controllers/home");
const { userRouter } = require("../controllers/user");

function configRoutes(app) {
    //TODO register route

    app.use(homeRouter);
    app.use(userRouter);
}

module.exports = { configRoutes };
