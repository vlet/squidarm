var Backbone = require("backbone");
var TotalDay = require('models/total_day');
var MonthTraf = Backbone.Collection.extend({
    model: TotalDay
});
module.exports = MonthTraf;
