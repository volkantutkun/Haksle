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

public class PrHepsiBurada{
	
	public static void getContentPrices(String preurl, List<Product> receivedProducts)
	{

		try {

			Connection _conn = Jsoup.connect(preurl);

			Iterator<Product> it = receivedProducts.iterator();
	    	while (it.hasNext()) 
	    	{
	    		Product parsedProduct = it.next();
	    		String prodPrice = "NOTFOUND";
	    		
	    		String posturl=parsedProduct.getPostUrl();
	    		Document doc;
	    		
	    		String url=preurl+posturl;
	    		
	    		_conn.url(url);
	    		doc = _conn.timeout(10*1000).get();

    			Elements spanIds = doc.select("span[class]");
    			Elements pIds = doc.select("p[class]");
    				
    			// TODO: product aktifligi kontrol

    			
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
		
		parsedProduct.site = "HepsiBurada";
		parsedProduct.source = receivedURL;
		parsedProduct.picture = null;
		
		Document doc;
		String prodPrice = "NOTFOUND";
		String prodName = "NOTFOUND";
		
		try {
			// need http protocol
			doc = Jsoup.connect(receivedURL).timeout(10*1000).get();
		 
			// TODO: product aktifligi kontrol
			
			
			Elements spanIds = doc.select("span[id]");
				
			for (Element spanId : spanIds) {

				if(spanId.attr("id").equals("ctl00_ContentPlaceHolder1_ProductControl1_MainControl1_ProductMain1_lblPriceWithTax")){
					prodPrice = spanId.text();
				}
				if(spanId.attr("id").equals("ctl00_ContentPlaceHolder1_ProductControl1_MainControl1_ProductMain1_lblProductName")){
					prodName = spanId.text();
				}
			}
			
			if( prodPrice != null && !"".equals(prodPrice))	
				prodPrice = trimPrice(prodPrice);
			
			parsedProduct.title = prodName;
			
			double price = Double.parseDouble(trimPrice(prodPrice));
			parsedProduct.initialprice = price;
			parsedProduct.currentprice = price;
			
			
			
		} catch (MalformedURLException e) {
			System.out.println("ERROR: MalformedURLException type at HepsiBurada parser!");
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			System.out.println("ERROR: IOException type at HepsiBurada parser!");
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
			System.out.println("ERROR: Exception type at HepsiBurada parser!");
			e.printStackTrace();
		}
		return price;
	}
	
	public static void main(String[] args) {
		System.out.println("Price is:[" + getContentPrice("http://www.hepsiburada.com/liste/life-zigon-sehpa-beyaz-/productDetails.aspx?productId=mbmdllifeb&categoryId=18021617&navq=categoryid%3d18021617%26fh_view_size%3d12%26fh_sort_by%3d-order_stock_attribute_pl%252c-ranking_cocktail_bestseller%26fh_maxdisplaynrvalues_brand%3d-1%26fh_secondid%3dmbmdllifeb%26fh_lister_pos%3d1%26fh_location%3d%252f%252fcatalog01%252ftr_TR%252fbrand%253d%257bmobetto%257d%252fcategories%253c%257bcatalog01_60002028%257d%252fcategories%253c%257bcatalog01_60002028_2147483614%257d%252fcategories%253c%257bcatalog01_60002028_2147483614_18021299%257d%252fcategories%253c%257bcatalog01_60002028_2147483614_18021299_18021303%257d%252fcategories%253c%257bcatalog01_60002028_2147483614_18021299_18021303_18021332%257d%252fcategories%253c%257bcatalog01_60002028_2147483614_18021299_18021303_18021332_18021617%257d%26fh_refview%3dlister") + "]");
	}

}
