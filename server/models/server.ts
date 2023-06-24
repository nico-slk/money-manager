import express, { Application } from 'express';
import operationRouter from '../routes/operations'
import loginRouter from '../routes/login'
import cors from 'cors';

import db from '../db/conection';

class Server {

  private app: Application;
  private port: string;
  private apiPath = {
    operation: '/api/operation',
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
    this.app.use(this.apiPath.operation, operationRouter);
    this.app.use(this.apiPath.login, loginRouter)
  }

  async dbConection() {
    try {
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