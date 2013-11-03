package deamon;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import play.Logger;

import models.Product;

public class DeamonController 
{


	int DEAMONLOAD = 10;
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
		    Product products = new Product();

		    List<String> siteList = products.all_sites();
		    Iterator<String> siteIterator = siteList.iterator();
		    
		    if (siteList.size() > 0)
		    {
			    while (siteIterator.hasNext()) 
				{	

			    		String site = siteIterator.next();
			    	 	
			    		//List<Product> productList = products.all(400); 
			    		List<Product> productList = products.all_4parserdeamon(site); 
			    	 	
			    		String preurl = productList.get(1).getPreUrl();
					    Iterator<Product> urlIterator = productList.iterator();		    
					    
					    int resultSize = productList.size();
					    
					    if (resultSize<=DEAMONLOAD)
						    DEAMONLOAD=resultSize;
	
						int counter = 1;
						while (urlIterator.hasNext()) 
						{	
						    	List<Product> items = new ArrayList<Product>();
						    	
						    	while (counter<=DEAMONLOAD)
						    	{
						    		if(urlIterator.hasNext())
						    		{
						    			items.add(urlIterator.next());
						    			counter++;
						    		}
						    		else
						    			break;
						    	}

						    	deamon.watchItems(site,preurl,items);
						    	counter = 1;
			
						}

				}
		    
		    }
		    else
		    {
		    	Logger.info("Product yok!");
		    }
	 }
}
