import { Router } from 'express'
import { login } from '../controllers/loginController'
import { check } from 'express-validator'

const router = Router();

router.post('/', [
  check('email', 'El correo no es válido').isEmail()
], login)

export default router;