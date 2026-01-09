const Admin = require("../Models/AdminModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const cloudinary = require("../config/cloudinary");

/* ================= REGISTER ADMIN (One Time) ================= */
exports.registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const adminData = await Admin.create({
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Admin created successfully", adminData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ================= LOGIN ADMIN ================= */
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(admin._id);

        res.json({
            message: "Login successful",
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};