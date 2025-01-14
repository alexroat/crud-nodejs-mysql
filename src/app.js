const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');

const app = express();

// importing routes
const customerRoutes = require('./routes/customer');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: process.env.MYSQL_HOST || "db",
  user: process.env.MYSQL_USER || 'user',
  password: process.env.MYSQL_PASSWORD || 'user',
  port: process.env.MYSQL_PORT || 3306,
  database: process.env.MYSQL_DBNAME || 'crudnodejsmysql'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));





module.exports = app;