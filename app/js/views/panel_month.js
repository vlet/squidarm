var Backbone = require("backbone");
var datalink = require("templates/datalink.html");
var language = require("app/datatable_lang.json");

var PanelMonth = Backbone.View.extend({
    el: '#page-wrapper .panel',
    events: {
        'click #users-month a': 'moveto'
    },
    moveto: function(e) {
        e.preventDefault();
        var href = $(e.target).attr('href');
        console.log('Navigate ' + href);
        this.router.navigate(href, {
            trigger: true
        });
    },
    initialize: function(deps) {
        this.router = deps.app.router;
    },
    template: require("templates/panel_month.html"),
    dt: function(api_uri) {
        return {
            ajax: api_uri,
            pageLength: 30,
            language: language,
            order: [
                [0, "asc"]],
            columnDefs: [{
                "targets": [2, 3],
                "render": function(data, type, full, meta) {
                    if (type != 'display') return data;
                    var k = ['', 'K', 'M', 'G'],
                    i = 0;
                    while (data > 1024 && i < 4) {
                        data /= 1024;
                        i++;
                    }
                    return Math.round(data) + k[i];
                }
            },
            {
                "targets": 0,
                "render": function(data, type) {
                    if (type != 'display') return data;
                    var link = data.split('-').join('/');
                    return datalink({
                        link: '/users/' + link,
                        data: data
                    });
                }
            },
            {
                "targets": 1,
                "render": function(data, type, full) {
                    if (type != 'display') return data;
                    return full[2] + data > 0 ? Math.round(100 * data / (data + full[2])) + "%" : "-";
                }
            }

            ]
        };
    },
    render: function(init) {
        this.$el.html(this.template(init));
        this.$el.find('#users-month').dataTable(this.dt(init.api_uri));
    }
});

module.exports = PanelMonth;
