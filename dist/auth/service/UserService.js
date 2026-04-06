export default class UserService {
    repository;
    _userRepository;
    constructor(repository) {
        this.repository = repository;
        this._userRepository = repository;
    }
    async add(user) {
        if (user.login.length < 3) {
            throw new Error("Login must be an least 3 characters long");
        }
        if (user.pass.length < 4) {
            throw new Error("Password must be an least 4 characters long");
        }
        await this._userRepository.save(user);
    }
    async findByLogin(login) {
        if (login.length < 3) {
            throw new Error("Login must be an least 3 characters long");
        }
        return await this._userRepository.getByLogin(login);
    }
    async delete(id) {
        await this._userRepository.delete(id);
    }
    async findById(id) {
        return await this._userRepository.getById(id);
    }
    async getAll() {
        return await this._userRepository.getAll();
    }
    async existsById(id) {
        return await this._userRepository.existsById(id);
    }
}
//# sourceMappingURL=UserService.js.map