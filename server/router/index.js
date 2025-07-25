const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth-controller");
const verifyToken = require("../middlewares/verifyToken");
const { body } = require("express-validator");
const MessageController = require("../controllers/message-controller");
const MemberController = require("../controllers/member-controller");
const GroupController = require("../controllers/group-controller");
const UserController = require("../controllers/user-controller");

const auth = new AuthController();
const message = new MessageController();
const member = new MemberController();
const group = new GroupController();
const user = new UserController();

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

router.post("/send-group-message", verifyToken, (req, res, next) =>
    message.sendGroupMessage(req, res, next)
);

router.post("/send-direct-message", verifyToken, (req, res, next) =>
    message.sendDirectMessage(req, res, next)
);

router.get(
    "/messages/:userId/:type/:recipientId",
    verifyToken,
    (req, res, next) => message.getMessages(req, res, next)
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

router.delete("/kick-member/:memberId", verifyToken, (req, res, next) =>
    member.kickMember(req, res, next)
);

router.post("/ban-member", verifyToken, (req, res, next) =>
    member.banMember(req, res, next)
);

router.post("/rename-group/:id", verifyToken, (req, res, next) =>
    group.renameGroup(req, res, next)
);

router.get("/banned-members/:groupId", verifyToken, (req, res, next) =>
    member.getBannedMembers(req, res, next)
);

router.post("/unban-member/:id", verifyToken, (req, res, next) =>
    member.unbanMember(req, res, next)
);

router.get("/get-messaged-users/:userId", verifyToken, (req, res, next) =>
    user.getMessagedUsers(req, res, next)
);

router.post("/add-messaged-user/:targetId", verifyToken, (req, res, next) =>
    user.addMessagedUser(req, res, next)
);

module.exports = router;
