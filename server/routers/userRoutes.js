const express = require("express");
const userController = require("../controllers/usersController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signup); // api/user/signup
router.route("/login").post(authController.login);

router
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);
router
	.route("/:id")
	.get(userController.getUserById)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
