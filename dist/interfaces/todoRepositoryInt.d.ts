import type { Todo } from "./todo.js";
export interface TodoRepositoryInt {
    save(todo: Todo): Promise<void>;
    delete(id: number): Promise<boolean>;
    getById(id: number): Promise<Todo | undefined>;
    existsById(id: number): Promise<boolean>;
    getAll(): Promise<Todo[]>;
}
//# sourceMappingURL=todoRepositoryInt.d.ts.map