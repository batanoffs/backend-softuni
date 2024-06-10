const { Router } = require("express");
const { home, details } = require("../controllers/catalog");

const router = Router();

//TODO add routes
router.get("/", home);
router.get("details/:id", details);
module.exports = { router };
