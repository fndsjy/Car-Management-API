const bcrypt = require('bcryptjs');
const authRepository = require('../repositories/authRepository');
const jwt = require('jsonwebtoken');
const secretKey = 'secretKey';

async function encryptPassword(password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (err) {
    console.log(err);
  }
}

async function comparePassword(password, encryptedPassword) {
  try {
    const isValid = await bcrypt.compare(password, encryptedPassword);
    return isValid;
  } catch (err) {
    console.log(err);
  }
}

function createToken(payload) {
  return jwt.sign(payload, secretKey);
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = {
  async register(id, name, email, password, role) {
    try {
      const findUser = await authRepository.findUser({email});

      if (findUser) {
        return false;
      }

      const encryptedPassword = await encryptPassword(password);
      const body = {
        id,
        name,
        email,
        password: encryptedPassword,
        role,
      }
      const user = await authRepository.create(body);

      return user;
    } catch (err) {
      throw err;
    }
  },

  async login(email, password) {
    try {
      const user = await authRepository.findUser({ email });

      if (!user) {
        return false;
      }

      const { password: encryptedPassword } = user;

      const isAuthenticated = await comparePassword(password, encryptedPassword);

      if (!isAuthenticated) {
        return false;
      }

      // generate token

      const token = createToken({
        id: user.id,
        email: user.email,
      })

      const data = {
        ...user.dataValues,
        token
      }

      return data;
    } catch (err) {
      throw err;
    };
  },

  async authorize(token){
    try{
      const payload = verifyToken(token);
      const id = payload?.id; // ? Pengecekkan payload apakah ada objek, jika ada akan menjalankan idnya
      const users = await authRepository.findByPk(id);
      return users;
    }
    catch(err){
      throw err;
    }
  }
}
