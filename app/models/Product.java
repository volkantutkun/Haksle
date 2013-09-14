package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;

import play.data.validation.Constraints.Required;
import play.db.ebean.Model;

@Entity
public class Product extends Model{
	@Id
	public Long id;
	
	@Required
	public String url;
	
	public String name;
	
	public String price;
	
	public static Finder<Long,Product> find = new Finder( Long.class, Product.class );
	    
	  	public static List<Product> all() {
		  return find.all();
		}

		public static void create(Product product) {
			product.save();
		}

		public static void delete(Long id) {
		  find.ref(id).delete();
		}
}



