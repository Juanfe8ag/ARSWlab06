package edu.eci.arsw.blueprints.filters;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

//@Service("subsamplingFilter")
public class SubsamplingFilter implements BlueprintFilter {

    @Override
    public Blueprint applyFilter(Blueprint bp) {
        List<Point> originalPoints = bp.getPoints();
        List<Point> filtered = new ArrayList<>();

        for (int i = 0; i < originalPoints.size(); i++) {
            if (i % 2 == 0) { // conserva solo puntos en posiciones pares
                filtered.add(originalPoints.get(i));
            }
        }

        Blueprint newBp = new Blueprint(bp.getAuthor(), bp.getName(), filtered.toArray(new Point[0]));
        return newBp;
    }
}
