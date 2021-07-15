const Sequelize = require('sequelize');
const sequelize = require('../../config/db');

const tableName = 'charts';

const hooks = {};

const Chart = sequelize.define('Chart', {
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

module.exports = Chart;
