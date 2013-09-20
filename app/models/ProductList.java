package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;

import play.data.validation.Constraints.Required;
import play.db.ebean.Model;

@Entity
public class ProductList extends Model{
	@Id
	public int listid;
	
	public String listname;
	
	public String email;
	
	public String pid;

	
	public static Finder<Integer,ProductList> find = new Finder( Integer.class, ProductList.class );
	    
  	public static List<ProductList> all() {
	  return find.all();
	}
  	
  	public static List<String> allbymail(String email) {
  	  return (List<String>) find.select("listname").where().eq("email", email).findList();
  	}
 
	public static void create(ProductList prodList) {
		prodList.save();
	}

	public static void delete(Integer listid) {
	  find.ref(listid).delete();
	}
}


