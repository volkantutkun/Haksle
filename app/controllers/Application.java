package controllers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.avaje.ebean.Ebean;

import deamon.DeamonController;

import models.Customer;
import models.Product;
import models.ProductList;
import parsers.PrGittiGidiyor;
import parsers.PrHepsiBurada;
import parsers.PrMorhipo;
import play.Logger;
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
    
    public static Result topkaps() {
    	return ok(views.html.topkaps.render(Product.all(),Product.allUnder(100),Product.allOver(100),""));
    }
    
    public static Result customer() {
    	String emailStr = "hakangurel84@gmail.com";
    	return ok(views.html.customer.render(Product.allbypidlist(ProductList.selectpidsbymail(emailStr)), ProductList.selectlistbymail(emailStr), emailStr, ""));
     }
    
    public static Result haksle(String emailStr) {
    	return ok(views.html.haksle.render(Product.allbypidlist(ProductList.selectpidsbymail(emailStr)), ProductList.selectlistbymail(emailStr), productForm, emailStr, ""));
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
    		  
    		  if(Customer.find.byId(receivedCust.email) == null){
    			  return ok(views.html.customerlogin.render("No user found with give username!")); 
    		  }else{
    			  Customer searchCust = Customer.find.byId(receivedCust.email);

    			  if(!searchCust.password.equals(receivedCust.password)){
    				  return ok(views.html.customerlogin.render("Wrong password!"));
    			  }else
    				  return haksle(receivedCust.email); 
    		  }    	     
    	  }
     }
    
    public static Result addProduct() {
    	Form<Product> filledProdForm = productForm.bindFromRequest();

    	  if(filledProdForm.hasErrors()) {
    		  System.out.println("ERROR");
    		  Map<String,String> tempMap = filledProdForm.data();
    		  String emailStr = tempMap.get("email");
    		  
    		  return badRequest(views.html.haksle.render(Product.allbypidlist(ProductList.selectpidsbymail(emailStr)), ProductList.selectlistbymail(emailStr), productForm, emailStr, "Bad Request"));
    	  } 
    	  else 
    	  {
    		  String msg = "";
    		  Map<String,String> tempMap = filledProdForm.data();
    		  String sourceStr = tempMap.get("source");
    		  String emailStr = tempMap.get("email");
    		  String desiredSel = tempMap.get("desireddiscount");
    		  
    		  boolean isDiscount = true; 
    		  boolean isinbasket = false;
    		  int desireddiscount = -1;
			  if (desiredSel.equals("Sepet"))
			  {
				  isDiscount = false;
				  isinbasket = true;
			  }
			  else
			  {
				  isDiscount = true;
    			  desireddiscount = Integer.parseInt(tempMap.get("desireddiscount"));
			  }
			  
    		  int pid = 0;
    		  
    		  List<Product> tempList = Product.allbyurl(sourceStr);
    		  if(tempList.size() > 0)
    		  {
    			  Product prodExist = tempList.get(0);
    			  pid = prodExist.pid;

    			  List<ProductList> tempPLList = ProductList.selectbypid(pid);
    			  ProductList prListObj = tempPLList.get(0);
    			  
    			  if (desireddiscount != -1)
    			  {
    				  if (isDiscount)
	    			  {
		        		  if (prListObj.desireddiscount!=desireddiscount)
		        			  prListObj.desireddiscount = desireddiscount;
		        		  
		        		  prListObj.isinbasket = false;
		        			 
	    			  }
	    			  else if (!isDiscount)
	    			  {
	    				  if (prListObj.isinbasket!=isinbasket)
		        			  prListObj.isinbasket = isinbasket;
	    			  }
    			  }
    			  else
    				  Logger.info("desireddiscount çekmede hata!");
    			  prListObj.save();
    			  
    			  msg = "Ürün güncellendi.";
        		 
    		  }
    		  else
    		  {
    			  Product newProduct = parseURL(sourceStr);
    			  if (newProduct != null)
    			  {
	        		  Product.create(newProduct);
	        		  
	        		  tempList = Product.allbyurl(sourceStr);
	        		  Product prodExist = tempList.get(0);
	    			  pid = prodExist.pid;
	    			  
	    			  ProductList newListItem = new ProductList();        		  
	        		  if (desiredSel.equals("Sepet"))
	        			  newListItem.isinbasket = isinbasket;
	        		  else
	        			  newListItem.desireddiscount = desireddiscount;
	              		  
	        		  String listnameStr = tempMap.get("listname");
	        		  if("newlist".equals(listnameStr))	
	        			  listnameStr = tempMap.get("newlistname");
	        		  
	        		  newListItem.email = emailStr;
	        		  newListItem.listname = listnameStr;
	        		  newListItem.pid = pid;
	        		  
	        		  newListItem.create(newListItem);
	        		  
	        		  msg = "Yeni ürün eklendi.";
    			  }
    			  else
    				  msg = "Ürün satışta değil.";
        		  
    			  
    		  }
	  
    		  return ok(views.html.haksle.render(Product.allbypidlist(ProductList.selectpidsbymail(emailStr)), ProductList.selectlistbymail(emailStr), productForm, emailStr, msg));
    	  }
    }
      
    public static Result deleteProduct(int id, String email) {
    	Form<Product> filledProdForm = productForm.bindFromRequest();
    	Map<String,String> tempMap = filledProdForm.data();
		String emailStr = tempMap.get("email");
		   	
    	ProductList.deleteByPid(id, email);
    	if(ProductList.selectbypid(id).size() == 0)
    		Product.delete(id);
    	return ok(views.html.haksle.render(Product.allbypidlist(ProductList.selectpidsbymail(emailStr)), ProductList.selectlistbymail(emailStr), productForm, emailStr, "Product is deleted."));
     }
    
    
    private static Product parseURL(String receivedURL)
    {
    	Product parsedProduct = null;
		if(receivedURL.contains("hepsiburada"))	parsedProduct = PrHepsiBurada.getContentPrice(receivedURL);
		else if(receivedURL.contains("gittigidiyor"))parsedProduct = PrGittiGidiyor.getContentPrice(receivedURL);
		else if(receivedURL.contains("morhipo"))parsedProduct = PrMorhipo.getContentPrice(receivedURL);
		else parsedProduct = null;
		
		return parsedProduct;
	}
    
    public static Result parseEmAll()
    {
		Date date = new Date();
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Logger.info("Parsing started at: " + dateFormat.format(date));
    	DeamonController dc = new DeamonController();
    	dc.parserDeamon();
    	return ok(views.html.index.render("Parsing ended"));
    }
    
    public static Result informEmAll()
    {
		Date date = new Date();
		DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Logger.info("Informing started at: " + dateFormat.format(date));
    	DeamonController dc = new DeamonController();
    	dc.informerDeamon();
    	return ok(views.html.index.render("Informing ended"));
    }
  
}
