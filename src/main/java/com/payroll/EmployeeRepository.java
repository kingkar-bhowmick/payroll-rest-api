package com.payroll;

import org.springframework.data.jpa.repository.JpaRepository;
// The EmployeeRepository interface extends the JpaRepository interface, which is a 
// Spring Data interface that provides CRUD (Create, Read, Update, Delete) operations 
// for the Employee entity.
// In future we can also also implement other repositories like spring mongodb repository
//  for mongo db and spring data redis repository for redis database.

// By extending JpaRepository, EmployeeRepository inherits several methods 
// for working with Employee persistence,
// We definde generic type Employee and Long, where Employee is the type of the entity and Long is the type of the entity's primary key.
// Generic types are a powerful feature in Java that allow you 
// to create classes, interfaces, and methods that can operate on any type of data.
public interface EmployeeRepository extends JpaRepository<Employee, Long>{


    
}
