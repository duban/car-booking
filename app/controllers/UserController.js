const User = require('../models/User');
const Billing = require('../models/Billings');
const { QueryTypes } = require('sequelize');
const seq = require('sequelize');
var shortHash = require("shorthash2");
const Op = seq.Op;
const bcrypt = require('bcrypt');
const sequelize = require('../../config/db');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const UserController = () => {
	const register_user = async (req, res) => {
		const { body } = req;
		try {
			const user = await User.create({
				first_name: body.first_name,
				last_name: body.last_name,
				username: body.username,
				email: body.email,
				phone_number: body.phone_number,
				address: body.address,
				user_type: body.user_type,
				password: body.password});
			// console.log('pss', body.password)
			if (user) {
				const billing = await Billing.create({user_id: user.id, balance: 0})
				if (billing) {
					return res.status(201).json({
						status: 201,
						data: { user },
						message: "Registered successfully: "
					});
				}
			}
		} catch (err) {
			return res.status(200).json({
				status: 500,
				data: [],
				message: "Error: " + err
			});
		}
	};

	const login_user = async (req, res) => {
		const { email, password } = req.body;
		if (email && password) {
			try {
				const user = await User.findOne({
					where: {
						email,
					},
				});
				if (!user) {
					return res.status(401).json({
						status: 401,
						data: "",
						message: "User not found"
					});
				}
				// console.log(password)
				// console.log(user.password)
				// console.log('br',bcryptService().comparePassword(password, user.password))
				if (bcryptService().comparePassword(password, user.password)) {
					const token = authService().issue({ id: user.id });
					// console.log(token)
					return res.status(201).json({
						status: 201,
						data: { token, user },
						message: "Successfully Logged In"
					});

				}
			} catch (err) {
				console.log(password)
				console.log(err)
				return res.status(500).json({
					status: 500,
					data: "",
					message: "Sorry, try again later."
				});
			}
		}
		return res.status(401).json({
			status: 401,
			data: "",
			message: "Email or password is wrong."
		});
	};

	return {
		register_user,
		login_user
	};
};
module.exports = UserController;
