import {type Response,type Request, Router} from "express";
import type UserService from "../service/UserService.js";
import type UserDto from "../interfaces/user.dto.js";
import type {ObjectId} from "mongodb";

declare module 'express-session' {
    interface SessionData {
        userId: ObjectId;
        login: string;
    }
}

export default class AuthenticationRouter{
    private readonly _router: Router;
    private _userService: UserService;

    constructor(readonly userService: UserService) {
        this._router = Router();
        this._userService = userService;

        this.login = this.login.bind(this)
        this.register = this.register.bind(this)

        this.initializeRoutes();

    }

    private initializeRoutes() {
        this._router.post("/login", this.login);
        this._router.post("/register", this.register);
    }

    private async login (req: Request, res: Response) {
        const {login, pass} = req.body;

        const user = await this._userService.findByLogin(login);

        if (!user || user.pass !== pass) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        req.session.userId = user._id;

        return res.status(200).json({ok: true});

    };

    private async register(req: Request, res: Response){
        const user: UserDto = req.body;

        if (!user) {
            return res.status(401).json({error: 'user not found in request'});
        }

        try {
            console.log(user);
            await this._userService.add(user);
            return res.status(201).json({ok: true});
        } catch (error) {

            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return res.status(400).json({message: errorMessage});
        }
    };

    public get() {
        return this._router;
    }


}