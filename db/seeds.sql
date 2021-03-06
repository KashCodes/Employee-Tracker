USE employees;

INSERT INTO department (department_name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');
 

INSERT INTO role (title, salary, department_id )
VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 1200000, 2),
  ('Accountant', 1250000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4); 

INSERT INTO employee (first_name, last_name, role_id )
VALUES
  ('John', 'Doe', 1),
  ('Mike', 'Chan', 2),
  ('Ashley', 'Rodriguez', 3),
  ('Kevin', 'Tupik', 4),
  ('Malia', 'Brown', 5),
  ('Sarah', 'Lourd', 6),
  ('Tom', 'Allen', 7),
  ('Tammer', 'Galal', 4);  
  
  UPDATE employee SET manager_id = 3 WHERE id = 1;
  UPDATE employee SET manager_id = 1 WHERE id = 2;
  UPDATE employee SET manager_id = 3 WHERE id = 4;
  UPDATE employee SET manager_id = 6 WHERE id = 7;
  UPDATE employee SET manager_id = 4 WHERE id = 8;
  
USE employees;
SELECT employee.id, employee.first_name, employee.last_name, title, department_name Department ,
 salary, concat(manager.first_name, " ", manager.last_name) manager
FROM employee 
LEFT JOIN employee manager
ON  employee.manager_id = manager.id
LEFT JOIN role 
ON employee.role_id = role.id
LEFT JOIN department
ON role.department_id = department.id
;