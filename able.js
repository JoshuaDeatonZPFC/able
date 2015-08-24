var exec = require('child_process').exec;
var io = require('socket.io')();
var serial = require('serialport').SerialPort;
var serialport = new serial("/dev/ttyS2", {
    baudrate: 9600
});

var AIL = "s0",
    ELE = "s1",
    THR = "s2",
    RUD = "s3",
    AUX = "s4",
    tracking = [{
        motor: "0",
        beacon: [{
            uuid: "",
            default_rssi: "",
            avg_rssi: "",
            new_rssi: "",
            tx_power: ""
        }, {
            uuid: "",
            default_rssi: "",
            avg_rssi: "",
            new_rssi: "",
            tx_power: ""
        }]
    }, {
        motor: "1",
        beacon: [{
            uuid: "",
            default_rssi: "",
            avg_rssi: "",
            new_rssi: "",
            tx_power: ""
        }, {
            uuid: "",
            default_rssi: "",
            avg_rssi: "",
            new_rssi: "",
            tx_power: ""
        }]
    }, {
        motor: "2",
        beacon: [{
            uuid: "",
            default_rssi: "",
            avg_rssi: "",
            new_rssi: "",
            tx_power: ""
        }, {
            uuid: "",
            default_rssi: "",
            avg_rssi: "",
            new_rssi: "",
            tx_power: ""
        }]
    }, {
        motor: "3",
        beacon: [{
            uuid: "",
            default_rssi: "",
            avg_rssi: "",
            new_rssi: "",
            tx_power: ""
        }, {
            uuid: "",
            default_rssi: "",
            avg_rssi: "",
            new_rssi: "",
            tx_power: ""
        }]
    }];

console.log("App Start");
for (i = 0; i < tracking.length; i++) {
    exec("sudo NOBLE_HCI_DEVICE_ID=" + i + " nodejs scan.js", function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}
io.on('connection', function (socket) {
    socket.on("com", function (data) {
        for (var i = 0; i < tracking.length; i++) {
            if (tracking[i].motor === data.motor) {
                for (var l = 0; l < tracking[i].beacon.length; i++) {
                    if (tracking[i].beacon[l].uuid === data.uuid) {
                        if (!tracking[i].beacon[l].tx_power) {
                            tracking[i].beacon[l].tx_power = data.tx_power;
                        }
                        if (!tracking[i].beacon[l].avg_rssi) {
                            tracking[i].beacon[l].avg_rssi = data.rssi;
                        } else {
                            var temp = tracking[i].beacon[l].avg_rssi + data.rssi;
                            tracking[i].beacon[l].new_rssi = data.rssi;
                            tracking[i].beacon[l].avg_rssi = temp / 2;
                        }
                    }
                }
            }
        }
        if (tracking[0].beacon[0].avg_rssi < tracking[0].beacon[0].default_rssi - 20) {
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
    });
}).listen(5005);
