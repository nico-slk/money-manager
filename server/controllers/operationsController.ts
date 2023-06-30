import { Request, Response } from "express"
import Operations from "../models/operations"
import User from "../models/user"

// Obtener todos las operaciones --------------- NOT USED
export const getAllOperations = async (req: Request, res: Response) => {
  const operationList = await Operations.findAll()
  res.status(200).json({
    msg: 'All Operations',
    operationList
  })
}

// Obtener todos las operaciones segun ID de Usuario
export const getAllOperationsByUserPk = async (req: Request, res: Response) => {
  const { userId } = req.params
  const operationList = await Operations.findAll({ where: { user_id: userId } })
  const user = await User.findByPk(userId)
  const userName = user?.getDataValue('userName')
  res.status(200).json({
    msg: `All operations from user with Name: ${userName}`,
    operationList
  })
}

// Obtener las operaciones paginadas
export const getPaginateOperations = async (req: Request, res: Response) => {
  const { offset, limit } = req.query
  const page = parseInt(offset as string)
  const pageSize = parseInt(limit as string)
  const operationList = await Operations.findAndCountAll({ limit: pageSize, offset: page })
  res.status(200).json({
    msg: 'Paginate Operations',
    operationList
  })
}

// Obtener todos los Ingresos
export const getRevenuesOperations = async (req: Request, res: Response) => {
  const revenuesOperations = await Operations.findAll({ where: { type: "REVENUE" } })
  res.status(200).json({
    msg: 'Revenue Operations',
    revenuesOperations
  })
}

// Obtener todos los Egresos
export const getExpensesOperations = async (req: Request, res: Response) => {
  const expensesOperations = await Operations.findAll({ where: { type: "EXPENSES" } })
  res.status(200).json({
    msg: 'Expenses Operations',
    expensesOperations
  })
}

// Obtener operación por su ID
export const getOperationByPk = async (req: Request, res: Response) => {
  const { id } = req.params
  const operation = await Operations.findOne({ where: { id } })
  res.status(200).json({
    msg: 'Operation',
    operation
  })
}

// Modificar operación
export const putOperation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req.body
  await Operations.update(body, { where: { id } })
  const operation = await Operations.findByPk(id)
  res.status(200).json({
    msg: 'putOperation',
    operation
  })
}

// Crear operación
export const createOperation = async (req: Request, res: Response) => {

  const { payment_concept, amount, type, user_id } = req.body;

  const operation = await Operations.build({
    payment_concept,
    amount,
    type,
    user_id
  });
  await operation.save()

  res.status(201).json({
    msg: 'createOperation',
    operation
  })
}

// Eliminar operación
export const deleteOperation = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Operations.destroy({ where: { id } })
  res.status(200).json({
    msg: 'deleteOperation',
    id
  })
}
