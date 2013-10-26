

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Timer;

import models.Product;
import deamon.Deamon;
import play.*;

public class Global extends GlobalSettings 
{

  @Override
  public void onStart(Application app) 
  {
    Logger.info("Application has started");
    
    //Deamon:
    
    /*Deamon deamon = new Deamon();
    Product product = new Product();
    
    DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	Date date = new Date();
    Logger.info("Parsing started at: " + dateFormat.format(date));
    
    List<Product> productList = product.all();    
    Iterator<Product> iterator = productList.iterator();
	int i = 0;
    while (iterator.hasNext()) 
	{
    	i++;
		if (i>50)
		{
			 break;
		}
		
		product = iterator.next();
		String productIdentifier = product.site+":"+product.pid;
		deamon.watchItem(productIdentifier, product.source, 50.0, "Hakan");
	}
	
	Date date2 = new Date();
	Logger.info("Parsing ended at: " + dateFormat.format(date2));
     */
  }  
  
  @Override
  public void onStop(Application app) 
  {
	  Logger.info("Application shutdown...");
  }  
  
    
}
