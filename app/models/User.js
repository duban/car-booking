const Sequelize = require('sequelize');
const sequelize = require('../../config/db');
const bcryptService = require('../services/bcrypt.service');


const hooks = {
	beforeCreate(user) {
		user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
		// console.log('ps', user.password)
	},
};
const tableName = 'users';

const User = sequelize.define('User', {
	first_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	last_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false

	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	phone_number: {
		type: Sequelize.STRING,
		allowNull: false
	},
	address: {
		type: Sequelize.STRING,
		allowNull: false
	},
	user_type: {
		type: Sequelize.STRING,
		allowNull: false
	},

}, {
	hooks,
	tableName
});

// eslint-disable-next-line
User.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        delete values.password;
        return values;
};

module.exports = User;
