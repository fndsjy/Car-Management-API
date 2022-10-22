const userServices = require('../../../services/userServices');

const handleInput = (userName, email, password) => {
    let errMessage = 'Missing ';

    if (!userName) {
        errMessage += 'userName';
    }

    if (!email) {
        if (!userName) {
            errMessage += ', email';
        } else {
            errMessage += 'email';
        }
    }

    if (!password) {
        if (!userName || !email) {
            errMessage += ', password ';
        } else {
            errMessage += 'password ';
        }
    }

    if (errMessage.split(' ').length === 3) {
        errMessage += 'filed';
    } else {
        errMessage += 'fields';
    }

    return errMessage;
};

module.exports = {
    handleInput,

    async registerAdmin(req, res) {
        if (!req.body.userName || !req.body.email || !req.body.password) {
            const errMessage = handleInput(req.body.userName, req.body.email, req.body.password);

            return res.status(422).json({
                status: 'FAILED',
                message: errMessage,
            });
        } else {
            userServices
                .registerAdmin(req)
                .then((user) => {
                    res.status(201).json({
                        status: 'OK',
                        data: user,
                    });
                })
                .catch((err) => {
                    res.status(409).json({
                        status: 'FAILED',
                        message: err.message,
                    });
                });
        }
    },

    getCurrentUser(req, res) {
        const user = req.user;

        if (user) {
            res.status(200).json({
                status: 'OK',
                data: user,
            });
        } else {
            res.status(401).json({
                status: 'FAILED',
                message: 'Unauthorized',
            });
        }
    },
};
