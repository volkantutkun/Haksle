package deamon;
 
import akka.actor.ActorRef;
import akka.actor.ActorSystem;
import akka.actor.OneForOneStrategy;
import akka.actor.SupervisorStrategy;
import akka.actor.UntypedActor;
import akka.actor.Props;
import akka.event.Logging;
import akka.event.LoggingAdapter;
import akka.japi.Function;
import scala.concurrent.Await;
import scala.concurrent.duration.Duration;
import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;

import parsers.PrGittiGidiyor;
import parsers.PrHepsiBurada;
import parsers.PrMorhipo;
import play.Logger;

import models.Product;
import models.ProductList;
import static akka.pattern.Patterns.ask;
import static akka.actor.SupervisorStrategy.resume;
import static akka.actor.SupervisorStrategy.restart;
import static akka.actor.SupervisorStrategy.escalate;
import akka.actor.SupervisorStrategy.Directive;
 
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

 
public class Deamon {
 
    public static final Object TICK = "TICK";
    public final ActorSystem system;
    public final ActorRef root;

   
    public Deamon()
    {
    	Config config = ConfigFactory.parseString("akka.loglevel = INFO \n" + "akka.actor.debug.lifecycle = on");
    	system = ActorSystem.create("HukkSystem", config);
               
    	root = system.actorOf(new Props(Root.class), "root");
    }
   
    public static class Root extends UntypedActor
    {
    	private SupervisorStrategy strategy = new OneForOneStrategy(10, Duration.create("1 minute"), new Function<Throwable, Directive>()
    	{
		    public Directive apply(Throwable t)
		    {
		    	if (t instanceof ArithmeticException)
		    		return resume();
		    	else if (t instanceof NullPointerException)
		    		return restart();
		    	else
		    		return escalate();
		    }
    	});
 
    	@Override
    	public SupervisorStrategy supervisorStrategy() {
    		return strategy;
    	}
 
                  
    	@SuppressWarnings("unchecked")
    	public void onReceive(Object o) {
    		if (o instanceof ArrayList<?>) {
    			getSender().tell(getContext().actorOf((Props)((ArrayList<Object>) o).get(0), (String)((ArrayList<Object>) o).get(1)), getSelf());
    		} else {
    			unhandled(o);
    		}
    	}
    }
   
    public static class Supervisor extends UntypedActor
    {
    	private SupervisorStrategy strategy = new OneForOneStrategy(10, Duration.create("1 minute"), new Function<Throwable, Directive>(){
    		public Directive apply(Throwable t)
    		{
    			if (t instanceof ArithmeticException)
    				return resume();
    			else if (t instanceof NullPointerException)
    				return restart();
    			else
    				return escalate();
    		}
    	});
 
    	@Override
    	public SupervisorStrategy supervisorStrategy() {
    		return strategy;
    	}
                 
    	@SuppressWarnings("unchecked")
    	public void onReceive(Object o) {
    		if (o instanceof ArrayList<?>) {          
    			getSender().tell(getContext().actorOf((Props)((ArrayList<Object>) o).get(0), (String)((ArrayList<Object>) o).get(1)), getSelf());
    		} else {
    			unhandled(o);
    		}
    	}
    }
   

    
    @SuppressWarnings("serial")
	public static class HukkExtended implements Serializable
    {
    	public final String site;
    	public final String preurl;
    	public final List<Product> items;

    	public HukkExtended(String site, String preurl, List<Product> items)
    	{
    		this.site=site;
    		this.preurl=preurl;
    		this.items=items;
    	}            
    }
    
    @SuppressWarnings("serial")
	public static class HukkInformer implements Serializable
    {
    	public final List<Product> items;

    	public HukkInformer(List<Product> items)
    	{
    		this.items=items;
    	}            
    }
    
    private static void parseURLs(String site, String preurl, List<Product> receivedProducts)
    {
 
		if(site.equals("Gittigidiyor"))	
			PrGittiGidiyor.getContentPrices(preurl, receivedProducts);
		else if(site.equals("Hepsiburada"))
			PrHepsiBurada.getContentPrices(preurl, receivedProducts);
		else if(site.equals("Morhipo"))
			PrMorhipo.getContentPrices(preurl, receivedProducts);
	

	}
 
   
    
