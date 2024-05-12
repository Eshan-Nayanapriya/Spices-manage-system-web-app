import promotionModel from "../models/PromotionModel.js";
import fs from 'fs'

//add promotion
const addPromotion = async (req,res) => {
    let promoImage_filename = `${req.file.filename}`

    const promotion = new promotionModel({
        name: req.body.name,
        itemName: req.body.itemName,
        description: req.body.description,
        discount: req.body.discount,
        promoimage: promoImage_filename,
        validDate: req.body.validDate,
        termsAndCondition: req.body.termsAndCondition
    });
    try {
        await promotion.save();
        res.json({success:true,message:"Promotion Added"})
    }catch (error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//all promotion list
const listPromotion = async (req, res, next) => {
    try{
        const promotions = await promotionModel.find({});
        res.json({success:true,data:promotions})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove promotion
const removePromotion = async (req,res)=>{
    try{
        const promotions = await promotionModel.findById(req.body.id);
        fs.unlink(`promoupload/${promotions.promoimage}`,()=>{})

        await promotionModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Promotion Removed"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
}
}

// Edit food item
const editFood = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, category } = req.body;

        let updateData = {
            name,
            description,
            price,
            category,
        };

        if (req.file) {
            let image_filename = `${req.file.filename}`;
            updateData.image = image_filename;
        }

        const updatedFood = await foodmodel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedFood) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        res.json({ success: true, data: updatedFood });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating food" });
    }
}



export {addPromotion,listPromotion,removePromotion}