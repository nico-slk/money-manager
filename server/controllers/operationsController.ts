import { Request, Response } from "express"

export const getIncomeOperations = (req: Request, res: Response) => {
  res.json({
    msg: 'Income Operations'
  })
}

export const putOperation = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: 'putOperation',
    id: id
  })
}

export const createOperation = (req: Request, res: Response) => {
  const { body } = req.body
  res.json({
    msg: 'createOperation',
    body
  })
}

export const deleteOperation = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: 'deleteOperation',
    id: id
  })
}
