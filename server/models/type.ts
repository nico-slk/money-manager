import { DataTypes } from "sequelize";
import db from '../db/conection';

const Type = db.define('types', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
})

export default Type;
