import type {Todo} from '../interfaces/todo.js'
import type {Collection} from "mongodb";

class TodoRepository {
    private _todos: Map<number, Todo>
    private _todoCollection: Collection<Todo>

    constructor(todoCollection: Collection<Todo>) {
        this._todos = new Map<number, Todo>()
        this._todoCollection = todoCollection
    }

    public async save(todo: Todo): Promise<void> {
        await this._todoCollection.updateOne(
            {id: todo.id},
            {$set: todo},
            {upsert: true}
        )
    }

    public async delete(id: number): Promise<boolean> {
        const deleteRes = await this._todoCollection.deleteOne(
            {id: id},
        )

        return deleteRes.acknowledged
    }

    public async getById(id: number): Promise<Todo | undefined> {
        const res =  await this._todoCollection.findOne(
            {id: id},
        )

        return res ?? undefined
    }

    public async existsById(id: number): Promise<boolean> {
        const res =  await this._todoCollection.findOne(
            {id: id},
        )

        return !!res
    }

    public async getAll(): Promise<Todo[]> {
        return await this._todoCollection.find({}).toArray()
    }
}

export default TodoRepository