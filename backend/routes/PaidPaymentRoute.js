import express from 'express';
import { getAllPaidPayments, getTotalAmountForMonth} from '../controllers/PaidPaymentsController.js';

const PaidPaymentRouter = express.Router();

PaidPaymentRouter.get("/list",getAllPaidPayments)
PaidPaymentRouter.get("/totalAmount/:month",getTotalAmountForMonth)

export default PaidPaymentRouter;