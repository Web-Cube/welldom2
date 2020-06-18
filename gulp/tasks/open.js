// =========================================================
// Gulp Task: Deploy
// =========================================================
let folder = 'welldom';
let projectName = 'welldom';
let ftpData = require('../settings/ftp.json');

module.exports = function(gulp, plugins) {

    return () => {

		return gulp.src(__filename)
	        	.pipe(plugins.open({uri: `http://${projectName}.${ftpData.domain}/`}));

    };
};