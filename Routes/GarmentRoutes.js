const express = require("express");
const garmentControllers = require("../Controller/GarmentsController");
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
  garmentControllers.addGarment
);

/* ================= GET ================= */
router.get("/all", garmentControllers.getAllGarments);
router.get("/admin/all", authMiddleware, garmentControllers.getAllGarmentsAdmin);
router.get("/:id", garmentControllers.getGarmentById);

/* ================= UPDATE (JSON ONLY) ================= */
router.put(
  "/update/:id",
  authMiddleware,
  garmentControllers.updateGarment
);

/* ================= DELETE ================= */
router.delete(
  "/delete/:id",
  authMiddleware,
  garmentControllers.deleteGarment
);

module.exports = router;
