import schemaPhoto from "../schemas/photoSchema.js";

export function validateSchemaPhoto(req, res, next){
    const { image } = req.body;

    const validation = schemaPhoto.validate({ image }, { abortEarly: false });
    console.log(validation);

    const { error } = validation;
    if(error){
        console.log('Erro ao validar o schema');
        return res.status(422).send(error.details.map(detail => detail.message));
    }
    next();
}