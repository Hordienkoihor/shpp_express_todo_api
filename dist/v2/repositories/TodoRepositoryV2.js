import { readFile, writeFile, appendFile } from 'fs/promises';
class TodoRepositoryV2 {
    _storageName = "todos.txt";
    constructor() {
    }
    async save(todo) {
        const data = await this.read();
        let exist;
        for (const item of data) {
            if (item.id === todo.id) {
                exist = true;
                item.text = todo.text;
                item.checked = todo.checked;
                await this.write(data);
                return;
            }
        }
        data.push(todo);
        await this.write(data);
    }
    async delete(id) {
        const data = await this.read();
        const toWrite = data.filter((todo) => todo.id !== id);
        try {
            await this.write(toWrite);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async getById(id) {
        const data = await this.read();
        return data.find((todo) => todo.id === id);
    }
    async existsById(id) {
        return await this.getById(id) !== undefined;
    }
    async getAll() {
        return await this.read();
    }
    async write(todos) {
        try {
            await writeFile(this._storageName, JSON.stringify(todos), 'utf-8');
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