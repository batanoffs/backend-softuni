const catalogueData = require("../../data/catalogue.json");

module.exports = {
    catalogueController: (req, res) => {
        if (!catalogueData) {
            return res.status(500).send("Internal Server Error");
        }
        res.render("catalogue", {
            parts: catalogueData,
        });
    },

    detailsController: (req, res) => {
        const partId = req.params.id;
        const part = catalogueData.find((part) => part.id === Number(partId));
        if (!part) {
            return res.status(404).send("Not Found");
        }
        res.render("details", part);
    },
};