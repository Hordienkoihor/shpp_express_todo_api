import type UserRepository from "../repository/UserRepository.js";
import type User from "../interfaces/User.js";
import type {ObjectId} from "mongodb";
import type UserDto from "../interfaces/user.dto.js";

export default class UserService {
    private _userRepository: UserRepository;

    constructor(readonly repository: UserRepository) {
        this._userRepository = repository;
    }

    public async add(dto: UserDto): Promise<void> {
        if (dto.login.length < 3) {
            throw new Error("Login must be an least 3 characters long");
        }

        if (dto.pass.length < 4) {
            throw new Error("Password must be an least 4 characters long");
        }

        const user:User = {
            login: dto.login,
            pass: dto.pass,
            todos: []
        } as User;
        await this._userRepository.save(user);
    }

    public async findByLogin(login: string): Promise<User | undefined> {
        if (login.length < 3) {
            throw new Error("Login must be an least 3 characters long");
        }

        return await this._userRepository.getByLogin(login);
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

    public async update(user: User): Promise<void> {
        await this._userRepository.save(user);
    }


}