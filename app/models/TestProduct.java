package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;

import play.data.validation.Constraints.Required;
import play.db.ebean.Model;

@Entity
public class TestProduct extends Model{
	@Id
	public Long id;
	
	@Required
	public String url;
	
	public String name;
	
	public String price;
	
	public static Finder<Long,TestProduct> find = new Finder( Long.class, TestProduct.class );
	    
  	public static List<TestProduct> all() {
	  return find.all();
	}

	public static void create(TestProduct product) {
		product.save();
	}

	public static void delete(Long id) {
	  find.ref(id).delete();
	}
}




