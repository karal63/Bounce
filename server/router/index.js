const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth-controller");
const verifyToken = require("../middlewares/verifyToken");
const { body } = require("express-validator");
const MessageController = require("../controllers/message-controller");
const MemberController = require("../controllers/member-controller");
const GroupController = require("../controllers/group-controller");

const auth = new AuthController();
const message = new MessageController();
const member = new MemberController();
const group = new GroupController();

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

router.get("/refresh", (req, res, next) => auth.refresh(req, res, next));

router.get("/activate/:link", (req, res, next) =>
    auth.activate(req, res, next)
);

router.post("/send-message", verifyToken, (req, res, next) =>
    message.sendMessage(req, res, next)
);

router.get("/messages/:groupId", verifyToken, (req, res, next) =>
    message.getMessages(req, res, next)
);

router.post("/members/:groupId", verifyToken, (req, res, next) =>
    member.getMembers(req, res, next)
);

router.get("/groups/:userId", verifyToken, (req, res, next) =>
    group.getGroups(req, res, next)
);

router.post(
    "/create-group",
    body("name").isLength({ min: 3, max: 25 }),
    verifyToken,
    (req, res, next) => group.createGroup(req, res, next)
);

router.post("/join-group/:link", verifyToken, (req, res, next) =>
    group.joinGroup(req, res, next)
);

router.delete("/delete-group/:groupId", verifyToken, (req, res, next) =>
    group.deleteGroup(req, res, next)
);

router.delete("/delete-message/:messageId", verifyToken, (req, res, next) =>
    message.deleteMessage(req, res, next)
);

router.delete("/leave-group/:groupId", verifyToken, (req, res, next) =>
    group.leaveGroup(req, res, next)
);

module.exports = router;
