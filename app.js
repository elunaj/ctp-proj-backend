require('dotenv').config({ path: './.env'});

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const analysisRouter = require('./routes/analysis');

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/', indexRouter);
app.use('/analysis', analysisRouter);

// port
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});


module.exports = app;
