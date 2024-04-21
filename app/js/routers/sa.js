var Backbone = require("backbone");

var Router = Backbone.Router.extend({
    routes: {
        '': 'showMain',
        'traf': 'showTraf',
        'traf/:year/:month': 'showTraf',
        'users': 'showUsers',
        'users/:year/:month': 'showUsers',
        'users/:year/:month/:day': 'showUsersDay',
        'user/:user/:year/:month/:day': 'showUserDay',
        'user/:user/:year/:month': 'showUserMonth',
        'sites': 'showSites',
        'sites/:year/:month': 'showSites',
        'site/:site/:year/:month/:day': 'showSiteDay',
        'site/:site/:year/:month': 'showSiteMonth',
        '*default': 'defaultRoute'
    },
    api_uri: '/api',
    initialize: function(deps) {
        console.log("init router");
        this.deps = deps;
    },
    showSites: function(year,month) {
        console.log('/sites');

        var d = new Date();
        year  = (typeof(year) !== "undefined"  && year!==null)  ? year:  d.getFullYear();
        month = (typeof(month) !== "undefined" && month!==null) ? month: d.getMonth() + 1;
        var api_uri = this.api_uri + '/sites/' + year + '/' + month;

        var ps = this.deps.app.ps;
        ps.render({
            year: year,
            month: month,
            api_uri: api_uri,
        });
    },
    showSiteDay: function(){
        console.log('site day');
    },
    showSiteMonth: function(site, year, month){
        console.log('/site', site, year, month);
        var api_uri = this.api_uri + '/site/' + site + '/' + year + '/' + month;
        var psu = this.deps.app.psu;
        psu.render({
            site: site,
            year: year,
            month: month,
            day: '',
            api_uri: api_uri,
        });
    },
    showMain: function() {
        console.log('/');
    },
    showTraf: function(year, month) {
        console.log('/traf');

        var d = new Date();
        year  = (typeof(year) !== "undefined"  && year!==null)  ? year:  d.getFullYear();
        month = (typeof(month) !== "undefined" && month!==null) ? month: d.getMonth() + 1;
        var api_uri = this.api_uri + '/traf/' + year + '/' + month;

        var pm = this.deps.app.pm;
        pm.render({
            year: year,
            month: month,
            api_uri: api_uri,
        });
    },
    showUsers: function(year,month) {
        console.log('/traf');
        var d = new Date();
        year  = (typeof(year) !== "undefined"  && year!==null)  ? year:  d.getFullYear();
        month = (typeof(month) !== "undefined" && month!==null) ? month: d.getMonth() + 1;
        var api_uri = this.api_uri + '/users/' + year + '/' + month;

        var pmu = this.deps.app.pmu;
        pmu.render({
            year: year,
            month: month,
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
        var u = this.deps.app.usernames;
        var api_uri = this.api_uri + '/user/' + user + '/' + year + '/' + month + '/' + day;
        var pud = this.deps.app.pud;
        pud.render({
            user: user,
            username: u.hasOwnProperty(user) ? u[user] : user,
            year: year,
            month: month,
            day: day,
            api_uri: api_uri,
        });
    },
    showUserMonth: function(user, year, month) {
        console.log('/users', user, year, month);
        var u = this.deps.app.usernames;
        var api_uri = this.api_uri + '/user/' + user + '/' + year + '/' + month;
        var pud = this.deps.app.pud;
        pud.render({
            user: user,
            username: u.hasOwnProperty(user) ? u[user] : user,
            year: year,
            month: month,
            day: '',
            api_uri: api_uri,
        });
    },
    defaultRoute: function() {
        console.log('default');
    },
});

module.exports = Router;
