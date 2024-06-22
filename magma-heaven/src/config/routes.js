//TODO import routers

const { homeRouter } = require("../controllers/home");

function configRoutes(app) {
    //TODO register route

    app.use(homeRouter);
}

module.exports = { configRoutes };
