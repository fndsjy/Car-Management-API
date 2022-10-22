const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../openapi.json');
const controllers = require('../app/controllers');
const middlewares = require('../app/middlewares/authorization');

const apiRouter = express.Router();

// cek current user
apiRouter.get('/api/v1/getCurrentUser', middlewares.authorize, controllers.api.v1.userController.getCurrentUser);

// authorization
apiRouter.post('/api/v1/login', controllers.api.v1.authController.login);
apiRouter.post('/api/v1/register', controllers.api.v1.authController.register);
apiRouter.post('/api/v1/register-admin', middlewares.authorizeSuperAdmin, controllers.api.v1.userController.registerAdmin);

// Cars
apiRouter.post('/api/v1/cars', middlewares.authorizeAdmin, controllers.api.v1.carController.create);
apiRouter.get('/api/v1/list-cars', controllers.api.v1.carController.list);
apiRouter.put('/api/v1/update-cars/:id', middlewares.authorizeAdmin, controllers.api.v1.carController.update);
apiRouter.delete('/api/v1/delete-cars/:id', middlewares.authorizeAdmin, controllers.api.v1.carController.delete);
apiRouter.put('/api/v1/cars/:id/restore', middlewares.authorizeAdmin, controllers.api.v1.carController.restore);

// swaggerUI OpenAPI
apiRouter.use(['/', '/api-docs'], swaggerUi.serve, swaggerUi.setup(swaggerDocument));

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

// export router
module.exports = apiRouter;
