import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import chalk from "chalk";

import db from "../mongoDB.js";

export async function postSignUpUser(req, res){
    console.log(chalk.pink('Vou fazer uma requisição legal...'));
    const { name, email, password } = req.body;

    try {
        const user = res.locals;
        if(user){
            return res.status(409).send('User already exists');
        }

        //opcional: salt = await bcrypt.genSalt(12);
        const passwordEncrypted = bcrypt.hashSync(password, 10);
        await db.collection('users').insertOne({
            name, email, password: passwordEncrypted
        });
        res.status(201).send('Registered user');
    } catch (error) {
       console.log(chalk.red('Erro ao conectar-se com o banco de dados'));
       res.sendStatus(500); 
    }
}

export async function postSignInUser(req, res){
    console.log(chalk.pink('Vou fazer uma requisição legal...'));
    const { email, password } = req.body;
    
    try {
        const user = res.locals;

        if(user && bcrypt.compareSync(password, user.password)){
            const secretKey = process.env.JWT_SECRET;
            const validityKey = { expiresIn: 18000 } //5horas em segundos
            const token = jwt.sign({
                id: user._id,
            }, secretKey, validityKey);

            await db.collection('sessions').insertOne({ idUser: user._id, token})
            return res.status(200).send(token);
        }   
        res.sendStatus(404);
    } catch (error) {
        console.log(chalk.red('Erro ao conectar-se com o banco de dados'));
        res.sendStatus(500);
    }
}