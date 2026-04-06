import type {Collection, Document, ObjectId} from "mongodb";
import type User from "../interfaces/User.js";
import type {Todo} from "../../interfaces/todo.js";
import type UserDto from "../interfaces/user.dto.js";

export default class UserRepository {
    private _userCollection: Collection<User>;

    public constructor(userCollection:Collection<User>) {
        this._userCollection = userCollection;
    }

    public async save(user: UserDto): Promise<void> {
        await this._userCollection.updateOne(
            {login: user.login},
            {$set: user},
            {upsert: true}
        )
    }

    public async delete(id: ObjectId): Promise<boolean> {
        const deleteRes = await this._userCollection.deleteOne(
            {_id: id},
        )

        return deleteRes.acknowledged
    }

    public async getById(id: ObjectId): Promise<User | undefined> {
        const res =  await this._userCollection.findOne(
            {_id: id},
        )

        return res ?? undefined
    }

    public async getByLogin(login: string): Promise<User | undefined> {
        const res = await this._userCollection.findOne({login: login});

        return res ?? undefined
    }

    public async existsById(id: ObjectId): Promise<boolean> {
        const res =  await this._userCollection.findOne(
            {_id: id},
        )

        return !!res
    }

    public async getAll(): Promise<User[]> {
        return await this._userCollection.find({}).toArray()
    }
}