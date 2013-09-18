package controllers;

import com.avaje.ebean.Ebean;

import models.Customer;
import models.TestProduct;
import parsers.PrGittiGidiyor;
import parsers.PrHepsiBurada;
import parsers.PrMorhipo;
import play.data.Form;
import play.mvc.*;

public class Application extends Controller {
	
	static Form<Customer> customerForm = Form.form(Customer.class);
  
	public static Result index() {
    	return ok(views.html.index.render(""));
    }
    
    public static Result newcustomer() {
    	return ok(views.html.newcustomer.render(""));
     }
    
    public static Result customerlogin() {
    	return ok(views.html.customerlogin.render(""));
     }
    
    public static Result haksle() {
    	return ok(views.html.haksle.render(""));
    }
      
    
    public static Result addCustomer() {
    	Form<Customer> filledForm = customerForm.bindFromRequest();

    	  if(filledForm.hasErrors()) {
    		  System.out.println("ERROR");
    	    return badRequest(views.html.newcustomer.render(""));
    	  } else {
    		  Customer newCustomer = filledForm.get();
    		  Customer.create(newCustomer);
    		  
    		  return ok(views.html.index.render("Yeni kullanıcı eklendi."));
    	  }
    }
    
    public static Result checkCustomer() {
    	Form<Customer> filledForm = customerForm.bindFromRequest();

    	  if(filledForm.hasErrors()) {
    		  System.out.println("ERROR");
    	    return badRequest(views.html.customerlogin.render(""));
    	  } else {
    		  Customer receivedCust = filledForm.get();
    		  
    		  if( Customer.find.byId(receivedCust.email) == null){
    			  return ok(views.html.customerlogin.render("Kullanıcı bulunamadı!")); 
    		  }else{
    			  Customer searchCust = Customer.find.byId(receivedCust.email);

    			  if(!searchCust.password.equals(receivedCust.password)){
    				  return ok(views.html.customerlogin.render("Hatalı Pasword!"));
    			  }else
    				  return redirect(routes.Application.haksle()); 
    		  }    	     
    	  }
     }
    
    
      
    public static Result deleteProduct(Long id) {
    	TestProduct.delete(id);
    	return redirect(routes.Application.newcustomer());
     }
    
    private static TestProduct parseURL(String receivedURL){
    	TestProduct parsedProduct = null;
		if(receivedURL.contains("hepsiburada"))	parsedProduct = PrHepsiBurada.getContentPrice(receivedURL);
		else if(receivedURL.contains("gittigidiyor"))parsedProduct = PrGittiGidiyor.getContentPrice(receivedURL);
		else if(receivedURL.contains("morhipo"))parsedProduct = PrMorhipo.getContentPrice(receivedURL);
		else parsedProduct = null;
		
		return parsedProduct;
	}
  
}
