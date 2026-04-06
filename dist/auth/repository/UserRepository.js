export default class UserRepository {
    _userCollection;
    constructor(userCollection) {
        this._userCollection = userCollection;
    }
    async save(user) {
        await this._userCollection.updateOne({ login: user.login }, { $set: user }, { upsert: true });
    }
    async delete(id) {
        const deleteRes = await this._userCollection.deleteOne({ _id: id });
        return deleteRes.acknowledged;
    }
    async getById(id) {
        const res = await this._userCollection.findOne({ _id: id });
        return res ?? undefined;
    }
    async getByLogin(login) {
        const res = await this._userCollection.findOne({ login: login });
        return res ?? undefined;
    }
    async existsById(id) {
        const res = await this._userCollection.findOne({ _id: id });
        return !!res;
    }
    async getAll() {
        return await this._userCollection.find({}).toArray();
    }
}
//# sourceMappingURL=UserRepository.js.map