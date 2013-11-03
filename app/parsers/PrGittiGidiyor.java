package parsers;


import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import models.Product;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import play.Logger;

public class PrGittiGidiyor
{	
	
	public static void getContentPrices(String preurl, List<String> receivedURLs)
	{
		List<Product> products = new ArrayList<Product>();

		try {

			Connection _conn = Jsoup.connect(preurl);

			Iterator<String> it = receivedURLs.iterator();
	    	while (it.hasNext()) 
	    	{
	    		Product parsedProduct = new Product();
	    		String prodPrice = "NOTFOUND";
	    		String prodName = "NOTFOUND";
	    		
	    		String posturl=it.next();
	    		Document doc;
	    		
	    		_conn.url(preurl+posturl);
	    		doc = _conn.timeout(10*1000).get();

    			Elements spanIds = doc.select("span[class]");
    			Elements pIds = doc.select("p[class]");
    				
    			// product aktifligi kontrol
    			for (Element pId : pIds) 
    			{
    				if(pId.attr("class").equals("other-products-title"))
    					break;
    			}
    			
    			for (Element spanId : spanIds) 
    			{	
    				if(spanId.attr("class").equals("price-css"))
    				{
    					prodPrice = spanId.text();
    					break;
    				}
    			}
    			
    			if( prodPrice != null && !"".equals(prodPrice))	
    			{

    				//price kontrol

    			}


	    	}
	    			
	    			
	    			
	    			
	    		} catch (MalformedURLException e) {
	    			System.out.println("ERROR: MalformedURLException type at GittiGidiyor parser!");
	    			e.printStackTrace();

	    		} catch (IOException e) {
	    			System.out.println("ERROR: IOException type at GittiGidiyor parser!");
	    			e.printStackTrace();

	    		}	

    		
    	}

		
	
	
	public static Product getContentPrice(String receivedURL){
		Product parsedProduct = new Product();
		
		parsedProduct.site = "Gittigidiyor";
		parsedProduct.source = receivedURL;
		parsedProduct.picture = null;
		
		Document doc;
		String prodPrice = "NOTFOUND";
		String prodName = "NOTFOUND";
		
		try {
			// need http protocol
			
			doc = Jsoup.connect(receivedURL).timeout(10*1000).get();
		
			Elements spanIds = doc.select("span[class]");
			Elements pIds = doc.select("p[class]");
				
			// product aktifligi kontrol
			for (Element pId : pIds) 
			{
				if(pId.attr("class").equals("other-products-title"))
					return null;
			}
			
			for (Element spanId : spanIds) 
			{	
				if(spanId.attr("class").equals("price-css"))
				{
					prodPrice = spanId.text();
					break;
				}
			}
			

			
			if( prodPrice != null && !"".equals(prodPrice))	
			{

				prodPrice = trimPrice(prodPrice);
				parsedProduct.attr1 = "INITALPRICE";
				parsedProduct.attr1value = prodPrice;
				parsedProduct.attr2 = "CURRENTPRICE";
				parsedProduct.attr2value = prodPrice;
				
				
				Elements divIds = doc.select("div[class]");
				
				for (Element divId : divIds) {
					
					if(divId.attr("class").equals("h1-container")){
//						System.out.println("Price is: " + divId.text());
						prodName = divId.text();
						break;
					}
				}
				
				parsedProduct.title = prodName;
				return parsedProduct;
			}
			else
				return null;

			
		} catch (MalformedURLException e) {
			System.out.println("ERROR: MalformedURLException type at GittiGidiyor parser!");
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			System.out.println("ERROR: IOException type at GittiGidiyor parser!");
			e.printStackTrace();
			return null;
		}	

		
		
	}

	
	private static String trimPrice(String priceStr){
		String price = "NOTFOUND";
		try{
			price = (String) priceStr.subSequence(0, priceStr.length()-3);
			price = price.replace(",", ".");

		}catch(Exception e){
			System.out.println("ERROR: Exception type at GittiGidiyor parser!");
			e.printStackTrace();
		}
		return price;
	}


}


