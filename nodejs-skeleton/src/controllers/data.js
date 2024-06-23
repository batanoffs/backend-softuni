const { Router } = require("express");
const { body, validationResult } = require("express-validator");

const { parseError } = require("../utils");
const { isUser } = require("../middlewares/guards");
const { create, getById, update } = require("../services/stone");

// TODO replace with real router according to description
const dataRouter = Router();

// dataRouter.get("/create", isUser(), async (req, res) => {
//     res.render("create");
// });

// dataRouter.post("/create", isUser(),
//     body("name").trim().isLength({ min: 2 }).withMessage("name must be at least 2 char"),
//     body("category").trim().isLength({ min: 3 }).withMessage("category must be at least 3 char"),
//     body("color").trim().isLength({ min: 2 }).withMessage("color must be at least 2 char"),
//     body("image").trim().isURL({ require_tld: false }).withMessage("image must start with http:// or https://"),
//     body("location").trim().isLength({ min: 5, max: 15 }).withMessage("location must be between 5 and 15 char"),
//     body("formula").trim().isLength({ min: 3, max: 30 }).withMessage("formula must bebetween 3 and 30 char"),
//     body("description").trim().isLength({ min: 10 }).withMessage("description must be minimum 10 char long"),
//     async (req, res) => {
//         const { email, password } = req.body;

//         try {
//             const validation = validationResult(req);

//             if (validation.errors.length) {
//                 throw validation.errors;
//             }

//             const result = await create(req.body, req.user._id);

//             res.redirect("/");
//         } catch (error) {
//             res.render("create", {
//                 data: req.body,
//                 errors: parseError(error).errors,
//             });
//         }
//     }
// );

// dataRouter.get("/edit/:id", isUser(), async (req, res) => {
//     const stone = await getById(req.params.id)

//     if(!stone) {
//         res.render('404')
//         return;
//     }

//     const isOwner = req.user?._id == stone.author.toString();


//     if(!isOwner) {
//         res.redirect('/login')
//         return
//     }
//     res.render("edit",{data:stone});
// });

// dataRouter.post("/edit:id", isUser(),
//     body("name").trim().isLength({ min: 2 }).withMessage("name must be at least 2 char"),
//     body("category").trim().isLength({ min: 3 }).withMessage("category must be at least 3 char"),
//     body("color").trim().isLength({ min: 2 }).withMessage("color must be at least 2 char"),
//     body("image").trim().isURL({ require_tld: false }).withMessage("image must start with http:// or https://"),
//     body("location").trim().isLength({ min: 5, max: 15 }).withMessage("location must be between 5 and 15 char"),
//     body("formula").trim().isLength({ min: 3, max: 30 }).withMessage("formula must bebetween 3 and 30 char"),
//     body("description").trim().isLength({ min: 10 }).withMessage("description must be minimum 10 char long"),
//     async (req, res) => {
//         const stoneId = req.params.id;
//         const userId = req.user._id;

//         try {
//             const validation = validationResult(req);

//             if (validation.errors.length) {
//                 throw validation.errors;
//             }

//             const result = await update(stoneId, req.body, req.user._id);

//             res.redirect("/catalog" + stoneId);
//         } catch (error) {
//             res.render("edit", {
//                 data: req.body,
//                 errors: parseError(error).errors,
//             });
//         }
//     }
// );

module.exports = {
    dataRouter,
};
