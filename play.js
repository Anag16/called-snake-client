const net = require("net");
const connect = require("./client");
const { setupInput } = require("./input");

let connection = connect();

setupInput(connection); //From input.js, which was imported above