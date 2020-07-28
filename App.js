const express = require("express");
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./db/db');
const authController = require('./routes/auth/AuthController');
const postsRouter = require('./routes/posts/Posts');

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({origin: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(bodyParser.json());

app.use('/api/auth', authController);
app.use('/api/posts', postsRouter);
const port = process.env.PORT_NUMBER || 3000;
app.listen(port, () => {
    console.log(`Server has started on port: ${port}`);
});
