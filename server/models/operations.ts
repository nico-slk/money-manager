import { DataTypes } from 'sequelize'
import db from '../db/conection'

const Operations = db.define('operations', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  payment_concept: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('EXPENSES', 'REVENUE'),
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Operations;
