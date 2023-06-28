import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator'
import User from '../models/user';
import { UUIDVersion } from 'express-validator/src/options';

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  next()
}

export const emailExist = async (email: string | '') => {
  const exist = await User.findOne({ where: { email } })
  if (exist) {
    throw new Error(`El correo ${email} ya se encuentra registrado`);
  }
}

export const isUserExistByPk = async (id: UUIDVersion) => {
  const user = await User.findByPk(id)

  if (!user) {
    throw new Error(`The user with id: ${id} doesn't exist`);
  }

}
