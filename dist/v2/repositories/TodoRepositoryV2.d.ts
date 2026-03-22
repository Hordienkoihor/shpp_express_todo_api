import type { Todo } from '../../interfaces/todo.js';
import type { TodoRepositoryInt } from "../../interfaces/todoRepositoryInt.js";
declare class TodoRepositoryV2 implements TodoRepositoryInt {
    private _storageName;
    constructor();
    save(todo: Todo): Promise<void>;
    delete(id: number): Promise<any>;
    getById(id: number): Promise<Todo | undefined>;
    existsById(id: number): Promise<boolean>;
    getAll(): Promise<Todo[]>;
    private write;
    private read;
}
export default TodoRepositoryV2;
//# sourceMappingURL=TodoRepositoryV2.d.ts.map