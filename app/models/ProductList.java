package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.Query;
import com.avaje.ebean.RawSql;
import com.avaje.ebean.RawSqlBuilder;

import play.data.validation.Constraints.Required;
import play.db.ebean.Model;

@Entity
public class ProductList extends Model{
	@Id
	public int listid;
	
	public String listname;
	
	public String email;
	
	public int pid;

	
	public static Finder<Integer,ProductList> find = new Finder( Integer.class, ProductList.class );
	    
  	public static List<ProductList> all() {
	  return find.all();
	}
  	
  	public static List<ProductList> selectlistbymail(String emailStr) {
//  	  return (List<ProductList>) find.setDistinct(true).where().eq("email", email).findList();
  	  
  	  String sql = "select listid, listname, email, pid from product_list group by listname";  
  
  	  RawSql rawSql = RawSqlBuilder.parse(sql).create();  
  
  	  Query<ProductList> query = Ebean.find(ProductList.class);  
  	  query.setRawSql(rawSql).where().eq("email", emailStr); 
  
  	  List<ProductList> resultList = query.findList();  
  	  
  	  return resultList;
  	}
  	
  	public static List<Integer> selectpidsbymail(String emailStr) {
//	  return (List<ProductList>) find.setDistinct(true).where().eq("email", email).findList();
	  
  		List<Integer> tempList = new ArrayList<Integer>();
  		
  		String sql = "select listid, listname, email, pid from product_list";  

  		RawSql rawSql = RawSqlBuilder.parse(sql).create();  

  		Query<ProductList> query = Ebean.find(ProductList.class);  
  		query.setRawSql(rawSql).where().eq("email", emailStr); 

  		List<ProductList> resultList = query.findList(); 
  		for(int i=0; i<resultList.size(); i++)
  			tempList.add(resultList.get(i).pid);
	  
  		return tempList;
	}
 
	public static void create(ProductList prodList) {
		prodList.save();
	}

	public static void delete(Integer listid) {
	  find.ref(listid).delete();
	}
}


