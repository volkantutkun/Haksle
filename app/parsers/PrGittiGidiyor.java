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
	
	public static void getContentPrices(String preurl, List<Product> receivedProducts)
	{

		try {

		
			Connection _conn = Jsoup.connect(preurl);

			Iterator<Product> it = receivedProducts.iterator();
	    	while (it.hasNext()) 
	    	{
	    		Product parsedProduct = it.next();
	    		String prodPrice = "NOTFOUND";
	    		boolean isDeleted = false;
	    		
	    		String posturl=parsedProduct.getPostUrl();
	    		Document doc;
	    		
	    		String url=preurl+posturl;
	    		
	    		_conn.url(url);
	    		doc = _conn.timeout(10*1000).get();

    			Elements spanIds = doc.select("span[class]");
    			Elements pIds = doc.select("p[class]");
    				
    			// product aktifligi kontrol
    			for (Element pId : pIds) 
    			{
    				if(pId.attr("class").equals("other-products-title"))
    				{
    					parsedProduct.delete();
    					isDeleted = true;
    				}
    			}
    			
    			if (isDeleted)
    				continue;
    			
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
    				Double newPrice = Double.parseDouble(trimPrice(prodPrice));
    				Double oldPrince = parsedProduct.currentprice;
    				if (newPrice < oldPrince)
    				{
    					parsedProduct.currentprice=newPrice;
    					parsedProduct.save();
    				}	

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
			

			
			if (prodPrice != null && !"".equals(prodPrice))	
			{

				double price = Double.parseDouble(trimPrice(prodPrice));
				parsedProduct.initialprice = price;
				parsedProduct.currentprice = price;			
				
				Elements divIds = doc.select("div[class]");
				
				for (Element divId : divIds) {
					
					if(divId.attr("class").equals("h1-container"))
					{
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

	
	private static String trimPrice(String priceStr)
	{
		String price = "NOTFOUND";
		try{
			price = (String) priceStr.subSequence(0, priceStr.length()-3);
			price = price.replace(",", "");
			price = price.replace(".", "");
			price = new StringBuilder(price).insert(price.length()-2, ".").toString();

		}catch(Exception e){
			System.out.println("ERROR: Exception type at GittiGidiyor parser!");
			e.printStackTrace();
		}
		return price;
	}


}


