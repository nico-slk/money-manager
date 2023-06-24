import { Router } from "express";
import { createOperation, deleteOperation, getIncomeOperations, putOperation } from "../controllers/operationsController";

const router = Router();

router.get('/', getIncomeOperations)
router.post('/', createOperation)
router.put('/:id', putOperation)
router.delete('/:id', deleteOperation)

export default router;