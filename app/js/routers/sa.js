var Backbone = require("backbone");

var Router = Backbone.Router.extend({
    routes: {
        '': 'showMain',
        'users': 'showUsers',
        'users/:year/:month/:day': 'showUsersDay',
        'user/:user/:year/:month/:day': 'showUserDay',
        '*default': 'defaultRoute'
    },
    api_uri: '/api',
    initialize: function(deps) {
        console.log("init router");
        this.deps = deps;
    },
    showMain: function() {
        console.log('/');
    },
    showUsers: function() {
        console.log('/users');

        var d = new Date();
        var api_uri = this.api_uri + '/traf/' + d.getFullYear() + '/' + (d.getMonth() + 1);

        var pm = this.deps.app.pm;
        pm.render({
            year: d.getFullYear(),
            month: (d.getMonth() + 1),
            api_uri: api_uri,
        });
    },
    showUsersDay: function(year, month, day) {
        console.log('/users', year, month, day);
        var api_uri = this.api_uri + '/traf/' + year + '/' + month + '/' + day;
        var pd = this.deps.app.pd;
        pd.render({
            year: year,
            month: month,
            day: day,
            api_uri: api_uri,
        });
    },
    showUserDay: function(user, year, month, day) {
        console.log('/users', user, year, month, day);
        var api_uri = this.api_uri + '/user/' + user + '/' + year + '/' + month + '/' + day;
        var pud = this.deps.app.pud;
        pud.render({
            user: user,
            year: year,
            month: month,
            day: day,
            api_uri: api_uri,
        });
    },
    defaultRoute: function() {
        console.log('default');
    },
});

module.exports = Router;
