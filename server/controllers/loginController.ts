import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import User from "../models/user";
import { jwtGenerator } from "../middlewares/jwt";

export const login = async (req: Request, res: Response) => {

  const { email, password } = req.body

  try {
    // find user by email
    const user = await User.findOne({ where: { email } })
    // Check if user exist
    if (!user) {
      return res.status(400).json({
        message: `The user with email: ${email} doesn't exist`
      })
    }
    // Compare nota hashed password from login and hashed passwords from DB
    const validPassword = bcryptjs.compareSync(password, user.getDataValue('password'))
    if (!validPassword) {
      return res.status(400).json({
        message: `The password is incorrect`
      })
    }
    // Generate token
    let token = await jwtGenerator(user.getDataValue('id'))

    res.status(200).json({
      msj: 'Usuario logueado',
      user: {
        email,
        password
      },
      token,
      tokenType: 'Bearer '
    })

  } catch (error) {

    res.status(500).json({
      msj: 'Server error',
      error
    })

  }

} 