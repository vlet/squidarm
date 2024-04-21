// hack
if (global.loaded) {
    return;
} else {
    global.loaded = 1;
}

var Backbone = require('backbone');
Backbone.$ = $;

var IndexView = require('app/views/index');

var app = new IndexView();
Backbone.history.start({
    pushState: true
});

$(function() {
    $('#side-menu > li:nth-child(3)').addClass('active');

    $('#side-menu').metisMenu();

    var spinner = $('.fa-spinner');
    $(document).ajaxStart(function() {
        spinner.removeClass('invisible');
    });

    $(document).ajaxComplete(function() {
        spinner.addClass('invisible');
    });

    $.getJSON( "/api/usernames.json", function( data ) {
        console.log("fetch usernames");
        app.usernames = data.data;
        var e = $.Event( "users" );
        $('#page-wrapper .panel').trigger(e);
    });

    $(window).bind("load resize", function() {
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.sidebar-collapse').addClass('collapse');
        } else {

            $('div.sidebar-collapse').removeClass('collapse');
        }
    });
});
