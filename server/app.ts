import Server from "./models/server";
import dotEnv from 'dotenv';

dotEnv.config();

const server = new Server();

server.listen()