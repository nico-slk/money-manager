import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import User from "../models/user";

export const getUser = async (req: Request, res: Response) => {
  const usersList = await User.findAll()
  res.json({
    msj: 'Usuarios',
    usersList
  })
}

export const getUserByPk = async (req: Request, res: Response) => {

  const { id } = req.params;
  const user = await User.findByPk(id);

  res.json({
    msj: 'Usuario',
    user
  })
}

export const putUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: 'putUser',
    id: id
  })
}

export const createUser = async (req: Request, res: Response) => {
  const { body } = req

  // Build new user
  const user = await User.build(body)
  console.log(user);

  // Encrypt the password
  const salt = bcryptjs.genSaltSync()
  const userPassword = user.getDataValue('password')
  const userPasswordEncrypted = bcryptjs.hashSync(userPassword, salt);
  user.setDataValue('password', userPasswordEncrypted)

  // Save the new user
  await user.save()

  // Response
  res.json({
    msg: 'createUser',
    user
  })
}

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: 'deleteUser',
    id: id
  })
}