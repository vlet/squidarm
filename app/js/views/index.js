var Backbone = require("backbone"),
MainNav = require("app/views/mainnav"),
PanelMonth = require("app/views/panel_month"),
PanelDay = require("app/views/panel_day"),
PanelUserDay = require("app/views/panel_user_day"),
Router = require("app/routers/sa");

var IndexView = Backbone.View.extend({
    el: 'body',
    initialize: function() {
        var deps = {
            app: this
        };

        this.router = new Router(deps);
        this.nav = new MainNav(deps);
        this.pm = new PanelMonth(deps);
        this.pd = new PanelDay(deps);
        this.pud = new PanelUserDay(deps);
    }
});
module.exports = IndexView;
