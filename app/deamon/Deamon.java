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
import java.util.Map;
import java.util.Map.Entry;

import parsers.PrGittiGidiyor;
import parsers.PrHepsiBurada;
import parsers.PrMorhipo;
import play.Logger;

import models.Product;
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
    public final String ALPHABET_A_M = "ABCDEFJHIJKLM";
    public final String ALPHABET_N_Z = "NOPQRSTUVWXYZ";
   
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
    
    @SuppressWarnings("serial")
	public static class HukkExtended implements Serializable
    {
    	public final String itemsCode;
    	public final HashMap<String,String> items;
    	public final String workerPath;

    	
    	public HukkExtended(String itemsCode, HashMap<String,String> items, String workerPath)
    	{
    		this.itemsCode=itemsCode; this.items=items; this.workerPath=workerPath;
    	}            
    }
    
    private static Product parseURL(String receivedURL){
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
    		getContext().system().scheduler().schedule(Duration.create(1, "second"), Duration.create(120, "second"),getSelf(), TICK, getContext().dispatcher());
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
    				
    				Double currPrice = Double.parseDouble(product.attr2value);
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
    
    public static class HukkActorExtended extends UntypedActor
    {
    	int state = 0;
    	LoggingAdapter log = Logging.getLogger(getContext().system(), this);

    	String itemsCode;
    	HashMap<String,String> items;
    	String workerPath;          
    	DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
 
    	@Override
    	public void onReceive(Object message) throws Exception
    	{

    		if (message instanceof HukkExtended)
    		{

    			itemsCode = ((HukkExtended) message).itemsCode;
    			items = ((HukkExtended) message).items;
    			workerPath = ((HukkExtended) message).workerPath;
                                    
    			Date date = new Date();
    		    Logger.info("Parsing started for " + workerPath + "at: " + dateFormat.format(date));
    		    
    		    
    			//log.info("Worker log for " + itemsCode);
    			
    			Iterator<Entry<String, String>> it = items.entrySet().iterator();
    	    	while (it.hasNext()) 
    	    	{
    	    			
    	    	        Map.Entry<String,String> pairs = (Map.Entry<String,String>)it.next();
    	    	        String name = pairs.getKey();
    	    	        String link = pairs.getValue();
    	    			Product product = parseURL(link);
    	    			//Logger.info("Parsing " + name);
    	    			if (product!=null)
    	    			{
    	    				Double currPrice = Double.parseDouble(product.attr2value);
	        				if (currPrice <= 50)
	        				{
	        					Logger.info("Desired price reached for :" + name);
	        				}
    	    			}
    	    			else
    	    			{
    	    				Logger.info("product null for: " + link);
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
    		Logger.info(workerPath + " is stopped");
    		Date date2 = new Date();
  			Logger.info("Parsing ended for " + workerPath + " at: " + dateFormat.format(date2));
    	}
    }
   
    public ActorRef getOrCreateSupervisor(String name)
    {
    	Duration timeout = Duration.create("5 seconds");
    	ActorRef actor_candidate = system.actorFor("/user/root/"+name);
    	ActorRef actor = null;
    	ArrayList<Object> actorProp = new ArrayList<Object>();
                              
    	actorProp.add(new Props(Supervisor.class));
    	actorProp.add(name);
                              
    	if (actor_candidate.isTerminated())
    	{
    		try {
                                              
    			actor = (ActorRef) Await.result(ask(root, actorProp, 5000), timeout);                                      
    			//Logger.info(actor.toString() + " created.");
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
    	Duration timeout = Duration.create("5 seconds");
    	ActorRef actor_candidate = system.actorFor("/user/root/"+node+"/"+name);
    	ActorRef actor = null;
    	ArrayList<Object> actorProp = new ArrayList<Object>();
    	actorProp.add(new Props(ActorClass));
    	actorProp.add(name);
    	
    	if (actor_candidate.isTerminated())
    	{
    		try {
    			actor = (ActorRef) Await.result(ask(parent, actorProp, 5000), timeout);                                                
    			//System.out.println(actor.toString() + " created.");
    			return actor;
    		} catch (Exception e) {
    			Logger.info(name);
    			e.printStackTrace();
    		}
    	}
    	else
    	{
    		//System.out.println(name + " already exists.");                                  
    	}
    	return actor_candidate;
    }

    public void watchItem(final String name, final String link, final double price, final String user)
    {
        String supChar = "Node1";
        if(ALPHABET_N_Z.contains(name.substring(0, 1)))
    	   supChar = "Node2";
 
        ActorRef supervisor= getOrCreateSupervisor(supChar);                            
        ActorRef worker= getOrCreateWorker(supChar, name, supervisor,HukkActor.class);
        worker.tell(new Hukk(name,link,price,user,worker.path().toString()), worker);
    }
    
    public void watchItems(final HashMap<String,String> items)
    {
    	
    	int itemsCode = items.hashCode();
    	//Logger.info("Items bucket id: " + itemsCode);

    	String itemsCodeStr=Integer.toString(itemsCode);
    	String supChar = "Node1";
    	 
    	ActorRef supervisor= getOrCreateSupervisor(supChar);                            
    	ActorRef worker= getOrCreateWorker(supChar, itemsCodeStr, supervisor,HukkActorExtended.class);
    	worker.tell(new HukkExtended(itemsCodeStr, items, worker.path().toString()), worker);
    	worker.tell(akka.actor.PoisonPill.getInstance(), worker);
       
    }

 
}