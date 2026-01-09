const Garment = require("../Models/GarmentsModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

// exports.addGarment = async (req, res) => {
//     try {
//         console.log("Add Garment Request Body:", req.body);
//         console.log("Add Garment Files:", req.files);

//         const {
//             name,
//             category,
//             description,
//             images: imagesBody,
//             video: videoBody,
//         } = req.body;

//         const buyPrice = req.body?.price?.buy || req.body["price[buy]"];
//         const rentPerDay = req.body?.price?.rentPerDay || req.body["price[rentPerDay]"];

//         if (!name || !buyPrice || !rentPerDay || !category || !description) {
//             return res.status(400).json({
//                 message: "All fields are required (name, buy price, rent price per day, category, description)",
//             });
//         }

//         const allowedCategories = [
//             "ALL GARMENTS",
//             "LEHENGAS",
//             "SAREES",
//             "GOWNS",
//             "ANARKALIS & SUITS",
//             "TOP-BOTTOM",
//             "SHARARAS",
//             "OTHERS",
//         ];

//         if (!allowedCategories.includes(category)) {
//             return res.status(400).json({ message: "Invalid category selected" });
//         }

//         let images = [];
//         let video = null;

//         /* ================= JSON IMAGES ================= */
//         if (imagesBody && Array.isArray(imagesBody)) {
//             images = imagesBody
//                 .map((img) => ({
//                     public_id: img.public_id,
//                     url: img.url,
//                 }))
//                 .filter((x) => x.public_id && x.url);
//         }

//         /* ================= JSON VIDEO ================= */
//         if (videoBody && videoBody.public_id && videoBody.url) {
//             video = {
//                 public_id: videoBody.public_id,
//                 url: videoBody.url,
//             };
//         }

//         /* ================= UPLOAD IMAGES ================= */
//         if (!images.length && req.files?.images?.length) {
//             for (const file of req.files.images) {
//                 if (process.env.NODE_ENV === "production") {
//                     const result = await cloudinary.uploader.upload(file.path, {
//                         folder: "garments/images",
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

//         /* ================= UPLOAD VIDEO ================= */
//         if (!video && req.files?.video?.length) {
//             const file = req.files.video[0];

//             if (process.env.NODE_ENV === "production") {
//                 const result = await cloudinary.uploader.upload(file.path, {
//                     folder: "garments/videos",
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

//         const garment = await Garment.create({
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
//             message: "Garment added successfully",
//             garment,
//         });
//     } catch (error) {
//         console.error("ADD GARMENT ERROR:", error);
//         res.status(500).json({ message: error.message });
//     }
// };



// exports.addGarment = async (req, res) => {
//     try {
//         const {
//             name,
//             category,
//             description,
//         } = req.body;

//         const buyPrice = req.body?.price?.buy || req.body["price[buy]"];
//         const rentPerDay = req.body?.price?.rentPerDay || req.body["price[rentPerDay]"];

//         if (!name || !buyPrice || !rentPerDay || !category || !description) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         let images = [];
//         let video = null;

//         /* ================= UPLOAD IMAGES ================= */
//         if (req.files?.images?.length) {
//             for (const file of req.files.images) {
//                 const result = await cloudinary.uploader.upload(file.path, {
//                     folder: "garments/images",
//                     resource_type: "image",
//                     timeout: 60000
//                 });

//                if (fs.existsSync(file.path)) {
//     fs.unlinkSync(file.path);
//   }

//                 images.push({
//                     public_id: result.public_id,
//                     url: result.secure_url, // ✅ Cloudinary URL
//                 });
//             }
//         }

//         /* ================= UPLOAD VIDEO ================= */
//         if (req.files?.video?.length) {
//             const file = req.files.video[0];

//             const result = await cloudinary.uploader.upload(file.path, {
//                 folder: "garments/videos",
//                 resource_type: "video",
//                 timeout: 120000
//             });

//             fs.unlinkSync(file.path);

//             video = {
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             };
//         }

//         const garment = await Garment.create({
//             name,
//             category,
//             description,
//             price: {
//                 buy: Number(buyPrice),
//                 rentPerDay: Number(rentPerDay),
//             },
//             images,
//             video,
//         });

//         res.status(201).json({
//             message: "Garment added successfully",
//             garment,
//         });
//     } catch (error) {
//         console.error("ADD GARMENT ERROR:", error);
//         res.status(500).json({ message: error.message });
//     }
// };






