import fs from "fs"
import Path from "path"
import Archiver from "archiver"
import _ from "lodash"

import * as lambda from "./lambda"
import * as s3 from "./s3"
import * as config from "./config"

var PWD = process.cwd()
var packageJson = require(PWD + '/package.json');

var packing = function () {
	var dependencies = _.keys(packageJson.dependencies).map( (name)=>{
		return Path.join( "node_modules", name)
	})

	var targets = config.TARGET.map( (name)=>{
		return Path.join(name)
	})

	targets = (targets.concat(dependencies))

	return new Promise((resolve, reject) => {
		var archiver = require('archiver');

		var output = fs.createWriteStream(config.TMP_ZIP_PATH);
		var archive = archiver('zip');

		output.on('close', function() {
			console.log("SUCCESS - generate zip");
			resolve()
		});

		archive.on('error', function(err) {
			console.error("FAILED - generate zip");
			reject()
		});

		archive.pipe(output);

		var files = targets.map((path)=>{
			var full_path = Path.join(PWD, path)
			if( fs.lstatSync(full_path).isDirectory()) {
				return { expand: true, cwd: full_path, src: ["**"], dest: path} 
			}else{
				return { src: path } 
			}

		})
		archive.bulk(files);

		archive.finalize();
	})
}

Promise.resolve()
.then(packing)
.then(s3.upload)
.then(lambda.init_function)
.then(lambda.update_code)
.catch((err)=>{
	console.error(err)
	throw err;
})


