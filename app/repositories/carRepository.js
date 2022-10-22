const cloudinary = require('cloudinary').v2;
const { Cars, carTypes } = require('../models');

cloudinary.config({
    cloud_name: 'dd93u8fa5', 
    api_key: '297992195742121', 
    api_secret: 'Z4VYAVCx_cMtGCatWyv8mjcgp0E' 
});

module.exports = {
    async create(createArgs) {
        try {
            return Cars.create(createArgs);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                message: 'Failed to upload the file',
            });
        }
    },

    find(id) {
        return Cars.findByPk(id);
    },

    findAll() {
        return Cars.findAll({
            include: [{ model: carTypes, as: 'type' }],
        });
    },

    async update(id, updateArgs) {
        const car = await Cars.findByPk(id);
        try {
            return Cars.update(updateArgs, {
                where: { id: id },
                returning: true,
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                status: 'FAILED',
                message: 'Failed to upload the file',
            });
        }
    },

    async delete(id, deleteArgs) {
        try {
            await Cars.update(deleteArgs, { where: { id: id } });
            return Cars.destroy({ where: { id: id } });
        } catch (error) {
            throw error;
        }
    },

    async restore(id) {
        const exist = await Cars.findByPk(id, { paranoid: false });

        if (!exist) {
            throw new Error('Car was not found');
        } else if (!exist.deletedAt) {
            throw new Error('Car is already exist');
        } else {
            const restoreArgs = {
                deletedBy: null,
                deletedAt: null,
            };

            Cars.update(restoreArgs, { where: { id: id } });
            return Cars.restore({ where: { id: id } });
        }
    },

    getTotalCars() {
        return Cars.count();
    },
};
