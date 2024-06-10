const { createPart, getPartByID, updatePart } = require("../services/parts");

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
            const result = createPart(req.body);
            res.redirect("/catalogue/" + result.id);
        },
    },
    editController: {
        get: (req, res) => {
            const { id } = req.params;
            const partData = getPartByID(Number(id));
            if (!partData) {
                res.redirect("/404");
            }
            res.render("edit", partData);
        },
        post: (req, res) => {
            const { price, name, description, stock } = req.body;

            if (!price || !name || !description || !stock) {
                res.render("edit", {
                    name,
                    description,
                    price,
                    stock,
                    error: {
                        name: !name,
                        description: !description,
                        price: !price,
                        stock: !stock,
                    },
                });
                return;
            }

            const result = updatePart(Number(req.params.id), req.body);
            res.redirect("/catalogue/" + result.id);
        },
    },
};
