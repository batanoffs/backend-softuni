module.exports = {
    homeControler: (req, res) => {
        res.render("home", {
            user: "Pesho",
        });
    },
};
