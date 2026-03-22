import type { Todo } from '../../interfaces/todo.js';
import type { TodoRepositoryInt } from "../../interfaces/todoRepositoryInt.js";
declare class TodoRepositoryV1 implements TodoRepositoryInt {
    private _todos;
    constructor();
    save(todo: Todo): Promise<void>;
    delete(id: number): Promise<boolean>;
    getById(id: number): Promise<Todo | undefined>;
    existsById(id: number): Promise<boolean>;
    getAll(): Promise<Todo[]>;
}
export default TodoRepositoryV1;
//# sourceMappingURL=TodoRepositoryV1.d.ts.map