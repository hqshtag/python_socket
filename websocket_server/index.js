import WebSocket from "ws";
import { Socket } from "net";
import prompt from "prompt";

//reg exs to validate IP or Hostname
const ValidIpAddressRegex = new RegExp(
  "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$"
);
const ValidHostnameRegex = new RegExp(
  "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$"
);
const ValidPortNumber = new RegExp(
  "^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$"
);

const properties = [
  {
    name: "hostname",
    validator: ValidIpAddressRegex || ValidHostnameRegex || /^localhost/,
    warning: "Please enter a valid Host name",
  },
  {
    name: "port",
    validator: ValidPortNumber,
    warning: "Please enter a valid Port [0 .. 65535]",
  },
];

console.log("Enter Socket Server IP:PORT")
prompt.get(properties, function (err, result) {
  if (err) {
    return onErr(err);
  }
  const { hostname, port } = result;
  //Creating websocket server at localhost:8080
  const wss = new WebSocket.Server({ port: 8080 });

  const client = new Socket();
  //connecting to the socket server
  client.connect(port, hostname, function () {
    console.log("Connected to Socket Server");
  });

  //on connection to websocket we start listing
  //to socket messages and sending them in ws
  wss.on("connection", function connection(ws) {
      console.log("Connection Established from socket => websocket")
      client.on("data", function (data) {
      console.log("Received: " + data);
      //client.destroy(); // kill client after server's response
      ws.send(data);
    });
  });
});

/* 
//SOCKET HOST AND PORT
const HOST = "localhost";
const PORT = 1337;


//Creating websocket server at localhost:8080
const wss = new WebSocket.Server({ port: 8080 });


const client = new Socket();
//connecting to the socket server
client.connect(PORT, HOST, function() {
	console.log('Connected');
});


//on connection to websocket we start listing
//to socket messages and sending them in ws
wss.on('connection', function connection(ws) {
    ws.send('Websocket [OPEN]');
    client.on('data', function(data) {
        console.log('Received: ' + data);
        //client.destroy(); // kill client after server's response
        ws.send(data);
    
    });
});
 */
