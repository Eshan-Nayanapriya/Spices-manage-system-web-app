import express from 'express'
import { addpromotion,listPromotion,removePromotion } from '../Controllers/promotionController.js'
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

export default promotionRouter;