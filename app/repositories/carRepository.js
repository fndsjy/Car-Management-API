const { cars } = require('../models');

module.exports = {
    findCars(){
        return cars.findAll();
    },

    create(body){
        return cars.create(body);
    },

    update(body, id){
        return cars.update(body, {where: {id}});
    },

    delete(id){
        return cars.destroy({where: {id}});
    },

    findByPk(id){
        return cars.findOne(id);
    },

    getTotalCount(){
        return cars.count();
    }
}