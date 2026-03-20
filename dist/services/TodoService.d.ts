import type TodoRepository from "../repositories/TodoRepository.js";
import type { Todo } from "../interfaces/todo.js";
import type { TodoCreationDto } from "../interfaces/todo-creation.dto.js";
import type { TodoDto } from "../interfaces/todo.dto.js";
/**
 * service handling core logic of operations with todos
 *
 * */
declare class TodoService {
    private _todoRepository;
    private _idGenerator;
    /**
     * @repository TodoRepository
     * */
    constructor(repository: TodoRepository);
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
    add(dto: TodoCreationDto): Promise<{
        id: number;
    } | undefined>;
    /**
     * @dto: TodoDto type object
     *
     * @return promise of an object like
     * {
     *     ok: boolean
     * }
     * */
    update(dto: TodoDto): Promise<{
        ok: boolean;
    }>;
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
    delete(id: number): Promise<{
        ok: boolean;
    }>;
    /**
     * @return promise of an array of todos
     * */
    getAll(): Promise<Todo[]>;
    /**
     * @id: todos id
     *
     * @return promise of a boolean true if found with such id - false if didn't find
     * */
    existsById(id: number): Promise<boolean>;
}
export default TodoService;
//# sourceMappingURL=TodoService.d.ts.map