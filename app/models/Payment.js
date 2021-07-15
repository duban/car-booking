const Sequelize = require('sequelize');
const sequelize = require('../../config/db');

const tableName = 'payments';

const hooks = {};

const Billing = sequelize.define('Payment', {
    user_id : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    car_id : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total_paid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, {
    hooks,
    tableName
});

// eslint-disable-next-line
// User.prototype.toJSON = function () {
//     const values = Object.assign({}, this.get());
//     delete values.password;
//     return values;
// };

module.exports = Billing;
