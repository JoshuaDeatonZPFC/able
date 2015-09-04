function calcDistance(rssi) {
    var focal_point, distance;
    if (rssi <= -70) {
        focal_point = -17;
    } else if (rssi <= -60) {
        focal_point = -16;
    } else if (rssi <= -50) {
        focal_point = -18;
    }
    distance = Math.pow(10, (focal_point - rssi) / (10 * 2));
    return parseInt(distance);
}

var exec = require('child_process').exec;
var sensor1 = exec("sudo NOBLE_HCI_DEVICE_ID=0 nodejs scan.js");
var sensor2 = exec("sudo NOBLE_HCI_DEVICE_ID=1 nodejs scan.js");
/*
var sensor3 = exec("sudo NOBLE_HCI_DEVICE_ID=2 nodejs scan.js");
var sensor4 = exec("sudo NOBLE_HCI_DEVICE_ID=3 nodejs scan.js");
*/
var AIL = "s0",
    ELE = "s1",
    THR = "s2",
    RUD = "s3",
    AUX = "s4";

console.log("App Start");

sensor1.stdout.on('data', function (data) {
    console.log("Sensor 1: " + data);
});
sensor2.stdout.on('data', function (data) {
    console.log("Sensor 2: " + data);
});
/*
sensor3.stdout.on('data',function(data){
    console.log("Sensor 3: "+data);
});
sensor4.stdout.on('data',function(data){
    console.log("Sensor 4: "+data);
});
*/
