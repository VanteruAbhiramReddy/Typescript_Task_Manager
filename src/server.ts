import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

import session from "express-session";
import pgsession from "connect-pg-simple";
import dotenv from 'dotenv'

import db from './shared/db/db.js'; 
import env from './config/env.js';
import errorMiddleware from './shared/Middlewares/error.middleware.js';
import users from './modules/users/users.routes.js';
import tasks from './modules/tasks/tasks.routes.js';

const server = express();
const port = process.env.PORT || 5000;

const PgStore = pgsession(session)


server.use(cors({
    origin : "https://pico-task-craft.lovable.app",
    credentials : true
}))
server.use(helmet())
server.use(express.json())
server.use(cookieParser())

const secret = env.SESSION_SECRET;

server.use(session({

    store: new PgStore({
        pool: db,
        createTableIfMissing: true
    }),

    secret,
    resave: false,
    saveUninitialized: false,

    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

server.use('/tasks',tasks)
server.use('/auth',users)

server.use(errorMiddleware)
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})