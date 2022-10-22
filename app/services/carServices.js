const carRepository = require('../repositories/carRepository');

module.exports = {
    async create(createArgs) {
        return carRepository.create(createArgs);
    },

    async list() {
        try {
            const cars = await carRepository.findAll();
            const carsCount = await carRepository.getTotalCars();

            return {
                data: cars,
                count: carsCount,
            };
        } catch (error) {
            throw error;
        }
    },

    get(id) {
        return carRepository.find(id);
    },

    update(id, updateArgs) {
        return carRepository.update(id, updateArgs);
    },

    delete(id, deleteArgs) {
        return carRepository.delete(id, deleteArgs);
    },

    restore(id) {
        return carRepository.restore(id);
    },
};
