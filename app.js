const express = require('express');

const app = express();

const server = require('http').createServer(app);

const config = require('./routes/config');

const port = process.env.PORT || config.PORT;

app.use(express.static("public"));

const { Server } = require('./routes/server');

Server(server);

server.listen(port);
