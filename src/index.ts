import express from 'express'
import todoRouter from "./v1/routers/todoRouter.js";
import {MongoClient} from "mongodb";
import TodoRepository from "./v3/repositories/TodoRepository.js";
import type {Todo} from "./interfaces/todo.js";
import TodoService from "./v3/services/TodoService.js";
import makeTodoRouter from "./v3/routers/todoRouter.js";
import dotenv from "dotenv";


dotenv.config()
const dbConnectionString = process.env.ATLAS_URI!
const mongoClient = new MongoClient(dbConnectionString);

const app = express()
const PORT = 3000

await mongoClient.connect()
console.log("Connected to mongodb")


const db = mongoClient.db('todo_db')
const collectionTodos = db.collection<Todo>('todos')
const collectionUsers = db.collection('users')

const todoRepository = new TodoRepository(collectionTodos)
const todoService = new TodoService(todoRepository)


app.locals.collectionTodos = collectionTodos
app.locals.collectionUsers = collectionUsers


app.use(express.json())

app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT || PORT}`)
})

app.use ('/api/v1/items', todoRouter)
app.use('/api/v3/items', makeTodoRouter(todoService))
