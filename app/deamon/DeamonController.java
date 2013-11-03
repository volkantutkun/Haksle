package deamon;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import play.Logger;

import models.Product;

public class DeamonController 
{


	int DEAMONLOAD = 20;
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

		   // List<Product> siteList = product.all_sites();
		   // Iterator<Product> siteIterator = siteList.iterator();
		    
		    //if (siteList.size() > 0)
		   // {
			//    while (siteIterator.hasNext()) 
			//	{	

			  //  		String site = siteIterator.next().site;
			    		String preurl = null;
			    		String site = "Gittigidiyor";
			    	 	List<Product> productList = product.all_4parserdeamon(site); 
			    	 	
					    Iterator<Product> urlIterator = productList.iterator();		    
					    
					    int resultSize = productList.size();
					    
					    	if (resultSize<=DEAMONLOAD)
						    	DEAMONLOAD=resultSize;
	
						    int counter = 1;
						    while (urlIterator.hasNext()) 
							{	
						    	List<String> items = new ArrayList<String>();
						    	
						    	while (counter<=DEAMONLOAD)
						    	{
						    		if(urlIterator.hasNext())
						    		{
						    			Product product2 = urlIterator.next();
						    			preurl = product2.getPreUrl();
						    			items.add(product2.getPostUrl());
						    			counter++;
	
						    		}
						    		else
						    			break;
						    	}
			   		
						    	
						    	deamon.watchItems(site, preurl, items);
						    	counter = 1;
				
							}

				  
				}
		    
		  //  }
		   // else
		    //{
		    //	Logger.info("Product yok!");
		   // }
	 // }
}
