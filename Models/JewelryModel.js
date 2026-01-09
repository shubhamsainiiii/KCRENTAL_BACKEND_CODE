const mongoose = require("mongoose");

const jewelrySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            buy: {
                type: Number,
                required: true, // admin must add
            },
            rentPerDay: {
                type: Number,
                required: true, // admin must add (per day)
            },
        },

        category: {
            type: String,
            required: true,
            enum: [
                "ALL JEWELRY",
                "NECKLACE SETS",
                "EARRINGS",
                "BANGLES",
                "RINGS",
                "HAIR ACCESSORIES",
            ],
        },

        description: {
            type: String,
            required: true,
        },

        images: [
            {
                public_id: {
                    type: String, // Cloudinary public_id
                    required: true,
                },
                url: {
                    type: String, // Cloudinary secure_url
                    required: true,
                },
            },
        ],

        video: {
            public_id: String,
            url: String,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Jewelry", jewelrySchema);
