import express from "express";
import TodoService from "../../services/TodoService.js";
import type {TodoCreationDto} from "../../interfaces/todo-creation.dto.js";
import type {Todo} from "../../interfaces/todo.js";
import type {TodoDto} from "../../interfaces/todo.dto.js";
import type UserService from "../../auth/service/UserService.js";
import {ObjectId} from "mongodb";

function makeUserTodoRouter(userService: UserService) {
    const todoRouter = express.Router()

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
        const dto: TodoCreationDto = req.body

        if (!dto || !dto.text) {
            return res.status(400).json({error: 'text is required'})
        }

        const userId = new ObjectId(req.session.userId)

        try {
            const user = await userService.findById(userId)

            if (!user) {
                return res.status(400).json({error: 'user not found'})
            }

            console.log(user)
            const id = user.todos.length;

            const todo: TodoDto = {
                id: id,
                text: dto.text,
                checked: false
            }

            user.todos.push(todo)

            const result = await userService.update(user)

            return res.status(200).json({ok: true})
        } catch (error) {
            console.log(error)
            res.send({status: 500, message: "internal server error"})
        }
    })

    /**
     * get method handler
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
                const user = await userService.findById(new ObjectId(req.session.userId))

                if (!user) {
                    return res.status(400).json({error: 'user not found'})
                }


                return res.status(200).json({items: user.todos})

            } catch (e) {
                return res.status(500).json({error: 'internal server error'})
            }
        }
    )

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
        const dto: {id: number, text?: string, checked?: boolean} = req.body

        if (!dto) {
            return res.status(400).json({error: 'need to pass todo object'})
        }

        const userId = new ObjectId(req.session.userId)
        const user = await userService.findById(userId)

        if (!user) {
            return res.status(400).json({error: 'user not found'})
        }


        if (user.todos.filter(t => t.id == dto.id).length == 0) {
            return res.status(400).json({error: `todo with id= ${dto.id} not found`})
        }


        try {
            user.todos = user.todos.map(t => {
                if (t.id == dto.id) {
                    t.text = dto.text ? dto.text : t.text;
                    t.checked = dto.checked ? dto.checked : t.checked;
                }

                return t;
            })

            await userService.update(user)

            return res.status(200).json(dto)
        } catch (error) {
            return res.status(500).json({error: 'internal server error'})
        }
    })

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
        const id: number = req.body.id;

        if (!id) {
            return res.status(400).json({error: 'id is required'})
        }

        const userId = new ObjectId(req.session.userId)
        const user = await userService.findById(userId)

        if (!user) {
            return res.status(400).json({error: 'user not found'})
        }

        try {
            user.todos = user.todos.filter(t => t.id != id)


            await userService.update(user)

            return res.status(404).json(id)
        } catch (e) {
            return res.status(500).json({error: 'internal server error'})
        }
    })

    return todoRouter
}


export default makeUserTodoRouter