import { Sequelize } from 'sequelize'

const db = new Sequelize('money_manager', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  dialectOptions: {
    supportBigNumbers: true
  }
});

export default db;