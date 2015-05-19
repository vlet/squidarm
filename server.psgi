use strict;
use warnings;
use Plack::Builder;
use Plack::App::File;
builder {
    enable "Plack::Middleware::Static",
        path => qr{^/(css|js|fonts|images)/}, root => 'dist';
    mount '/' => Plack::App::File->new({ file => 'dist/index.html' })->to_app;
};
