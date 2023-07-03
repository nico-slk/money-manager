import { Router } from "express";
import {
  getAllOperationsByUserId,
  getExpensesOperationsByUserId,
  getOperationById,
  getPaginateOperationsByUserId,
  getRevenuesOperationsByUserId,
  putOperation,
  createOperation,
  deleteOperation,
} from "../controllers/operationsController";
import { check } from "express-validator";
import { isOperationExistByPk, isUserExistByPk, validateOperationType, validator } from '../middlewares/validator'

const router = Router();

router.get('/all/:userId', [
  check('userId', 'The user ID is not valid').isUUID(),
  check('userId', 'The user ID should not be empty').not().isEmpty(),
  check('userId').custom(isUserExistByPk),
  validator
], getAllOperationsByUserId)

router.get('/:userId', [
  check('userId', 'The user ID is not valid').isUUID(),
  check('userId', 'The user ID should not be empty').not().isEmpty(),
  check('userId').custom(isUserExistByPk),
  validator
], getPaginateOperationsByUserId)

router.get('/rev/:userId', [
  check('userId', 'The user ID is not valid').isUUID(),
  check('userId').custom(isUserExistByPk),
  validator
], getRevenuesOperationsByUserId)

router.get('/exp/:userId', [
  check('userId', 'The user ID is not valid').isUUID(),
  check('userId').custom(isUserExistByPk),
  validator
], getExpensesOperationsByUserId)

router.get('/:userId/:operationId', [
  check('userId', 'The user ID is not valid').isUUID(),
  check('userId').custom(isUserExistByPk),
  check('operationId', 'The user ID is not valid').isUUID(),
  check('operationId').custom(isOperationExistByPk),
  validator
], getOperationById)

router.put('/:userId/:operationId', [
  check('userId', 'The user ID is not valid').isUUID(),
  check('userId').custom(isUserExistByPk),
  check('operationId', 'The user ID is not valid').isUUID(),
  check('operationId').custom(isOperationExistByPk),
  check('payment_concept', 'The payment concept should not be empty').not().isEmpty(),
  check('payment_concept', 'The payment concept should be a text string').isString(),
  check('payment_concept', 'The payment concept should be more than 150 characters').isLength({ max: 150 }),
  check('amount', 'The amount should not be empty').not().isEmpty(),
  check('amount', 'The amount should be a number').isInt(),
  check('type', 'The operation type should not be empty').not().isEmpty(),
  check('type').custom(validateOperationType),
  validator
], putOperation)

router.post('/:userId', [
  check('userId', 'The user ID is not valid').isUUID(),
  check('userId').custom(isUserExistByPk),
  check('payment_concept', 'The payment concept should not be empty').not().isEmpty(),
  check('payment_concept', 'The payment concept should be a text string').isString(),
  check('payment_concept', 'The payment concept should be more than 150 characters').isLength({ max: 150 }),
  check('amount', 'The amount should not be empty').not().isEmpty(),
  check('amount', 'The amount should be a number').isInt(),
  check('type', 'The operation type should not be empty').not().isEmpty(),
  check('type').custom(validateOperationType),
  validator
], createOperation)

router.delete('/:userId/:operationId', [
  check('userId', 'The user ID is not valid').isUUID(),
  check('userId').custom(isUserExistByPk),
  check('operationId', 'The user ID is not valid').isUUID(),
  check('operationId').custom(isOperationExistByPk),
  validator
], deleteOperation)

export default router;