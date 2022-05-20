import chalk from "chalk";
import dayjs from "dayjs";

import db from "../mongoDB.js";

export async function seePhotosUser(req, res){
    try {
        const { token } = res.locals;
        const userPhotos = await db.collection('photos').find({ token }).toArray();
        console.log(chalk.blue('Photos of user', userPhotos));
        
        res.status(200).send(userPhotos);
    } catch (error) {
        console.log(chalk.red('Erro ao conectar-se com o banco de dados'));
        res.sendStatus(500); 
    }
}

export async function sendPhotosUser(req, res){
    try {
        const { user, token } = res.locals;
        const { image } = req.body;
        console.log(user, token, image);

        const photo = await db.collection('photos').findOne({ image });
        if(photo){
            return res.status(400).send('Photo already exists');
        }

        await db.collection('photos').insertOne({
            image,
            email: user.email,
            token,
            date: dayjs().format('DD/MM/YYYY - HH:mm:ss:SSS')
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(chalk.red('Erro ao conectar-se com o banco de dados'));
        res.sendStatus(500); 
    }
}