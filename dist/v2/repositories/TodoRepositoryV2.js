import { readFile, writeFile, appendFile } from 'fs/promises';
class TodoRepositoryV2 {
    _storageName = "todos.txt";
    constructor() {
    }
    async save(todo) {
        const data = await this.read();
        data.push(todo);
        await this.write(data);
    }
    async delete(id) {
        const data = await this.read();
        data.filter((todo) => todo.id !== id);
        await this.write(data);
    }
    async getById(id) {
        const data = await this.read();
        return data.find((todo) => todo.id === id);
    }
    async existsById(id) {
        return await this.getById(id) !== null;
    }
    async getAll() {
        return await this.read();
    }
    async write(todos) {
        try {
            writeFile(this._storageName, JSON.stringify(todos), 'utf-8');
        }
        catch (err) {
            console.error(err);
        }
    }
    async read() {
        try {
            const data = await readFile(this._storageName, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }
}
export default TodoRepositoryV2;
//# sourceMappingURL=TodoRepositoryV2.js.map