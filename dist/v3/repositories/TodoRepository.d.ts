import type { Todo } from '../../interfaces/todo.js';
import type { Collection } from "mongodb";
declare class TodoRepository {
    private _todos;
    private _todoCollection;
    constructor(todoCollection: Collection<Todo>);
    save(todo: Todo): Promise<void>;
    delete(id: number): Promise<boolean>;
    getById(id: number): Promise<Todo | undefined>;
    existsById(id: number): Promise<boolean>;
    getAll(): Promise<Todo[]>;
}
export default TodoRepository;
//# sourceMappingURL=TodoRepository.d.ts.map