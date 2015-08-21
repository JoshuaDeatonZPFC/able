var noble = require('noble');
var serial = require('serialport').SerialPort;
var serialport = new serial("/dev/ttyS2", {
    baudrate: 9600
});

var AIL = "s0",
    ELE = "s1",
    THR = "s2",
    RUD = "s3",
    AUX = "s4";

console.log("App Start");

noble.on('stateChange', function (state) {
    console.log('on -> stateChange: ' + state);
});

console.log("Scan");
noble.startScanning();
noble.on('discover', function (peripheral) {
    if (peripheral.advertisement.localName === "ABLE") {

        serialport.write(AIL + " 1000", function (err, results) {
            if (err) {
                console.log(err);
            } else if (results) {
                console.log(results);
            }
        });
        serialport.write(ELE + " 1000", function (err, results) {
            if (err) {
                console.log(err);
            } else if (results) {
                console.log(results);
            }
        });
        serialport.write(THR + " 1000", function (err, results) {
            if (err) {
                console.log(err);
            } else if (results) {
                console.log(results);
            }
        });
        serialport.write(RUD + " 1000", function (err, results) {
            if (err) {
                console.log(err);
            } else if (results) {
                console.log(results);
            }
        });
        serialport.write(AUX + " 1000", function (err, results) {
            if (err) {
                console.log(err);
            } else if (results) {
                console.log(results);
            }
        });
    }
});

// Keep RSSI between -60 and -80
