const express = require("express");

const userController = require("../controllers/usersController");
const authController = require("../controllers/authController");
const parser = require("../middleware/cloudinary");

const router = express.Router();

router.post("/signup", parser.single("image"), authController.signup);

router.route("/login").post(authController.login);

router.route("/").get(userController.getAllUsers).post(userController.createUser);
router
	.route("/:id")
	.get(userController.getUserById)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
