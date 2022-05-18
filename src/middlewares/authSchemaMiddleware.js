import chalk from "chalk";
import { schemaSignIn, schemaSignUp } from "../schemas/authSchema.js";

function validSchemaSignIn(req, res, next){
    console.log('objeto no body', req.body);

    const validation = schemaSignIn.valid(req.body, { abortEarly: false });
    console.log(chalk.blue(validation));

    const { error } = validation;
    if(error){
        console.log(chalk.red('A validação com joi encontrou erro'));
        return res.status(422).send(error.details.map(detail => detail.message));
    }
    next();
}

function validSchemaSignUp(req, res, next){
    console.log('objeto no body', req.body);

    const validation = schemaSignUp.valid(req.body, { abortEarly: false });
    console.log(chalk.blue(validation));

    const { error } = validation;
    if(error){
        console.log(chalk.red('A validação com joi encontrou erro'));
        return res.status(422).send(error.details.map(detail => detail.message));
    }
    next();
}

export { validSchemaSignIn, validSchemaSignUp }