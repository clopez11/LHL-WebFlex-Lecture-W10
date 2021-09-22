// Defining requirements
var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
var concat = require("gulp-concat");
var merge2 = require("merge2");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var webpack = require("webpack-stream");
var argv = require("yargs").argv;

var parentThemeFolder = "corus-wpt-kids";
var releaseFolder = "./js/release";

var portNumber = argv.portNumber;
if (portNumber === undefined) {
  portNumber = "8070";
}

var hostName = argv.hostName;
if (hostName === undefined) {
  hostName = "dev.disneychannel.ca";
}

var browserSyncOptions = {
  proxy: "https://" + hostName + ":" + portNumber,
  port: 8072,
  https: true,
  ui: false,
  ghost: false,
  open: "external",
  host: hostName,
  notify: false,
};

function webpackConfig(libraryName) {
  return {
    mode: "production",
    devtool: "inline-source-map",
    output: {
      library: libraryName,
      libraryTarget: "umd",
      umdNamedDefine: true,
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              compact: false,
            },
          },
        },
      ],
    },
    performance: {
      hints: false,
      maxEntrypointSize: 1000000,
      maxAssetSize: 1000000,
    },
  };
}

var styleSourceFiles = [
  "./sass/**/*.scss",
  "./components/**/*.scss",
  "../" + parentThemeFolder + "/sass/**/*.scss",
  "../" + parentThemeFolder + "/components/**/*.scss",
];

var browserSyncWatchFiles = [
  "./css/theme.min.css",
  "./js/theme.min.js",
  "./**/*.php",
  "./**/*.twig",
  "../" + parentThemeFolder + "/**/*.php",
  "../" + parentThemeFolder + "/**/*.twig",
];

var headerJsFiles = [
  "../" + parentThemeFolder + "/node_modules/jquery/dist/jquery.min.js",
];

var nodeJsFiles = [
  "../" + parentThemeFolder + "/node_modules/popper.js/dist/umd/popper.js",
  "../" +
    parentThemeFolder +
    "/node_modules/bootstrap/dist/js/bootstrap.min.js",
  "../" + parentThemeFolder + "/node_modules/in-view/dist/in-view.min.js",
];

var parentJsSourceFiles = [
  "../" + parentThemeFolder + "/js/**/*.js",
  "../" + parentThemeFolder + "/components/index.js",
  "!../" + parentThemeFolder + "/js/theme.min.js",
  "!../" + parentThemeFolder + "/js/theme.js",
  "!../" + parentThemeFolder + "/" + releaseFolder + "/*",
];

var jsSourceFiles = [
  "./js/**/*.js",
  "./components/**/*.js",
  "!./js/theme.js",
  "!./js/theme.min.js",
  "!" + releaseFolder + "/*",
];

gulp.task("admin-styles", function () {
  return gulp
    .src("./sass/admin.scss")
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      sass().on("error", function (e) {
        console.log(e);
      })
    )
    .pipe(autoprefixer()) // comment this for performance
    .pipe(cleanCSS({ compatibility: "*" })) // comment this for performance
    .pipe(
      plumber({
        errorHandler: function (error) {
          swallowError(self, error);
        },
      })
    )
    .pipe(rename("admin.min.css"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("../" + parentThemeFolder + "/css/"));
});

gulp.task("styles", function () {
  return gulp
    .src("./sass/child-theme.scss")
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      sass().on("error", function (e) {
        console.log(e);
      })
    )
    .pipe(autoprefixer()) // comment this for performance
    .pipe(cleanCSS({ compatibility: "*" })) // comment this for performance
    .pipe(
      plumber({
        errorHandler: function (error) {
          swallowError(self, error);
        },
      })
    )
    .pipe(rename("theme.min.css"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./css/"));
});

gulp.task("header-scripts", function () {
  var headerSources = gulp.src(headerJsFiles);

  headerSources
    .pipe(concat("header.min.js"))
    .pipe(
      uglify().on("error", function (e) {
        console.log(e);
      })
    )
    .pipe(gulp.dest(releaseFolder));

  return headerSources.pipe(concat("header.js")).pipe(gulp.dest(releaseFolder));
});

gulp.task("main-scripts", async function () {
  var parentWebpackStream = gulp
    .src(parentJsSourceFiles)
    .pipe(webpack(webpackConfig("CorusVideo")));

  var webpackStream = gulp
    .src(jsSourceFiles)
    .pipe(webpack(webpackConfig("Disney")));

  var simpleStream = gulp.src(nodeJsFiles);

  merge2(simpleStream, [parentWebpackStream, webpackStream])
    .pipe(concat("theme.js"))
    .pipe(gulp.dest(releaseFolder))
    .pipe(concat("theme.min.js"))
    .pipe(
      uglify().on("error", function (e) {
        console.log(e);
      })
    )
    .pipe(gulp.dest(releaseFolder));
});

gulp.task("scripts", gulp.parallel("header-scripts", "main-scripts"));

gulp.task("build", gulp.parallel("scripts", "styles", "admin-styles"));

gulp.task("watch", function () {
  gulp.watch(
    jsSourceFiles
      .concat("../corus-wpt-kids/components/**/js/*.js")
      .concat(nodeJsFiles)
      .concat(parentJsSourceFiles)
      .concat(headerJsFiles),
    gulp.series("scripts")
  );
  gulp.watch(styleSourceFiles, gulp.series("styles"));
});

gulp.task("browser-sync", function () {
  browserSync.init(browserSyncWatchFiles, browserSyncOptions);
});

gulp.task("watch-bs", gulp.series("build", "browser-sync", "watch"));

function swallowError(self, error) {
  console.log(error.toString());

  self.emit("end");
}
