const bcrypt = require('bcryptjs');
const authService = require('../../../services/authService');

module.exports = {
  register(req, res) {
    const { id, name, email, password, role } = req.body;

    authService
      .register(id, name, email, password, role)
      .then(auth => {
        if (!auth) {
          res.status(401).json({
            status: "FAIL",
            message: "email had been registered"
          });

          return;
        }
        res.status(200).json({
          status: "OK",
          auth
        })
      })
      .then(user => {
        res.status(201).json({
          status: "OK",
          data: user
        });
      })
      .catch(err => {
        res.status(400).json({
          status: "FAIL",
          message: err.message
        });
      });
  },

  login(req, res) {
    const {email, password} = req.body;

    authService
      .login(email, password)
      .then(auth => {
        if (!auth) {
          res.status(401).json({
            status: "FAIL",
            message: "email or password is incorrect"
          });

          return;
        }

        res.status(200).json({
          status: "OK",
          auth
        })
      })
      .catch(err => {
        res.status(400).json({
          status: "FAIL",
          message: err.message
        });
      });
  },

  authorize(req, res, next){
    const bearerToken = req.headers.authorization;
    if(!bearerToken){
      res.status(403).json({
        message: "Unauthorized"
      })
      return;
    }

    const token = bearerToken.split('Bearer ')[1];

    authService.authorize(token).then(users => {
      if(!users){
        res.status(403).json({
          message: "Unauthorized"
        })
        return;
      }

      req.users = users;
      next();
    }).catch((err) => {
      res.status(403).json({
        message: "Unauthorized"
      })
    })
  },

  whoAmI(req, res){
    const users = req.users;

    res.status(201).json({
      status: "OK",
      data: users
    })
  }
};
