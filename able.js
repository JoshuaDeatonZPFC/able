var exec = require('child_process').exec;
var serial = require('serialport').SerialPort;
var serialport = new serial("/dev/ttyS2", {
    baudrate: 9600
});

var sensor_1 = {
        exec: exec("sudo NOBLE_HCI_DEVICE_ID=0 nodejs scan.js"),
        current: "",
        rssi: []
    },
    sensor_2 = {
        exec: exec("sudo NOBLE_HCI_DEVICE_ID=1 nodejs scan.js"),
        current: "",
        rssi: []
    },
    sensor_3 = {
        exec: exec("sudo NOBLE_HCI_DEVICE_ID=2 nodejs scan.js"),
        current: "",
        rssi: []
    };
var default_position = {
    x: 15,
    y: 1500,
    z: 2500
};
var AIL = "s0",
    ELE = "s1",
    THR = "s2",
    RUD = "s3";

function calcDistance(rssi) {
    var focal_point = -16,
        distance;
    distance = Math.pow(10, (focal_point + rssi) / (10 * 2));
    return parseInt(distance);
}

function triangulation(distance_from_beacon_to_a, distance_from_beacon_to_b, distance_from_beacon_to_c, distance_between) {
    function triangle(a, b, c) {
        temp = Math.round((Math.acos((Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c))) * (180 / Math.PI));

        if (temp > 90) {
            return {
                direction: "left",
                xy: Math.round((Math.cos(180 - temp) * a) + 15),
                z: Math.round(Math.tan(180 - temp) * a)
            };
        } else if (temp <= 90 && temp >= 45) {
            return {
                direction: "middle",
                xy: Math.round(Math.cos(temp) * a),
                z: Math.round(Math.tan(temp) * a)
            };
        } else if (temp < 45) {
            return {
                direction: "right",
                xy: Math.round(Math.cos(temp) * a),
                z: Math.round(Math.tan(temp) * a)
            };
        }
    }

    var front = triangle(distance_from_beacon_to_a, distance_from_beacon_to_b, distance_between);
    var left = triangle(distance_from_beacon_to_a, distance_from_beacon_to_c, distance_between);

    var avg_z = Math.round((front.z * left.z) / 2);

    if (avg_z < default_position.z) {
        serialport.open(function (error) {
            if (error) {
                console.log('failed to open: ' + error);
            } else {
                serialport.write(ELE + " 1000", function (err, results) {
                    if (err) {
                        console.log(err);
                    } else if (results) {
                        console.log(results);
                    }
                });
                setTimeout(function () {
                    serialport.write(ELE + " 0", function (err, results) {
                        if (err) {
                            console.log(err);
                        } else if (results) {
                            console.log(results);
                        }
                    });
                }, 5000);
            }
        });
    } else if (avg_z > default_position.z) {
        serialport.open(function (error) {
            if (error) {
                console.log('failed to open: ' + error);
            } else {
                serialport.write(ELE + " 1000", function (err, results) {
                    if (err) {
                        console.log(err);
                    } else if (results) {
                        console.log(results);
                    }
                });
                setTimeout(function () {
                    serialport.write(ELE + " 0", function (err, results) {
                        if (err) {
                            console.log(err);
                        } else if (results) {
                            console.log(results);
                        }
                    });
                }, 5000);
            }
        });
    }

    if (front.xy < default_position.x) {
        serialport.open(function (error) {
            if (error) {
                console.log('failed to open: ' + error);
            } else {
                serialport.write(RUD + " 1000", function (err, results) {
                    if (err) {
                        console.log(err);
                    } else if (results) {
                        console.log(results);
                    }
                });
                setTimeout(function () {
                    serialport.write(RUD + " 0", function (err, results) {
                        if (err) {
                            console.log(err);
                        } else if (results) {
                            console.log(results);
                        }
                    });
                }, 5000);
            }
        });
    } else if (front.xy > default_position.x) {
        serialport.open(function (error) {
            if (error) {
                console.log('failed to open: ' + error);
            } else {
                serialport.write(RUD + " 1000", function (err, results) {
                    if (err) {
                        console.log(err);
                    } else if (results) {
                        console.log(results);
                    }
                });
                setTimeout(function () {
                    serialport.write(RUD + " 0", function (err, results) {
                        if (err) {
                            console.log(err);
                        } else if (results) {
                            console.log(results);
                        }
                    });
                }, 5000);
            }
        });
    }

    if (left.xy < default_position.y) {
        serialport.open(function (error) {
            if (error) {
                console.log('failed to open: ' + error);
            } else {
                serialport.write(THR + " 1000", function (err, results) {
                    if (err) {
                        console.log(err);
                    } else if (results) {
                        console.log(results);
                    }
                });
                setTimeout(function () {
                    serialport.write(THR + " 0", function (err, results) {
                        if (err) {
                            console.log(err);
                        } else if (results) {
                            console.log(results);
                        }
                    });
                }, 5000);
            }
        });
    } else if (left.xy > default_position.y) {
        serialport.open(function (error) {
            if (error) {
                console.log('failed to open: ' + error);
            } else {
                serialport.write(THR + " 1000", function (err, results) {
                    if (err) {
                        console.log(err);
                    } else if (results) {
                        console.log(results);
                    }
                });
                setTimeout(function () {
                    serialport.write(THR + " 0", function (err, results) {
                        if (err) {
                            console.log(err);
                        } else if (results) {
                            console.log(results);
                        }
                    });
                }, 5000);
            }
        });
    }
}

console.log("App Start");

sensor_1.exec.stdout.on('data', function (data) {
    if (sensor_1.rssi.length < 10) {
        sensor_1.rssi.push(Math.abs(data));
    } else {
        var minimum = Math.min.apply(Math, sensor_1.rssi);
        sensor_1.rssi.splice(sensor_1.rssi.indexOf(minimum), 1);
        var newLocation = Math.min.apply(Math, sensor_1.rssi);
        sensor_1.current = calcDistance(newLocation);
        console.log("Sensor 1 Location: " + sensor_1.current + " cm");
        sensor_1.rssi = [];
    }
});
sensor_2.exec.stdout.on('data', function (data) {
    if (sensor_2.rssi.length < 10) {
        sensor_2.rssi.push(Math.abs(data));
    } else {
        var minimum = Math.min.apply(Math, sensor_2.rssi);
        sensor_2.rssi.splice(sensor_2.rssi.indexOf(minimum), 1);
        var newLocation = Math.min.apply(Math, sensor_2.rssi);
        sensor_2.current = calcDistance(newLocation);
        console.log("Sensor 2 Location: " + sensor_2.current + " cm");
        sensor_2.rssi = [];
    }
});
sensor_3.exec.stdout.on('data', function (data) {
    if (sensor_3.rssi.length < 10) {
        sensor_3.rssi.push(Math.abs(data));
    } else {
        var minimum = Math.min.apply(Math, sensor_3.rssi);
        sensor_3.rssi.splice(sensor_3.rssi.indexOf(minimum), 1);
        var newLocation = Math.min.apply(Math, sensor_3.rssi);
        sensor_3.current = calcDistance(newLocation);
        console.log("Sensor 3 Location: " + sensor_3.current + " cm");
        sensor_3.rssi = [];
    }
});

setInterval(function () {
    if (sensor_1.current && sensor_2.current && sensor_3.current) {
        triangulation(sensor_1.current, sensor_2.current, sensor_3.current, 30);
        sensor_1.current = "";
        sensor_2.current = "";
        sensor_3.current = "";
    }
}, 1000);
