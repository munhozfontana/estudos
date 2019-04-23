const AWS = require('aws-sdk');
AWS.config.update({ region: 'sa-east-1' });
AWS.config.update({
    accessKeyId: "BLALBLALBLALLBLALB",
    secretAccessKey: "BLABLALBLALBLALBLLALBLALLBLALB",
    endpoint: 'http://localhost:8000/shell/'
});
module.exports = AWS;