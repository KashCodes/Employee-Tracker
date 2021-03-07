const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/index.js');
const cTable = require('console.table');
const confirm = require('inquirer-confirm');
const connection = require('./db/connection.js')

const showroles = require('./db/index.js');
const showdepartments = require('./db/index.js');
const showemployees = require('./db/index.js');
const viewAllEmployees = require('./db/index.js');
const viewAllDepartments = require('./db/index.js');
const viewAllRoles = require('./db/index.js');
const addEmployees = require('./db/index.js');
const addDepartment = require('./db/index.js');
const addEmployeeRole = require('./db/index.js');
const updateEmployeeRole = require('./db/index.js');

// Show inquirer menu
function userPrompts() {
  inquirer
    .prompt(
      {
        type: "list",
        message: "Welcome to Employee Tracker. What would you like to do?",
        name: "choices",
        choices: [
          {
            name: "View all employees",
            value: "viewEmployees"
          },
          {
            name: "View all departments",
            value: "viewDepartments"
          },
          {
            name: "View all roles",
            value: "viewRoles"
          },
          {
            name: "Add employee",
            value: "addEmployee"
          },
          {
            name: "Add department",
            value: "addDept"
          },
          {
            name: "Add role",
            value: "addRole"
          },
          {
            name: "Update role",
            value: "updateRole"
          },
          {
            name: "Quit",
            value: "quit"
          }
        ]
      }).then(function (res) {
        // console.log(res);
      menu(res.choices)
    })
}

function menu(option) {
  switch (option) {
    case "viewEmployees":
      viewAllEmployees();
      break;
    case "viewDepartments":
      viewAllDepartments();
      break;
    case "viewRoles":
      viewAllRoles();
      break;
    case "addEmployee":
      addEmployee();
      break;
    case "addDept":
      addDept();
      break;
    case "addRole":
      addRole();
      break;
    case "updateRole":
      updateRole();
      break;
    case "quit":
      end();
  }
}

// Ask the user for the employee's information.
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: "What is the first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is the employee's title?",
        name: "title",
        choices: showroles
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        name: "manager",
        choices: showemployees,
      }
    ]).then(function (response) {
      // console.log(response)
      addEmployees(response)
    })
}

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new department?",
        name: "name"
      }
    ])
    .then(function (response) {
      // console.log(response);
      addDepartment(response);
    })
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new employee role?",
        name: "title"
      },
      {
        type: "input",
        message: "How much is the salary of the new role?",
        name: "salary"
      },
      {
        type: "list",
        message: "In which department is the new role?",
        name: "id",
        choices: showdepartments
      }
    ])
    .then(function (response) {
      // console.log(response);
      addEmployeeRole(response);
    })
}

function updateRole() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "For which employee would you like to update the role?",
        name: "empID",
        choices: showemployees
      },
      {
        type: "list",
        message: "What is the employee's new role?",
        name: "titleID",
        choices: showroles
      }
    ])
    .then(function (response) {
      // console.log(response);
      updateEmployeeRole(response);
    })
}

function endOrMenu() {
  confirm("Would you like to continue?")
  .then(function confirmed() {
    showmenu();
  }, function cancelled() {
    end();
  });
}

function end() {
  console.log("Thank you for using Employee Tracker!");
  connection.end();
  process.exit();
}

userPrompts();

module.exports = server;