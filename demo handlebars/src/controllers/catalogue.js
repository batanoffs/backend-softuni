const { getParts, getPartByID } = require("../services/parts");

module.exports = {
    catalogueController: (req, res) => {
        const parts = getParts();
        res.render("catalogue", { parts });
    },

    detailsController: (req, res) => {
        const partId = req.params.id;
        const part = getPartByID(partId);
        if (!part) {
            return res.status(404).send("Not Found");
        }
        res.render("details", part);
    },
};
