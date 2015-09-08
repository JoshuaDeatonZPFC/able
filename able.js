var lateration = require("lateration");
var Circle = lateration.Circle;
var Vector = lateration.Vector;
var laterate = lateration.laterate;
var exec = require('child_process').exec;
var sensor_1 = {
    exec: exec("sudo NOBLE_HCI_DEVICE_ID=0 nodejs scan.js"),
    default: "-67",
    current: "",
    rssi: []
};
var sensor_2 = {
    exec: exec("sudo NOBLE_HCI_DEVICE_ID=1 nodejs scan.js"),
    default: "-67",
    current: "",
    rssi: []
};
var sensor_3 = {
    exec: exec("sudo NOBLE_HCI_DEVICE_ID=2 nodejs scan.js"),
    default: "-67",
    current: "",
    rssi: []
};
var sensor_4 = = {
    exec: exec("sudo NOBLE_HCI_DEVICE_ID=3 nodejs scan.js"),
    default: "-67",
    current: "",
    rssi: []
};

var serial = require('serialport').SerialPort;
var serialport = new serial("/dev/ttyS2", {
    baudrate: 9600
});
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

function flight_correction(pos) {
    if (pos.x < 13 && pos.y < 13) {
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
    } else if (pos.x < 13 && pos.y < 13) {
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
    } else if (pos.x < 13 && pos.y < 13) {
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
    } else if (pos.x < 13 && pos.y < 13) {
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
    } else if (pos.x < 13 && pos.y < 13) {
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
    } else if (pos.x < 13 && pos.y < 13) {
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
    } else if (pos.x < 13 && pos.y < 13) {
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
    } else if (pos.x < 13 && pos.y < 13) {
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
sensor_4.exec.stdout.on('data', function (data) {
    if (sensor_4.rssi.length < 10) {
        sensor_4.rssi.push(Math.abs(data));
    } else {
        var minimum = Math.min.apply(Math, sensor_4.rssi);
        sensor_4.rssi.splice(sensor_4.rssi.indexOf(minimum), 1);
        var newLocation = Math.min.apply(Math, sensor_4.rssi);
        sensor_4.current = calcDistance(newLocation);
        console.log("Sensor 4 Location: " + sensor_4.current + " cm");
        sensor_4.rssi = [];
    }
});



setInterval(function () {
    var beacons = [
      new Circle(new Vector(sensor_1.vector_x, sensor_1.vector_y), sensor_1.current),
      new Circle(new Vector(sensor_2.vector_x, sensor_2.vector_y), sensor_2.current),
      new Circle(new Vector(sensor_3.vector_x, sensor_3.vector_y), sensor_3.current),
      new Circle(new Vector(sensor_4.vector_x, sensor_4.vector_y), sensor_4.current)
    ];

    // Laterating
    var position = laterate(beacons);
    flight_correction(position);
}, 5000);
