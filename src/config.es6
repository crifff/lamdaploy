import argv from "argv"
argv.option({ name: 'config', short: 'c', type : 'string', description :'config file', })

var options = argv.run()
var PWD = process.cwd()

var config_file = options.options["config"] || "lambda.json"
export var config = require(PWD + '/' + config_file);


export var TMP_ZIP_PATH = "/tmp/hoge.zip"
export var ENVIRONMENT = config.environment || "development"
export var AWS_REGION = config.region || "ap-northeast-1"
export var AWS_ACCESS_KEY_ID = config.aws_access_key_id || null
export var AWS_SECRET_ACCESS_KEY = config.aws_secret_access_key || null
export var BUCKET = config.bucket || null
export var FILE_KEY = config.file_key || null
export var FUNCTION_NAME = config.function_name || null
export var HANDLER = config.handler || "index.handler"
export var ROLE_ARN = config.role_arn || null
export var MEMORY_SIZE = config.memory_size || 128 
export var TIMEOUT = config.timeout || 3
export var TARGET = config.target || []
