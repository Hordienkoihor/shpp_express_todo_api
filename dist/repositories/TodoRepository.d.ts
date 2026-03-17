import type { Todo } from '../interfaces/todo.js';
declare class TodoRepository {
    private _todos;
    constructor();
    save(todo: Todo): Promise<void>;
    delete(id: number): Promise<boolean>;
    getById(id: number): Promise<Todo | undefined>;
    existsById(id: number): Promise<boolean>;
    getAll(): Promise<Todo[]>;
}
export default TodoRepository;
//# sourceMappingURL=TodoRepository.d.ts.map