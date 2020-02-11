/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var functionShimblyportal097db43bPreSignupName = process.env.FUNCTION_SHIMBLYPORTAL097DB43BPRESIGNUP_NAME

Amplify Params - DO NOT EDIT */ /*
  this file will loop through all js modules which are uploaded to the lambda resource,
  provided that the file names (without extension) are included in the "MODULES" env variable.
  "MODULES" is a comma-delimmited string.
*/

exports.handler = (event, context, callback) => {
	const modules = process.env.MODULES.split(',');
	for (let i = 0; i < modules.length; i += 1) {
		const { handler } = require(`./${modules[i]}`);
		handler(event, context, callback);
	}
};
