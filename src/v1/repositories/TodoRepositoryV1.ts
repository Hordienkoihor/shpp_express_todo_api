import type {Todo} from '../../interfaces/todo.js'
import type {TodoRepositoryInt} from "../../interfaces/todoRepositoryInt.js";

class TodoRepositoryV1 implements TodoRepositoryInt{
    private _todos: Map<number, Todo>

    constructor() {
        this._todos = new Map<number, Todo>()
    }

    public async save(todo: Todo): Promise<void> {
        this._todos.set(todo.id, todo)
    }

    public async delete(id: number): Promise<boolean> {
        return this._todos.delete(id)
    }

    public async getById(id: number): Promise<Todo | undefined> {
        return this._todos.get(id)
    }

    public async existsById(id: number): Promise<boolean> {
        return await this.getById(id) !== undefined
    }

    public async getAll(): Promise<Todo[]> {
        return [...this._todos.values()]
    }
}

export default TodoRepositoryV1