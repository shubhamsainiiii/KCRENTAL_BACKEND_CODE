const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");
const adminRoutes = require("./Routes/AdminRoutes");
const garmentRoutes = require("./Routes/GarmentRoutes");
const jewelryRoutes = require("./Routes/JewelryRoutes");

/* ================= APP INIT ================= */
const app = express();

/* ================= DATABASE ================= */
connectDB();

/* ================= MIDDLEWARE ================= */

// ✅ CORS – Vercel safe
app.use(
    cors({
        origin: true, // allow all origins (safe because auth token based hai)
        credentials: true,
    })
);

// ✅ IMPORTANT: JSON limit increase (Cloudinary URLs ke liye)
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

/* ================= ROUTES ================= */
app.use("/admin", adminRoutes);
app.use("/garment", garmentRoutes);
app.use("/jewelry", jewelryRoutes);

/* ================= EXPORT (VERCEL NEEDS THIS) ================= */
module.exports = app;

/* ================= LOCAL DEV ONLY ================= */
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
