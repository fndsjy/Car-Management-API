/**
 * @file contains request handler of post resource
 * @author Fikri Rahmat Nurhidayat
 */
const carService = require('../../../services/carService');

 module.exports = {
   list(req, res) {
     carService
       .list()
       .then((cars) => {
         res.status(200).json({
           status: "OK",
           data: {
             car: cars.data,
             count: cars.count
           },
         });
       })
       .catch((err) => {
         res.status(400).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },
 
   create(req, res) {
    const body = req.body;
     carService.create(body)
       .then((cars) => {
         res.status(201).json({
           status: "OK",
           data: cars,
         });
       })
       .catch((err) => {
         res.status(201).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },
 
   update(req, res) {
     carService
       .update(req.body, req.params.id)
       .then((cars) => {
         res.status(200).json({
           status: "OK",
           data: cars,
         });
       })
       .catch((err) => {
         res.status(422).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },
 
   destroy(req, res) {
     carService.delete(req.params.id)
       .then(() => {
         res.status(204).end();
       })
       .catch((err) => {
         res.status(422).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },

   getCars(req, res) {
    carService
      .findByPk({
        where: { id: req.params.id }
      })
      .then(cars => {
        res.status(200).json(cars)
      })
      .catch(err => {
        res.status(404).json({
          status: "FAIL",
          message: err.message
        })
      })
  },
 
   setCars(req, res, next) {
     cars.findByPk(req.params.id)
       .then((cars) => {
         if (!cars) {
           res.status(404).json({
             status: "FAIL",
             message: "Cars not found!",
           });
 
           return;
         }
 
         req.cars = cars;
         next()
       })
       .catch((err) => {
         res.status(404).json({
           status: "FAIL",
           message: "Cars not found!",
         });
       });
   },
 };
 