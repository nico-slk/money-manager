import express, { Application } from 'express';
import cors from 'cors';
import operationRouter from '../routes/operationsRoutes'
import loginRouter from '../routes/auth'
import userRouter from '../routes/userRoutes'
import '../models/operations.js'
import '../models/user.js'

import db from '../db/conection';

class Server {

  private app: Application;
  private port: string;
  private apiPath = {
    operation: '/api/operation',
    user: '/api/user',
    login: '/api/login'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8090';
    this.middlware()
    this.routes()
    this.dbConection()
  }

  middlware() {
    this.app.use(cors())

    this.app.use(express.json())

    this.app.use(express.static('public'))

  }

  routes() {
    this.app.use(this.apiPath.login, loginRouter)
    this.app.use(this.apiPath.operation, operationRouter);
    this.app.use(this.apiPath.user, userRouter)
  }

  async dbConection() {
    try {
      await db.sync()
      await db.authenticate();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on port: ${this.port}`);

    })
  }

}

export default Server;