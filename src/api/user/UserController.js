let self;

export default class UserController {
    constructor(express, userService, constants) {
        self = this;
        self.expressRouter = new express.Router();
        self.userService = userService;
        self.constants = constants;
        
        self.expressRouter.post('', self.insertUser);

        self.expressRouter.put('/:id', self.updateUser);

        self.expressRouter.get('/:id', self.findUser);

        self.expressRouter.delete('/:id', self.removeUser);

        return self.expressRouter;
    }

    insertUser(req, res, next) {
        self.userService.insertUser(req.body.id)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }

    findUser(req, res, next) {
        self.userService.findUser(req.params.id)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }

    updateUser(req, res, next) {

        self.userService.updateUser(req.params.id, req.body)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }

    removeUser(req, res, next) {
        self.userService.removeUser(req.params.id)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }
}