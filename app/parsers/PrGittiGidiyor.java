package parsers;


import java.io.IOException;
import java.net.MalformedURLException;

import models.Product;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class PrGittiGidiyor{
	
	public static Product getContentPrice(String receivedURL){
		Product parsedProduct = new Product();
		parsedProduct.url = receivedURL;
		
		Document doc;
		String prodPrice = "NOTFOUND";
		String prodName = "NOTFOUND";
		
		try {
			// need http protocol
			doc = Jsoup.connect(receivedURL).get();
		 
			Elements spanIds = doc.select("span[class]");
				
			for (Element spanId : spanIds) {

				if(spanId.attr("class").equals("price-css")){
//					System.out.println("Price is: " + spanId.text());
					prodPrice = spanId.text();
					break;
				}
			}
			
			if( prodPrice != null && !"".equals(prodPrice))	prodPrice = trimPrice(prodPrice);
			
			parsedProduct.price = prodPrice;
			
			
			Elements divIds = doc.select("div[class]");
			
			for (Element divId : divIds) {
				
				if(divId.attr("class").equals("h1-container")){
//					System.out.println("Price is: " + divId.text());
					prodName = divId.text();
					break;
				}
			}
			
			parsedProduct.name = prodName;
			
		} catch (MalformedURLException e) {
			System.out.println("ERROR: MalformedURLException type at GittiGidiyor parser!");
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			System.out.println("ERROR: IOException type at GittiGidiyor parser!");
			e.printStackTrace();
			return null;
		}	
		
		return parsedProduct;
	}
	
	// HepsiBurada parsed price is at '69,89 TL' format
//	private static double trimPrice(String priceStr){
//		double price = -1;
//		try{
//			String priceStrUpd = (String) priceStr.subSequence(0, priceStr.length()-3);
//			priceStrUpd = priceStrUpd.replace(",", ".");
//		//	System.out.println(priceStrUpd);
//			price = Double.parseDouble(priceStrUpd);
//		}catch(Exception e){
//			System.out.println("ERROR: Exception type at HepsiBurada parser!");
//			e.printStackTrace();
//		}
//		return price;
//	}
	
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
	
	public static void main(String[] args) {
		System.out.println("Price is:[" + getContentPrice("http://urun.gittigidiyor.com/garaj/piranha-notraffic-r-type-90363549?sciid=hpps#product-information") + "]");
	}

}


