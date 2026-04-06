import type {Todo} from "../../interfaces/todo.js";
import type {ObjectId} from "mongodb";

export default interface User {
    _id: ObjectId;
    login: string
    pass: string
    todos: Todo[]
}