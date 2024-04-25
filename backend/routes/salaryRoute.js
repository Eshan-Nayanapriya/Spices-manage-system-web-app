import express from 'express';
const router = express.Router();
import salaryController from '../controllers/salaryController.js'; // Updated import

const { getSalary, createSalary, salaryGetById, updateSalary, deleteSalaryById } = salaryController; // Destructuring the functions from the imported object

router.get('/getSalary', getSalary);
router.post('/CreateSalary', createSalary);
router.get('/getSalary/:id', salaryGetById);
router.put('/updateSal/:id', updateSalary);
router.delete('/deleteSal/:id',deleteSalaryById);

export default router;
