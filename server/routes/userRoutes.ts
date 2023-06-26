import { Router } from 'express'
import {
  createUser,
  putUser,
  deleteUser,
  getUser,
  getUserByPk
} from '../controllers/userController'
import { check } from 'express-validator'

const router = Router()

router.get('/', getUser)
router.get('/:id', getUserByPk)
router.post('/', [
  check('email', 'Email format is not valid').isEmail(),
  check('email', 'Email should not be empty').not().isEmpty(),
  check('userName', 'User name should not be empty').not().isEmpty(),
  check('password', 'Password should not be empty').not().isEmpty().isLength({ min: 6 }),
  check('password', 'Password should be more than 6 characters').not().isLength({ min: 6 }),

], createUser)
router.put('/:id', putUser)
router.delete('/:id', deleteUser)

export default router;