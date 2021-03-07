const connection = require('./connection')
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require("console.table");
const confirm = require('inquirer-confirm');


var showroles;
var showdepartments;
var showemployees;

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

  showmenu();
})

// Show inquirer menu
function showmenu() {
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

// give menu options
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
      break;
    default:
      console.log("You must choose an option.")
      break;

  }
}

// view all employees function
function viewAllEmployees() {
  connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department_name AS Department, role.salary, concat(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON  employee.manager_id = manager.id LEFT JOIN role ON employee.role_id = role.id LEFt JOIN department ON role.department_id = department.id;', function (error, res) {
    console.table(res);
    endOrMenu();
  })
}

// view all depts function
function viewAllDepartments() {
  console.log("view all departments")
  connection.query("SELECT * from department", function (error, res) {
    console.table(res);
    endOrMenu();
  })
}

// view all roles
function viewAllRoles() {
  connection.query("SELECT * from role", function (error, res) {
    console.table(res);
    endOrMenu();
  })
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

// add employee to db
function addEmployees(data) {

  connection.query("INSERT INTO employee SET ?",
    {
      first_name: data.firstName,
      last_name: data.lastName,
      role_id: data.title,
      manager_id: data.manager
    }, function (error, res) {
      if (error) throw error;
      connection.query("SELECT * from employee", function (error, res) {
        // console.log(error, res);
        showemployees = res.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
      })
    })
    endOrMenu();
}

//  ask to add dept name
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

// add dept to db
function addDepartment(data) {
  connection.query("INSERT INTO department SET ?", { department_name: data.name},
  function (error, res) {
    // console.log(error, res);
    if (error) throw error;
    connection.query("SELECT * from department", function (error, res) {
      showdepartments = res.map(dep => ({ name: dep.name, value: dep.id }))
    })
  });
  endOrMenu();
}

// ask to add a role and salary
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

// add role and salary to db 
function addEmployeeRole(data) {
  connection.query("INSERT INTO role SET ?", {
    title: data.title,
    salary: data.salary,
    department_id: data.id
  }, function (error, res) {
    // console.log(error, res);
    if (error) throw error;
    connection.query("SELECT * from role", function (error, res) {
      showroles = res.map(role => ({ name: role.title, value: role.id }))
    })
  });
  endOrMenu();
}

// ask to update the employee roll
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

// update role within the db 
function updateEmployeeRole(data) {
  connection.query(`UPDATE employee SET role_id = ${data.titleID} WHERE id = ${data.empID}`,
  function (error, res) {
    // console.log(error, res);
    if (error) throw error;
    connection.query("SELECT * from role", function (error, res) {
      showroles = res.map(role => ({ name: role.title, value: role.id }))
    })
  });
  endOrMenu();
}

// would you like to end or go back to start menu??
function endOrMenu() {
  confirm("Would you like to continue?")
  .then(function confirmed() {
    showmenu();
  }, function cancelled() {
    end();
  });
}

// end prompts and close tracker
function end() {
  console.log("Thank you for using Employee Tracker!");
  connection.end();
  process.exit();
}

module.exports = connection;
