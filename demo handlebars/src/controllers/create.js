const { createPart } = require("../services/parts");

module.exports = {
    createController: {
        get: (req, res) => {
            res.render("create");
        },
        post: (req, res) => {
            const { price, name, description } = req.body;

            if (!price || !name || !description) {
                res.render("create", {
                    name,
                    description,
                    price,
                    error: {
                        name: !name,
                        description: !description,
                        price: !price,
                    },
                });
                return;
            }
            createPart(req.body);
            res.redirect("catalogue");
        },
    },
};
