const express = require("express");
const { message } = require("../controller/message");

const router = express.Router();

router.get("/message", message);

module.exports = router;