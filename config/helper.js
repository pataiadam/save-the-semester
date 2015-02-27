var moment = require('moment');
module.exports = {
    formatDate: function (date, format) {
        if (date === null || date === undefined) {
            return '';
        }
        if (typeof format === 'object') {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        } else {
            return moment(date).format(format);
        }
    },
    isEqual: function (v1, v2, options) {
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
};
