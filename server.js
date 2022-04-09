const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'https://localhost:8081'
}

// middlewares

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

// routes

// const router = require('./routes/productRouter')
const router = require('./routes/usersRouter');
const loanRoutes = require('./routes/loanRoutes')
app.use('/api/auth', router)
app.use('/api/loan', loanRoutes)


// testing...

app.get('/', (req, res) => {
    res.json({message: 'Hello APi'})
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>{
    console.log('server is listening to port '+PORT);
})