/**
 * This file contains all path need for gulp build process 
 * @author: Bruce Mbayo
 * @path: ./gulp/path.js 
 */

// the output folder for built client files
const DIST_CLIENT_FOLDER = './dist/client/';

// sources folder 
const SRC_CLIENT_FOLDER = './src/client/';

// paths for ressources
const paths = {

	// client source path 
  src : {
  	// load first module definition 
    modules : [
      './src/client/core/core.module.js', './src/client/core/**/*.module.js',
      './src/client/bundles/bundles.module.js', './src/client/bundles/**/*.module.js'
    ],

    // load core constants
    constants : [ './src/client/core/core.constants.js'],

    // load core filter only
    filters : [ './src/client/core/filters/*.filter.js' ],

    // load core services only
    services : [ './src/client/core/services/*.service.js' ],

    // load core components only
    components : [ './src/client/core/components/*.component.js' ],

    // load core directives only
    directives : [ './src/client/core/directives/*.directive.js' ],

    // load controllers only in bundle folder
    controllers : [ 
    	'./src/client/bundles/*.controller.js', './src/client/bundles/**/*.controller.js' 
    ],

    // load routes configurations only in bundle folder 
    routes : [ 
    	'./src/client/bundles/*.routes.js', './src/client/bundles/**/*.routes.js' 
    ],

    // application main file 
    index : [ './src/client/app/index.js' ]
  },

  // views static files
  views : [

  	// html partials from bundle 
    './src/client/app/bundles/**/*.html',

    // html partials from core ie shared partials 
    './src/client/app/core/**/*.html'

  ],

  // static files
  static : [
  	'./src/client/*.html'
  ],

  // app basic style 
  styles : [
  	'./src/client/assets/**/*.css'
  ],

  // client vendor path 
  vendors : [

  	// Angular
    './src/client/vendors/angular/angular.min.js',

    // Angular ui router
    './src/client/vendors/angular-ui-router/release/angular-ui-router.min.js',

  ],

  // vendors assets 
  vendor_assets : [
  	'./src/client/vendors/**/*.{css,ttf,woff,woff2,eot,svg}'
  ],

  // less files folder 
  less : [ './src/client/less/*.less' ],

  // client dist path 
  dist : DIST_CLIENT_FOLDER,

  // client dev path 
  dev_folder : SRC_CLIENT_FOLDER

};

exports.paths = paths;
