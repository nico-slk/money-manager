import { Request, Response } from "express";
import Reason from "../models/reason";
import User from "../models/user";
import Operations from "../models/operations";

export const getReasons = async (req: Request, res: Response) => {

  const { userId } = req.params

  try {
    const resons = await Reason.findAll({ where: { user_id: userId } })
    const user = await User.findByPk(userId)
    const userName = user?.getDataValue('userName')

    res.status(200).json({
      msg: `Reasons created by user with Name: ${userName}`,
      resons
    })
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}

export const getReasonByName = async (req: Request, res: Response) => {
  const { reasonName, userId } = req.params
  try {
    const operationList = await Operations.findAll({ where: { user_id: userId, reason: decodeURI(reasonName) } })
    res.status(200).json({ operationList })
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}

export const createReason = async (req: Request, res: Response) => {
  const reasonBody = req.body
  const { userId } = req.params
  try {
    const newReason = await Reason.build({ ...reasonBody, user_id: userId })
    await newReason.save()
    res.status(200).json({
      msg: `Reason saved`,
      newReason
    })
  } catch (error) {
    res.status(500).json({
      error
    })
  }

}
