// PromoController.js

import PromoModel from "../models/PromoModel.js";

const addPromo = async (req, res) => {
    // Check if both promocode and promodiscount are present in req.body
    if (!req.body.promocode || !req.body.promodiscount) {
        return res.status(400).json({ success: false, message: "Both promocode and promodiscount are required." });
    }

    const { promocode, promodiscount } = req.body;

    const promo = new PromoModel({
        promocode: promocode,
        promodiscount: promodiscount
    });

    try {
        await promo.save();
        res.json({ success: true, message: "Promo Added" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

const getPromoCodes = async (req, res) => {
    try {
        const promos = await PromoModel.find({}, 'promocode promodiscount');
        res.json(promos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export { addPromo, getPromoCodes };
