package parsers;


import java.io.IOException;
import java.net.MalformedURLException;

import models.TestProduct;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class PrMorhipo{
	
	public static TestProduct getContentPrice(String receivedURL){
		TestProduct parsedProduct = new TestProduct();
		parsedProduct.url = receivedURL;
		
		Document doc;
		String prodPrice = "NOTFOUND";
		String prodName = "NOTFOUND";
		
		try {
			// need http protocol
			doc = Jsoup.connect(receivedURL).get();
		 
			Elements spanIds = doc.select("span[class]");
				
			for (Element spanId : spanIds) {

				if(spanId.attr("class").equals("price-sale")){
//					System.out.println("Price is: " + spanId.text()));
					prodPrice = spanId.text();
					break;
				}
			}
			
			if( prodPrice != null && !"".equals(prodPrice))	prodPrice = trimPrice(prodPrice);
			
			parsedProduct.price = prodPrice;
			
			
			Elements title = doc.select("title");
			
			prodName = title.text();
			
			if( prodName != null && !"".equals(prodName))	prodName = trimName(prodName);
			
			parsedProduct.name = prodName;
			
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
	
	private static String trimPrice(String priceStr){
		String price = "NOTFOUND";
		try{
			price = (String) priceStr.subSequence(0, priceStr.length()-3);
			price = price.replace(",", ".");

		}catch(Exception e){
			System.out.println("ERROR: Exception type at Morhipo parser method trimPrice!");
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

