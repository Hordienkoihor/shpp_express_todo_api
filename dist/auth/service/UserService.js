export default class UserService {
    repository;
    _userRepository;
    constructor(repository) {
        this.repository = repository;
        this._userRepository = repository;
    }
    async add(dto) {
        if (dto.login.length < 3) {
            throw new Error("Login must be an least 3 characters long");
        }
        if (dto.pass.length < 4) {
            throw new Error("Password must be an least 4 characters long");
        }
        const user = {
            login: dto.login,
            pass: dto.pass,
            todos: []
        };
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
    async update(user) {
        await this._userRepository.save(user);
    }
}
//# sourceMappingURL=UserService.js.map