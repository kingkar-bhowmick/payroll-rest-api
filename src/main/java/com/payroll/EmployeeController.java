package com.payroll;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// @RestController is a Spring annotation that indicates that this class is a RESTful web service controller.
// Restfull webservices means as a beginner you can think of it as a web
//  service that follows the principles of Representational State Transfer (REST) -> a software
//  architectural style that defines a set of constraints to be used for creating web services.
// The EmployeeController class is responsible for handling HTTP requests related to employees.
// It has a dependency on the EmployeeRepository, which is injected through the constructor.

@RestController
public class EmployeeController {
    //TO DO: Implement the REST API endpoints for managing employees

    private final EmployeeRepository repository;


    public EmployeeController (EmployeeRepository repository){
        this.repository = repository;
    }


    // The @GetMapping annotation is used to map HTTP GET requests to the all() method
    // GET request is made to the /employees endpoint, the all() method 
    // will be called, and it will return a list of all employees by calling the 
    // findAll() method on the repository.
    // endpoint is a specific URL pattern that is used to access a particular resource or functionality in a web application.
   
    @GetMapping("/employees")
    public List<Employee> all(){
        return repository.findAll();
    }


    // Similarly, when a GET request is made to the /employee/{id} endpoint, the one() method will be called.
    // The {id} in the endpoint is a path variable that represents the id of the employee to be retrieved. 
    // The @PathVariable annotation is used to bind the value of the id path
    @GetMapping("/employees/{id}")
     public Employee one(@PathVariable Long id){

        // The one() method retrieves a single employee by its id using the findById() method of the repository.
        // If the employee with the specified id is not found, it throws an EmployeeNotFound
        // this syntax is called lambda expression, which is a concise way to represent an 
        // anonymous function that can be passed around as a value.
        // lamba annonymous function written like () -> { // code block } or () -> expression
        // repository.findById(id)   // returns Optional and this Optional.orElseThrow() method is used to
        //  either return the employee if it is found or throw an exception if it is not found.
        // we use dot notation to call the orElseThrow() method on the Optional object returned by findById().
        // 
         return repository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));

    }


    // The @PostMapping annotation is used to map HTTP POST requests to the addEmployee() method
    // When a POST request is made to the /employee endpoint, the addEmployee() method will be called, and it
    //  will save the new employee to the database using the save() method of the repository.
    @PostMapping("/employees")
     public Employee addEmployee(@RequestBody Employee newEmployee) {
        return repository.save(newEmployee);
    }

    // The @PutMapping annotation is used to map HTTP PUT requests to the updatEmployee() method
    // When a PUT request is made to the /employee/{id} endpoint, the up
    // lamda expression explains when 
    @PutMapping("/employees/{id}")
     public Employee updatEmployee(@RequestBody Employee newEmployee, @PathVariable Long id) {
        return repository.findById(id)
        .map(employee -> {
            employee.setName(newEmployee.getName());
            employee.setRole(newEmployee.getRole());
            return repository.save(employee);
        })
        .orElseGet(() -> {
            newEmployee.setId(id);
            return repository.save(newEmployee);
        });
    // lambda syntax explained:
    // The lambda expression is used to define the behavior of the map() and orElseGet
    // orElseGet ( ) -> { // code block } ) is used to provide an alternative value if the Optional is empty.;
    
    }

        // Same code without lambda expression
        /*
        @PutMapping("/employee/{id}")
        Employee updateEmployee(Employee newEmployee, Long id) {

    Optional<Employee> optional = repository.findById(id);

    if (optional.isPresent()) {

        Employee employee = optional.get();

        employee.setName(newEmployee.getName());
        employee.setRole(newEmployee.getRole());

        return repository.save(employee);

    } else {

        newEmployee.setId(id);
        return repository.save(newEmployee);
    }
}  */



@DeleteMapping("/employees/{id}")
public void deleteEmployee(@PathVariable Long id) {
    repository.deleteById(id);

}



    }