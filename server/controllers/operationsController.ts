import { Request, Response } from "express"
import Operations from "../models/operations"

// Obtener todos las operaciones
export const getAllOperations = async (req: Request, res: Response) => {
  const operationList = await Operations.findAll()
  res.json({
    msg: 'All Operations',
    operationList
  })
}

// Obtener las operaciones paginadas
export const getPaginateOperations = async (req: Request, res: Response) => {
  const { offset, limit } = req.query
  const page = parseInt(offset as string)
  const pageSize = parseInt(limit as string)
  const operationList = await Operations.findAndCountAll({ limit: pageSize, offset: page })
  res.json({
    msg: 'Paginate Operations',
    operationList
  })
}

// Obtener todos los Ingresos
export const getRevenuesOperations = async (req: Request, res: Response) => {
  const revenuesOperations = await Operations.findAll({ where: { type: "REVENUE" } })
  res.json({
    msg: 'Revenue Operations',
    revenuesOperations
  })
}

// Obtener todos los Egresos
export const getExpensesOperations = async (req: Request, res: Response) => {
  const expensesOperations = await Operations.findAll({ where: { type: "EXPENSES" } })
  res.json({
    msg: 'Expenses Operations',
    expensesOperations
  })
}

// Obtener operación por su ID
export const getOperationByPk = async (req: Request, res: Response) => {
  const { id } = req.params
  const operation = await Operations.findOne({ where: { id } })
  res.json({
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
  res.json({
    msg: 'putOperation',
    operation
  })
}

// Crear operación
export const createOperation = async (req: Request, res: Response) => {

  const { body } = req;

  const operation = await Operations.build(body);
  await operation.save()

  res.json({
    msg: 'createOperation',
    body
  })
}

// Eliminar operación
export const deleteOperation = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Operations.destroy({ where: { id } })
  res.json({
    msg: 'deleteOperation',
    id
  })
}
