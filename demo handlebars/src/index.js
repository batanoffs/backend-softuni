const express = require("express");
const handlebars = require("express-handlebars");

const { homeControler } = require("./controllers/home");
const { catalogueController, detailsController } = require("./controllers/catalogue");
const { createController, editController } = require("./controllers/partsUpdate");

const app = express();
const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "main",
});

app.set("view engine", ".hbs");
app.engine(".hbs", hbs.engine);
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.get("/", homeControler);
app.get("/catalogue", catalogueController);
app.get("/catalogue/:id", detailsController);
app.get("/create", createController.get);
app.post("/create", createController.post);
app.get('/edit/:id', editController.get);
app.post('/edit/:id', editController.post);

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(3000);
