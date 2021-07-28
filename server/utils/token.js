const { tokenSecret } = require('../config');
const jwt = require('jsonwebtoken');

exports.createToken = target => {
    return jwt.sign(target, tokenSecret, { expiresIn: '96h' });
};

exports.analysisToken = token => {
    return jwt.verify(token, tokenSecret);
};