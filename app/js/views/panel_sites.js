var Backbone = require("backbone");
var datalink = require("templates/datalink.html");
var language = require("app/datatable_lang.json");

var PanelSites = Backbone.View.extend({
    el: '#page-wrapper .panel',
    events: {
        'click #sites-month a': 'moveto'
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
    template: require("templates/panel_sites.html"),
    dt: function(api_uri,year,month) {
        return {
            ajax: api_uri + ".json",
            pageLength: 50,
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
                "targets": 0,
                "render": function(data, type) {
                    if (type != 'display') return data;
                    var link = [data, year, month ].join('/');
                    return datalink({
                        link: '/site/' + link,
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
        console.log(init);
        this.$el.html(this.template(init));
        this.$el.find('#sites-month').dataTable(this.dt(init.api_uri, init.year, init.month));
        var r = this.router;
        this.$el.find('#datetimepicker').datetimepicker({
            defaultDate: new Date(init.year, init.month-1, 1),
            locale: 'ru',
            format: 'YYYY MM',
        }).on('dp.change', function(e) {
            console.log(e.date.year());
            console.log(e.date.month()+1);
            r.navigate( '/sites/' + e.date.year() + '/' + ( e.date.month()+1 ) , {
                trigger: true
            });
        });
    }
});

module.exports = PanelSites;
