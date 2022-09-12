import express from 'express';
import { auth } from '../middleware/auth.js';
import { postSchedule, createRoute, createStoppings, createSeats, getItems, getSearchResults, createStop, editStop, applyFilter } from '../controllers/schedule.js';

const schedule = express.Router();

schedule.post('/chart', auth, createRoute)
schedule.post('/chart/:id', auth, createStoppings)
schedule.post('/seat/:id', auth, createSeats)
schedule.get('/items', auth, getItems);
schedule.get('/results', getSearchResults);
schedule.post('/stop/:id', auth, createStop);
schedule.put('/edit/:id', auth, editStop);
schedule.get('/filter', auth, applyFilter)

export default schedule;