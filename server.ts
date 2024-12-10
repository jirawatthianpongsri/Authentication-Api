import dotenv from 'dotenv';
import app from './api/app';
import { ConnectDatabase } from './api/config/DB';
import { server } from './class/server/server';

dotenv.config({path:'./.env'});

const PORT:number = Number(process.env.APP_PORT) || 3000;

const Server = new server(PORT,app,ConnectDatabase);
