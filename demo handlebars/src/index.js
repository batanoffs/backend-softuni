const express = require("express");
const handlebars = require("express-handlebars");
const { homeControler } = require("./controllers/home");
const {
    catalogueController,
    detailsController,
} = require("./controllers/catalogue");

const app = express();
const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "main",
});

app.set("view engine", ".hbs");
app.engine(".hbs", hbs.engine);

app.get("/", homeControler);
app.get("/catalogue", catalogueController);
app.get("/catalogue/:id", detailsController);

app.listen(3000);
