USE employee;

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

INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES
  ('John', 'Doe', 1, null),
  ('Mike', 'Chan', 2, 1),
  ('Ashley', 'Rodriguez', 3, null),
  ('Kevin', 'Tupik', 4, 3),
  ('Malia', 'Brown', 5, null),
  ('Sarah', 'Lourd', 6, 7),
  ('Tom', 'Allen', 7, null),
  ('Tammer', 'Galal', 4, 3);  
  

