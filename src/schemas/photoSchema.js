import joi from 'joi';

const schemaPhoto = joi.object({
    image: joi.string().uri({ 
        scheme: [ 'http', 'https', '.jpg', '.jpeg', '.png', '.gif' ] 
    }).required()
});

export default schemaPhoto;