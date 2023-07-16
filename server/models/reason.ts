import { DataTypes } from "sequelize";
import db from '../db/conection';

const Reason = db.define('reasons', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
})

export default Reason;