import { Router } from "express";
import type UserService from "../service/UserService.js";
import type { ObjectId } from "mongodb";
declare module 'express-session' {
    interface SessionData {
        userId: ObjectId;
        login: string;
    }
}
export default class AuthenticationRouter {
    readonly userService: UserService;
    private readonly _router;
    private _userService;
    constructor(userService: UserService);
    private initializeRoutes;
    private login;
    private register;
    get(): Router;
}
//# sourceMappingURL=AuthenticationRouter.d.ts.map