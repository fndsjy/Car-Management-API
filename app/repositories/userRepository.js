const { Users, userRoles } = require('../models');

module.exports = {
    async create(userName, email, password, role) {
        return Users.create({
            userName: userName,
            email: email,
            password: password,
            role: role
        })
        .then((newUser) => {
            return Users.findByPk(newUser.id, {
                include: [{ model: userRoles, as: 'UserRole' }],
            });
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    findUser(email) {
        return Users.findOne({ where: { email: email }, include: [{ model: userRoles, as: 'UserRole' }] });
    },

    findUserName(userName){
        return Users.findOne({where: {userName: userName}, include: [{ model: userRoles, as: 'UserRole' }]})
    },

    find(id) {
        return Users.findByPk(id, {
            include: [{ model: userRoles, as: 'UserRole' }],
        });
    },

    findAll() {
        return Users.findAll({
            include: [{ model: userRoles, as: 'UserRole' }],
        });
    },

    update(id, updateArgs) {
        return Users.update(updateArgs, {
            where: {
                id: id,
            },
        });
    },

    delete(id) {
        return Users.destroy(id);
    },

    getTotalUsers() {
        return Users.count();
    },
};
