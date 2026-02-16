package com.payroll;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


//Entity means that this class is a JPA entity.
//  It is a Java class that maps to a database table.
//  The @Id annotation indicates that the id field is
//  the primary key of the entity, and the @GeneratedValue annotation
//  specifies that the value of the id field will be generated automatically
//  by the database. The Employee class has two additional fields, name and role, 
// which represent the employee's name and job role, respectively. 
// The parameterless constructor is required by JPA for creating instances of the entity.
// JPA (Java Persistence API) is a Java specification for
//  managing relational data in applications using Java. 
// It provides a way to map Java objects to database tables 
// and vice versa, allowing developers to work with databases 
// using Java objects instead of SQL queries.

// Toogle GitGub CoPilot ON or Off with Alt + x or y  
@Entity
public class Employee {

private @Id
@GeneratedValue Long id;

private String firstName;
private String lastName;
private String role;

//paramenterless constructor
 public Employee () {}

 public Employee (String firstName, String lastName, String role){
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
 }

 //Getters and setters for the fields
 public Long getId(){
    return id;
 }


 public void setId(Long id) {
    this.id = id;
 }

 public String getFirstName() {
    return firstName;
 }

 public void setFirstName(String firstName) {
    this.firstName = firstName;
 }

 public String getLastName() {
    return lastName;
 }

 public void setLastName(String lastName) {
    this.lastName = lastName;
 }

 public String getRole() {
    return role;
 }

 public void setRole(String role) {
    this.role = role;
 }

 public String getName() {
    return this.firstName + " " + this.lastName;
 }
 public void setName(String name){

   String [] parts = name.split(" ");

   this.firstName = parts[0];
   this.lastName = parts[1];
 }

 // Details Explaination about this two methods
 // The equals() method is overridden to provide a custom implementation for comparing Employee objects.
 //  It checks if the current object is the same as the object being compared to,
 //  and if not, it checks if the object is an instance of Employee and compares the id, name, and role fields for equality.
 // The hashCode() method is overridden to provide a custom implementation for generating a hash code for Employee objects.
 //  It uses the Objects.hash() method to generate a hash code based on the id, name, and role fields.
 @Override
 public boolean equals(Object o) {
    if(this==o)
        return true;
    if (!(o instanceof Employee))
        return false;

    //type casting of the object
    Employee employee = (Employee) o;

    // the && operator is a logical AND operator that returns true if both operands are true. 
    // Here we are checking if all fields are equal.
      return Objects.equals(this.id, employee.id) && Objects.equals(this.firstName, employee.firstName)
        && Objects.equals(this.lastName, employee.lastName) && Objects.equals(this.role, employee.role);
 }


 @Override
 public int hashCode(){
 return Objects.hash(this.id, this.firstName, this.lastName, this.role);
 }

 
 //To String method prints in JSON Format
@Override
 public String toString(){
    return "Employee{" + "id=" + this.id + ", firstName='" + this.firstName + '\'' + ", lastName='" + this.lastName
        + '\'' + ", role='" + this.role + '\'' + '}';
 }
/*Despite being small, this Java class contains much:

@Entity is a JPA annotation to make this object ready for storage in a JPA-based data store.

id, name, and role are attributes of our Employee domain object. id is marked with more JPA annotations to indicate that it is the primary key and is automatically populated by the JPA provider.

A custom constructor is created when we need to create a new instance but do not yet have an id.

With this domain object definition, we can now turn to Spring Data JPA to handle the tedious database interactions.

Spring Data JPA repositories are interfaces with methods that support creating, reading, updating, and deleting records against a back end data store. Some repositories also support data paging and sorting, where appropriate. Spring Data synthesizes implementations 
based on conventions found in the naming of the methods in the interface */
    
}
