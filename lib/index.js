"use strict";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _archiver = require("archiver");

var _archiver2 = _interopRequireDefault(_archiver);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _lambda = require("./lambda");

var lambda = _interopRequireWildcard(_lambda);

var _s3 = require("./s3");

var s3 = _interopRequireWildcard(_s3);

var _config = require("./config");

var config = _interopRequireWildcard(_config);

var PWD = process.cwd();
var packageJson = require(PWD + '/package.json');

var packing = function packing() {
	var dependencies = _lodash2["default"].keys(packageJson.dependencies).map(function (name) {
		return _path2["default"].join("node_modules", name);
	});

	var targets = config.TARGET.map(function (name) {
		return _path2["default"].join(name);
	});

	targets = targets.concat(dependencies);

	return new Promise(function (resolve, reject) {
		var archiver = require('archiver');

		var output = _fs2["default"].createWriteStream(config.TMP_ZIP_PATH);
		var archive = archiver('zip');

		output.on('close', function () {
			console.log("SUCCESS - generate zip");
			resolve();
		});

		archive.on('error', function (err) {
			console.error("FAILED - generate zip");
			reject();
		});

		archive.pipe(output);

		var files = targets.map(function (path) {
			var full_path = _path2["default"].join(PWD, path);
			if (_fs2["default"].lstatSync(full_path).isDirectory()) {
				return { expand: true, cwd: full_path, src: ["**"], dest: path };
			} else {
				return { src: path };
			}
		});
		archive.bulk(files);

		archive.finalize();
	});
};

Promise.resolve().then(packing).then(s3.upload).then(lambda.init_function).then(lambda.update_code)["catch"](function (err) {
	console.error(err);
	throw err;
});
//# sourceMappingURL=data:application/json;base64,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QyxVQUFDLEdBQUcsRUFBRztBQUNiLFFBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDbEIsT0FBTSxHQUFHLENBQUM7Q0FDVixDQUFDLENBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSBcImZzXCJcbmltcG9ydCBQYXRoIGZyb20gXCJwYXRoXCJcbmltcG9ydCBBcmNoaXZlciBmcm9tIFwiYXJjaGl2ZXJcIlxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiXG5cbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiLi9sYW1iZGFcIlxuaW1wb3J0ICogYXMgczMgZnJvbSBcIi4vczNcIlxuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiXG5cbnZhciBQV0QgPSBwcm9jZXNzLmN3ZCgpXG52YXIgcGFja2FnZUpzb24gPSByZXF1aXJlKFBXRCArICcvcGFja2FnZS5qc29uJyk7XG5cbnZhciBwYWNraW5nID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgZGVwZW5kZW5jaWVzID0gXy5rZXlzKHBhY2thZ2VKc29uLmRlcGVuZGVuY2llcykubWFwKCAobmFtZSk9Pntcblx0XHRyZXR1cm4gUGF0aC5qb2luKCBcIm5vZGVfbW9kdWxlc1wiLCBuYW1lKVxuXHR9KVxuXG5cdHZhciB0YXJnZXRzID0gY29uZmlnLlRBUkdFVC5tYXAoIChuYW1lKT0+e1xuXHRcdHJldHVybiBQYXRoLmpvaW4obmFtZSlcblx0fSlcblxuXHR0YXJnZXRzID0gKHRhcmdldHMuY29uY2F0KGRlcGVuZGVuY2llcykpXG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHR2YXIgYXJjaGl2ZXIgPSByZXF1aXJlKCdhcmNoaXZlcicpO1xuXG5cdFx0dmFyIG91dHB1dCA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGNvbmZpZy5UTVBfWklQX1BBVEgpO1xuXHRcdHZhciBhcmNoaXZlID0gYXJjaGl2ZXIoJ3ppcCcpO1xuXG5cdFx0b3V0cHV0Lm9uKCdjbG9zZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJTVUNDRVNTIC0gZ2VuZXJhdGUgemlwXCIpO1xuXHRcdFx0cmVzb2x2ZSgpXG5cdFx0fSk7XG5cblx0XHRhcmNoaXZlLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIkZBSUxFRCAtIGdlbmVyYXRlIHppcFwiKTtcblx0XHRcdHJlamVjdCgpXG5cdFx0fSk7XG5cblx0XHRhcmNoaXZlLnBpcGUob3V0cHV0KTtcblxuXHRcdHZhciBmaWxlcyA9IHRhcmdldHMubWFwKChwYXRoKT0+e1xuXHRcdFx0dmFyIGZ1bGxfcGF0aCA9IFBhdGguam9pbihQV0QsIHBhdGgpXG5cdFx0XHRpZiggZnMubHN0YXRTeW5jKGZ1bGxfcGF0aCkuaXNEaXJlY3RvcnkoKSkge1xuXHRcdFx0XHRyZXR1cm4geyBleHBhbmQ6IHRydWUsIGN3ZDogZnVsbF9wYXRoLCBzcmM6IFtcIioqXCJdLCBkZXN0OiBwYXRofSBcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4geyBzcmM6IHBhdGggfSBcblx0XHRcdH1cblxuXHRcdH0pXG5cdFx0YXJjaGl2ZS5idWxrKGZpbGVzKTtcblxuXHRcdGFyY2hpdmUuZmluYWxpemUoKTtcblx0fSlcbn1cblxuUHJvbWlzZS5yZXNvbHZlKClcbi50aGVuKHBhY2tpbmcpXG4udGhlbihzMy51cGxvYWQpXG4udGhlbihsYW1iZGEuaW5pdF9mdW5jdGlvbilcbi50aGVuKGxhbWJkYS51cGRhdGVfY29kZSlcbi5jYXRjaCgoZXJyKT0+e1xuXHRjb25zb2xlLmVycm9yKGVycilcblx0dGhyb3cgZXJyO1xufSlcblxuXG4iXX0=