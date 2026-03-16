import type {Todo} from '../interfaces/todo.js'

export class TodoRepository {
    private _todos: Map<number, Todo>

    constructor() {
        this._todos = new Map<number, Todo>()
    }

    public async save(todo: Todo):Promise<void> {
        this._todos.set(todo.id, todo)
    }

    public async delete(id: number): Promise<boolean> {
        return this._todos.delete(id)
    }
}