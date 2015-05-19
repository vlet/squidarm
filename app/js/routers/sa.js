var Backbone = require("backbone");
var saRouter = Backbone.Router.extend({
    routes: {
        '': 'showMain',
        'users': 'showUsers',
        '*default': 'defaultRoute'
    },
    initialize: function() {
    },
    showMain: function() {
        console.log('/');
    },
    showUsers: function() {
        console.log('/users');
    },
    defaultRoute: function() {
        console.log('default');
    },
});
module.exports = saRouter;
