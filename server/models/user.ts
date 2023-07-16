import { DataTypes } from "sequelize";
import db from '../db/conection'
import Operations from "./operations";
import Reason from "./reason";

const User = db.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  },
  userName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

User.hasMany(Operations, {
  foreignKey: 'user_id',
  sourceKey: 'id'
})

Operations.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
})

User.hasMany(Reason, {
  foreignKey: 'user_id',
  sourceKey: 'id'
})

Reason.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
})

User.prototype.toJSON = function () {
  const { password, ...user } = this.get();
  return user;
};

export default User;