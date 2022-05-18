import db from '../mongoDB.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function validToken(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '').trim();
}