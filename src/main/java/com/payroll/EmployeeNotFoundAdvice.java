package com.payroll;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//This class is annotated with @RestControllerAdvice, which makes it a global exception handler for REST controllers.
// The @ExceptionHandler annotation is used to specify the type of exception that the method should handle
// In this case, the employeeNotFoundHandler method will handle EmployeeNotFoundException exceptions.
// When an EmployeeNotFoundException is thrown, the employeeNotFoundHandler method will be called, and 
// it will return the message of the exception as the response body.
// The @ResponseStatus annotation is used to specify the HTTP status code that should be returned when the exception is thrown.
@RestControllerAdvice
public class EmployeeNotFoundAdvice {

    @ExceptionHandler
    public String employeeNotFoundHandler(EmployeeNotFoundException ex){

        employeeNotFoundStatus();
        
        return ex.getMessage();


    }

    @ResponseStatus
    public int employeeNotFoundStatus(){
        return 404;
}
}