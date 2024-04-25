import express from 'express'
import { addpromotion,listPromotion,removePromotion,updatePromotion } from '../Controllers/promotionController.js'
import multer from 'multer';

const promotionRouter = express.Router();

//Image storage
const storage = multer.diskStorage({
    destination:"uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage: storage})

promotionRouter.post("/add",upload.single("image"),addpromotion)
promotionRouter.get("/list",listPromotion)
promotionRouter.post("/remove",removePromotion)
promotionRouter.post("/update", upload.single("image"), updatePromotion)

export default promotionRouter;