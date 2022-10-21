/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

 const cars = require("./carsControllers");
 const users = require("./usersControllers");
 const auth = require("./authControllers");

 module.exports = {
   cars,
   users,
   auth
 };