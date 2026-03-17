class TodoService {
    _todoRepository;
    _idGenerator = 1;
    constructor(repository) {
        this._todoRepository = repository;
    }
    async add(dto) {
        if (dto.text.length < 1) {
            throw new Error("todo must contain some value");
        }
        const todo = {
            id: this._idGenerator++,
            text: dto.text,
            checked: false
        };
        try {
            await this._todoRepository.save(todo);
            return { id: todo.id };
        }
        catch (error) {
            console.error(error);
        }
    }
    async update(todo) {
        if (await this._todoRepository.existsById(todo.id)) {
            try {
                await this._todoRepository.save(todo);
                return { ok: true };
            }
            catch (error) {
                console.error(error);
            }
        }
        return { ok: false };
    }
    async delete(id) {
        let successDeletion;
        try {
            successDeletion = await this._todoRepository.delete(id);
            if (successDeletion) {
                return { ok: true };
            }
        }
        catch (error) {
            console.error(error);
        }
        return { ok: false };
    }
}
export default TodoService;
//# sourceMappingURL=TodoService.js.map