const express = require("express");
const handlebars = require("express-handlebars");

const app = express();
const hbs = handlebars.create({
    extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.setHeader('Set-Cookie', 'my-cookie=hello')
    res.render("home");
});

app.listen(3000);
