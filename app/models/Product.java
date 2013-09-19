package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;

import play.data.validation.Constraints.Required;
import play.db.ebean.Model;

@Entity
public class Product extends Model{
	@Id
	public Long pid;
	
	public String title;
	
	public String site;
	
	public String source;
	
	public String attr1;
	
	public String attr1value;
	
	public String attr2;
	
	public String attr2value;
	
	public String attr3;
	
	public String attr4value;
	
	public String picture;

	
	public static Finder<Long,Product> find = new Finder( Long.class, Product.class );
	    
  	public static List<Product> all() {
	  return find.all();
	}

	public static void create(Product product) {
		product.save();
	}

	public static void delete(Long pid) {
	  find.ref(pid).delete();
	}
}

