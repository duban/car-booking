const privateRoutes = require('../app/routes/privateRoute');

const config = {
      migrate: false,
      privateRoutes,
      port: process.env.PORT || '3002',
};

module.exports = config;
