class TodoRepository {
    _todos;
    constructor() {
        this._todos = new Map();
    }
    async save(todo) {
        this._todos.set(todo.id, todo);
    }
    async delete(id) {
        return this._todos.delete(id);
    }
    async getById(id) {
        return this._todos.get(id);
    }
    async existsById(id) {
        return await this.getById(id) !== undefined;
    }
    async getAll() {
        return [...this._todos.values()];
    }
}
export default TodoRepository;
//# sourceMappingURL=TodoRepository.js.map