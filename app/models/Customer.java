package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;

import play.data.validation.Constraints.Required;
import play.db.ebean.Model;

@Entity
public class Customer extends Model{
	@Id
	public String email;
	
	@Required
	public String password;
	
	public String firstname;
	
	public String lastname;
	
	public String birthdate;
	
	public String gender;
	
	public int alerttext;
	
	public int alertmail;
	
	public static Finder<String,Customer> find = new Finder( String.class, Customer.class );
	    
  	public static List<Customer> all() {
	  return find.all();
	}

	public static void create(Customer customer) {
		customer.save();
	}

	public void delete(String email) {
	  find.ref(email).delete();
	}
}
