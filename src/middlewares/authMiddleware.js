import chalk from "chalk";
import db from "../mongoDB";

export async function userExists(req, res, next){
    const { email } = req.body;

    try {
        const user = await db.collection('users').findOne({ email });
        res.locals = user;
        next();
    } catch (error) {
        console.log(chalk.red('Erro ao conectar-se com o banco de dados'));
        res.sendStatus(500);
    }
}