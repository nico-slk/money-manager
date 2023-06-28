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

export const patchUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { id: userId, ...body } = req.body

  // Encrypt the password
  if (body.password) {
    const salt = bcryptjs.genSaltSync()
    body.password = bcryptjs.hashSync(body.password, salt);
  }

  // Update and get the updated ser
  await User.update(body, { where: { id } })
  const user = await User.findByPk(id)

  // Response
  res.json({
    msg: 'patchUser',
    user
  })
}

export const createUser = async (req: Request, res: Response) => {
  const { body } = req

  // Build new user
  const user = await User.build(body)

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