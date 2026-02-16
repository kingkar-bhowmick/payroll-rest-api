 package com.payroll;


public class OrderNotFoundExeption extends RuntimeException{

public OrderNotFoundExeption(Long id){

    super ("Could not find order " + id);
}
}