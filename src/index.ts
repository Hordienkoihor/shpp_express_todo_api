import express from 'express';
import todoRouterV1 from "./v1/routers/todoRouterV1.js";
import {MongoClient} from "mongodb";
import TodoRepositoryV3 from "./v3/repositories/TodoRepository.js";
import type {Todo} from "./interfaces/todo.js";
import TodoService from "./services/TodoService.js";
import makeTodoRouter from "./v3/routers/todoRouter.js";
import dotenv from "dotenv";
import todoRouterV2 from "./v2/routers/todoRouterV2.js";
import cors from 'cors';
import session from "express-session";
import type {Request, Response, NextFunction} from 'express';
import AuthenticationRouter from "./auth/router/AuthenticationRouter.js";
import UserService from "./auth/service/UserService.js";
import UserRepository from "./auth/repository/UserRepository.js";
import type User from "./auth/interfaces/User.js";
import MongoStore from "connect-mongo";
import makeUserTodoRouter from "./userTodoRouter/routers/userTodoRouter.js";


dotenv.config()
const dbConnectionString = process.env.ATLAS_URI!
const mongoClient = new MongoClient(dbConnectionString);

const app = express()
const PORT = 3000

/*host front*/
app.use(express.static("public"))

/*enable cors*/
app.use(cors({
    credentials: true,
    origin: `http://localhost:${process.env.PORT || PORT}`,
}))

/*set up mongo client and dbs*/
await mongoClient.connect()
console.log("Connected to mongodb")



const db = mongoClient.db('todo_db')
const collectionTodos = db.collection<Todo>('todos')
const collectionUsers = db.collection<User>('users')

const todoRepositoryV3 = new TodoRepositoryV3(collectionTodos)
const todoServiceV3 = new TodoService(todoRepositoryV3)


app.locals.collectionTodos = collectionTodos
app.locals.collectionUsers = collectionUsers


app.use(express.json())

const userService = new UserService(new UserRepository(collectionUsers))

app.use(session({
    secret: 'keyboard cat',
    store: MongoStore.create(db),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 600000,
        path: '/',
        secure: false
    }
}));

app.use(async (req: Request, res: Response, next: NextFunction) => {
    if ((req.path === '/api/v1/login' || req.path === '/api/v1/register')  && req.method === 'POST') {
        return next();
    }

    if (req.session && req.session.userId) {
        const user = await userService.findById(req.session.userId);
        console.log(user);

        if (user) {
            return next();
        }
    }

    return res.status(401).json({error: "Unauthorized"});
})

const authRouter = new AuthenticationRouter(userService);
app.use('/api/v1', authRouter.get());
app.use('/api/v1/items', makeUserTodoRouter(userService));

// app.use('/api/v1/items', todoRouterV1)
// app.use('/api/v2/items', todoRouterV2)
// app.use('/api/v3/items', makeTodoRouter(todoServiceV3))





app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT || PORT}`)
})
