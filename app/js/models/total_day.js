var Backbone = require("backbone");
var TotalDay = Backbone.Model.extend({
    defaults: {
        ymd: '2015-05-01',
        hits: 0,
        misses: 0,
        reqs: 0,
        denies: 0,
    }
});
module.exports = TotalDay;
