package controllers;

import models.Product;
import parsers.PrGittiGidiyor;
import parsers.PrHepsiBurada;
import parsers.PrMorhipo;
import play.*;
import play.data.Form;
import play.mvc.*;
import views.html.*;

public class Application extends Controller {
	
	static Form<Product> productForm = Form.form(Product.class);
  
	public static Result index() {
    	return redirect(routes.Application.products());
    }
    
    public static Result products() {
    	return ok(views.html.index.render(Product.all(), productForm));
     }
      
    public static Result newProduct() {
    	Form<Product> filledForm = productForm.bindFromRequest();
    	  if(filledForm.hasErrors()) {
    	    return badRequest(
    	      views.html.index.render(Product.all(), filledForm)
    	    );
    	  } else {
    		  Product newProduct = filledForm.get();
    		  newProduct = parseURL(newProduct.url);
    		  Product.create(newProduct);
    	    return redirect(routes.Application.products());  
    	  }
     }
      
    public static Result deleteProduct(Long id) {
    	Product.delete(id);
    	  return redirect(routes.Application.products());
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
