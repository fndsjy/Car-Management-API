const carServices = require('../../../services/carServices');

module.exports = {
    create(req, res) {
        const createArgs = req.body;

        createArgs.createdBy = req.user.userName;

        carServices
            .create(createArgs)
            .then((car) => {
                res.status(201).json({
                    status: 'OK',
                    data: car,
                });
            })
            .catch((err) => {
                res.status(422).json({
                    status: 'FAILED',
                    message: err.message,
                });
            });
    },

    list(req, res) {
        carServices
            .list()
            .then(({ data, count }) => {
                if (count === 0) {
                    res.status(404).json({
                        status: 'FAILED',
                        message: 'No cars data were found',
                    });
                } else {
                    res.status(200).json({
                        status: 'OK',
                        data: { cars: data },
                        meta: { total: count },
                    });
                }
            })
            .catch((err) => {
                res.status(400).json({
                    status: 'FAILED',
                    message: err.message,
                });
            });
    },

    update(req, res) {
        const id = req.params.id;
        // const imgFile = req.file;
        const car = carServices.get(id);

        if (!car) {
            return res.status(404).json({
                status: 'FAILED',
                message: 'Car is not found',
            });
        } else {
            const updateArgs = {
                ...req.body,
                updatedBy: req.user.userName,
            };

            carServices
                .update(id, updateArgs)
                .then((car) => {
                    console.log(car);
                    res.status(200).json({
                        status: 'OK',
                        data: car,
                    });
                })
                .catch((err) => {
                    res.status(422).json({
                        status: 'FAILED',
                        message: err.message,
                    });
                });
        }
    },

    delete(req, res) {
        const deleteArgs = {
            deletedBy: req.user.userName,
        };
        const id = req.params.id;

        const car = carServices.get(id);

        if (!car) {
            return res.status(404).json({
                status: 'FAILED',
                message: '  ',
            });
        } else {
            carServices
                .delete(id, deleteArgs)
                .then(() => {
                    res.status(200).json({
                        status: 'OK',
                        message: 'Car was deleted successfully!',
                    });
                })
                .catch((err) => {
                    res.status(422).json({
                        status: 'FAILED',
                        message: err.message,
                    });
                });
        }
    },

    restore(req, res) {
        const id = req.params.id;
        carServices
            .restore(id)
            .then(() => {
                res.status(200).json({
                    status: 'OK',
                    message: `Car was restored successfully!`,
                });
            })
            .catch((err) => {
                if (err.message === 'Car is not found') {
                    res.status(404).json({
                        status: 'FAILED',
                        message: err.message,
                    });
                } else if (err.message === 'Car was already exist') {
                    res.status(409).json({
                        status: 'FAILED',
                        message: err.message,
                    });
                } else {
                    res.status(422).json({
                        status: 'FAILED',
                        message: err.message,
                    });
                }
            });
    },
};
