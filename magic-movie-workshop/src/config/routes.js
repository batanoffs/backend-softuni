const { Router } = require("express");
const { home, details, search } = require("../controllers/catalog");
const { about } = require("../controllers/about");
const { create: createMovie } = require("../controllers/movie");
const { create: createCast } = require("../controllers/cast");
const { notFound } = require("../controllers/404");
const { attach } = require("../controllers/attach");

const router = Router();

//TODO add routes
router.get("/", home);
router.get("/about", about);
router.get("/details/:id", details);
router.get("/create/movie", createMovie.get);
router.post("/create/movie", createMovie.post);
router.get("/create/cast", createCast.get);
router.post("/create/cast", createCast.post);
router.get("/attach/:id", attach.get);
router.post("/attach/:id", attach.post);
router.get("search", search);

router.get("*", notFound); //it has to be at the bottom to catch every other route

module.exports = { router };
