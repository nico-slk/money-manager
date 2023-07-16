import { Router } from "express";
import { createReason, getReasonByName, getReasons } from "../controllers/reasonController";
import { check } from "express-validator";
import { isUserExistByPk, validateReason, validator } from '../middlewares/validator'
import { validateJwt } from "../middlewares/validate-jwt";

const router = Router()

router.get('/:userId', [
  validateJwt,
  check('userId', 'The user ID is not valid').isUUID(),
  check('userId').custom(isUserExistByPk),
  validator
], getReasons)

router.get('/:userId/:reasonName', [
  validateJwt,
  check('userId', 'The user ID is not valid').isUUID(),
  check('userId').custom(isUserExistByPk),
  check('reasonName', 'The reason name should not be empty').not().isEmpty(),
  check('reasonName', 'The reason lenght should not be more than 20 characters').isLength({ max: 20 }),
  check('reasonName').custom(validateReason),
  validator
], getReasonByName)

router.post('/:userId', [
  validateJwt,
  check('userId', 'The user ID is not valid').isUUID(),
  check('userId').custom(isUserExistByPk),
  check('name', 'The reason should not be empty').not().isEmpty(),
  check('name', 'The reason lenght should not be more than 20 characters').isLength({ max: 20 }),
  validator
], createReason);

export default router;