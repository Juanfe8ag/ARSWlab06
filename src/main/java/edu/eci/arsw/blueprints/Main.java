package edu.eci.arsw.blueprints;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
    public static void main(String[] args) throws Exception {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        BlueprintsServices services = context.getBean(BlueprintsServices.class);

        Point[] pts = new Point[]{new Point(0,0), new Point(0,0), new Point(10,10), new Point(20,20)};
        Blueprint bp = new Blueprint("juan", "test", pts);
        services.addNewBlueprint(bp);

        System.out.println("Plano filtrado: " + services.getBlueprint("juan", "test").getPoints());
    }
}
