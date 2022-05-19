import schemaPhoto from "../schemas/photoSchema";

export function validateSchemaPhoto(req, res, next){
    const { image } = req.body;

    const validation = schemaPhoto.valid({ image }, { abortEarly: false });
    console.log(validation);

    const { error } = validation;
    if(error){
        console.log('Erro ao validar o schema');
        return res.status(422).send(error.details.map(detail => detail.message));
    }
    next();
}