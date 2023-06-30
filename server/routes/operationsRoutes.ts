import { Router } from "express";
import {
  getAllOperations,
  getPaginateOperations,
  getRevenuesOperations,
  getExpensesOperations,
  getOperationByPk,
  putOperation,
  createOperation,
  deleteOperation,
} from "../controllers/operationsController";

const router = Router();

router.get('/', getAllOperations)
router.get('/', getPaginateOperations)
router.get('/rev/', getRevenuesOperations)
router.get('/exp/', getExpensesOperations)
router.get('/:id', getOperationByPk)
router.post('/', createOperation)
router.put('/:id', putOperation)
router.delete('/:id', deleteOperation)

export default router;