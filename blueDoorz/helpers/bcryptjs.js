var bcrypt = require('bcryptjs');

function bcryptPass(value) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(`${value}`, salt);
    return hash
}

function compare(password, passwordData) {
    const compare = bcrypt.compareSync(`${password}`, passwordData)
    return compare
}

module.exports = { bcryptPass, compare }