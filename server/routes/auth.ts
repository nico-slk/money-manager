import { Router } from 'express'
import { login } from '../controllers/loginController'
import { check } from 'express-validator'
import { validator } from '../middlewares/validator'

const router = Router();

router.post('/', [
  check('email', 'The email is not valid').isEmail(),
  check('password', 'Please, insert your password').not().isEmpty(),
  check('password', 'Password should be more than 6 characters').isLength({ min: 6 }),
  validator
], login)

export default router;