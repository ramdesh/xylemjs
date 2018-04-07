let self;

export default class DeviceMessageController {
    constructor(express, deviceMessageService, constants, helpersUtil) {
        self = this;
        self.expressRouter = new express.Router({ mergeParams: true });
        self.deviceMessageService = deviceMessageService;
        self.constants = constants;
        self.helpersUtil = helpersUtil;

        self.expressRouter.get('', self.getDeviceMessages);

        return self.expressRouter;
    }

    getDeviceMessages(req, res, next) {
        self.deviceMessageService.findMessagesByDevice(req.params.id)
            .then((result) => {
                res.status(self.constants.SUCCESS).json(result);
            })
            .catch((err) => {
                return next(err);
            });
    }

}