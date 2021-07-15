const jwt = require('jsonwebtoken');

const secret = 'secret';

const authService = () => {
        const issue = (payload) => jwt.sign(payload, secret, { expiresIn: '1h' });
        const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

        return {
                issue,
                verify,
        };
};

module.exports = authService;