const { Router } = require("express");
const { home, details, search } = require("../controllers/catalog");
const { about } = require("../controllers/about");
const { create } = require("../controllers/movie");
const { notFound } = require("../controllers/404");

const router = Router();

//TODO add routes
router.get("/", home);
router.get("/details/:id", details);
router.get("/about", about);
router.get("/create", create.get);
router.post('/create', create.post);
router.get('search', search);


router.get("*", notFound); //it has to be at the bottom to catch every other route

module.exports = { router };
