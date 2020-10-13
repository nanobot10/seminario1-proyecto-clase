const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition();

exports.handler = async (event) => {
    
    let buf = Buffer.from(event.image.replace(/^data:image\/\w+;base64,/, ""),'base64');
    let params = {
        Image: {
            Bytes: buf
        }  
    };
    let textDetected = await rekognition.detectText(params).promise();
    
    const response = {
        success: true,
        message: textDetected 
    };
    return response;
};
