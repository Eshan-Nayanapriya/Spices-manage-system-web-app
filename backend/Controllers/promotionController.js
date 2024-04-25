import PromotionModel from '../models/PromotionModel.js'
import fs from 'fs'

//add promotion 
const addpromotion = async(req,res) => {
    let image_filename = `${req.file.filename}`;

    const promotion = new PromotionModel({
        id: req.body.id,
        discount: req.body.discount,
        date: req.body.date,
        image: image_filename
    })
    try {
        await promotion.save();
        res.json({success: true, message:"Promotion addes success"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:"Promotion addes failed"})
    }
}

//all promotion list
const listPromotion = async(req, res) => {
    try {
        const promotion = await PromotionModel.find({});
        res.json({success: true, data:promotion})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"error"})
    }
}

//remove promotion
const removePromotion = async (req,res) => {
    try {
        const promotion = await PromotionModel.findById(req.body.id);
        fs.unlink(`uploads/${promotion.image}`,()=>{})

        await PromotionModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message:"Promotion removed success"})
    } catch (error) {
      console.log(error);
      res.json({success: false, message:"Error with removing promotion"})
    }
}

const updatePromotion = async (req, res) => {
    try {
        const { id, discount, date, image } = req.body;
        const promotion = await PromotionModel.findById(id);
        
        promotion.discount = discount;
        promotion.date = date;
        if (image) {
            fs.unlink(`uploads/${promotion.image}`, () => {});
            promotion.image = image;
        }

        await promotion.save();
        res.json({ success: true, message: "Promotion updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating promotion" });
    }
}


export {addpromotion, listPromotion, removePromotion, updatePromotion}