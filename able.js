var noble = require('noble');
var serial = require('serialport').SerialPort;
//var serialport = new serial("/dev/ttyS2", {
//    baudrate: 9600
//});

console.log("App Start");

noble.on('stateChange', function (state) {
    console.log('on -> stateChange: ' + state);
});

console.log("Scan");
noble.startScanning();
noble.on('discover', function (peripheral) {
    if (peripheral.advertisement.localName === "BKON") {
        console.log('Device Found');
    }
});
