const AWS = require('aws-sdk');
const cognitoIdentityService = new AWS.CognitoIdentityServiceProvider();

module.exports.getExistingUserByEmail = async (
	email,
	userPoolId,
	currentUserName
) => {
	const params = {
		UserPoolId: userPoolId,
		Filter: `email = "${email}"`
	};

	try {
		const data = await cognitoIdentityService.listUsers(params).promise();

		console.log('=== data:', data);
		const existingUsers = data.Users.filter(
			(user) => user.Username !== currentUserName
		);
		return existingUsers;
	} catch (error) {
		console.log('Error: getUserByAttribute', error);
	}

	return [];
};

exports.handler = (event, context, callback) => {
	console.log('=== event:', event);
	// TODO: cognito user is not confirmed => identity user => cognito user was confirmed
	// TODO: for multiply users link to a primary user
	// TODO: check identity user signup => cognito user signup

	this.getExistingUserByEmail(
		event.request.userAttributes.email,
		event.userPoolId,
		event.userName
	).then((users, error) => {
		console.log('=== usersL:', JSON.stringify(users));

		error && callback(error);

		if (users.length) {
			const destUser =
				users.filter((user) => {
					return user.UserStatus === 'CONFIRMED';
				})[0] || users[0];

			console.log('=== destUser:', destUser);

			var params = {
				DestinationUser: {
					// ProviderAttributeName: 'STRING_VALUE',
					ProviderAttributeValue: destUser.Username,
					ProviderName:
						destUser.UserStatus === 'CONFIRMED'
							? 'Cognito'
							: destUser.Username.split('_')[0]
				},
				SourceUser: {
					ProviderAttributeName: 'Cognito_Subject',
					ProviderAttributeValue: event.userName,
					ProviderName: event.userName.split('_')[0]
				},
				UserPoolId: event.userPoolId
			};

			console.log('==== params:', params);

			cognitoIdentityService.adminLinkProviderForUser(params, function(
				err,
				data
			) {
				if (err) {
					console.log('Error adminLinkProviderForUser:', err);
					callback(err);
				} else {
					console.log('=== data resp:', data);
					callback(null, event);
				}
			});
		} else {
			callback(null, event);
		}
	});
};
