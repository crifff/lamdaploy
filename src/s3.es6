import fs from "fs"
import Aws from "aws-sdk"

Aws.config.update({
	accessKeyId: config.AWS_ACCESS_KEY_ID,
	secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
	region: config.AWS_REGION
})

import * as config from "./config"

var upload = function (){
	return new Promise((resolve, reject) => {
		fs.readFile(config.TMP_ZIP_PATH, (err, data)=> {
			var S3 = new Aws.S3()
			var params = {
				Bucket: config.BUCKET,
				Key: config.FILE_KEY,
				Body: data,
			}
			S3.putObject(params, (error, data) => {
				if(error){
				  console.error("FAILED - upload zip")
					reject(error)
				}
				console.log("SUCCESS - upload zip")
				resolve()
			})
		})
	})
}


export {upload}
