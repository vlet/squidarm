var Backbone = require("backbone");
var datalink = require("templates/datalink.html");
var language = require("app/datatable_lang.json");

var PanelMonthUsers = Backbone.View.extend({
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
    template: require("templates/panel_month_users.html"),
    redraw: function () {
        console.log('users loaded, redraw');
        var dt = this.$el.find('#users-month');
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
                    return full[2] + data > 0 ? Math.round(100 * data / (full[2] + data)) + "%" : "-";
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
        this.$el.find('#users-month').dataTable(this.dt(init.api_uri, init.year, init.month));
        var r = this.router;
        this.$el.find('#datetimepicker2').datetimepicker({
            defaultDate: new Date(init.year, init.month-1, 1),
            locale: 'ru',
            format: 'YYYY MM',
        }).on('dp.change', function(e) {
            console.log(e.date.year());
            console.log(e.date.month()+1);
            r.navigate( '/users/' + e.date.year() + '/' + ( e.date.month()+1 ) , {
                trigger: true
            });
        });

    }
});

module.exports = PanelMonthUsers;
