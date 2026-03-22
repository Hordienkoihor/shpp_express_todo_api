import type {Todo} from '../../interfaces/todo.js'
import type {TodoRepositoryInt} from "../../interfaces/todoRepositoryInt.js";
import {readFile, writeFile, appendFile} from 'fs/promises';


class TodoRepositoryV2 implements TodoRepositoryInt {
    private _storageName = "todos.txt"
    constructor() {
    }

    public async save(todo: Todo): Promise<void> {
        const data = await this.read()

        data.push(todo)
        await this.write(data)
    }

    public async delete(id: number): Promise<any> {
        const data = await this.read()

        data.filter((todo) => todo.id !== id)
        await this.write(data)
    }

    public async getById(id: number): Promise<Todo | undefined> {
        const data = await this.read()

        return data.find((todo) => todo.id === id)
    }

    public async existsById(id: number): Promise<boolean> {
        return await this.getById(id) !== null
    }

    public async getAll(): Promise<Todo[]> {
        return await this.read()
    }

    private async write(todos: Todo[]) {
        try {
            writeFile(this._storageName, JSON.stringify(todos), 'utf-8')
        } catch (err) {
            console.error(err)
        }
    }

    private async read(): Promise<Todo[]> {
        try {
            const data = await readFile(this._storageName, 'utf8')
            return JSON.parse(data) as Todo[]
        } catch (error) {
            console.error(error)
            return [];
        }
    }
}

export default TodoRepositoryV2