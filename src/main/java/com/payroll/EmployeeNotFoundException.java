package com.payroll;

// The EmployeeNotFoundException class 
// is a custom exception that 
// extends the RuntimeException class.
public class EmployeeNotFoundException extends RuntimeException{
    
    // The constructor of the 
    // EmployeeNotFoundException class 
    // takes a long id as a parameter and
    EmployeeNotFoundException(long id){

        // It calls the constructor of 
        // the superclass (RuntimeException)
        // and passes a message that 
        // includes the id of the employee 
        // that was not found. Overriding 
        // the constructor of the
        //  RuntimeException class
        //  allows us to provide a 
        // custom error message when 
        // this exception is thrown.
        super("Coould not find employee" + id);


        // HTTP status code 404 is 
        // used to indicate that the
        //  requested resource could
        //  not be found on the server.
    }

}
