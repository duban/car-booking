const Chart = require('../models/Chart');
const Car = require('../models/Car')
// const CarCheck = require('./CarController')
const Payment = require('../models/Payment')
const Billing = require('../models/Billings')

const CarCheck = require('./CarController')
const seq = require('sequelize');

const Op = seq.Op;
const PaymentController = () => {

    const payment_detail = async (car_id, quantity) => {
        try {
            const car_detail = await Car.findOne({
                where: {
                    id:car_id,
                    quantity: {[Op.gte]: quantity}
                }, raw: true
            });
            if (car_detail) {
                return car_detail
            } else {
                return
            }
        } catch (err) {
            console.log(err);
            return null
        }
    };

    const add_payment_bill = async (req, res) => {
        const { body } = req;
        try {
            const details = payment_detail(body.car_id, body.quantity)
            details.then(async detail => {
                const paid = body.paid
                const total_paid = detail.cost * body.quantity
                // console.log(detail)

                const wasCreated = await Payment.findOne({
                    where: {
                        user_id: body.user_id,
                        car_id: body.car_id,
                        quantity: body.quantity
                    }
                })
                // //
                // // console.log(wasCreated)
                if (wasCreated === null) {
                    const pay = await Payment.create({
                        user_id: body.user_id,
                        car_id: body.car_id,
                        quantity: body.quantity,
                        total_paid: total_paid,
                        status: 'on going'
                    })
                    // console.log(arr)
                    const bill = await Billing.findOne({where: {user_id: body.user_id}})
                    const paid = bill.balance
                    if (paid < total_paid) {
                        return res.status(200).json({
                            status: 200,
                            data: {},
                            message: "Payment is less than total paid"
                            // message: {paid: paid, total_paid: total_paid}
                        });
                    } else if (paid === total_paid) {
                        const payment = await Payment.update({status: 'success'}, {where: {id: pay.id}})
                        // console.log(payment)
                        if (payment) {
                            const car_quantity = CarCheck().update_quantity(pay.car_id, pay.quantity)
                            const arr = await Billing.update({balance: balance}, {where: {user_id: body.user_id}})

                            // const arr = await Wa.findOrCreate({where: {user_id: body.user_id, car_id:body.car_id, quantity:body.quantity, paid:paid, total_paid:total_paid,status:'on going'}})

                            return res.status(201).json({
                                status: 201,
                                data: {},
                                message: "Add payment successfully: "
                            });
                        }

                    } else if (paid > total_paid) {
                        const balance = paid - total_paid
                        const payment = await Payment.update({status: 'success'}, {where: {id: pay.id}})
                        if (payment) {
                            const car_quantity = CarCheck().update_quantity(pay.car_id, pay.quantity)
                            const arr = await Billing.update({balance: balance}, {where: {user_id: body.user_id}})

                            // const user = await Billing.findOne({where: {user_id: body.user_id}})
                            // if (user) {
                            //     const arr = await Billing.update({balance: balance}, {where: {user_id: body.user_id}})
                            // }
                            return res.status(201).json({
                                status: 201,
                                message: {paid: paid, total_paid: total_paid, balance: balance}
                            });
                        }
                    }
                } else {
                    if (wasCreated.status === 'on going') {
                        const bill = await Billing.findOne({where: {user_id: body.user_id}})
                        const paid = bill.balance
                        if (paid < total_paid) {
                            return res.status(200).json({
                                status: 200,
                                data: {},
                                message: "Balance is less than total paid"
                                // message: {paid: paid, total_paid: total_paid}
                            });
                        } else if (paid === total_paid) {
                            const payment = await Payment.update({status: 'success'}, {where: {id: wasCreated.id}})
                            console.log(payment)
                            if (payment) {
                                const car_quantity = CarCheck().update_quantity(wasCreated.car_id, wasCreated.quantity)
                                // const arr = await Wa.findOrCreate({where: {user_id: body.user_id, car_id:body.car_id, quantity:body.quantity, paid:paid, total_paid:total_paid,status:'on going'}})
                                const arr = await Billing.update({balance: balance}, {where: {user_id: body.user_id}})
                                return res.status(201).json({
                                    status: 201,
                                    data: {},
                                    message: "Add payment successfully: "
                                });
                            }

                        } else if (paid > total_paid) {
                            const balance = paid - total_paid
                            const payment = await Payment.update({status: 'success'}, {where: {id: wasCreated.id}})
                            if (payment) {
                                const car_quantity = CarCheck().update_quantity(wasCreated.car_id, wasCreated.quantity)
                                const user = await Billing.findOne({where: {user_id: body.user_id}})
                                if (user) {
                                    const arr = await Billing.update({balance: balance}, {where: {user_id: body.user_id}})
                                } else {
                                    const arr = await Billing.create({user_id: body.user_id, balance: balance})

                                }
                                return res.status(201).json({
                                    status: 201,
                                    message: {paid: paid, total_paid: total_paid, balance: balance}
                                });
                            }
                        }
                    } else {
                        return res.status(200).json({
                            status: 200,
                            message: "Already paid or canceled"
                        });

                    }
                }
            })
        } catch (err) {
            return res.status(200).json({
                status: 500,
                data: [],
                message: "Error: " + err
            });
        }
    };

    const add_payment = async (req, res) => {
        const { body } = req;
        try {
            const details = payment_detail(body.car_id, body.quantity)
            details.then(async detail => {
                const paid = body.paid
                const total_paid = detail.cost * body.quantity
                // console.log(detail)

                const wasCreated = await Payment.findOne({where: {user_id: body.user_id, car_id:body.car_id, quantity:body.quantity}})
                // //
                // // console.log(wasCreated)
                if (wasCreated === null) {
                    const pay = await Payment.create({user_id: body.user_id, car_id:body.car_id, quantity:body.quantity, paid:paid, total_paid:total_paid,status:'on going'})
                    // console.log(arr)
                    const user_bill = await Billing.findOne({where: {user_id: body.user_id}})

                    if (paid < total_paid) {
                        return res.status(200).json({
                            status: 200,
                            data: {},
                            message: "Payment is less than total paid"
                            // message: {paid: paid, total_paid: total_paid}
                        });
                    } else if (paid === total_paid) {
                        const payment = await Payment.update({status: 'success'}, {where: {id: pay.id}})
                        // console.log(payment)
                        if (payment) {
                            const car_quantity = CarCheck().update_quantity(pay.car_id, pay.quantity)
                            // const arr = await Wa.findOrCreate({where: {user_id: body.user_id, car_id:body.car_id, quantity:body.quantity, paid:paid, total_paid:total_paid,status:'on going'}})

                            return res.status(201).json({
                                status: 201,
                                data: {},
                                message: "Add payment successfully: "
                            });
                        }

                    } else if (paid > total_paid) {
                        const balance = paid - total_paid
                        const payment = await Payment.update({status: 'success'}, {where: {id: pay.id}})
                        if (payment) {
                            const car_quantity = CarCheck().update_quantity(pay.car_id, pay.quantity)
                            const user = await Billing.findOne({where: {user_id: body.user_id}})
                            if (user) {
                                const arr = await Billing.update({balance:balance + user.balance},{where:{user_id: body.user_id}})
                            } else {
                                const arr = await Billing.create({user_id: body.user_id, balance: balance})

                            }
                            return res.status(201).json({
                                status: 201,
                                message: {paid: paid, total_paid: total_paid, balance: balance}
                            });
                        }
                    }
                } else {
                    if (wasCreated.status === 'on going') {
                        if (paid < total_paid) {
                            return res.status(200).json({
                                status: 200,
                                data: {},
                                message: "Payment is less than total paid"
                                // message: {paid: paid, total_paid: total_paid}
                            });
                        } else if (paid === total_paid) {
                            const payment = await Payment.update({status: 'success'}, {where: {id: wasCreated.id}})
                            console.log(payment)
                            if (payment) {
                                const car_quantity = CarCheck().update_quantity(wasCreated.car_id, wasCreated.quantity)
                                // const arr = await Wa.findOrCreate({where: {user_id: body.user_id, car_id:body.car_id, quantity:body.quantity, paid:paid, total_paid:total_paid,status:'on going'}})

                                return res.status(201).json({
                                    status: 201,
                                    data: {},
                                    message: "Add payment successfully: "
                                });
                            }

                        } else if (paid > total_paid) {
                            const balance = paid - total_paid
                            const payment = await Payment.update({status: 'success'}, {where: {id: wasCreated.id}})
                            if (payment) {
                                const car_quantity = CarCheck().update_quantity(wasCreated.car_id, wasCreated.quantity)
                                const user = await Billing.findOne({where: {user_id: body.user_id}})
                                if (user) {
                                    const arr = await Billing.update({balance:balance + user.balance},{where:{user_id: body.user_id}})
                                } else {
                                    const arr = await Billing.create({user_id: body.user_id, balance: balance})

                                }
                                return res.status(201).json({
                                    status: 201,
                                    message: {paid: paid, total_paid: total_paid, balance: balance}
                                });
                            }
                        }
                    } else {
                        return res.status(200).json({
                            status: 200,
                            message: "Already paid or canceled"
                        });

                    }
                }

                // const arr = await Payment.findOrCreate({where: {user_id: body.user_id, car_id:body.car_id, quantity:body.quantity, total_paid:total_paid,status:'on going'}})
                // const instance = arr[0] // the first element is the instance
                // const wasCreated = arr[1] // the second element tells us if the instance was newly created
                // console.log(instance.id) // {id: 1, name: 'Cody', etc...}
                // console.log(wasCreated) // true
                // console.log(instance)
                // if (wasCreated) {
                //     if (paid < total_paid) {
                //         return res.status(200).json({
                //             status: 200,
                //             data: {},
                //             message: "Payment is less than total paid"
                //             // message: {paid: paid, total_paid: total_paid}
                //         });
                //     } else if (paid === total_paid) {
                //         const payment = await Payment.update({status: 'success'}, {where: {id: instance.id}})
                //         console.log(payment)
                //         if (payment) {
                //             // const arr = await Wa.findOrCreate({where: {user_id: body.user_id, car_id:body.car_id, quantity:body.quantity, paid:paid, total_paid:total_paid,status:'on going'}})
                //
                //             return res.status(201).json({
                //                 status: 201,
                //                 data: {},
                //                 message: "Add payment successfully: "
                //             });
                //         }
                //
                //     } else if (paid > total_paid) {
                //         const balance = paid - total_paid
                //         const payment = await Payment.update({status: 'success'}, {where: {id: instance.id}})
                //         if (payment) {
                //             const user = await Billing.findOne({where: {user_id: body.user_id}})
                //             if (user) {
                //                 const arr = await Billing.update({balance:balance + user.balance},{where:{user_id: body.user_id}})
                //             } else {
                //                 const arr = await Billing.create({user_id: body.user_id, balance: balance})
                //
                //             }
                //             return res.status(201).json({
                //                 status: 201,
                //                 message: {paid: paid, total_paid: total_paid, balance: balance}
                //             });
                //         }
                //     }
                // } else {
                //     if (instance.status === 'on going') {
                //         if (paid < total_paid) {
                //             return res.status(200).json({
                //                 status: 200,
                //                 data: {payment:body.paid,total_paid:total_paid},
                //                 message: "Payment is less than total paid"
                //                 // message: {paid: paid, total_paid: total_paid}
                //             });
                //         } else if (paid === total_paid) {
                //             const payment = await Payment.update({status: 'success'}, {where: {id: instance.id}})
                //             console.log(payment)
                //             if (payment) {
                //                 // const arr = await Wa.findOrCreate({where: {user_id: body.user_id, car_id:body.car_id, quantity:body.quantity, paid:paid, total_paid:total_paid,status:'on going'}})
                //
                //                 return res.status(201).json({
                //                     status: 201,
                //                     data: {id: wasCreated.id},
                //                     message: "Add payment successfully: "
                //                 });
                //             }
                //
                //         } else if (paid > total_paid) {
                //             const balance = paid - total_paid
                //             const payment = await Payment.update({status: 'success'}, {where: {id: instance.id}})
                //             if (payment) {
                //                 const user = await Billing.findOne({where: {user_id: body.user_id}})
                //                 if (user) {
                //                     // console.log(user)
                //                     // const arr = await Billing.update({balance:balance + user.balance},{where:{user_id: body.user_id}})
                //                 } else {
                //                     console.log('else')
                //                     // const arr = await Billing.create({user_id: body.user_id, balance: balance})
                //
                //                 }
                //                 return res.status(201).json({
                //                     status: 201,
                //                     message: {paid: paid, total_paid: total_paid, balance: balance}
                //                 });
                //             }
                //         }
                //
                //     }
                //     // console.log(instance)
                //     return res.status(200).json({
                //         status: 200,
                //         message: "Already paid"
                //     });
                //
                // }
            })

            // const car = await Car.create({
            //     type: body.type,
            //     brand: body.brand,
            //     color: body.color,
            //     car_id: body.car_id,
            //     prod_year: body.prod_year,
            //     cost: body.cost,
            //     quantity: body.quantity});
            // if (car) {
            //     return res.status(201).json({
            //         status: 201,
            //         data: { car },
            //         message: "Add car successfully: "
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

    const cancel_payment = async (req, res) => {
        const id = req.params.id;
        try {
            const payment = await Car.findOne(
                 {
                    where: {
                        id:id
                    }
                });

            if(payment){
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

    const list_payment = async (req, res) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const offset = (page - 1) * limit
        try {
            const cars = await Payment.findAll({
                offset: offset, limit: limit
            });
            const count = await Payment.count();

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

    return {
        add_payment,
        add_payment_bill,
        cancel_payment,
        payment_detail,
        list_payment
    };
}

module.exports = PaymentController;