
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import models.Product;
import deamon.Deamon;
import play.*;

public class Global extends GlobalSettings 
{
	
	int DEAMONLOAD = 20;

  @Override
  public void onStart(Application app) 
  {
    Logger.info("Application has started");
    
    //extendedDeamon();
    singularDeamon();
  }  
  
  @Override
  public void onStop(Application app) 
  {
	  Logger.info("Application shutdown...");
  }  
  
  public void singularDeamon()
  {
	    Deamon deamon = new Deamon();
	    Product product = new Product();

	    
	    List<Product> productList = product.all();    
	    Iterator<Product> iterator = productList.iterator();

	    while (iterator.hasNext()) 
		{		
			product = iterator.next();
			String productIdentifier = product.site+":"+product.pid;
			deamon.watchItem(productIdentifier, product.source, 50.0, "Hakan");
		}

  }
  
  public void extendedDeamon()
  {
	  	Deamon deamon = new Deamon();
	    Product product = new Product();

	    List<Product> productList = product.all();    
	    Iterator<Product> iterator = productList.iterator();
	    
	    int resultSize = productList.size();
	    
	    if (resultSize<=DEAMONLOAD)
	    	DEAMONLOAD=resultSize;

	    int counter = 1;
	    while (iterator.hasNext()) 
		{	
	    	HashMap<String,String> items = new HashMap<String,String>();

	    	while (counter<=DEAMONLOAD)
	    	{
	    		if(iterator.hasNext())
	    		{
	    			product = iterator.next();
	    	
	    			String productIdentifier=product.site+":"+product.pid;
	    			//Logger.info(productIdentifier);
	    			items.put(productIdentifier, product.source);
	    		
	    			counter++;
	    		}
	    		else
	    			break;
	    	}
	    	deamon.watchItems(items);
	    	counter = 1;

		}

  }
  
    
}
