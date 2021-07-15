const bcrypt = require('bcrypt');

const bcryptService = () => {
        const password = (user) => {
                // const saltRounds = 10;
                const salt = bcrypt.genSaltSync();
                // const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(user.password, salt);

                return hash;
        };

        const comparePassword = (pw, hash) => (
                bcrypt.compareSync(pw, hash)
        );

        return {
                password,
                comparePassword,
        };
};

module.exports = bcryptService;
