module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	const fs = require('fs');
	const js = fs.readFileSync('dist/ytma.user.js', 'utf8');

	function getVersions() {
		let version, rawVersion, updateVersion;

		version = js.match(/version\s+(\d+.+)/)[1];
		rawVersion = (version.replace(/[.]/g, '') + '000').substr(0, 4);
		updateVersion = js.match(/version:\s?(\d+)/)[1];

		return {
			version,
			rawVersion,
			updateVersion
		};
	}

	function writeJson(obj, filename) {
		const pretty = JSON.stringify(obj, null, 2) + '\n';

		fs.writeFileSync(filename, pretty, 'utf8');

		grunt.log.write(`Updated ${filename}`).ok();

		return true;
	}

	grunt.registerTask('version', 'Check version', function () {
		const {
			version,
			rawVersion,
			updateVersion
		} = getVersions();

		if (updateVersion !== rawVersion) {
			grunt.log.error('Versions do not match. Update them correctly!');
			grunt.log.write(version, rawVersion, updateVersion);
			return false;
		}

		grunt.log.write(`Script versions are ${version} and ${updateVersion}`).ok();
	});

	grunt.registerTask('update', 'Generate update.json', function () {
		const update = {
			name: 'YouTube Me Again!',
			version: getVersions().updateVersion,
			page: 'https://greasyfork.org/scripts/1023-youtube-me-again'
		};

		return writeJson(update, './docs/update.json');
	});

	grunt.registerTask('package', 'Update package.json', function () {
		const pkg = JSON.parse(fs.readFileSync('package.json'));

		const [major, minor = 0, mod = 0] = getVersions().version.split(/[.]/);

		pkg.version = `${major}.${minor}.${mod}`;

		return writeJson(pkg, 'package.json');
	});

	grunt.registerTask('manifest', 'Update manifest.json', function () {
		const mfst = JSON.parse(fs.readFileSync('manifest.json'));

		mfst.version = getVersions().version;

		const matches = js.match(/(?:\/\/ @match.+)/g).map(m => m.split(/\s+/)[2]);
		mfst.content_scripts[0].matches = matches;

		// const permissions = matches.map(t => t.match(/.*\/\/[a-z.*-]+\/?/)[0] + '*');
		// grunt.log.write(JSON.stringify([...new Set(permissions)], null, 2))

		return writeJson(mfst, 'manifest.json');
	});

	grunt.registerTask('extension', 'Create extension ZIP', function () {
		const done = this.async();

		const archiver = require('archiver');

		const files = ['32.png', '48.png', '64.png', '128.png', '256.png', 'manifest.json', 'ytma.user.js'];

		const output = fs.createWriteStream(__dirname + '/dist/extension.zip');
		const archive = archiver('zip', {
			zlib: {
				level: 9
			}
		});

		output.on('close', function () {
			grunt.log.write(`Wrote ${archive.pointer()} bytes`).ok('Extension archive ready');
			done();
		});

		archive.on('warning', function (err) {
			grunt.log.write('error!' + err.message);
			done(false);
		});

		archive.pipe(output);

		files.forEach(f => archive.file(f, { name: f }));

		archive.finalize();
	});

	grunt.registerTask('readme', 'Generate readme.md', function () {
		let template, updates, md;

		template = fs.readFileSync('readme.template.md', 'utf8');
		updates = js.substring(js.indexOf('## Updates'), js.indexOf('// #Updates') - 1).trim();
		md = template.replace('## Updates', updates) + '\n';

		fs.writeFileSync('readme.md', md, 'utf8');

		grunt.log.write('Updated readme.md').ok();
	});

	grunt.registerTask('default', 'Let\'s Go!', function () {
		grunt.log.write('Ensuring all is right . . .').ok();

		grunt.task.run('version');
		grunt.task.run('readme');
		grunt.task.run('update');
		grunt.task.run('package');
		grunt.task.run('manifest');
		// grunt.task.run('extension');

		grunt.log.write('PS: don\'t forget about @updated');
	});

};
