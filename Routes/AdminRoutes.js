const express = require("express");
const adminControllers = require("../Controller/AdminController");
const authMiddleware = require("../Middleware/AuthMiddleware");

const router = express.Router();

router.post("/register", adminControllers.registerAdmin);
router.post("/login", adminControllers.loginAdmin);

module.exports = router;
