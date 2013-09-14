package deamon;
 
import akka.actor.ActorRef;
import akka.actor.ActorSystem;
import akka.actor.OneForOneStrategy;
import akka.actor.SupervisorStrategy;
import akka.actor.UntypedActor;
import akka.actor.Props;
import akka.actor.UntypedActorFactory;
import akka.event.Logging;
import akka.event.LoggingAdapter;
import akka.japi.Function;
import akka.japi.Option;
import scala.concurrent.Await;
import scala.concurrent.duration.Duration;
import akka.serialization.SerializationExtension;
import akka.serialization.Serialization;
import java.io.Serializable;
import java.lang.management.ManagementFactory;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import static akka.pattern.Patterns.ask;
import java.util.concurrent.TimeUnit;
import akka.actor.ActorRef;
import akka.actor.ActorSystem;
import akka.actor.SupervisorStrategy;
import static akka.actor.SupervisorStrategy.resume;
import static akka.actor.SupervisorStrategy.restart;
import static akka.actor.SupervisorStrategy.stop;
import static akka.actor.SupervisorStrategy.escalate;
import akka.actor.SupervisorStrategy.Directive;
import akka.actor.OneForOneStrategy;
import akka.actor.Props;
import akka.actor.Terminated;
import akka.actor.UntypedActor;
import scala.concurrent.Await;
import static akka.pattern.Patterns.ask;
import scala.concurrent.duration.Duration;
 
 
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
 
import deamon.Deamon.Supervisor;
 
 
public class Deamon {
 
 
    public static final Object TICK = "TICK";
    public final ActorSystem system;
    public final ActorRef root;
    public final String ALPHABET_A_M = "ABCDEFJHIJKLM";
    public final String ALPHABET_N_Z = "NOPQRSTUVWXYZ";
   
    public Deamon()
    {
               
                Config config = ConfigFactory.parseString("akka.loglevel = DEBUG \n" + "akka.actor.debug.lifecycle = on");
                system = ActorSystem.create("HukkSystem", config);
               
                root = system.actorOf(new Props(Root.class), "root");
               
  
    }
   
    public static class Root extends UntypedActor
    {
                  private SupervisorStrategy strategy = new OneForOneStrategy(10, Duration.create("1 minute"),
                    new Function<Throwable, Directive>()
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
                  private SupervisorStrategy strategy = new OneForOneStrategy(10, Duration.create("1 minute"),
                    new Function<Throwable, Directive>()
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
   
    
    public static class Hukk implements Serializable
    {
                   
                    public final String name;
                    public final String link;
                    public final long price;
                    public final String user;
                      
                    public Hukk(String name, String link, long price, String user)
                    {
                                this.name=name; this.link=link; this.price=price; this.user=user;
                    }
                  
    }
 
 
    public static class HukkActor extends UntypedActor
    {
                int state = 0;
                LoggingAdapter log = Logging.getLogger(getContext().system(), this);
 
                String name;
                String link;
                   long price;
                   String user;
                   Map<Long,HashSet<String>> priceMap = new HashMap<Long, HashSet<String>>();
                   Map<String,Long> userMap = new HashMap<String,Long>();
                   Long oldPrice;
               
                @Override
        public void preStart() {
                                getContext().system().scheduler()
                        .schedule(Duration.create(1, "second"), Duration.create(10, "second"),
                          getSelf(), TICK, getContext().dispatcher());
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
                                                               }
                                                               else
                                                               {
                                                                                log.info("Unexpected error - priceMap doesn't have old price!");
                                                                                new NullPointerException(); //TODO: self restart
                                                               }
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
                                              
                                               userMap.put(user,price);
                                }
                               
                                else if (message.equals(TICK))
                                {
                                               log.info("TICK kicked for " + name);
                                               Iterator iterator = userMap.entrySet().iterator();
                                               while (iterator.hasNext())
                                               {
                                                               Map.Entry mapEntry = (Map.Entry) iterator.next();
                                                               log.info("User: " + mapEntry.getKey()
                                                                               + ", waits for the price: " + mapEntry.getValue());
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
                                               System.out.println(actor.toString() + " created.");
                                               return actor;
                                              
                               } catch (Exception e) {
                                                               // TODO Auto-generated catch block
                                                               e.printStackTrace();
                                               }
                }
                else
                {
                                System.out.println(name + " already exists.");               
                                
                }
 
                return actor_candidate;
    }
   
    public ActorRef getOrCreateWorker(String node, String name, ActorRef parent)
    {
                Duration timeout = Duration.create("5 seconds");
               
                ActorRef actor_candidate = system.actorFor("/user/root/"+node+"/"+name);
                               ActorRef actor = null;
                              
                               ArrayList<Object> actorProp = new ArrayList<Object>();
                              
                               actorProp.add(new Props(HukkActor.class));
                               actorProp.add(name);
                              
                if (actor_candidate.isTerminated())
                {
                               try {
                                              
                                               actor = (ActorRef) Await.result(ask(parent, actorProp, 5000), timeout);                                                
                                               System.out.println(actor.toString() + " created.");
                                               return actor;
                                              
                               } catch (Exception e) {
                                                               // TODO Auto-generated catch block
                                                               e.printStackTrace();
                                               }
                }
                else
                {
                                System.out.println(name + " already exists.");               
                                
                }
 
                return actor_candidate;
    }
   
    
 
    public void greet(final String name, final String link, final long price, final String user)
    {
               
 
                               String supChar = "Node1";
                               if(ALPHABET_N_Z.contains(name.substring(0, 1)))
                                               supChar = "Node2";
 
                               ActorRef supervisor= getOrCreateSupervisor(supChar);                            
                               ActorRef worker= getOrCreateWorker(supChar, name, supervisor);
 
                               worker.tell(new Hukk(name,link,price,user), worker);
 
                               
 
    }
   
   
 
    public static void main(String [] args)
    {
              
                 Deamon deamon = new Deamon();
 
                 deamon.greet("CharlieParkerEbook","link1",50,"Hakan");
                 deamon.greet("CharlieParkerEbook","link1",40,"Hakan");
                 deamon.greet("CharlieParkerEbook","link1",40,"Ural");
                 deamon.greet("SlipknotCD","link2",30,"Ural");
                 deamon.greet("ScalaEbook","link3",50,"Sabri");
 
                 
 
    }
 
}