package controllers;

import java.util.Map;

import com.avaje.ebean.Ebean;

import models.Customer;
import models.Product;
import parsers.PrGittiGidiyor;
import parsers.PrHepsiBurada;
import parsers.PrMorhipo;
import play.data.Form;
import play.mvc.*;

public class Application extends Controller {
	
	static Form<Customer> customerForm = Form.form(Customer.class);
	
	static Form<Product> productForm = Form.form(Product.class);
  
	public static Result index() {
    	return ok(views.html.index.render(""));
    }
    
    public static Result newcustomer() {
    	return ok(views.html.newcustomer.render(""));
     }
    
    public static Result customerlogin() {
    	return ok(views.html.customerlogin.render(""));
     }
    
    public static Result haksle(String email) {
    	return ok(views.html.haksle.render(Product.allbymail(email), productForm, "", email));
    }
    
    
    public static Result addCustomer() {
    	Form<Customer> filledForm = customerForm.bindFromRequest();

    	  if(filledForm.hasErrors()) {
    		  System.out.println("ERROR");
    	    return badRequest(views.html.newcustomer.render("Bad Request"));
    	  } else {
    		  Customer newCustomer = filledForm.get();
    		  Customer.create(newCustomer);
    		  
    		  return ok(views.html.index.render("New user is added."));
    	  }
    }
    
    public static Result checkCustomer() {
    	Form<Customer> filledForm = customerForm.bindFromRequest();

    	  if(filledForm.hasErrors()) {
    		  System.out.println("ERROR");
    	    return badRequest(views.html.customerlogin.render("Bad Request"));
    	  } else {
    		  Customer receivedCust = filledForm.get();
    		  
    		  if( Customer.find.byId(receivedCust.email) == null){
    			  return ok(views.html.customerlogin.render("No user found with give username!")); 
    		  }else{
    			  Customer searchCust = Customer.find.byId(receivedCust.email);

    			  if(!searchCust.password.equals(receivedCust.password)){
    				  return ok(views.html.customerlogin.render("Wrong password!"));
    			  }else
    				  return redirect(routes.Application.haksle(receivedCust.email)); 
    		  }    	     
    	  }
     }
    
    public static Result addProduct() {
    	Form<Product> filledProdForm = productForm.bindFromRequest();

    	  if(filledProdForm.hasErrors()) {
    		  System.out.println("ERROR");
    		  Map<String,String> tempMap = filledProdForm.data();
    		  String emailStr = tempMap.get("email");
    		  
    	    return badRequest(views.html.haksle.render(Product.allbymail(emailStr), productForm, "Bad Request", emailStr));
    	  } else {
    		  Map<String,String> tempMap = filledProdForm.data();
    		  String sourceStr = tempMap.get("source");
    		  String emailStr = tempMap.get("email");
    		  
    		  Product newProduct = parseURL(sourceStr);
    		  newProduct.attr3 = "email";
    		  newProduct.attr3value = emailStr;
    		  Product.create(newProduct);
    		  
    		  return ok(views.html.haksle.render(Product.allbymail(emailStr), productForm, "New Product is added.", emailStr));
    	  }
    }
      
    public static Result deleteProduct(int id) {
    	Form<Product> filledProdForm = productForm.bindFromRequest();
    	Map<String,String> tempMap = filledProdForm.data();
		String emailStr = tempMap.get("email");
		  
    	Product.delete(id);
    	return ok(views.html.haksle.render(Product.allbymail(emailStr), productForm, "Product is deleted.", emailStr));
     }
    
    
    private static Product parseURL(String receivedURL){
    	Product parsedProduct = null;
		if(receivedURL.contains("hepsiburada"))	parsedProduct = PrHepsiBurada.getContentPrice(receivedURL);
		else if(receivedURL.contains("gittigidiyor"))parsedProduct = PrGittiGidiyor.getContentPrice(receivedURL);
		else if(receivedURL.contains("morhipo"))parsedProduct = PrMorhipo.getContentPrice(receivedURL);
		else parsedProduct = null;
		
		return parsedProduct;
	}
  
}
