

import deamon.DeamonController;
import play.*;

public class Global extends GlobalSettings 
{

  @Override
  public void onStart(Application app) 
  {
    Logger.info("Application has started");
    
    //DeamonController dc = new DeamonController();
  }  
  
  @Override
  public void onStop(Application app) 
  {
	  Logger.info("Application shutdown...");
  }  
  
  
  
    
}
