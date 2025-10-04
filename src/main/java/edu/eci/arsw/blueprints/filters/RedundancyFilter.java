package edu.eci.arsw.blueprints.filters;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("redundancyFilter")
public class RedundancyFilter implements BlueprintFilter {

    @Override
    public Blueprint applyFilter(Blueprint bp) {
        List<Point> originalPoints = bp.getPoints();
        List<Point> filtered = new ArrayList<>();

        if (!originalPoints.isEmpty()) {
            filtered.add(originalPoints.get(0));
            for (int i = 1; i < originalPoints.size(); i++) {
                Point prev = originalPoints.get(i - 1);
                Point current = originalPoints.get(i);
                if (!(prev.getX() == current.getX() && prev.getY() == current.getY())) {
                    filtered.add(current);
                }
            }
        }

        Blueprint newBp = new Blueprint(bp.getAuthor(), bp.getName(), filtered.toArray(new Point[0]));
        return newBp;
    }
}
