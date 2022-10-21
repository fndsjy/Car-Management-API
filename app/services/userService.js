const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');

async function encryptPassword(password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (err) {
    console.log(err);
  }
}

function createToken(payload) {
  return jwt.sign(payload, secretKey);
}

module.exports = {
  async list() {
    try {
      const users = await userRepository.findUsers();
      const userCount = await userRepository.getTotalUser();

      return {
        users,
        userCount
      }
    } catch (err) {
      throw err;
    }
  },

  async update(name, email, password, role, id) {
    try {
      const encryptedPassword = await encryptPassword(password);
      const body = {
        name,
        email,
        password: encryptedPassword,
        role,
      }
      const user = await userRepository.update(body, id);

      return user;
    } catch (err) {
      throw err;
    }
  },

  delete(id) {
    return userRepository.delete(id);
  },

  findByPk(id) {
    return userRepository.findByPk(id);
  },
};
