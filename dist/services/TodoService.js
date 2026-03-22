/**
 * service handling core logic of operations with todos
 *
 * */
class TodoService {
    _todoRepository;
    _idGenerator = 1;
    /**
     * @repository TodoRepositoryV2
     * */
    constructor(repository) {
        this._todoRepository = repository;
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
    async add(dto) {
        if (this._idGenerator === 1) {
            const data = await this._todoRepository.getAll();
            this._idGenerator = data.length + 1;
        }
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
    /**
     * @dto: TodoDto type object
     *
     * @return promise of an object like
     * {
     *     ok: boolean
     * }
     * */
    async update(dto) {
        if (await this._todoRepository.existsById(dto.id)) {
            try {
                await this._todoRepository.save(dto);
                return { ok: true };
            }
            catch (error) {
                console.error(error);
            }
        }
        return { ok: false };
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
    /**
     * @return promise of an array of todos
     * */
    async getAll() {
        return await this._todoRepository.getAll();
    }
    /**
     * @id: todos id
     *
     * @return promise of a boolean true if found with such id - false if didn't find
     * */
    async existsById(id) {
        return await this._todoRepository.existsById(id);
    }
}
export default TodoService;
//# sourceMappingURL=TodoService.js.map