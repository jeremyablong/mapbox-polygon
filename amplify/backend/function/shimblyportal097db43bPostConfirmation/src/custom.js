const AWS = require('aws-sdk');
let lambda = new AWS.Lambda();
let sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

module.exports.upsertUser = async (email, name) => {
	const body = JSON.stringify({
		email: email,
		name: name
	});

	let params = {
		FunctionName: 'shim-api-user-upsert',
		InvocationType: 'RequestResponse',
		Payload: JSON.stringify({
			body: body
		})
	};

	return new Promise((resolve, reject) => {
		lambda
			.invoke(params)
			.promise()
			.then((value, reason) => {
				if (reason) {
					reject(reason);
				}

				if (value.StatusCode === 200) {
					const payload = JSON.parse(value.Payload);
					if (payload.statusCode === 200) {
						const body = JSON.parse(payload.body);
						if (body + body.user && body.user.id) {
							resolve(body.user);
						} else {
							reject('Wrong response body - ' + JSON.stringify(body));
						}
					} else {
						reject(payload.errorMessage);
					}
				} else {
					reject(value);
				}
			});
	});
};

module.exports.sendSQSMessage = async (email, name, _id) => {
	const params = {
		MessageBody: JSON.stringify({
			email: email,
			name: name
		}),
		QueueUrl:
			'https://sqs.us-east-2.amazonaws.com/574411154021/ShimblyCognitoPostSignUp'
	};

	console.log('=== sqs params:', params);

	resp = await sqs.sendMessage(params).promise();

	return resp;
};

exports.handler = (event, context, callback) => {
	// insert code to be executed by your lambda trigger
	console.log('=== event:', event);

	try {
		this.sendSQSMessage(
			event.request.userAttributes.email,
			event.request.userAttributes.name
		).then((value, reason) => {
			console.log('=== send sqs resp:', value, reason);
			callback(reason, event);
		});
		// this.upsertUser(
		// 	event.request.userAttributes.email,
		// 	event.request.userAttributes.name
		// ).then((user, reason) => {
		// 	console.log('=== upsert response:', user, reason);
		// 	if (reason) {
		// 		callback(reason);
		// 	}

		// 	this.sendSQSMessage(user.email, user.name).then((value, reason) => {
		// 		console.log('=== send sqs resp:', value, reason);
		// 		callback(reason, event);
		// 	});
		// });
	} catch (error) {
		callback(error);
	}
};
