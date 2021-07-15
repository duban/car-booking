const Sequelize = require('sequelize');
const sequelize = require('../../config/db');

const tableName = 'cars';

const hooks = {};

const Car = sequelize.define('Car', {

    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    prod_year: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cost: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
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

module.exports = Car;
