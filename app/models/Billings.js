const Sequelize = require('sequelize');
const sequelize = require('../../config/db');

const tableName = 'billing';

const hooks = {};

const Billings = sequelize.define('Billing', {
    user_id : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    balance : {
        type: Sequelize.INTEGER,
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

module.exports = Billings;
