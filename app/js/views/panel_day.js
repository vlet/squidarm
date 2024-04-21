var Backbone = require("backbone");
var datalink = require("templates/datalink.html");
var language = require("app/datatable_lang.json");

var PanelDay = Backbone.View.extend({
    el: '#page-wrapper .panel',
    events: {
        'click #users-day a': 'moveto'
    },
    initialize: function(deps) {
        this.app = deps.app;
    },
    moveto: function(e) {
        e.preventDefault();
        var href = $(e.target).attr('href');
        console.log('Navigate ' + href);
        this.app.router.navigate(href, {
            trigger: true
        });
    },
    template: require("templates/panel_day.html"),
    dt: function(api_uri, year, month, day) {
        var u = this.app.usernames;
        return {
            ajax: api_uri + ".json",
            pageLength: 25,
            language: language,
            order: [
                [2, "desc"]],
            columnDefs: [{
                "targets": [2, 3],
                "render": function(data, type, full, meta) {
                    if (type != 'display') return data;
                    var k = ['', 'K', 'M', 'G', 'T'],
                    i = 0;
                    while (data > 2048 && i < 4) {
                        data /= 1024;
                        i++;
                    }
                    return Math.round(data) + k[i];
                }
            },
            {
                "targets": 1,
                "render": function(data, type, full) {
                    if (type != 'display') return data;
                    return full[2] + data > 0 ? Math.round(100 * data / (full[2] + data)) + "%" : "-";
                }
            },
            {
                "targets": 0,
                "render": function(data, type) {
                    if (type != 'display') return data;
                    var link = [data, year, month, day].join('/');
                    var username = u.hasOwnProperty(data) ? u[data] : data;
                    return datalink({
                        link: '/user/' + link,
                        data: username
                    });
                }
            }]
        };
    },
    render: function(init) {
        this.$el.html(this.template(init));
        this.$el.find('#users-day').dataTable(this.dt(init.api_uri, init.year, init.month, init.day));
    }
});

module.exports = PanelDay;
