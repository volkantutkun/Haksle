package parsers;


import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Iterator;
import java.util.List;

import models.Product;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import play.Logger;

public class PrMorhipo{
	
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
    			Elements pIds = doc.select("div[class]");
    			
    			
    			// product aktifligi kontrol
    			for (Element pId : pIds) 
    			{
    				if(pId.attr("class").equals("product-saled"))
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
		
		parsedProduct.site = "Morhipo";
		parsedProduct.source = receivedURL;
		parsedProduct.picture = null;
		
		Document doc;
		String prodPrice = "NOTFOUND";
		String prodName = "NOTFOUND";
		
		try {
			// need http protocol
			doc = Jsoup.connect(receivedURL).timeout(10*1000).get();
		
			Elements spanIds = doc.select("span[class]");	
			Elements pIds = doc.select("div[class]");
						
			// product aktifligi kontrol
			for (Element pId : pIds) 
			{
				if(pId.attr("class").equals("product-saled"))
					return null;
			}
			for (Element spanId : spanIds) {

				if(spanId.attr("class").equals("price-sale")){
					prodPrice = spanId.text();
					break;
				}
			}
			
			if( prodPrice != null && !"".equals(prodPrice))	
				prodPrice = trimPrice(prodPrice);
			
			parsedProduct.title = prodName;
			
			double price = Double.parseDouble(prodPrice);
			parsedProduct.initialprice = price;
			parsedProduct.currentprice = price;
			
			
			Elements title = doc.select("title");
			
			prodName = title.text();
			
			if( prodName != null && !"".equals(prodName))	prodName = trimName(prodName);
			
			parsedProduct.title = prodName;
			
			
			
		} catch (MalformedURLException e) {
			System.out.println("ERROR: MalformedURLException type at Morhipo parser!");
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			System.out.println("ERROR: IOException type at Morhipo parser!");
			e.printStackTrace();
			return null;
		}	
		
		return parsedProduct;
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
			System.out.println("ERROR: Exception type at Morhipo parser!");
			e.printStackTrace();
		}
		return price;
	}
	
	private static String trimName(String nameStr){
		String name = "NOTFOUND";
		try{
			name = (String) nameStr.subSequence(0, nameStr.length()-14);

		}catch(Exception e){
			System.out.println("ERROR: Exception type at Morhipo parser method trimName!");
			e.printStackTrace();
		}
		return name;
	}
	
	public static void main(String[] args) {
		System.out.println("Price is:[" + getContentPrice("http://www.morhipo.com/colin-s-t-shirt/3287901/detay") + "]");
	}

}

