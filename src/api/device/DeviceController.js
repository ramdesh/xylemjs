let self;

export default class DeviceController {
    constructor(express, deviceService, constants, helpersUtil) {
        self = this;
        self.expressRouter = new express.Router();
        self.deviceService = deviceService;
        self.constants = constants;
        self.helpersUtil = helpersUtil;

        self.expressRouter.post('', self.createDevice);

        self.expressRouter.put('/:id', self.updateDevice);

        self.expressRouter.get('/:id', self.findDevice);

        self.expressRouter.delete('/:id', self.removeDevice);

        return self.expressRouter;
    }

    createDevice(req, res, next) {
        let device = {
            id: self.helpersUtil.fromModelVal(req.body.id),
            type: self.helpersUtil.fromModelVal(req.body.type)
        };
        self.deviceService.insertDevice(device)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }

    findDevice(req, res, next) {
        self.deviceService.findDevice(req.params.id)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }

    updateDevice(req, res, next) {
        self.deviceService.updateDevice(req.params.id, req.body)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }

    removeDevice(req, res, next) {
        self.deviceService.removeDevice(req.params.id)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }
}