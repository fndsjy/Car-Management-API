const { users } = require('../models');

module.exports = {
  findUsers() {
    return users.findAll();
  },

  findUser(condition) {
    return users.findOne({ where: condition });
  },

  create(body) {
    return users.create(body);
  },

  update(body, id) {
    return users.update(body, {
      where: { id }
    });
  },

  delete(id) {
    return users.destroy({
      where: { id }
    });
  },

  findByPk(id) {
    return users.findOne(id);
  },

  getTotalUser() {
    return users.count();
  }
}