    public static class HukkActorExtended extends UntypedActor
    {
    	int state = 0;
    	LoggingAdapter log = Logging.getLogger(getContext().system(), this);

    	String site;
    	String preurl;
    	List<Product> items;        
    	DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

		
    	@Override
    	public void onReceive(Object message) throws Exception
    	{

    		if (message instanceof HukkExtended)
    		{
    			site = ((HukkExtended) message).site; 	
    			preurl = ((HukkExtended) message).preurl; 
    			items = ((HukkExtended) message).items; 
    	    	parseURLs(site, preurl, items);

    			
    		}

    		else if (message instanceof Exception)
    		{
    			throw (Exception) message;
    		}
    		else if (message instanceof Integer)
    		{
    			state = (Integer) message;
    		}
    		else if (message.equals("get"))
    		{
    			getSender().tell(state, getSelf());
    		}
    		else
    		{
    			unhandled(message);
    		}
    	}
    	
    	@Override
    	public void postStop() 
    	{
    		//Logger.info(workerPath + " is stopped");
    		Date date2 = new Date();
  			Logger.info("Parsing ended at: " + dateFormat.format(date2));
    	}
    }
    
    
    public static class HukkActorInformer extends UntypedActor
    {
    	int state = 0;
    	LoggingAdapter log = Logging.getLogger(getContext().system(), this);

    	List<Product> items;        
    	DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		
    	@Override
    	public void onReceive(Object message) throws Exception
    	{

    		if (message instanceof HukkInformer)
    		{
    			
    			items = ((HukkInformer) message).items; 
    			Iterator<Product> it = items.iterator();
    	    	while (it.hasNext()) 
    	    	{
    	    		Product pr = it.next();
    	    		double iniVal = pr.initialprice;
    	    		double currVal = pr.currentprice;
    	    		int pid = pr.pid;
    	    		
    	    		double changeVal=((iniVal-currVal)/iniVal)*100;

    	    		List<ProductList> list = ProductList.getInformableCustomers(pid, changeVal);
    	    		
    	    		Iterator<ProductList> itpl = list.iterator();
        	    	while (itpl.hasNext()) 
        	    	{
        	    		ProductList pl = itpl.next();
        	    		Logger.info("Email to: " + pl.email + " with price change: %" + changeVal + " where all he needed was: %" + pl.desireddiscount);
        	    	}
    	    		

    	    	}
    	    	
    			
    		}

    		else if (message instanceof Exception)
    		{
    			throw (Exception) message;
    		}
    		else if (message instanceof Integer)
    		{
    			state = (Integer) message;
    		}
    		else if (message.equals("get"))
    		{
    			getSender().tell(state, getSelf());
    		}
    		else
    		{
    			unhandled(message);
    		}
    	}
    	
    	@Override
    	public void postStop() 
    	{
    		//Logger.info(workerPath + " is stopped");
    		Date date2 = new Date();
  			Logger.info("Informing ended at: " + dateFormat.format(date2));
    	}
    }
   
    public ActorRef getOrCreateSupervisor(String name)
    {
    	Duration timeout = Duration.create("30 seconds");
    	ActorRef actor_candidate = system.actorFor("/user/root/"+name);
    	ActorRef actor = null;
    	ArrayList<Object> actorProp = new ArrayList<Object>();
                              
    	actorProp.add(new Props(Supervisor.class));
    	actorProp.add(name);
                              
    	if (actor_candidate.isTerminated())
    	{
    		try {
                                              
    			actor = (ActorRef) Await.result(ask(root, actorProp, 30000), timeout);                                      
    			Logger.info(actor.toString() + " created.");
    			return actor;
    			
    		} catch (Exception e) {
    			e.printStackTrace();
    		}
    	}
    	else
    	{
    		//Logger.info(name + " already exists.");
    	}
    	return actor_candidate;
    }
   
