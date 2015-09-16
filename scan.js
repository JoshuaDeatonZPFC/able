var exec = require('child_process').exec;
var scan = exec("sudo python scan.py");

scan.stdout.on('data', function (data) {
	console.log(data);
});
