const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swgDoc = require("../openapi.json");
const controllers = require("../app/controllers");
const { application } = require("express");
const apiRouter = express.Router();

/**
 * TODO: Implement your own API
 *       implementations
 */

apiRouter.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swgDoc));

// cars router
apiRouter.get("/api/v1/cars", controllers.api.v1.cars.list);
apiRouter.get("/api/v1/cars/:id", controllers.api.v1.cars.getCars);
apiRouter.post(
  "/api/v1/cars",
  controllers.api.v1.auth.authorize,
  controllers.api.v1.cars.create,
);
apiRouter.put(
  "/api/v1/cars/:id",
  controllers.api.v1.auth.authorize,
  controllers.api.v1.cars.update
);
apiRouter.delete(
  "/api/v1/cars/:id",
  controllers.api.v1.auth.authorize,
  controllers.api.v1.cars.destroy
);

// users router
apiRouter.get("/api/v1/users", controllers.api.v1.users.list);
apiRouter.get("/api/v1/users/:id", controllers.api.v1.users.getUsers);
apiRouter.put("/api/v1/users/:id", controllers.api.v1.users.update);
apiRouter.delete(
  "/api/v1/users/:id",
  controllers.api.v1.users.destroy
);

// user auth
apiRouter.get("/api/v1/whoAmI", controllers.api.v1.auth.authorize, controllers.api.v1.auth.whoAmI);
apiRouter.post("/api/v1/register-admin", controllers.api.v1.auth.authorize, controllers.api.v1.auth.register);
apiRouter.post("/api/v1/register-member", controllers.api.v1.auth.register);
apiRouter.post("/api/v1/login", controllers.api.v1.auth.login);

// error handle
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
