const crypto = require('crypto');
module.exports = str => {
    return crypto.createHash('sha256').update(str).digest('hex');
};