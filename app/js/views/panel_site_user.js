var Backbone = require("backbone");
var datalink = require("templates/datalink.html");
var language = require("app/datatable_lang.json");

var PanelSiteUser = Backbone.View.extend({
    el: '#page-wrapper .panel',
    events: {
        'click #users-month a': 'moveto',
        'users' : 'redraw'
    },
    initialize: function(deps) {
        this.app = deps.app;
        this.router = deps.app.router;
    },
    moveto: function(e) {
        e.preventDefault();
        var href = $(e.target).attr('href');
        console.log('Navigate ' + href);
        this.app.router.navigate(href, {
            trigger: true
        });
    },
    template: require("templates/panel_site_user.html"),
    redraw: function () {
        console.log('users loaded, redraw');
        var dt = this.$el.find('#site-user');
        dt.DataTable().rows().invalidate().draw();
    },
    dt: function(api_uri, year, month) {
        var app = this.app;
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
                "targets": 1,
                "render": function(data, type, full) {
                    if (type != 'display') return data;
                    return (full[2] + data) > 0 ? Math.round(100 * data / (full[2] + data)) + "%" : "-";
                }
            },
            {
                "targets": 0,
                "render": function(data, type) {
                    if (type != 'display') return data;
                    var link = [data, year, month ].join('/');
                    var username = app.usernames.hasOwnProperty(data) ? app.usernames[data] : data;
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
        var dt = this.$el.find('#site-user');
        dt.dataTable(this.dt(init.api_uri, init.year, init.month));
        dt.on('xhr.dt', function ( e, settings, json ) {
            console.log( 'xhr event occurred.' );
            var sum = [0, 0, 0];
            for (var i = 0; i < json.data.length; i++) {
                sum[0] += json.data[i][1];
                sum[1] += json.data[i][2];
                sum[2] += json.data[i][3];
            }
            dt.find('thead th span').each(function(index) {
                if ( index ===  0 ) {
                    $(this).text(
                        (sum[0] + sum[1]) > 0 ? Math.round(100 * sum[0] / (sum[0] + sum[1])) + "%" : ""
                    );
                } else {
                    var k = ['', 'K', 'M', 'G'],
                    i = 0,
                    data = sum[index];
                    while (data > 1024 && i < 4) {
                        data /= 1024;
                        i++;
                    }
                    $(this).text(Math.round(data) + k[i]);
                }
            });
        });
    }
});

module.exports = PanelSiteUser;
