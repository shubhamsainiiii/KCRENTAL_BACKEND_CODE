const jwt = require("jsonwebtoken");
const Admin = require("../Models/AdminModel");

const authMiddleware = async (req, res, next) => {

    // ✅ ALLOW PREFLIGHT FOR ALL ROUTES
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.id).select("-password");
        if (!admin) {
            return res.status(401).json({ message: "Admin not found" });
        }

        req.admin = admin;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