exports.addGarment = async (req, res) => {
    try {
        const { name, category, description, price, images, video } = req.body;

        if (
            !name ||
            !category ||
            !description ||
            !price?.buy ||
            !price?.rentPerDay
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!images || images.length === 0) {
            return res.status(400).json({ message: "At least one image is required" });
        }

        const garment = await Garment.create({
            name,
            category,
            description,
            price: {
                buy: Number(price.buy),
                rentPerDay: Number(price.rentPerDay),
            },
            images, // Cloudinary URLs
            video,  // optional
        });

        res.status(201).json({
            message: "Garment added successfully",
            garment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






exports.getAllGarments = async (req, res) => {
    try {
        const garments = await Garment.find({ isActive: true }).sort({
            createdAt: -1,
        });

        res.json(garments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGarmentById = async (req, res) => {
    try {
        const garment = await Garment.findById(req.params.id);

        if (!garment) {
            return res.status(404).json({ message: "Garment not found" });
        }

        res.json(garment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// exports.updateGarment = async (req, res) => {
//     try {
//         console.log("REQ BODY 👉", req.body);
//         console.log("REQ FILES 👉", req.files);

//         const garment = await Garment.findById(req.params.id);
//         if (!garment) {
//             return res.status(404).json({ message: "Garment not found" });
//         }

//         const {
//             name,
//             category,
//             description,
//             isActive,
//             images: imagesBody,
//             video: videoBody,
//         } = req.body;

//         const buyPrice = req.body?.price?.buy || req.body["price[buy]"];
//         const rentPerDay = req.body?.price?.rentPerDay || req.body["price[rentPerDay]"];

//         /* ================= BASIC FIELDS ================= */
//         if (name !== undefined) garment.name = name;
//         if (category !== undefined) garment.category = category;
//         if (description !== undefined) garment.description = description;

//         if (buyPrice !== undefined || rentPerDay !== undefined) {
//             garment.price = {
//                 buy: buyPrice !== undefined ? Number(buyPrice) : garment.price.buy,
//                 rentPerDay:
//                     rentPerDay !== undefined
//                         ? Number(rentPerDay)
//                         : garment.price.rentPerDay,
//             };
//         }

//         if (isActive !== undefined) {
//             garment.isActive = isActive === "true" || isActive === true;
//         }

//         /* ================= JSON IMAGES ================= */
//         if (imagesBody && Array.isArray(imagesBody) && imagesBody.length) {
//             garment.images = imagesBody.map((img) => ({
//                 public_id: img.public_id,
//                 url: img.url,
//             }));
//         }

//         /* ================= JSON VIDEO ================= */
//         if (videoBody && videoBody.public_id && videoBody.url) {
//             garment.video = {
//                 public_id: videoBody.public_id,
//                 url: videoBody.url,
//             };
//         }

//         /* ================= FILE IMAGES ================= */
//         if (req.files?.images?.length) {
//             const uploadedImages = [];
//             for (const file of req.files.images) {
//                 if (process.env.NODE_ENV === "production") {
//                     const result = await cloudinary.uploader.upload(file.path, {
//                         folder: "garments/images",
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
//             garment.images = uploadedImages;
//         }

//         /* ================= FILE VIDEO ================= */
//         if (req.files?.video?.length) {
//             const file = req.files.video[0];
//             if (process.env.NODE_ENV === "production") {
//                 const result = await cloudinary.uploader.upload(file.path, {
//                     folder: "garments/videos",
//                     resource_type: "video",
//                 });
//                 fs.existsSync(file.path) && fs.unlinkSync(file.path);
//                 garment.video = {
//                     public_id: result.public_id,
//                     url: result.secure_url,
//                 };
//             } else {
//                 const filename = path.basename(file.path);
//                 garment.video = {
//                     public_id: filename,
//                     url: `/uploads/${filename}`,
//                 };
//             }
//         }

//         await garment.save();

//         res.status(200).json({
//             message: "Garment updated successfully",
//             garment,
//         });
//     } catch (error) {
//         console.error("UPDATE ERROR ❌", error);
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: error.message,
//         });
//     }
// };


// exports.updateGarment = async (req, res) => {
//     try {
//         const garment = await Garment.findById(req.params.id);
//         if (!garment) {
//             return res.status(404).json({ message: "Garment not found" });
//         }

//         const {
//             name,
//             category,
//             description,
//             isActive,
//         } = req.body;

//         const buyPrice = req.body?.price?.buy || req.body["price[buy]"];
//         const rentPerDay = req.body?.price?.rentPerDay || req.body["price[rentPerDay]"];

//         /* ================= BASIC FIELDS ================= */
//         if (name !== undefined) garment.name = name;
//         if (category !== undefined) garment.category = category;
//         if (description !== undefined) garment.description = description;

//         if (buyPrice !== undefined || rentPerDay !== undefined) {
//             garment.price = {
//                 buy: buyPrice !== undefined ? Number(buyPrice) : garment.price.buy,
//                 rentPerDay:
//                     rentPerDay !== undefined
//                         ? Number(rentPerDay)
//                         : garment.price.rentPerDay,
//             };
//         }

//         if (isActive !== undefined) {
//             garment.isActive = isActive === true || isActive === "true";
//         }

//         /* ================= UPDATE IMAGES ================= */
//         if (req.files?.images?.length) {
//             const uploadedImages = [];

//             for (const file of req.files.images) {
//                 const result = await cloudinary.uploader.upload(file.path, {
//                     folder: "garments/images",
//                     resource_type: "image",
//                 });

//                 fs.unlinkSync(file.path);

//                 uploadedImages.push({
//                     public_id: result.public_id,
//                     url: result.secure_url,
//                 });
//             }

//             garment.images = uploadedImages;
//         }

//         /* ================= UPDATE VIDEO ================= */
//         if (req.files?.video?.length) {
//             const file = req.files.video[0];

//             const result = await cloudinary.uploader.upload(file.path, {
//                 folder: "garments/videos",
//                 resource_type: "video",
//             });

//             fs.unlinkSync(file.path);

//             garment.video = {
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             };
//         }

//         await garment.save();

//         res.status(200).json({
//             message: "Garment updated successfully",
//             garment,
//         });
//     } catch (error) {
//         console.error("UPDATE ERROR ❌", error);
//         res.status(500).json({
//             message: "Internal Server Error",
//             error: error.message,
//         });
//     }
// };


// controllers/GarmentController.js
exports.updateGarment = async (req, res) => {
    try {
        const garment = await Garment.findById(req.params.id);
        if (!garment) {
            return res.status(404).json({ message: "Garment not found" });
        }

        const { name, category, description, isActive, price, images, video } =
            req.body;

        /* ================= BASIC FIELDS ================= */
        if (name !== undefined) garment.name = name;
        if (category !== undefined) garment.category = category;
        if (description !== undefined) garment.description = description;

        if (price?.buy !== undefined || price?.rentPerDay !== undefined) {
            garment.price = {
                buy:
                    price?.buy !== undefined
                        ? Number(price.buy)
                        : garment.price.buy,
                rentPerDay:
                    price?.rentPerDay !== undefined
                        ? Number(price.rentPerDay)
                        : garment.price.rentPerDay,
            };
        }

        if (isActive !== undefined) {
            garment.isActive = isActive === true || isActive === "true";
        }

        /* ================= UPDATE IMAGES (FROM CLOUDINARY) ================= */
        if (images && Array.isArray(images) && images.length > 0) {
            garment.images = images; // ✅ Cloudinary URLs
        }

        /* ================= UPDATE VIDEO ================= */
        if (video) {
            garment.video = video; // ✅ Cloudinary URL
        }

        await garment.save();

        res.status(200).json({
            message: "Garment updated successfully",
            garment,
        });
    } catch (error) {
        console.error("UPDATE ERROR ❌", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};






exports.deleteGarment = async (req, res) => {
    try {
        const garment = await Garment.findById(req.params.id);

        if (!garment) {
            return res.status(404).json({ message: "Garment not found" });
        }

        garment.isActive = false;
        await garment.save();

        res.json({ message: "Garment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllGarments = async (req, res) => {
    try {
        const garments = await Garment.find({ isActive: true }).sort({
            createdAt: -1,
        });
        res.json(garments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllGarmentsAdmin = async (req, res) => {
    try {
        const garments = await Garment.find().sort({
            createdAt: -1,
        });
        res.status(200).json(garments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