    @SuppressWarnings("unchecked")
	public ActorRef getOrCreateWorker(String node, String name, ActorRef parent, @SuppressWarnings("rawtypes") Class ActorClass)
    {
    	Duration timeout = Duration.create("30 seconds");
    	ActorRef actor_candidate = system.actorFor("/user/root/"+node+"/"+name);
    	ActorRef actor = null;
    	ArrayList<Object> actorProp = new ArrayList<Object>();
    	actorProp.add(new Props(ActorClass));
    	actorProp.add(name);
    	
    	if (actor_candidate.isTerminated())
    	{
    		try {
    			actor = (ActorRef) Await.result(ask(parent, actorProp, 30000), timeout);                                                
    			Logger.info(actor.toString() + " created.");
    			return actor;
    		} catch (Exception e) {
    			Logger.info(actor_candidate.toString() + " failed");
    			e.printStackTrace();
    		}
    	}
    	else
    	{
    		//System.out.println(name + " already exists.");                                  
    	}
    	return actor_candidate;
    }

 
    
    public void watchItems(final String site, final String preurl, final List<Product> items)
    {
    	
    	int itemsCode = items.hashCode();
    	
    	Random generator = new Random(); 
    	int i = generator.nextInt(10) + 1;
    	itemsCode+=i;
    	String itemsCodeStr=Integer.toString(itemsCode);
    	
    	String supChar;
    	if (itemsCode<0)
    		supChar = "NodeParser0";
    	else
    		supChar = "NodeParser"+itemsCodeStr.substring(1,2);
    	
    	ActorRef supervisor= getOrCreateSupervisor(supChar);                            
    	ActorRef worker= getOrCreateWorker(supChar, itemsCodeStr, supervisor, HukkActorExtended.class);
    	if(worker!=null)
    	{
    		worker.tell(new HukkExtended(site, preurl, items), worker);
    		worker.tell(akka.actor.PoisonPill.getInstance(), worker);
    	}
    	
    }
    
