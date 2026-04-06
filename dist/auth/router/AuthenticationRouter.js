import { Router } from "express";
export default class AuthenticationRouter {
    userService;
    _router;
    _userService;
    constructor(userService) {
        this.userService = userService;
        this._router = Router();
        this._userService = userService;
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.initializeRoutes();
    }
    initializeRoutes() {
        this._router.post("/login", this.login);
        this._router.post("/register", this.register);
    }
    async login(req, res) {
        const { login, pass } = req.body;
        const user = await this._userService.findByLogin(login);
        if (!user || user.pass !== pass) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        req.session.userId = user._id;
        return res.status(200).json({ ok: true });
    }
    ;
    async register(req, res) {
        const user = req.body;
        if (!user) {
            return res.status(401).json({ error: 'user not found in request' });
        }
        try {
            console.log(user);
            await this._userService.add(user);
            return res.status(201).json({ ok: true });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return res.status(400).json({ message: errorMessage });
        }
    }
    ;
    get() {
        return this._router;
    }
}
//# sourceMappingURL=AuthenticationRouter.js.map