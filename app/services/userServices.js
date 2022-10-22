const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SIGNATURE_KEY = 'secretKey';
const salt = 10;

async function encryptPassword(password) {
    try {
        const encryptedPassword = await bcrypt.hash(password, salt);
        return encryptedPassword;
    } catch (error) {
        console.log(error);
    }
}

async function comparePassword(password, encryptedPassword) {
    try {
        const isValid = await bcrypt.compare(password, encryptedPassword);
        return isValid;
    } catch (error) {
        console.log(error);
    }
}

function createToken(payload) {
    return jwt.sign(payload, JWT_SIGNATURE_KEY, {
        expiresIn: '12h',
    });
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SIGNATURE_KEY);
}

module.exports = {
    encryptPassword,
    verifyToken,

    async registerMember(req) {
        try {
            const user = await userRepository.findUser(req.body.email);
            const userName = await userRepository.findUserName(req.body.userName);

            if (user) {
                throw new Error('Email had been registered!');
            } else if (userName) {
                throw new Error('Username was already taken!');
            }

            const password = await encryptPassword(req.body.password);

            return userRepository.create(req.body.userName, req.body.email, password, 3);
        } catch (err) {
            throw err;
        }
    },

    async registerAdmin(req) {
        try {
            const user = await userRepository.findUser(req.body.email);
            const userName = await userRepository.findUserName(req.body.userName);

            if (user) {
                throw new Error('Email was already registered!');
            } else if (userName) {
                throw new Error('Username was already taken!');
            }

            const password = await encryptPassword(req.body.password);

            return userRepository.create(req.body.userName, req.body.email, password, 2);
        } catch (err) {
            throw err;
        }
    },

    async login(email, password) {
        try {
            const data = await userRepository.findUser(email);
            if (!data) {
                throw new Error('Email have not been registered yet');
            }

            const encryptedPassword = data.dataValues.password;

            const isAuthenticated = await comparePassword(password, encryptedPassword);
            if (!isAuthenticated) {
                throw new Error('Email or password was incorrect');
            }

            // generate JWT
            const token = createToken({
                id: data.id,
                email: data.email,
                role: data.role,
            });

            console.log(data.UserRole.roleName);
            // extract only username, email, role, rolename
            const user = {
                id: data.id,
                userName: data.userName,
                email: data.email,
                role: data.UserRole.roleName,
                token: token,
            };

            return user;
        } catch (err) {
            throw err;
        }
    },
};
