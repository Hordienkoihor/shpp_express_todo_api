import express from "express";
import TodoService from "../../services/TodoService.js";
import TodoRepositoryV1 from "../repositories/TodoRepositoryV1.js";
import todoRepository from "../repositories/TodoRepositoryV1.js";
const todoRouterV1 = express.Router();
const todoService = new TodoService(new TodoRepositoryV1());
/**
 * post method handler
 * @req - expects body containing object with type line TodoCreationDto:
 * {
 *     text: string
 * }
 *
 * @return response with status 500 and body containing:
 * {
 *     id: number
 * }
 * */
todoRouterV1.post('', async (req, res) => {
    const dto = req.body;
    if (!dto) {
        return res.status(400).json({ error: 'text is required' });
    }
    try {
        const result = await todoService.add(dto);
        if (!result) {
            return res.status(500).json({ message: 'failed to save' });
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.send({ status: 500, message: "internal server error" });
    }
});
/**
 * put method handler
 * @return response with status 500 and array of objects like:
 * {
 *     id: number
 *     text: string
 *     checked: false
 * }
 *
 * */
todoRouterV1.get('', async (req, res) => {
    try {
        const todos = await todoService.getAll();
        return res.status(200).json({ items: todos });
    }
    catch (e) {
        return res.status(500).json({ error: 'internal server error' });
    }
});
/**
 * updates post request
 * @req - expects body containing object with type line TodoCreationDto:
 * {
 *     text: string
 * }
 *
 *
 * @return response with status 500 and body containing:
 * {
 *     id: number
 * }
 * */
todoRouterV1.put('', async (req, res) => {
    const todo = req.body;
    if (!todo) {
        return res.status(400).json({ error: 'need to pass todo object' });
    }
    if (!await todoService.existsById(todo.id)) {
        return res.status(400).json({ error: `todo with id= ${todo.id} not found` });
    }
    try {
        return await todoService.update(todo);
    }
    catch (error) {
        return res.status(500).json({ error: 'internal server error' });
    }
});
/**
 * handles delete request
 * @req - expects body containing object with type line:
 * {
 *     id: number
 * }
 *
 *
 * @return response with status 500 and body containing:
 * {
 *     ok: boolean
 * }
 * */
todoRouterV1.delete('', async (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(400).json({ error: 'id is required' });
    }
    try {
        let deleteResult = await todoService.delete(id);
        if (deleteResult.ok) {
            return res.status(200).json(deleteResult);
        }
        return res.status(404).json(deleteResult);
    }
    catch (e) {
        return res.status(500).json({ error: 'internal server error' });
    }
});
export default todoRouterV1;
//# sourceMappingURL=todoRouterV1.js.map