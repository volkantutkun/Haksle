package parsers;


import java.io.IOException;
import java.net.MalformedURLException;

import models.Product;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class PrMorhipo{
	
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
				
			for (Element spanId : spanIds) {

				if(spanId.attr("class").equals("price-sale")){
//					System.out.println("Price is: " + spanId.text()));
					prodPrice = spanId.text();
					break;
				}
			}
			
			if( prodPrice != null && !"".equals(prodPrice))	prodPrice = trimPrice(prodPrice);
			
			parsedProduct.attr1 = "INITALPRICE";
			parsedProduct.attr1value = prodPrice;
			parsedProduct.attr2 = "CURRENTPRICE";
			parsedProduct.attr2value = prodPrice;
			
			
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

