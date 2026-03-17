import type TodoRepository from "../repositories/TodoRepository.js";
import type { Todo } from "../interfaces/todo.js";
import type { TodoCreationDto } from "../interfaces/todo-creation.dto.js";
import type { TodoDto } from "../interfaces/todo.dto.js";
declare class TodoService {
    private _todoRepository;
    private _idGenerator;
    constructor(repository: TodoRepository);
    add(dto: TodoCreationDto): Promise<{
        id: number;
    } | undefined>;
    update(todo: TodoDto): Promise<{
        ok: boolean;
    }>;
    delete(id: number): Promise<{
        ok: boolean;
    }>;
    getAll(): Promise<Todo[]>;
}
export default TodoService;
//# sourceMappingURL=TodoService.d.ts.map