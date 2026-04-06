import type { Collection, ObjectId } from "mongodb";
import type User from "../interfaces/User.js";
import type UserDto from "../interfaces/user.dto.js";
export default class UserRepository {
    private _userCollection;
    constructor(userCollection: Collection<User>);
    save(user: UserDto): Promise<void>;
    delete(id: ObjectId): Promise<boolean>;
    getById(id: ObjectId): Promise<User | undefined>;
    getByLogin(login: string): Promise<User | undefined>;
    existsById(id: ObjectId): Promise<boolean>;
    getAll(): Promise<User[]>;
}
//# sourceMappingURL=UserRepository.d.ts.map