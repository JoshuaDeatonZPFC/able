function triangle(a, b, c) {
    temp = (Math.acos((Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c))) * (180 / Math.PI);

    if (temp > 90) {
        return "left";
    } else if (temp <= 90 && temp >= 45) {
        return "middle";
    } else if (temp < 45) {
        return = "right";
    }
}

function triangulation(distance_from_beacon_to_a, distance_from_beacon_to_b, distance_from_beacon_to_c, distance_between) {
    function triangle(a, b, c) {
        temp = (Math.acos((Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c))) * (180 / Math.PI);

        if (temp > 90) {
            return "left";
        } else if (temp <= 90 && temp >= 45) {
            return "middle";
        } else if (temp < 45) {
            return = "right";
        }
    }

    var front = triangle(distance_from_beacon_to_a, distance_from_beacon_to_b, distance_between);
    var left = triangle(distance_from_beacon_to_a, distance_from_beacon_to_c, distance_between);

    if (front === "left" && left === "right") {
        return "Quadrant 1";
    } else if (front === "left" && left === "middle") {
        return "Quadrant 4";
    } else if (front === "left" && left === "left") {
        return "Quadrant 7";
    } else if (front === "middle" && left === "right") {
        return "Quadrant 2";
    } else if (front === "middle" && left === "middle") {
        return "Quadrant 5";
    } else if (front === "middle" && left === "left") {
        return "Quadrant 8";
    } else if (front === "right" && left === "right") {
        return "Quadrant 3";
    } else if (front === "right" && left === "middle") {
        return "Quadrant 6";
    } else if (front === "right" && left === "left") {
        return "Quadrant 9";
    }
}
