import type TodoRepositoryV3 from "../v3/repositories/TodoRepository.js";
import type {Todo} from "../interfaces/todo.js";
import type {TodoCreationDto} from "../interfaces/todo-creation.dto.js";
import type {TodoDto} from "../interfaces/todo.dto.js";
import type {TodoRepositoryInt} from "../interfaces/todoRepositoryInt.js";

/**
 * service handling core logic of operations with todos
 *
 * */
class TodoService {
    private _todoRepository: TodoRepositoryInt
    private _idGenerator: number = 1

    /**
     * @repository TodoRepositoryV2
     * */
    constructor(repository: TodoRepositoryInt) {
        this._todoRepository = repository

    }

    /**
     * @dto: TodoCreationDto type object
     *
     * creates object with unique id and checked status false
     * {
     *     id: number
     *     text: string
     *     checked: false
     * }
     * passes it to the repository
     *
     * @return Promise of an object like:
     * {
     *     id: number
     * }
     * */
    public async add(dto: TodoCreationDto) {
        if (this._idGenerator === 1) {
            const data = await this._todoRepository.getAll()
            this._idGenerator = data.length + 1
        }

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

    /**
     * @dto: TodoDto type object
     *
     * @return promise of an object like
     * {
     *     ok: boolean
     * }
     * */
    public async update(dto: TodoDto) {
        if (await this._todoRepository.existsById(dto.id)) {

            try {
                await this._todoRepository.save(dto)
                return {ok: true}
            } catch (error) {
                console.error(error)
            }
        }

        return {ok: false}
    }

    /**
     * @id: number
     *
     * deletes some todo if it exists in repo
     *
     * @return promise of an object like
     * {
     *     ok: boolean
     * }
     * */
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

    /**
     * @return promise of an array of todos
     * */
    public async getAll(): Promise<Todo[]> {
        return await this._todoRepository.getAll()
    }

    /**
     * @id: todos id
     *
     * @return promise of a boolean true if found with such id - false if didn't find
     * */
    public async existsById(id: number): Promise<boolean> {
        return await this._todoRepository.existsById(id)
    }

}

export default TodoService