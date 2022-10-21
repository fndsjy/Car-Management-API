const usersService = require('../../../services/userService');

module.exports = {
  list(req, res) {
    usersService
      .list()
      .then(({ users, userCount }) => {
        res.status(200).json({
          status: "OK",
          data: { users: users },
          meta: { total: userCount }
        });
      })
      .catch(err => {
        res.status(400).json({
          status: "FAIL",
          message: err.message
        });
      });
  },

  update(req, res) {
    const { name, email, password, role } = req.body;

    usersService
      .update(name, email, password, role , req.params.id)
      .then(users => {
        res.status(201).json({
          status: "OK",
          data: users
        });
      })
      .catch(err => {
        res.status(400).json({
          status: "FAIL",
          message: err.message
        });
      });
  },

  destroy(req, res) {
    usersService
      .delete(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(err => {
        res.status(422).json({
          status: "FAIL",
          message: err.message
        });
      })
  },

  getUsers(req, res) {
    usersService
      .findByPk({
        where: { id: req.params.id }
      })
      .then(users => {
        res.status(200).json(users)
      })
      .catch(err => {
        res.status(404).json({
          status: "FAIL",
          message: err.message
        });
      });
  },

  setUsers(req, res, next) {
    usersService
      .findByPk({
        where: { id: req.params.id }
      })
      .then(users => {
        if (!users) {
          res.status(404).json({
            status: "FAIL",
            message: "cant find user"
          })

          return;
        }

        req.users = users;
        next();
      })
      .catch(err => {
        res.status(404).json({
          status: "FAIL",
          message: "cant find user"
        });
      });
  }
}
