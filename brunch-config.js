'use strict';

exports.config = {
    paths: {
        'public': 'web/assets',
        'watched': ['app/Resources/public', 'src/NewsrssBundle/Resources/public']
    },
    conventions: {
        'assets': /Resources\/public\/assets/
    },
    files: {
        javascripts: {
            joinTo: {
                'js/app.js': /^(?!bower_components)/,
                'js/vendor.js': /^bower_components/
            }
        },
        stylesheets: {
            joinTo: {
                'css/styles.css': /^(?!bower_components)/,
                'css/vendor.css': /^bower_components/
            },
            order: {
                before: 'bower_components/bootstrap/less/bootstrap.less'
            }
        }
    },
    modules: {
        wrapper: 'amd'
    }
};
