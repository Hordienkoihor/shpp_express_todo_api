import type {Collection} from "mongodb";
import type User from "./interfaces/User.js";
import type {Todo} from "../interfaces/todo.js";

class UserRepository {
    private _userCollection: Collection<User>;

    public constructor(userCollection:Collection<User>) {
        this._userCollection = userCollection;
    }

    public async save(user: User): Promise<void> {
        await this._userCollection.updateOne(
            {id: user.id},
            {$set: {user: user}},
            {upsert: true}
        )
    }

    public async delete(id: number): Promise<boolean> {
        const deleteRes = await this._userCollection.deleteOne(
            {id: id},
        )

        return deleteRes.acknowledged
    }

    public async getById(id: number): Promise<User | undefined> {
        const res =  await this._userCollection.findOne(
            {id: id},
        )

        return res ?? undefined
    }

    public async existsById(id: number): Promise<boolean> {
        const res =  await this._userCollection.findOne(
            {id: id},
        )

        return !!res
    }

    public async getAll(): Promise<User[]> {
        return await this._userCollection.find({}).toArray()
    }
}