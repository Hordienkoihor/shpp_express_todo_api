import type {Todo} from "../../interfaces/todo.js";

export default interface User {
    login: string
    pass: string
    todos: Todo[]
}