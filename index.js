// from function 
function promptUser(){
  return inquirer.prompt([
    {
      type: "list",
      name: "license",
      message: "Choose the license used for your project: ",
      choices: [
        "Apache",
        "Academic",
        "GNU",
        "ISC",
        "MIT",
        "Mozilla",
        "Open"
      ]
    }
  ]);
}

