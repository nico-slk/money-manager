import { DataTypes } from 'sequelize'
import db from '../db/conection'

const Operations = db.define('Operations', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true
  },
  payment_concept: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Operations;