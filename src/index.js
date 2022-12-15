const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override')
const path = require('path');
const xpshbs = require('express-handlebars');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const bodyParser = require('body-parser')
const accountRoute = require('./routes/account');
const userRoute = require('./routes/user');
const env = require('dotenv');
env.config();

const route = require('./routes');
const db = require('./config/db'); 
// import connection from './config/db';
//Connect DB
db.connect();
//Connect mySql
// db.connection();

const app = express();
const cors = require('cors');
app.use(cors()); 

const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const port = 8000;
app.use(express.static(path.join(__dirname, 'public')));




app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));

// app.post('/register', (req, res, next)=>{

// })


//routes
app.use('/v1/account',accountRoute);
app.use('/v1/user',userRoute);

//custome SortMiddleware
app.use(SortMiddleware);
//HTTP logger
// app.use(morgan('combined'));

//Template engine

('.engine');
const hbs = require('express-handlebars');
const { dirname } = require('path');
app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources' , 'views'));

//route init
route(app);


//bodyPaser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.listen(port, () => 
    console.log(`App listening at http://localhost:${port}`),
);
