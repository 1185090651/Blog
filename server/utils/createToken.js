const { tokenSecret } = require('../config')
const jwt = require('jsonwebtoken')

module.exports = target => {
    return jwt.sign(target, tokenSecret, { expiresIn: 60 * 60 * 4 });
}