const express = require("express");
const jewelryControllers = require("../Controller/JewelryController");
const authMiddleware = require("../Middleware/AuthMiddleware");

const router = express.Router();

/* ================= PREFLIGHT ================= */
router.options("/add", (_, res) => res.sendStatus(204));
router.options("/admin/all", (_, res) => res.sendStatus(204));
router.options("/update/:id", (_, res) => res.sendStatus(204));
router.options("/delete/:id", (_, res) => res.sendStatus(204));

/* ================= ADD (JSON ONLY) ================= */
router.post(
    "/add",
    authMiddleware,
    jewelryControllers.addJewelry
);

/* ================= GET ================= */
router.get("/all", jewelryControllers.getAllJewelry);
router.get("/admin/all", authMiddleware, jewelryControllers.getAllJewelryAdmin);
router.get("/:id", jewelryControllers.getJewelryById);

/* ================= UPDATE (JSON ONLY) ================= */
router.put(
    "/update/:id",
    authMiddleware,
    jewelryControllers.updateJewelry
);

/* ================= DELETE ================= */
router.delete(
    "/delete/:id",
    authMiddleware,
    jewelryControllers.deleteJewelry
);

module.exports = router;
