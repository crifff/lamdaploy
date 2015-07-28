import Aws from "aws-sdk"
import * as config from "./config"

Aws.config.update({
	accessKeyId: config.AWS_ACCESS_KEY_ID,
	secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
	region: config.AWS_REGION
})

var init_function=function(){
	return new Promise((resolve, reject) => {
		var lambda = new Aws.Lambda()
		var params = {
			FunctionName: config.FUNCTION_NAME, /* required */
		};
		lambda.getFunction(params, function(err, data) {
			if(err && err.code=="ResourceNotFoundException"){
				var params = {
					Code: { /* required */
						S3Bucket: config.BACKET,
						S3Key: config.FILE_KEY,
					},
					FunctionName: config.FUNCTION_NAME, /* required */
					Handler: config.HANDLER, /* required */
					Role: config.ROLE_ARN, /* required */
					Runtime: 'nodejs', /* required */
					Description: config.DESCRIPTION,
					MemorySize: config.MEMORYSIZE,
					Timeout: config.TIMEOUT 
				};

				lambda.createFunction(params, function(err, data) {
					if(err) {
						console.error("FAIL - create lambda function")
						reject(err)
					} else {
						console.log("SUCCESS - create lambda function")
						resolve(data)
					}
				})
			}else{
				var params = {
					FunctionName: config.FUNCTION_NAME, /* required */
					Handler: config.HANDLER, /* required */
					Role: config.ROLE_ARN, /* required */
					Description: config.DESCRIPTION,
					MemorySize: config.MEMORYSIZE,
					Timeout: config.TIMEOUT 
				};

				lambda.updateFunctionConfiguration(params, function(err, data) {
					if(err) {
						console.error("FAILED - update lambda function")
						reject(err)
					} else {
						console.log("SUCCESS - update lambda function")
						resolve(data)
					}
				})
			}
		})
	})
}

var update_code = function(){
	return new Promise((resolve, reject) => {

		var lambda = new Aws.Lambda()
		var params = {
			FunctionName: config.FUNCTION_NAME, /* required */
			S3Bucket: config.BACKET,
			S3Key: config.FILE_KEY,
		};
		lambda.updateFunctionCode(params, function(err, data) {
			if (err) {
				console.error("FAILED - update lambda function code"); // an error occurred
				reject(err)
			}
			else {
				console.log("SUCCESS - update lambda function code"); // an error occurred
				resolve(data)
			}
		})
	})
}

export {init_function, update_code}
