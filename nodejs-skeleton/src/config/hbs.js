const handlebars = require("express-handlebars");

function configHandlebars(app) {
    const hbs = handlebars.create({
        extname: ".hbs",
        defaultLayout: "main",
    });
    app.engine("hbs", hbs.engine);
    app.set("view engine", ".hbs");
}

module.exports = { configHandlebars };
