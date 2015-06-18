/*
Written by Craig Pickard for PulsePod designs, June 2015

This script allows the user to control a syringe pump
from the web browser, by communicating via serial with an
arduino.

*/

console.log("starting server");

//declare global variables
var latestData = 0; //initialise the latestData variable that will be used to send values from the serial port to the server

//include the servi library for serving files on the server
var servi = require("servi");

//create a servi instance
var app = new servi(true); 
app.port(8080); //portnumber to run server on

//configure server's behaviour
app.serveFiles("/public"); //serve static HTML from public folder
app.route('/',showHome); //route to load the home page
app.route('/data', sendData); //route requests for /data to sendData()
app.start();

//include the library
var serialport = require("serialport");

//create an instance
var SerialPort = serialport.SerialPort;

//get the port name from the commandline
portName = process.argv[2];

//open the port
var myPort = new SerialPort(portName, {
	baudRate: 9600,
	//look for a return and newline at the end of each data packet:
	parser: serialport.parsers.readline("\r\n")
});

//declare event handler callback functions
myPort.on('open', showPortOpen);
myPort.on('data', saveLatestData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

//callback functions for 
function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
}
 
function saveLatestData(data) {
  // console.log(data);
   latestData = data; //copies incoming serial string to the lastData variable
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}

//display the homepage
function showHome(request){
  request.serveFile('index.html');
}

//the sendData() function is called by the /data route
function sendData(request) {
  // print out the fact that a client HTTP request came in to the server:
  console.log("Got a client request, sending them the data.");
  // respond to the client request with the latest serial string:
  request.respond(latestData);
}


/*
//uncomment this codeblock to print a list of serial
//ports to the console.

serialport.list(function(err,ports){
	ports.forEach(function(port){
		console.log(port.comName);
	});
});

*/

