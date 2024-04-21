var Backbone = require("backbone");
var language = require("app/datatable_lang.json");

var PanelUserDay = Backbone.View.extend({
    el: '#page-wrapper .panel',
    events: {},
    template: require("templates/panel_user_day.html"),
    dt: function(api_uri) {
        return {
            ajax: api_uri + ".json",
            language: language,
            pageLength: 25,
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
                    return (full[2] + data) > 0 ? Math.round(100 * data / (full[2] + data)) + "%" : "-";
                }
            }]

        };
    },
    render: function(init) {
        this.$el.html(this.template(init));
        console.log("render dt");
        var dt = this.$el.find('#user-day');
        dt.dataTable(this.dt(init.api_uri));
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
                    var k = ['', 'K', 'M', 'G', 'T'],
                    i = 0,
                    data = sum[index];
                    while (data > 2048 && i < 4) {
                        data /= 1024;
                        i++;
                    }
                    $(this).text(Math.round(data) + k[i]);
                }
            });
        });
    }
});

module.exports = PanelUserDay;
