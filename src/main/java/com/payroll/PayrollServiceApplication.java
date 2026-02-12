package com.payroll;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// The @SpringBootApplication annotation is a convenience
//  annotation that adds all of the following:@SpringBootApplication is a 
// meta-annotation that pulls in component scanning, auto-configuration, 
// and property support. We do not dive into the details of Spring Boot in 
// this tutorial. However, in essence, it starts a servlet container and serves up our service.
// 
@SpringBootApplication
public class PayrollServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PayrollServiceApplication.class, args);
	}

}
