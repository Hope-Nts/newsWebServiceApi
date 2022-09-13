const express = require("express");
const newsController = require("../controllers/newsController");

const router = express.Router();

router.route("/").get(newsController.checkBody, newsController.getEverything);

module.exports = router;
