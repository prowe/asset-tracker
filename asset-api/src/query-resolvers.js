const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

function assetTableName() {
    const tableName = process.env['ASSET_TABLE'];
    if (!tableName) {
        throw new Error('ASSET_TABLE env not set')
    }
    return tableName;
}

module.exports = {
    async assets() {
        const scanResult = await documentClient.scan({
            TableName: assetTableName()
        }).promise();
        return scanResult.Items;
    }

};