const privateRoutes = {
  	'POST /register': 'UserController.register_user',
	'POST /login': 'UserController.login_user',

	'POST /car': 'CarController.add_car',
	'PUT /car/:id': 'CarController.edit_car',
	'GET /car/:id': 'CarController.view_by_id',
	'GET /car': 'CarController.list_available',
	'DELETE /car/:id': 'CarController.remove_car',

	'POST /chart': 'ChartController.add_chart',
	'GET /chart/:user_id': 'ChartController.list_by_user',
	'GET /chart': 'ChartController.list_all',
	'DELETE /chart/:id': 'ChartController.remove_chart',
	'DELETE /chart/:user_id/:id': 'ChartController.remove_chart_user',

	'POST /payment': 'PaymentController.add_payment',
	'POST /payment/bill': 'PaymentController.add_payment_bill',
	'GET /transactions': 'PaymentController.list_payment',
	'PUT /payment/:id': 'PaymentController.cancel_payment',
};

module.exports = privateRoutes;
