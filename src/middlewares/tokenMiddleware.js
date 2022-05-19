import db from '../mongoDB.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function validToken(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();
    console.log('Token in request');

    if(!token){
        return res.status(401).send('Users do not have authorization for this request');
    }

    try {
        const secretKey = process.env.JWT_SECRET;
        jwt.verify(token, secretKey);
        console.log('Verify token JWT', jwt.verify(token, secretKey));

        const session = await db.collection('sessions').findOne({ token });
        console.log('User in session', session);
        if(!session){
            return res.status(404).send('User not found');
        }

        res.locals = { token, session };
        next();
    } catch (error) {
        console.log(chalk.red('Erro ao validar o token com base no JWT'));
        res.sendStatus(500);
    }
}