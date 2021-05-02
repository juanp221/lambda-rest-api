const log = require('../../lambda-layer/helpers/logger').logger;
const validator = require('../../lambda-layer/helpers/validator');

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });

exports.lambdaHandler = async (event, context) => {
	try {
		log.info('Checking event');
		if (!event) throw new Error('Event not found');
		log.info('Validating payload');
		const validation = await validator.validate(event, 'getdata');

		if (validation.result === 'invalid') {
			log.error(JSON.stringify(validation.errors));
			return { status: 'Error', message: validation.errors };
		} else {
			log.info('Payload valid');
			const getDataParams = {
				TableName: process.env.EMPLOYEES_DDB_TABLE,
			};
			// Add index if event contains department
			if (event.department && event.department !== '') {
				getDataParams.IndexName = 'department-index';
			}
			// Add keyConditions based on index
			if (getDataParams.IndexName && getDataParams.IndexName === 'department-index') {
				getDataParams.KeyConditions = {
					department: {
						ComparisonOperator: 'EQ',
						AttributeValueList: [event.department],
					},
				};
			} else {
				getDataParams.KeyConditions = {
					email: {
						ComparisonOperator: 'EQ',
						AttributeValueList: [event.email],
					},
				};
			}
			log.info('Querying Dynamo DB');
			const getDataRes = await docClient.query(getDataParams).promise();
			return {
				status: 'Success',
				data: getDataRes.Items,
			};
		}
	} catch (error) {
		console.log(error);
		log.error(error.message ? error.message : error);
		return { status: 'Error', message: error.message ? error.message : error };
	}
};
