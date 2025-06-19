const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth-controller");
const verifyToken = require("../middlewares/verifyToken");
const { body } = require("express-validator");

const auth = new AuthController();

router.post(
    "/signup",
    body("email").isEmail(),
    body("password").isLength({ min: 4, max: 32 }),
    body("name").isLength({ min: 3, max: 25 }),
    (req, res, next) => auth.signup(req, res, next)
);

router.post(
    "/login",
    body("email").isEmail(),
    body("password").isLength({ min: 4, max: 32 }),
    (req, res, next) => auth.login(req, res, next)
);

router.get("/logout", verifyToken, (req, res, next) =>
    auth.logout(req, res, next)
);
router.get("/refresh", verifyToken, (req, res, next) =>
    auth.refresh(req, res, next)
);
router.get("/activate/:link", (req, res, next) =>
    auth.activate(req, res, next)
);

router.get("/users", verifyToken, (req, res) => {
    res.status(200).json([
        { id: 1, name: "Leo" },
        { id: 2, name: "Steve" },
    ]);
});

module.exports = router;
