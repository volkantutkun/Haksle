package controllers;

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
    	return ok(views.html.index.render());
    }
    
    public static Result newcustomer() {
    	return ok(views.html.newcustomer.render(customerForm));
     }
    
    public static Result customerlogin() {
    	return redirect(routes.Application.newcustomer());
     }
      
    public static Result addCustomer() {
    	Form<Customer> filledForm = customerForm.bindFromRequest();

    	  if(filledForm.hasErrors()) {
    		  System.out.println("ERROR");
    	    return badRequest(
    	    		views.html.newcustomer.render(filledForm)
    	    );
    	  } else {
    		  Customer newCustomer = filledForm.get();
    		  Customer.create(newCustomer);
    	    return redirect(routes.Application.index());  
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
