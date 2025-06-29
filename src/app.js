import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();


// cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // Allow cookies to be sent with requests
}))


// some configuration for express

// when data is sent in form-data format
app.use(express.json({limit: '16kb'}))  // size of json data that can be sent in a request

// when data is sent from url
app.use(express.urlencoded({extended: true, limit: '16kb'})) // size of url encoded data that can be sent in a request


app.use(express.static('public')) // to serve static files from public folder

// cookie parser to parse cookies from request
app.use(cookieParser()); // to all four configurations whatever written inside pink brackets are options to add extra info
// cookieParser is used to parse cookies from request and make them available in req.cookies






export {app};
