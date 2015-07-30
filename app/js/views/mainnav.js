var Backbone = require("backbone");
var MainNav = Backbone.View.extend({
    el: '#side-menu',
    events: {
        'click a': 'navigate'
    },
    initialize: function(deps) {
        this.router = deps.app.router;
    },
    navigate: function(e) {
        e.preventDefault();
        var href = $(e.target).attr('href');
        console.log('Navigate ' + href);
        this.router.navigate(href, {
            trigger: true
        });
    }
});
module.exports = MainNav;
