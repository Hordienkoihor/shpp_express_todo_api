import express from "express";
import TodoService from "../services/TodoService.js";
import TodoRepository from "../repositories/TodoRepository.js";
import type {TodoCreationDto} from "../interfaces/todo-creation.dto.js";
import type {Todo} from "../interfaces/todo.js";


const todoRouter = express.Router()
const todoService = new TodoService(new TodoRepository());

todoRouter.post('', async (req, res) => {
    const dto: TodoCreationDto = req.body

    if (!dto) {
        return res.status(400).json({error: 'text is required'})
    }

    try {
        const result = await todoService.add(dto)

        if (!result) {
            return res.status(500).json({message: 'failed to save'})
        }

        res.status(200).json(result)
    } catch (error) {
        res.send({status: 500, message: "internal server error"})
    }
})

todoRouter.get('', async (req, res) => {
        try {
            const todos: Todo[] = await todoService.getAll()

            return res.status(200).json({items: todos})

        } catch (e) {
            return res.status(500).json({error: 'internal server error'})
        }


    }
)

export default todoRouter