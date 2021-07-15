const Chart = require('../models/Chart');
const Car = require('../models/Car')
const User = require('../models/User')

const CarCheck = require('./CarController')
const seq = require('sequelize');

const Op = seq.Op;
const ChartController = () => {
    const add_chart = async (req, res) => {
        const { body } = req;
        try {
            // const chart = await Chart.create({
            //     user_id: body.user_id,
            //     car_id: body.car_id,
            //     quantity: body.quantity});
            const quantity = CarCheck().quantity_check(body.car_id, body.quantity)
            quantity.then(async available => {
                if(available) {
                    const chart = await Chart.create({
                        user_id: body.user_id,
                        car_id: body.car_id,
                        quantity: body.quantity});
                    if (chart) {
                        return res.status(201).json({
                            status: 201,
                            data: { },
                            message: "Add chart successfully "
                        });
                    }
                } else if (!available) {
                    return res.status(200).json({
                        status: 200,
                        data: { },
                        message: "Car not available "
                    });
                } else if (available === null) {
                    return res.status(500).json({msg: 'Internal server error'});
                }
            })
            // if (CarCheck().quantity_check(body.car_id, body.quantity)) {
            //     return res.status(201).json({
            //         status: 201,
            //         data: { },
            //         message: "Add chart successfully: "
            //     });
            // }
        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: [],
                message: "Error: " + err
            });
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

    const remove_chart_user = async (req, res) => {
        const id = req.params.id;
        const user_id = req.params.user_id;
        try {
            const chart = await Chart.destroy(
                {
                    where: {
                        id:id,
                        user_id:user_id
                    }
                });

            if(chart){
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

    const remove_chart = async (req, res) => {
        const id = req.params.id;
        try {
            const chart = await Chart.destroy(
                {
                    where: {
                        id:id
                    }
                });

            if(chart){
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

    const list_by_user = async (req, res) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const user_id = req.params.user_id
        const offset = (page - 1) * limit

        Chart.belongsTo(Car, {foreignKey: 'car_id', targetKey: 'id'});
        // Chart.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'});
        try {
            const cars = await Chart.findAll({
                include:
                    [{
                        model: Car,
                        as: 'Car',
                        attributes: ['id', 'type','brand','color','prod_year','cost','quantity'],
                        required: true,
                    }], offset: offset, limit: limit,
                attributes: [['id', 'chart_id'],['user_id', 'user_id'],['quantity', 'chart_quantity']],
                // attributes: ['Car.id', 'Car.type', 'Car.brand', 'Car.color','Car.prod_year','Car.cost','Car.quantity','User.id', 'User.first_name', 'User.last_name', 'User.username'],
                // raw: true,
                where: {
                    user_id:user_id
                }
            });

            return res.status(200).json({
                status: 200,
                data: cars,
                page: page,
                message: "Success retrieve data."
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }

    const list_all = async (req, res) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const offset = (page - 1) * limit

        Chart.belongsTo(Car, {foreignKey: 'car_id', targetKey: 'id'});
        // Chart.belongsTo(User, {foreignKey: 'user_id', targetKey: 'id'});
        try {
            const cars = await Chart.findAll({
                include:
                    [{
                        model: Car,
                        as: 'Car',
                        attributes: ['id', 'type','brand','color','prod_year','cost','quantity'],
                        required: true,
                    }], offset: offset, limit: limit,
                attributes: [['id', 'chart_id'],['user_id', 'user_id'],['quantity', 'chart_quantity']],
                // attributes: ['Car.id', 'Car.type', 'Car.brand', 'Car.color','Car.prod_year','Car.cost','Car.quantity','User.id', 'User.first_name', 'User.last_name', 'User.username'],
                // raw: true,
            });

            return res.status(200).json({
                status: 200,
                data: cars,
                page: page,
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
        }
    ;

    return {
        add_chart,
        edit_car,
        remove_chart,
        remove_chart_user,
        list_by_user,
        list_all,
        view_by_id
    };
};
module.exports = ChartController;
