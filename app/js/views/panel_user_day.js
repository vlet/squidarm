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
            }]

        };
    },
    render: function(init) {
        this.$el.html(this.template(init));
        this.$el.find('#user-day').dataTable(this.dt(init.api_uri));
    }
});

module.exports = PanelUserDay;
