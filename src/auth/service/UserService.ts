import type UserRepository from "../repository/UserRepository.js";
import type User from "../interfaces/User.js";
import type {ObjectId} from "mongodb";

export default class UserService {
    private _userRepository: UserRepository;

    constructor(readonly repository: UserRepository) {
        this._userRepository = repository;
    }

    public async add(user: User): Promise<void> {
        if (user.login.length < 3) {
            throw new Error("Login must be an least 3 characters long");
        }

        if (user.pass.length < 4) {
            throw new Error("Password must be an least 4 characters long");
        }

        await this._userRepository.save(user);
    }

    public async delete(id: ObjectId): Promise<void> {
        await this._userRepository.delete(id);
    }

    public async findById(id: ObjectId): Promise<User | undefined> {
        return await this._userRepository.getById(id)
    }

    public async getAll(): Promise<User[]> {
        return await this._userRepository.getAll();
    }

    public async existsById(id: ObjectId): Promise<boolean> {
        return await this._userRepository.existsById(id);
    }


}