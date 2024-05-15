import express from "express";
import { addPromo , getPromoCodes } from "../Controllers/PromoController.js";

const promoRouter = express.Router();

promoRouter.post("/addpromo", addPromo);
promoRouter.get("/promocodes",getPromoCodes)


export default promoRouter;
