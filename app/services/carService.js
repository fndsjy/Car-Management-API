const carRepository = require('../repositories/carRepository');

module.exports = {
    async list(){
        try{
            const post = await carRepository.findCars();
            const total = await carRepository.getTotalCount();
    
            return{
                data: post,
                count: total
            }
        }
        catch(err){
            throw err;
        }
    },

    create(body){
        return carRepository.create(body);
    },

    update(body, id){
        return carRepository.update(body, id);
    },

    delete(id){
        return carRepository.delete(id);
    },

    findByPk(id){
        return carRepository.findByPk(id);
    }
}