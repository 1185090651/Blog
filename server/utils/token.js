const { tokenSecret } = require('../config')
const jwt = require('jsonwebtoken')

exports.createToken = target => {
    return jwt.sign(target, tokenSecret, { expiresIn: 60 * 60 * 4 });
}

exports.analysisToken = token => {
    return jwt.verify(token, tokenSecret).username;
}