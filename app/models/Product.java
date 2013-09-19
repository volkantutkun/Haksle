package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;

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
	    
  	public static List<Product> all() {
	  return find.all();
	}
  	
  	public static List<Product> allbymail(String email) {
  	  return (List<Product>) find.where().eq("attr3value", email).findList();
  	}
 
	public static void create(Product product) {
		product.save();
	}

	public static void delete(Integer pid) {
	  find.ref(pid).delete();
	}
}

