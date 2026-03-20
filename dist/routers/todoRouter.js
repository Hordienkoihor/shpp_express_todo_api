import express from "express";
import TodoService from "../services/TodoService.js";
import TodoRepository from "../repositories/TodoRepository.js";
import todoRepository from "../repositories/TodoRepository.js";
function makeTodoRouter(todoService) {
    const todoRouter = express.Router();
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
    todoRouter.post('', async (req, res) => {
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
    todoRouter.get('', async (req, res) => {
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
    todoRouter.put('', async (req, res) => {
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
    todoRouter.delete('', async (req, res) => {
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
    return todoRouter;
}
export default makeTodoRouter;
//# sourceMappingURL=todoRouter.js.map