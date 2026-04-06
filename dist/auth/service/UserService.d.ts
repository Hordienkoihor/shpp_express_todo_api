import type UserRepository from "../repository/UserRepository.js";
import type User from "../interfaces/User.js";
import type { ObjectId } from "mongodb";
import type UserDto from "../interfaces/user.dto.js";
export default class UserService {
    readonly repository: UserRepository;
    private _userRepository;
    constructor(repository: UserRepository);
    add(user: UserDto): Promise<void>;
    findByLogin(login: string): Promise<User | undefined>;
    delete(id: ObjectId): Promise<void>;
    findById(id: ObjectId): Promise<User | undefined>;
    getAll(): Promise<User[]>;
    existsById(id: ObjectId): Promise<boolean>;
}
//# sourceMappingURL=UserService.d.ts.map