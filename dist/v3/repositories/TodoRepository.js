class TodoRepositoryV3 {
    _todos;
    _todoCollection;
    constructor(todoCollection) {
        this._todos = new Map();
        this._todoCollection = todoCollection;
    }
    async save(todo) {
        await this._todoCollection.updateOne({ id: todo.id }, { $set: todo }, { upsert: true });
    }
    async delete(id) {
        const deleteRes = await this._todoCollection.deleteOne({ id: id });
        return deleteRes.acknowledged;
    }
    async getById(id) {
        const res = await this._todoCollection.findOne({ id: id });
        return res ?? undefined;
    }
    async existsById(id) {
        const res = await this._todoCollection.findOne({ id: id });
        return !!res;
    }
    async getAll() {
        return await this._todoCollection.find({}).toArray();
    }
}
export default TodoRepositoryV3;
//# sourceMappingURL=TodoRepository.js.map