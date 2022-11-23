import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import tickets from './routes/ticket.js'
import users from './routes/users.js';
import { auth  }  from './middleware/auth.js';
import schedule from './routes/schedule.js'

const app = express();
dotenv.config();

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));


app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(cookieParser());



app.use('/ticket', tickets);
app.use('/users', users)
app.use('/schedule', schedule)



const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL)
.then(()=>app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
.catch((error)=> console.log(error.message));
