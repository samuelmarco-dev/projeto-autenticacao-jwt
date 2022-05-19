import dayjs from "dayjs";

import db from "../mongoDB.js";

export async function seePhotosUser(req, res){
    try {
        const { token } = res.locals;
        const userPhotos = await db.collection('photos').find({ token }).toArray();
        
        res.status(200).send(userPhotos);
    } catch (error) {
        console.log(chalk.red('Erro ao conectar-se com o banco de dados'));
        res.sendStatus(500); 
    }
}

export async function sendPhotosUser(req, res){
    try {
        const { session, token } = res.locals;
        const { photo } = req.body;

        const user = await db.collection('users').findOne({ _id: session.idUser });
        await db.collection('photos').insertOne({
            image: photo,
            email: user.email,
            token,
            date: dayjs.format('DD/MM/YYYY - HH:mm:ss')
        });

        res.sendStatus(201);
    } catch (error) {
        console.log(chalk.red('Erro ao conectar-se com o banco de dados'));
        res.sendStatus(500); 
    }
}