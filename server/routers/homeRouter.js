const express = require("express");
const homeController = require("../controllers/homeController");

const router = express.Router();

router.route("/").get(homeController.getHome).post(homeController.creatHome);
router.route("/:id").delete(homeController.deleteHome);
module.exports = router;
