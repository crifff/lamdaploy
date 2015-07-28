"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _config = require("./config");

var config = _interopRequireWildcard(_config);

_awsSdk2["default"].config.update({
	accessKeyId: config.AWS_ACCESS_KEY_ID,
	secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
	region: config.AWS_REGION
});

var upload = function upload() {
	return new Promise(function (resolve, reject) {
		_fs2["default"].readFile(config.TMP_ZIP_PATH, function (err, data) {
			var S3 = new _awsSdk2["default"].S3();
			var params = {
				Bucket: config.BUCKET,
				Key: config.FILE_KEY,
				Body: data
			};
			S3.putObject(params, function (error, data) {
				if (error) {
					console.error("FAILED - upload zip");
					reject(error);
				}
				console.log("SUCCESS - upload zip");
				resolve();
			});
		});
	});
};

exports.upload = upload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zMy5lczYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztrQkFBZSxJQUFJOzs7O3NCQUNILFNBQVM7Ozs7c0JBUUQsVUFBVTs7SUFBdEIsTUFBTTs7QUFObEIsb0JBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNqQixZQUFXLEVBQUUsTUFBTSxDQUFDLGlCQUFpQjtBQUNyQyxnQkFBZSxFQUFFLE1BQU0sQ0FBQyxxQkFBcUI7QUFDN0MsT0FBTSxFQUFFLE1BQU0sQ0FBQyxVQUFVO0NBQ3pCLENBQUMsQ0FBQTs7QUFJRixJQUFJLE1BQU0sR0FBRyxTQUFULE1BQU0sR0FBYztBQUN2QixRQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSztBQUN2QyxrQkFBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxVQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUk7QUFDOUMsT0FBSSxFQUFFLEdBQUcsSUFBSSxvQkFBSSxFQUFFLEVBQUUsQ0FBQTtBQUNyQixPQUFJLE1BQU0sR0FBRztBQUNaLFVBQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtBQUNyQixPQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVE7QUFDcEIsUUFBSSxFQUFFLElBQUk7SUFDVixDQUFBO0FBQ0QsS0FBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFLO0FBQ3JDLFFBQUcsS0FBSyxFQUFDO0FBQ1AsWUFBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQ3JDLFdBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUNiO0FBQ0QsV0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ25DLFdBQU8sRUFBRSxDQUFBO0lBQ1QsQ0FBQyxDQUFBO0dBQ0YsQ0FBQyxDQUFBO0VBQ0YsQ0FBQyxDQUFBO0NBQ0YsQ0FBQTs7UUFHTyxNQUFNLEdBQU4sTUFBTSIsImZpbGUiOiJzMy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tIFwiZnNcIlxuaW1wb3J0IEF3cyBmcm9tIFwiYXdzLXNka1wiXG5cbkF3cy5jb25maWcudXBkYXRlKHtcblx0YWNjZXNzS2V5SWQ6IGNvbmZpZy5BV1NfQUNDRVNTX0tFWV9JRCxcblx0c2VjcmV0QWNjZXNzS2V5OiBjb25maWcuQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZLFxuXHRyZWdpb246IGNvbmZpZy5BV1NfUkVHSU9OXG59KVxuXG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSBcIi4vY29uZmlnXCJcblxudmFyIHVwbG9hZCA9IGZ1bmN0aW9uICgpe1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGZzLnJlYWRGaWxlKGNvbmZpZy5UTVBfWklQX1BBVEgsIChlcnIsIGRhdGEpPT4ge1xuXHRcdFx0dmFyIFMzID0gbmV3IEF3cy5TMygpXG5cdFx0XHR2YXIgcGFyYW1zID0ge1xuXHRcdFx0XHRCdWNrZXQ6IGNvbmZpZy5CVUNLRVQsXG5cdFx0XHRcdEtleTogY29uZmlnLkZJTEVfS0VZLFxuXHRcdFx0XHRCb2R5OiBkYXRhLFxuXHRcdFx0fVxuXHRcdFx0UzMucHV0T2JqZWN0KHBhcmFtcywgKGVycm9yLCBkYXRhKSA9PiB7XG5cdFx0XHRcdGlmKGVycm9yKXtcblx0XHRcdFx0ICBjb25zb2xlLmVycm9yKFwiRkFJTEVEIC0gdXBsb2FkIHppcFwiKVxuXHRcdFx0XHRcdHJlamVjdChlcnJvcilcblx0XHRcdFx0fVxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlNVQ0NFU1MgLSB1cGxvYWQgemlwXCIpXG5cdFx0XHRcdHJlc29sdmUoKVxuXHRcdFx0fSlcblx0XHR9KVxuXHR9KVxufVxuXG5cbmV4cG9ydCB7dXBsb2FkfVxuIl19