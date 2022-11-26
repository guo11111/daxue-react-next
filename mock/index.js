const delay = require('mocker-api/lib/delay');
const home = require('./home');

const proxy = {
    ...home
};

module.exports = delay(proxy, 0);
