const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth-controller");

const auth = new AuthController();

router.post("/signup", (req, res, next) => auth.signup(req, res, next));
router.post("/login", (req, res, next) => auth.login(req, res, next));
router.get("/logout", (req, res, next) => auth.logout(req, res, next));
router.get("/refresh", (req, res, next) => auth.refresh(req, res, next));
router.get("/activate", (req, res, next) => auth.activate(req, res, next));

module.exports = router;
