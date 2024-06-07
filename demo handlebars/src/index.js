const express = require("express");
const handlebars = require("express-handlebars");
const { homeControler } = require("./controllers/home");
const {
    catalogueController,
    detailsController,
} = require("./controllers/catalogue");
const { createController } = require("./controllers/create");

const app = express();
const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "main",
});

app.set("view engine", ".hbs");
app.engine(".hbs", hbs.engine);
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.get("/", homeControler);
app.get("/catalogue", catalogueController);
app.get("/catalogue/:id", detailsController);
app.get("/create", createController.get);
app.post("/create", createController.post);

app.listen(3000);
