const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const recipeRouter = require('./routes/recipe');
const authRouter = require('./routes/auth');
const summaryRouter = require('./routes/summary');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/products', productsRouter(dbHelpers));
app.use('/api/recipes', recipeRouter(dbHelpers));
app.use('/api', authRouter(dbHelpers));
app.use('/api/summary', summaryRouter(dbHelpers));

module.exports = app;
