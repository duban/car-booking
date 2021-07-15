const Car = require('../models/Car');
const seq = require('sequelize');
const Op = seq.Op;
const CarController = () => {
    const add_car = async (req, res) => {
        const { body } = req;
        try {
            const car = await Car.create({
                type: body.type,
                brand: body.brand,
                color: body.color,
                car_id: body.car_id,
                prod_year: body.prod_year,
                cost: body.cost,
                quantity: body.quantity});
            if (car) {
                return res.status(201).json({
                    status: 201,
                    data: { car },
                    message: "Add car successfully: "
                });
            }
        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: [],
                message: "Error: " + err
            });
        }
    };

    const update_quantity = async (car_id, quantity) => {
        // const { body } = req;
        try {
            const cars = await Car.findOne(
                {
                    where: {
                        id:car_id
                    }
                });

            if(cars){
                const qt = cars.quantity - quantity
                const update_qt = await Car.update({quantity:qt},
                    {
                        where: {
                            id: car_id
                        }
                    });
            }
                // console.log(cars)
                // return cars


        } catch (err) {
            console.log(err);
            // return res.status(500).json({ msg: 'Internal server error' });
        }
    };

    const edit_car = async (req, res) => {
        const { body } = req;
        const id = req.params.id;
        try {
            const cars = await Car.update(
                {
                    type: body.type,
                    brand: body.brand,
                    color: body.color,
                    car_id: body.car_id,
                    prod_year: body.prod_year,
                    cost: body.cost,
                    quantity: body.quantity
                }
                , {
                    where: {
                        id:id
                    }
                });

            if(cars){
                return res.status(200).json({
                    status: 201,
                    data: [],
                    message: "Success update data."
                });
            }
            return res.status(200).json({
                status: 400,
                data: [],
                message: "Failed to update data!"
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };

    const remove_car = async (req, res) => {
        const { body } = req;
        const id = req.params.id;
        try {
            const cars = await Car.destroy(
                {
                    where: {
                        id:id
                    }
                });

            if(cars){
                return res.status(200).json({
                    status: 201,
                    data: [],
                    message: "Success delete data."
                });
            }

            return res.status(200).json({
                status: 400,
                data: [],
                message: "Failed to delete data!"
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };

    const list_available = async (req, res) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const offset = (page - 1) * limit
        try {
            const cars = await Car.findAll({
                where: {
                    quantity: {[Op.gte]: 0},
                }, offset: offset, limit: limit
            });
            const count = await Car.count({where: {
                    quantity: {[Op.gte]: 0},
                }});

            return res.status(200).json({
                status: 200,
                data: cars,
                page: page,
                total: count,
                message: "Success retrieve data."
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };

    const view_by_id = async(req, res) =>
        {
            const {id} = req.params;
            try {
                const car = await
                    Car.findAll({
                        where: {
                            id:id
                        },
                    });

                return res.status(200).json({
                    status: 200,
                    data: car,
                    message: "Success retrieve data."
                });

            } catch (err) {
                console.log(err);
                return res.status(500).json({msg: 'Internal server error'});
            }
        };

    const quantity_check = async (id, quantity) =>
    {
        try {
            const car = await Car.findOne({
                    where: {
                        id:id,
                        quantity: {[Op.gte]: quantity}
                    },
                });
            // console.log('q:', car)
            if (car !== null) {
                return true
            } else {
                return false
            }

        } catch (err) {
            console.log(err);
            return null
        }
    };

    return {
        add_car,
        edit_car,
        remove_car,
        list_available,
        view_by_id,
        quantity_check,
        update_quantity
    };
};
module.exports = CarController;
