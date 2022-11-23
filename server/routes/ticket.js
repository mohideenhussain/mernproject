import express from 'express';
import { auth } from '../middleware/auth.js';
import { getSeats, postSeats } from '../controllers/tickets.js';


const tickets = express.Router();

tickets.get('/bus/:type', auth, getSeats)
tickets.post('/bus', postSeats)




export default tickets