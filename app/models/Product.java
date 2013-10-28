package models;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.Query;
import com.avaje.ebean.RawSql;
import com.avaje.ebean.RawSqlBuilder;

import play.data.validation.Constraints.Required;
import play.db.ebean.Model;

@Entity
public class Product extends Model{
	@Id
	public int pid;
	
	public String title;
	
	public String site;
	
	public String source;
	
	public String attr1;
	
	public String attr1value;
	
	public String attr2;
	
	public String attr2value;
	
	public String attr3;
	
	public String attr3value;
	
	public String picture;

	
	public static Finder<Integer,Product> find = new Finder( Integer.class, Product.class );
	    
  	public List<Product> all() {
  		return find.all();
	}
  	
	public List<Product> all(int rowcount)
	{
		  String sql = "select site, pid, source from product limit "+rowcount;  
		  
	  	  RawSql rawSql = RawSqlBuilder.parse(sql).create();  
	  
	  	  Query<Product> query = Ebean.find(Product.class);  
	  	  query.setRawSql(rawSql); 
	  
	  	  List<Product> resultList = query.findList();  
	  	  
	  	  return resultList;
	}
  	
  	public static List<Product> allbymail(String email) {
  		return (List<Product>) find.where().eq("attr3value", email).findList();
  	}
  	
  	public static List<Product> allbyurl(String url) {
  		return (List<Product>) find.where().eq("source", url).findList();
    }
  	
  	public static List<Product> allbypid(int pid) {
  		return (List<Product>) find.where().eq("pid", pid).findList();
    }
  	
  	public static List<ProductWithListInfo> allbypidlist(Map<Integer,String> receivedMap) {
  		List<ProductWithListInfo> tempList = new ArrayList<ProductWithListInfo>();
  		
  		Iterator iter = receivedMap.entrySet().iterator();
  		
  		while (iter.hasNext()) {
  			Map.Entry mEntry = (Map.Entry) iter.next();
  			
  			ProductWithListInfo tempProdWList = new ProductWithListInfo();
  			
  			Product tempProd = allbypid((Integer)mEntry.getKey()).get(0);

  			tempProdWList.pid = tempProd.pid;
  			tempProdWList.title = tempProd.title;
  			tempProdWList.site = tempProd.site;
  			tempProdWList.source = tempProd.source;
  			tempProdWList.attr1 = tempProd.attr1;
  			tempProdWList.attr1value = tempProd.attr1value;
  			tempProdWList.attr2 = tempProd.attr2;
  			tempProdWList.attr2value = tempProd.attr2value;
  			tempProdWList.attr3 = tempProd.attr3;
  			tempProdWList.attr3value = tempProd.attr3value;
  			tempProdWList.picture = tempProd.picture;
  			
  			tempProdWList.listname = (String)mEntry.getValue();
  			
  			tempList.add(tempProdWList);
  		}

  		return tempList;
  	}
 
	public static void create(Product product) {
		product.save();
	}

	public static void delete(Integer pid) {
	  find.ref(pid).delete();
	}
}