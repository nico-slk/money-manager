import { Router } from 'express'
import {
  createUser,
  patchUser,
  deleteUser,
  getUser,
  getUserByPk
} from '../controllers/userController'
import { check } from 'express-validator'
import { emailExist, isUserExistByPk, validator } from '../middlewares/validator'

const router = Router()

router.get('/', getUser)
router.get('/:id', [
  check('id', 'Is not a valid ID').isUUID(),
  check('id').custom(isUserExistByPk),
  validator
], getUserByPk)
router.post('/', [
  check('email', 'Email should not be empty').not().isEmpty(),
  check('email', 'Email format is not valid').isEmail(),
  check('userName', 'User name should not be empty').not().isEmpty(),
  check('userName', 'User name should not be more than 20 characters').isLength({ max: 20 }),
  check('password', 'Password should not be empty').not().isEmpty(),
  check('password', 'Password should be more than 6 characters').isLength({ min: 6 }),
  check('email').custom(emailExist),
  validator,
], createUser)
router.patch('/:id', [
  check('email', 'Email should not be empty').not().isEmpty(),
  check('email', 'Email format is not valid').isEmail(),
  check('userName', 'User name should not be empty').not().isEmpty(),
  check('userName', 'User name should not be more than 20 characters').isLength({ max: 20 }),
  check('password', 'Password should not be empty').not().isEmpty(),
  check('password', 'Password should be more than 6 characters').isLength({ min: 6 }),
  check('id', 'Is not a valid ID').isUUID(),
  check('id').custom(isUserExistByPk),
  validator
], patchUser)
router.put('/:id', patchUser)
router.delete('/:id', [
  check('id', 'Is not a valid ID').isUUID(),
  check('id').custom(isUserExistByPk),
  validator
], deleteUser)

export default router;