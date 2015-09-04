var bleacon = require('bleacon');

bleacon.on('stateChange', function (state) {
    console.log(state);
});

bleacon.startScanning();
bleacon.on('discover', function (peripheral) {
    if (peripheral.uuid === "7ae665810af04d0ab947b85635f21d91") {
        console.log(peripheral.rssi);
    }
});
