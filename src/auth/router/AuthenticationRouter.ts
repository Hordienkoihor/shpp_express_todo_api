import {type Response,type Request, Router} from "express";
import type UserService from "../service/UserService.js";
import type UserDto from "../interfaces/user.dto.js";
import type {ObjectId} from "mongodb";

export default class AuthenticationRouter{
    private _router: Router;
    private _userService: UserService;

    constructor(readonly userService: UserService) {
        this._router = Router();
        this.initializeRoutes();
        this._userService = userService;

        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }

    private initializeRoutes() {
        this._router.post("/login", this.login);
        this._router.post("/register", this.register);
    }

    private async login (req: Request, res: Response) {
        const id: string = req.session.id;

        //todo implement later

        // const user = await this._userService.findById();
        // if (!user) {
        //     res.status(401).json({error: 'user not found'});
        // }


    };

    private async register  (req: Request, res: Response){
        const user: UserDto = req.body;

        if (!user) {
            res.status(401).json({error: 'user not found in request'});
        }

        try {
            this._userService.add(user);
            return res.status(201).json({ok: true});
        } catch (error) {
            return res.status(400).json({error: error});
        }
    };


}