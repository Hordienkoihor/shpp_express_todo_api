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
const collectionUsers = db.collection('users')

const todoRepositoryV3 = new TodoRepositoryV3(collectionTodos)
const todoServiceV3 = new TodoService(todoRepositoryV3)


app.locals.collectionTodos = collectionTodos
app.locals.collectionUsers = collectionUsers


app.use(express.json())

app.use ('/api/v1/items', todoRouterV1)
app.use ('/api/v2/items', todoRouterV2)
app.use('/api/v3/items', makeTodoRouter(todoServiceV3))


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 60000,
        path: '/',
        secure: false
    }
}));


app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT || PORT}`)
})
