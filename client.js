const net = require("net");

// establishes a connection with the game server
const connect = function() {
  const conn = net.createConnection({
    host: '135.23.223.133',
    port: 50542
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");
   conn.on("connect",() =>{
     console.log("succesfully connected to game server");
   });
   conn.on("connect",() => {
    conn.write('Name: Ana');
  });


  conn.on('data',(data) => {
    console.log('server says:', data);
  });
  /*conn.on('connect', () => {
    conn.write('Hello from client!');
  });*/
  
  conn.on("connect",() => {
   
   
  });

  
  conn.on('end', () => (
    console.log("Sorry , you are disconnected from the server 😿")));
  return conn;
};



module.exports = connect;