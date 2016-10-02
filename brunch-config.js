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
    plugins: {
        copycat: {
            "fonts": ['bower_components/bootstrap/fonts', 'bower_components/bootstrap-material-design-icons/fonts'],
            // "images": ["someDirectoryInProject", "bower_components/some_package/assets/images"],
            // verbose : true, //shows each file that is copied to the destination directory
            onlyChanged: true //only copy a file if it's modified time has changed (only effective when using brunch watch)
        }
    },
    modules: {
        wrapper: 'amd'
    }
};
