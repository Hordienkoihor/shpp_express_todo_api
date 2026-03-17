import type TodoRepository from "../repositories/TodoRepository.js";
import type {Todo} from "../interfaces/todo.js";
import type {TodoCreationDto} from "../interfaces/todo-creation.dto.js";
import type {TodoDto} from "../interfaces/todo.dto.js";

class TodoService {
    private _todoRepository: TodoRepository
    private _idGenerator: number = 1

    constructor(repository: TodoRepository) {
        this._todoRepository = repository
    }

    public async add(dto: TodoCreationDto) {
        if (dto.text.length < 1) {
            throw new Error("todo must contain some value")
        }

        const todo: Todo = {
            id: this._idGenerator++,
            text: dto.text,
            checked: false
        }

        try {
            await this._todoRepository.save(todo)
            return {id: todo.id}
        } catch (error) {
            console.error(error)
        }
    }

    public async update(todo: TodoDto) {
        if (await this._todoRepository.existsById(todo.id)) {

            try {
                await this._todoRepository.save(todo)
                return {ok: true}
            } catch (error) {
                console.error(error)
            }
        }

        return {ok: false}
    }

    public async delete(id: number) {
        let successDeletion: boolean;

        try {
            successDeletion = await this._todoRepository.delete(id)
            if (successDeletion) {
                return {ok: true}
            }
        } catch (error) {
            console.error(error)
        }


        return {ok: false}
    }

    public async getAll(): Promise<Todo[]> {
        return await this._todoRepository.getAll()
    }

}

export default TodoService