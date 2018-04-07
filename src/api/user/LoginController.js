let self;

export default class UserController {
    constructor(express, userService, constants, helpersUtil) {
        self = this;
        self.expressRouter = new express.Router();
        self.userService = userService;
        self.constants = constants;
        self.helpersUtil = helpersUtil;

        self.expressRouter.post('', self.login);

        return self.expressRouter;
    }

    login(req, res, next) {
        let username = req.body.username;
        let password = req.body.password;
        self.userService.loginUser(username, password)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }
}