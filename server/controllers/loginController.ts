import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {

  const { email, password } = req.body

  res.json({
    msj: 'Usuario logueado',
    user: {
      email,
      password
    }
  })
} 