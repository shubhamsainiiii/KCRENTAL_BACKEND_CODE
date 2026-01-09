const mongoose = require("mongoose");

const garmentsSchema = new mongoose.Schema(
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
                required: true, // admin must add
            },
        },

        category: {
            type: String,
            required: true,
            enum: [
                "ALL GARMENTS",
                "LEHENGAS",
                "SAREES",
                "GOWNS",
                "ANARKALIS & SUITS",
                "TOP-BOTTOM",
                "SHARARAS",
                "OTHERS",
            ],
        },

        description: {
            type: String,
            required: true,
        },

        images: [
            {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
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

module.exports = mongoose.model("Garment", garmentsSchema);
