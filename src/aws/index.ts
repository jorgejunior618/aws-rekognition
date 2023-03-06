import aws from 'aws-sdk';

aws.config.loadFromPath('../../aws-config.json');
aws.config.update({region: 'us-east-1'});

export default new aws.Rekognition();
