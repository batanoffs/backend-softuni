//TODO import routers

const { dataRouter } = require("../controllers/data");
const { homeRouter } = require("../controllers/home");
const { userRouter } = require("../controllers/user");

function configRoutes(app) {
    //TODO register route

    app.use(homeRouter);
    app.use(userRouter);
    app.use(dataRouter);
}

module.exports = { configRoutes };
