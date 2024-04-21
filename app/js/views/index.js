var Backbone = require("backbone"),
MainNav = require("app/views/mainnav"),
PanelMonth = require("app/views/panel_month"),
PanelMonthUsers = require("app/views/panel_month_users"),
PanelDay = require("app/views/panel_day"),
PanelUserDay = require("app/views/panel_user_day"),
PanelSites = require("app/views/panel_sites"),
PanelSiteUser = require("app/views/panel_site_user"),
Router = require("app/routers/sa");

var IndexView = Backbone.View.extend({
    el: 'body',
    initialize: function() {
        var deps = {
            app: this
        };

        this.usernames = {};
        this.router = new Router(deps);
        this.nav = new MainNav(deps);
        this.pm = new PanelMonth(deps);
        this.pmu = new PanelMonthUsers(deps);
        this.pd = new PanelDay(deps);
        this.pud = new PanelUserDay(deps);
        this.ps = new PanelSites(deps);
        this.psu = new PanelSiteUser(deps);
    }
});
module.exports = IndexView;
