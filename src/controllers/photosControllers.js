import db from "../mongoDB.js";

export async function seePhotosUser(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();

    if(!token){
        return res.status(401).send('Users do not have authorization for this request');
    }
    /* 
    middleware Token
    const secretKey = process.env.JWT_SCRET;
    jwt.verify(token, secretKey);
    next()
    */

    try {
        const session = await db.collection('sessions').findOne({ token });
        if(!session){
            return res.status(404).send('User not found');
        }
        const user = await db.collection('users').findOne({ email: session.email });
        
    } catch (error) {
        console.log(chalk.red('Erro ao conectar-se com o banco de dados'));
        res.sendStatus(500); 
    }
}

export async function sendPhotosUser(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();

    if(!token){
        return res.status(401).send('Users do not have authorization for this request');
    }

    try {
        const session = await db.collection('sessions').findOne({ token });
        if(!session){
            return res.status(404).send('User not found');
        }
        const user = await db.collection('users').findOne({ email: session.email });
        
        const { photo } = req.body;
        await db.collection('photos').insertOne({
            image: photo, 
        });
        res.sendStatus(201);
    } catch (error) {
        console.log(chalk.red('Erro ao conectar-se com o banco de dados'));
        res.sendStatus(500); 
    }
}