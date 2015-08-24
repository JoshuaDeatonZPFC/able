var bleacon = require('node-bleacon');
var client = require("socket.io-client").connect("http://localhost:5005/");

bleacon.on('stateChange', function (state) {
    client.emit("console", {
        motor: process.env.NOBLE_HCI_DEVICE_ID,
        event_name: "State Change",
        event: state
    });
});

bleacon.startScanning();
bleacon.on('discover', function (peripheral) {
    if (peripheral.advertisement.localName === "ABLE") {
        client.emit("com", {
            motor: process.env.NOBLE_HCI_DEVICE_ID,
            uuid: peripheral.uuid,
            tx_power: peripheral.txPowerLevel,
            rssi: peripheral.rssi

        });
    }
});
