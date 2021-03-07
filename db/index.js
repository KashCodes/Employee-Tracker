const connection = require('./connection')
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require("console.table");
const confirm = require('inquirer-confirm');
const server = require('../server');


// Initiate MySQL Connection.
connection.connect(function (err) {
  
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);

  connection.query("SELECT * from role", function (error, res) {
    showroles = res.map(role => ({ name: role.title, value: role.id }))
  })
  connection.query("SELECT * from department", function (error, res) {
    showdepartments = res.map(dep => ({ name: dep.name, value: dep.id }))
  })
  connection.query("SELECT * from employee", function (error, res) {
    // console.log(error, res);
    showemployees = res.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
  })

  userPrompts();
})

function viewAllEmployees() {
  connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department_name AS Department, role.salary, concat(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON  employee.manager_id = manager.id LEFT JOIN role ON employee.role_id = role.id LEFt JOIN department ON role.department_id = department.id;', function (error, res) {
    console.table(res);
    endOrMenu();
  })
}

function viewAllDepartments() {
  console.log("view all departments")
  connection.query("SELECT * from department", function (error, res) {
    console.table(res);
    endOrMenu();
  })
}

function viewAllRoles() {
  connection.query("SELECT * from role", function (error, res) {
    console.table(res);
    endOrMenu();
  })
}

function addEmployees(data) {

  connection.query("INSERT INTO employee SET ?",
    {
      first_name: data.firstName,
      last_name: data.lastName,
      role_id: data.title,
      manager_id: data.manager
    }, function (error, res) {
      if (error) throw error;
    })
    endOrMenu();
}

function addDepartment(data) {
  connection.query("INSERT INTO department SET ?", { name: data.name },
  function (error, res) {
    // console.log(error, res);
    if (error) throw error;
  });
  endOrMenu();
}

function addEmployeeRole(data) {
  connection.query("INSERT INTO role SET ?", {
    title: data.title,
    salary: data.salary,
    department_id: data.id
  }, function (error, res) {
    // console.log(error, res);
    if (error) throw error;
  });
  endOrMenu();
}

function updateEmployeeRole(data) {
  connection.query(`UPDATE employee SET role_id = ${data.titleID} WHERE id = ${data.empID}`,
  function (error, res) {
    // console.log(error, res);
    if (error) throw error;
  });
  endOrMenu();
}


module.exports = connection;