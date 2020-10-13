const AWS = require('aws-sdk');
const translate = new AWS.Translate();
exports.handler = async (event) => {
    
    let params = {
        Text: event.text,
        SourceLanguageCode: event.sourceLanguage,
        TargetLanguageCode: event.targetLanguage  
    };
    
    let translation = await translate.translateText(params).promise();
    
    if (event.text.includes(translation.TranslatedText)) {
        return {
            success: false,
            message: 'Imposible translate the text, check the source and target language'
        };
    } else {
        return {
            success: true,
            message: translation
        };
    }
    
};