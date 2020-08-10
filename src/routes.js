const express = require('express');
const routes = express.Router();

const AuthController = require('./controllers/AuthController')

// POST
routes.post("/auth", AuthController.index);

module.exports = routes;