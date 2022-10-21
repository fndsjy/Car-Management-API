const { users } = require('../models')

module.exports = {
  create(body) {
    return users.create(body);
  },

  findUser(condition) {
    return users.findOne({ where: condition });
  },

  findByPk(id) {
    return users.findByPk(id);
  },
}
