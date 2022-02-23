const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const app = express();
const routes = require('./routes');
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

// Router modularization
app.use(routes.contracts);
app.use(routes.admin);
app.use(routes.jobs);
app.use(routes.balances);

module.exports = app;
