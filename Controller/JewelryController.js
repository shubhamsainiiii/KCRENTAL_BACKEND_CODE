const Jewelry = require("../Models/JewelryModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

// exports.addJewelry = async (req, res) => {
//     try {
//         console.log("Add Jewelry Request Body:", req.body);
//         console.log("Add Jewelry Files:", req.files);

//         const { name, price, category, description } = req.body;

//         // Validation
//         if (!name || !price || !category || !description) {
//             return res.status(400).json({ message: "All fields are required (name, price, category, description)" });
//         }

//         // Validate Category
//         const allowedCategories = [
//             "ALL JEWELRY", "NECKLACE SETS", "EARRINGS", "BANGLES", "RINGS", "HAIR ACCESSORIES"
//         ];
//         if (!allowedCategories.includes(category)) {
//             return res.status(400).json({ message: "Invalid category selected" });
//         }

//         let images = [];
//         let video = null;

//         // ✅ If client already uploaded to Cloudinary and sent JSON
//         if (req.body.images && Array.isArray(req.body.images)) {
//             images = req.body.images.map((img) => ({
//                 public_id: img.public_id,
//                 url: img.url,
//             })).filter((x) => x.public_id && x.url);
//         }

//         if (req.files && req.files.images) {
//             console.log(`Processing ${req.files.images.length} images...`);
//             for (let file of req.files.images) {
//                 try {
//                     let result;
//                     // Skip Cloudinary in development
//                     if (process.env.NODE_ENV === "production") {
//                         result = await cloudinary.uploader.upload(file.path, {
//                             folder: "jewelry/images",
//                             resource_type: "image",
//                         });
//                         // Delete local file after upload
//                         if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

//                         images.push({
//                             public_id: result.public_id,
//                             url: result.secure_url,
//                         });
//                     } else {
//                         // Local Development
//                         const filename = path.basename(file.path);
//                         const url = `/uploads/${filename}`;
//                         images.push({ public_id: filename, url });
//                     }
//                 } catch (uploadError) {
//                     console.error("Image Upload Failed, falling back to local:", uploadError);
//                     try {
//                         const filename = path.basename(file.path);
//                         const url = `/uploads/${filename}`;
//                         images.push({ public_id: filename, url });
//                     } catch (fallbackErr) {
//                         console.error("Local fallback also failed:", fallbackErr);
//                         return res.status(500).json({ message: "Image upload failed", error: uploadError.message });
//                     }
//                 }
//             }
//         }

//         if (req.files && req.files.video) {
//             console.log("Processing video...");
//             try {
//                 let result;
//                 // Skip Cloudinary in development
//                 if (process.env.NODE_ENV === "production") {
//                     result = await cloudinary.uploader.upload(req.files.video[0].path, {
//                         folder: "jewelry/videos",
//                         resource_type: "video",
//                     });
//                     // Delete local file after upload
//                     if (fs.existsSync(req.files.video[0].path)) fs.unlinkSync(req.files.video[0].path);

//                     video = {
//                         public_id: result.public_id,
//                         url: result.secure_url,
//                     };
//                 } else {
//                     // Local Development
//                     const file = req.files.video[0];
//                     const filename = path.basename(file.path);
//                     const url = `/uploads/${filename}`;
//                     video = { public_id: filename, url };
//                 }
//             } catch (videoError) {
//                 console.error("Video Upload Failed:", videoError);
//                 return res.status(500).json({ message: "Video upload failed", error: videoError.message });
//             }
//         }

//         const jewelry = await Jewelry.create({
//             name,
//             price: Number(price),
//             category,
//             description,
//             images,
//             video: video || undefined,
//         });

//         res.status(201).json({
//             message: "Jewelry added successfully",
//             jewelry,
//         });
//     } catch (error) {
//         console.error("ADD JEWELRY ERROR:", error);
//         res.status(500).send({ message: error.message, stack: error.stack });
//     }
// };


// exports.addJewelry = async (req, res) => {
//     try {
//         console.log("Add Jewelry Request Body:", req.body);
//         console.log("Add Jewelry Files:", req.files);

//         const { name, category, description } = req.body;

//         const buyPrice =
//             req.body?.price?.buy || req.body["price[buy]"];
//         const rentPerDay =
//             req.body?.price?.rentPerDay || req.body["price[rentPerDay]"];

//         // ✅ Validation
//         if (!name || !buyPrice || !rentPerDay || !category || !description) {
//             return res.status(400).json({
//                 message:
//                     "All fields are required (name, buy price, rent price per day, category, description)",
//             });
//         }

//         // ✅ Validate Category
//         const allowedCategories = [
//             "ALL JEWELRY",
//             "NECKLACE SETS",
//             "EARRINGS",
//             "BANGLES",
//             "RINGS",
//             "HAIR ACCESSORIES",
//         ];

//         if (!allowedCategories.includes(category)) {
//             return res.status(400).json({ message: "Invalid category selected" });
//         }

//         let images = [];
//         let video = null;

//         /* ================= JSON IMAGES ================= */
//         if (req.body.images && Array.isArray(req.body.images)) {
//             images = req.body.images
//                 .map((img) => ({
//                     public_id: img.public_id,
//                     url: img.url,
//                 }))
//                 .filter((x) => x.public_id && x.url);
//         }

//         /* ================= FILE IMAGES ================= */
//         if (req.files?.images?.length) {
//             for (let file of req.files.images) {
//                 if (process.env.NODE_ENV === "production") {
//                     const result = await cloudinary.uploader.upload(file.path, {
//                         folder: "jewelry/images",
//                         resource_type: "image",
//                     });

//                     fs.existsSync(file.path) && fs.unlinkSync(file.path);

//                     images.push({
//                         public_id: result.public_id,
//                         url: result.secure_url,
//                     });
//                 } else {
//                     const filename = path.basename(file.path);
//                     images.push({
//                         public_id: filename,
//                         url: `/uploads/${filename}`,
//                     });
//                 }
//             }
//         }

//         /* ================= FILE VIDEO ================= */
//         if (req.files?.video?.length) {
//             const file = req.files.video[0];

//             if (process.env.NODE_ENV === "production") {
//                 const result = await cloudinary.uploader.upload(file.path, {
//                     folder: "jewelry/videos",
//                     resource_type: "video",
//                 });

//                 fs.existsSync(file.path) && fs.unlinkSync(file.path);

//                 video = {
//                     public_id: result.public_id,
//                     url: result.secure_url,
//                 };
//             } else {
//                 const filename = path.basename(file.path);
//                 video = {
//                     public_id: filename,
//                     url: `/uploads/${filename}`,
//                 };
//             }
//         }

//         const jewelry = await Jewelry.create({
//             name,
//             category,
//             description,
//             price: {
//                 buy: Number(buyPrice),
//                 rentPerDay: Number(rentPerDay),
//             },
//             images,
//             video: video || undefined,
//         });

//         res.status(201).json({
//             message: "Jewelry added successfully",
//             jewelry,
//         });
//     } catch (error) {
//         console.error("ADD JEWELRY ERROR:", error);
//         res.status(500).json({ message: error.message });
//     }
// };



// controllers/JewelryController.js
exports.addJewelry = async (req, res) => {
    try {
        const { name, category, description, price, images, video } = req.body;

        // ✅ Validation
        if (
            !name ||
            !category ||
            !description ||
            !price?.buy ||
            !price?.rentPerDay
        ) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const allowedCategories = [
            "ALL JEWELRY",
            "NECKLACE SETS",
            "EARRINGS",
            "BANGLES",
            "RINGS",
            "HAIR ACCESSORIES",
            "ANKLETS",
            "OTHERS",
        ];

        if (!allowedCategories.includes(category)) {
            return res.status(400).json({ message: "Invalid category selected" });
        }

        if (!images || images.length === 0) {
            return res.status(400).json({ message: "At least one image is required" });
        }

        const jewelry = await Jewelry.create({
            name,
            category,
            description,
            price: {
                buy: Number(price.buy),
                rentPerDay: Number(price.rentPerDay),
            },
            images, // ✅ Cloudinary URLs
            video,  // ✅ optional Cloudinary URL
        });

        res.status(201).json({
            message: "Jewelry added successfully",
            jewelry,
        });
    } catch (error) {
        console.error("ADD JEWELRY ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};



exports.getAllJewelry = async (req, res) => {
    try {
        const jewelry = await Jewelry.find({ isActive: true }).sort({
            createdAt: -1,
        });

        res.json(jewelry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllJewelryAdmin = async (req, res) => {
    try {
        const jewelry = await Jewelry.find().sort({
            createdAt: -1,
        });
        res.status(200).json(jewelry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getJewelryById = async (req, res) => {
    try {
        const jewelry = await Jewelry.findById(req.params.id);

        if (!jewelry) {
            return res.status(404).json({ message: "Jewelry not found" });
        }

        res.json(jewelry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// exports.updateJewelry = async (req, res) => {
//     try {
//         console.log("REQ BODY 👉", req.body);

//         const { name, price, category, description, isActive } = req.body;

//         const jewelry = await Jewelry.findById(req.params.id);

//         if (!jewelry) {
//             return res.status(404).json({ message: "Jewelry not found" });
//         }

//         // ✅ Normal fields
//         if (name !== undefined) jewelry.name = name;
//         if (price !== undefined) jewelry.price = Number(price);
//         if (category !== undefined) jewelry.category = category;
//         if (description !== undefined) jewelry.description = description;

//         // ✅ Active Status
//         if (isActive !== undefined) {
//             jewelry.isActive = isActive === "true";
//         }

//         // ✅ Images (optional)
//         if (req.files?.images?.length) {
//             // Delete old images from Cloudinary
//             if (process.env.NODE_ENV === "production" && jewelry.images && jewelry.images.length > 0) {
//                 for (let img of jewelry.images) {
//                     if (img.public_id) {
//                         try {
//                             await cloudinary.uploader.destroy(img.public_id);
//                         } catch (e) {
//                             console.error("Cloudinary delete error:", e);
//                         }
//                     }
//                 }
//             }

//             const uploadedImages = [];
//             for (let file of req.files.images) {
//                 let result;
//                 if (process.env.NODE_ENV === "production") {
//                     result = await cloudinary.uploader.upload(file.path, {
//                         folder: "jewelry/images",
//                         resource_type: "image",
//                     });

//                     // Delete local file
//                     if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

//                     uploadedImages.push({
//                         public_id: result.public_id,
//                         url: result.secure_url,
//                     });
//                 } else {
//                     const filename = path.basename(file.path);
//                     const url = `/uploads/${filename}`;
//                     uploadedImages.push({ public_id: filename, url });
//                 }
//             }
//             jewelry.images = uploadedImages;
//         }

//         // ✅ Videos (optional)
//         if (req.files?.video?.length) {
//             // Delete old video from Cloudinary
//             if (process.env.NODE_ENV === "production" && jewelry.video && jewelry.video.public_id) {
//                 try {
//                     await cloudinary.uploader.destroy(jewelry.video.public_id, { resource_type: "video" });
//                 } catch (e) {
//                     console.error("Cloudinary video delete error:", e);
//                 }
//             }

//             let result;
//             if (process.env.NODE_ENV === "production") {
//                 result = await cloudinary.uploader.upload(req.files.video[0].path, {
//                     folder: "jewelry/videos",
//                     resource_type: "video",
//                 });

//                 // Delete local file
//                 if (fs.existsSync(req.files.video[0].path)) fs.unlinkSync(req.files.video[0].path);

//                 jewelry.video = {
//                     public_id: result.public_id,
//                     url: result.secure_url,
//                 };
//             } else {
//                 const file = req.files.video[0];
//                 const filename = path.basename(file.path);
//                 const url = `/uploads/${filename}`;
//                 jewelry.video = { public_id: filename, url };
//             }
//         }

//         await jewelry.save();

//         res.status(200).json({
//             message: "Jewelry updated successfully",
//             jewelry
//         });

//     } catch (error) {
//         console.error("UPDATE ERROR ❌", error);
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: error.message
//         });
//     }
// };




// exports.updateJewelry = async (req, res) => {
//     try {
//         console.log("REQ BODY 👉", req.body);

//         const jewelry = await Jewelry.findById(req.params.id);
//         if (!jewelry) {
//             return res.status(404).json({ message: "Jewelry not found" });
//         }

//         const { name, category, description, isActive } = req.body;

//         const buyPrice =
//             req.body?.price?.buy || req.body["price[buy]"];
//         const rentPerDay =
//             req.body?.price?.rentPerDay || req.body["price[rentPerDay]"];

//         /* ================= BASIC FIELDS ================= */
//         if (name !== undefined) jewelry.name = name;
//         if (category !== undefined) jewelry.category = category;
//         if (description !== undefined) jewelry.description = description;

//         if (buyPrice !== undefined || rentPerDay !== undefined) {
//             jewelry.price = {
//                 buy:
//                     buyPrice !== undefined
//                         ? Number(buyPrice)
//                         : jewelry.price.buy,
//                 rentPerDay:
//                     rentPerDay !== undefined
//                         ? Number(rentPerDay)
//                         : jewelry.price.rentPerDay,
//             };
//         }

//         if (isActive !== undefined) {
//             jewelry.isActive = isActive === "true" || isActive === true;
//         }

//         /* ================= IMAGES ================= */
//         if (req.files?.images?.length) {
//             if (
//                 process.env.NODE_ENV === "production" &&
//                 jewelry.images?.length
//             ) {
//                 for (let img of jewelry.images) {
//                     try {
//                         await cloudinary.uploader.destroy(img.public_id);
//                     } catch (e) { }
//                 }
//             }

//             const uploadedImages = [];
//             for (let file of req.files.images) {
//                 if (process.env.NODE_ENV === "production") {
//                     const result = await cloudinary.uploader.upload(file.path, {
//                         folder: "jewelry/images",
//                         resource_type: "image",
//                     });

//                     fs.existsSync(file.path) && fs.unlinkSync(file.path);

//                     uploadedImages.push({
//                         public_id: result.public_id,
//                         url: result.secure_url,
//                     });
//                 } else {
//                     const filename = path.basename(file.path);
//                     uploadedImages.push({
//                         public_id: filename,
//                         url: `/uploads/${filename}`,
//                     });
//                 }
//             }
//             jewelry.images = uploadedImages;
//         }

//         /* ================= VIDEO ================= */
//         if (req.files?.video?.length) {
//             if (
//                 process.env.NODE_ENV === "production" &&
//                 jewelry.video?.public_id
//             ) {
//                 try {
//                     await cloudinary.uploader.destroy(
//                         jewelry.video.public_id,
//                         { resource_type: "video" }
//                     );
//                 } catch (e) { }
//             }

//             const file = req.files.video[0];

//             if (process.env.NODE_ENV === "production") {
//                 const result = await cloudinary.uploader.upload(file.path, {
//                     folder: "jewelry/videos",
//                     resource_type: "video",
//                 });

//                 fs.existsSync(file.path) && fs.unlinkSync(file.path);

//                 jewelry.video = {
//                     public_id: result.public_id,
//                     url: result.secure_url,
//                 };
//             } else {
//                 const filename = path.basename(file.path);
//                 jewelry.video = {
//                     public_id: filename,
//                     url: `/uploads/${filename}`,
//                 };
//             }
//         }

//         await jewelry.save();

//         res.status(200).json({
//             message: "Jewelry updated successfully",
//             jewelry,
//         });
//     } catch (error) {
//         console.error("UPDATE JEWELRY ERROR ❌", error);
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: error.message,
//         });
//     }
// };


exports.updateJewelry = async (req, res) => {
    try {
        const jewelry = await Jewelry.findById(req.params.id);
        if (!jewelry) {
            return res.status(404).json({ message: "Jewelry not found" });
        }

        const {
            name,
            category,
            description,
            isActive,
            price,
            images,
            video,
        } = req.body;

        /* ================= BASIC FIELDS ================= */
        if (name !== undefined) jewelry.name = name;
        if (category !== undefined) jewelry.category = category;
        if (description !== undefined) jewelry.description = description;

        if (price?.buy !== undefined || price?.rentPerDay !== undefined) {
            jewelry.price = {
                buy: price?.buy !== undefined ? Number(price.buy) : jewelry.price.buy,
                rentPerDay:
                    price?.rentPerDay !== undefined
                        ? Number(price.rentPerDay)
                        : jewelry.price.rentPerDay,
            };
        }

        if (isActive !== undefined) {
            jewelry.isActive = isActive === true || isActive === "true";
        }

        /* ================= IMAGES (FROM CLOUDINARY) ================= */
        if (Array.isArray(images)) {
            jewelry.images = images.filter(
                (img) => img.public_id && img.url
            );
        }

        /* ================= VIDEO (FROM CLOUDINARY) ================= */
        if (video) {
            jewelry.video = video;
        }

        await jewelry.save();

        res.status(200).json({
            message: "Jewelry updated successfully",
            jewelry,
        });
    } catch (error) {
        console.error("UPDATE JEWELRY ERROR ❌", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};




exports.deleteJewelry = async (req, res) => {
    try {
        const jewelry = await Jewelry.findById(req.params.id);

        if (!jewelry) {
            return res.status(404).json({ message: "Jewelry not found" });
        }

        // Soft delete (set isActive to false)
        jewelry.isActive = false;
        await jewelry.save();

        res.json({ message: "Jewelry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
