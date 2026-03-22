import type { Todo } from '../../interfaces/todo.js';
import type { Collection } from "mongodb";
import type { TodoRepositoryInt } from "../../interfaces/todoRepositoryInt.js";
declare class TodoRepositoryV3 implements TodoRepositoryInt {
    private _todos;
    private _todoCollection;
    constructor(todoCollection: Collection<Todo>);
    save(todo: Todo): Promise<void>;
    delete(id: number): Promise<boolean>;
    getById(id: number): Promise<Todo | undefined>;
    existsById(id: number): Promise<boolean>;
    getAll(): Promise<Todo[]>;
}
export default TodoRepositoryV3;
//# sourceMappingURL=TodoRepository.d.ts.map