    public void informCustomers(final List<Product> items)
    {
    	
    	int itemsCode = items.hashCode();
    	
    	Random generator = new Random(); 
    	int i = generator.nextInt(10) + 1;
    	itemsCode+=i;
    	String itemsCodeStr=Integer.toString(itemsCode);
    	
    	String supChar;
    	if (itemsCode<0)
    		supChar = "NodeInformer0";
    	else
    		supChar = "NodeInformer"+itemsCodeStr.substring(1,2);
    	
    	ActorRef supervisor= getOrCreateSupervisor(supChar);                            
    	ActorRef worker= getOrCreateWorker(supChar, itemsCodeStr, supervisor, HukkActorInformer.class);
    	if(worker!=null)
    	{
    
    		worker.tell(new HukkInformer(items), worker);
    		worker.tell(akka.actor.PoisonPill.getInstance(), worker);
    	}
    	
    }
    

    
    
    
    
    
    /**************Deprecated code here************
    @SuppressWarnings("serial")
   	public static class Hukk implements Serializable
       {
       	public final String name;
       	public final String link;
       	public final double price;
       	public final String user;
       	public final String workerPath;
                         
       	public Hukk(String name, String link, double price2, String user, String workerPath)
       	{
       		this.name=name; this.link=link; this.price=price2; this.user=user; this.workerPath=workerPath;
       	}            
       }
       public static Product parseURL(String receivedURL){
       	Product parsedProduct = null;
   		if(receivedURL.contains("hepsiburada"))	parsedProduct = PrHepsiBurada.getContentPrice(receivedURL);
   		else if(receivedURL.contains("gittigidiyor"))parsedProduct = PrGittiGidiyor.getContentPrice(receivedURL);
   		else if(receivedURL.contains("morhipo"))parsedProduct = PrMorhipo.getContentPrice(receivedURL);
   		else parsedProduct = null;
   		
   		return parsedProduct;
   	}
       public static class HukkActor extends UntypedActor
       {
       	int state = 0;
       	LoggingAdapter log = Logging.getLogger(getContext().system(), this);

       	String name;
       	String link;
       	double price;
       	String user;
       	String workerPath;
       	Map<Double,HashSet<String>> priceMap = new HashMap<Double, HashSet<String>>();
       	Map<String,Double> userMap = new HashMap<String,Double>();
       	Double oldPrice;
                  
       	@Override
           public void preStart() {
       		getContext().system().scheduler().schedule(Duration.create(1, "second"), Duration.create(120, "second"),getSelf(), TICK, getContext().dispatcher(),getSelf());
       	}
       	
       	@Override
       	public void onReceive(Object message) throws Exception
       	{

       		if (message instanceof Hukk)
       		{
       			name = ((Hukk) message).name;
       			link = ((Hukk) message).link;
       			price = ((Hukk) message).price;
       			user = ((Hukk) message).user;
       			workerPath = ((Hukk) message).workerPath;
                                       
       			log.info("Worker log for " + name);
       			log.info("Attributes: " + link + ", " + price + ", " + user);
                                                 
       			if (userMap.containsKey(user))
       			{
                                                                 
       				log.info("Will iterate for " + name + ", " + user);
       				//update old price list
       				oldPrice = userMap.get(user);
       				if (priceMap.containsKey(oldPrice))
       				{
       					log.info("Updating old entry for this user");
       					HashSet<String> newList = new HashSet<String>();
       					newList = priceMap.get(oldPrice);
       					newList.remove(user);
       					priceMap.put(oldPrice, newList);
       					userMap.put(user, price);
       				
       				}
       				else
       				{
       					log.info("Unexpected error - priceMap doesn't have old price!");
       					new NullPointerException();
       				}
       			}
       			else
       			{
       				userMap.put(user,price);
       			}
                                                                 
       			if (priceMap.containsKey(price))
       			{
       				log.info("Existing entry will be updated with this user");
       				HashSet<String> newList = new HashSet<String>();
       				newList = priceMap.get(price);
       				newList.add(user);
       				priceMap.put(price, newList);
       			}
       			else
       			{
       				log.info("First entry for this price");
       				HashSet<String> newList = new HashSet<String>();
       				newList.add(user);
       				priceMap.put(price, newList);
       			}
                                                 
       		}
                                  
       		else if (message.equals(TICK))
       		{
       			  			
       			log.info("TICK kicked for " + name);
       			
       			Product product = parseURL(link);
       			
       			Iterator<Entry<String, Double>> iterator = userMap.entrySet().iterator();
       			while (iterator.hasNext())
       			{
       				@SuppressWarnings("rawtypes")
   					Map.Entry mapEntry = (Map.Entry) iterator.next();
       				String user= (String) mapEntry.getKey(); 
       				double desiredPrice = (double) mapEntry.getValue();
       				
       				Double currPrice = product.currentprice;
       				if (currPrice <= desiredPrice)
       				{
       					//Logger.info(user + "'s desired price reached for :" + name);
       					userMap.remove(user);
       				}
       				//else
       					//Logger.info("User: " + user + ", waits for "+name+" for the price: " + price);
       			}
       			
       			
       			
       		}
       		else if (message instanceof Exception)
       		{
       			throw (Exception) message;
       		}
       		else if (message instanceof Integer)
       		{
       			state = (Integer) message;
       		}
       		else if (message.equals("get"))
       		{
       			getSender().tell(state, getSelf());
       		}
       		else
       		{
       			unhandled(message);
       		}
       	}
       }
       
       public void watchItem(final String name, final String link, final double price, final String user)
       {
           String supChar = "Node1";
           
           ActorRef supervisor= getOrCreateSupervisor(supChar);                            
           ActorRef worker= getOrCreateWorker(supChar, name, supervisor,HukkActor.class);
           worker.tell(new Hukk(name,link,price,user,worker.path().toString()), worker);
       }
       
       public void printItemsDetails(HashMap<String,String> items)
       {
       	int itemsCode = items.hashCode();
       	Logger.info("Items bucket id: " + itemsCode + " " + items.size());
       	
    
       		Iterator<Entry<String, String>> it = items.entrySet().iterator();
   	    	
   	    	while (it.hasNext()) 
   	    	{
   	    			
   	    	        Map.Entry<String,String> pairs = (Map.Entry<String,String>)it.next();
   	    	        String name = pairs.getKey();
   	    	        String link = pairs.getValue();
   	    	        System.out.println("uyyy : " + name + " " + link);
   	    		
   	    	}

       }
 */
}