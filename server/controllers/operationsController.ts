import { Request, Response } from "express"
import Operations from "../models/operations"
import User from "../models/user"


// Obtener todos las operaciones segun ID de Usuario
export const getAllOperationsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const operationList = await Operations.findAll({ where: { user_id: userId } })
    const user = await User.findByPk(userId)
    const userName = user?.getDataValue('userName')

    res.status(200).json({
      msg: `All operations from user with Name: ${userName}`,
      operationList
    })

  } catch (error) {
    res.status(500).json({ error })
  }
}

// Obtener las operaciones paginadas por ID de usuario
export const getPaginateOperationsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params
  const { offset, limit } = req.query
  const page = parseInt(offset as string)
  const pageSize = parseInt(limit as string)
  try {
    const operationList = await Operations.findAndCountAll({
      where: {
        user_id: userId
      },
      limit: pageSize,
      offset: page
    })

    res.status(200).json({
      msg: `All operations list of page ${page} from user with ID ${userId}`,
      operationList
    })

  } catch (error) {
    res.status(500).json({ error })
  }
}

// Obtener todos los Ingresos por ID de usuario
export const getRevenuesOperationsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params
  const { offset, limit } = req.query
  const page = parseInt(offset as string)
  const pageSize = parseInt(limit as string)
  try {
    const revenuesOperations = await Operations.findAndCountAll({
      where: {
        user_id: userId,
        type: "REVENUE"
      },
      limit: pageSize,
      offset: page
    })
    res.status(200).json({
      msg: `All revenues list of page ${page} from user with ID ${userId}`,
      revenuesOperations
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

// Obtener todos los Egresos por ID de usuario
export const getExpensesOperationsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params
  const { offset, limit } = req.query
  const page = parseInt(offset as string)
  const pageSize = parseInt(limit as string)
  try {
    const expensesOperations = await Operations.findAndCountAll({
      where: {
        user_id: userId,
        type: "EXPENSES"
      },
      limit: pageSize,
      offset: page
    })

    res.status(200).json({
      msg: `All expenses list of page ${page} from user with ID ${userId}`,
      expensesOperations
    })

  } catch (error) {
    res.status(500).json({ error })
  }
}

// Obtener operación por su ID
export const getOperationById = async (req: Request, res: Response) => {
  const { userId, operationId } = req.params
  try {
    const operation = await Operations.findOne({
      where: {
        user_id: userId,
        id: operationId
      }
    })

    res.status(200).json({
      msg: `Operation with ID: ${operationId} from user with ID: ${userId}`,
      operation
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

// Modificar operación
export const putOperation = async (req: Request, res: Response) => {
  const { userId, operationId } = req.params
  const { body } = req
  try {
    await Operations.update(body, {
      where: {
        user_id: userId,
        id: operationId
      }
    })
    const operation = await Operations.findByPk(operationId)

    res.status(200).json({
      msg: `Operation with ID: ${operationId} from user with ID: ${userId} has been modify`,
      operation
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

// Crear operación
export const createOperation = async (req: Request, res: Response) => {

  const { payment_concept, amount, type, user_id } = req.body;
  try {
    const operation = await Operations.build({
      payment_concept,
      amount,
      type,
      user_id
    });
    const op = await operation.save()

    res.status(201).json({
      msg: `Operation ${type} has been created with ID: ${operation.getDataValue('id')}`,
      operation
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

// Eliminar operación
export const deleteOperation = async (req: Request, res: Response) => {
  const { userId, operationId } = req.params
  try {
    await Operations.destroy({
      where: {
        user_id: userId,
        id: operationId
      }
    })

    res.status(200).json({
      msg: `Operation with ID: ${operationId} from user with ID: ${userId} has been deleted`,
      operationId
    })

  } catch (error) {
    res.status(500).json({ error })
  }
}
