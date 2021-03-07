const { prompt } = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/index.js');
const cTable = require('console.table');
const confirm = require('inquirer-confirm');
const connection = require('./db/connection.js')

