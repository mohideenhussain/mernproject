import express from 'express';
import { signup, signin, createRefreshToken } from '../controllers/users.js';
import { auth } from '../middleware/auth.js';


const users = express.Router();

users.post('/signup', auth, signup)
users.post('/signin', signin)
users.get('/refreshtoken', createRefreshToken)

export default users;