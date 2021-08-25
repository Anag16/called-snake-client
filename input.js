let connection;
let commandInterval;

//let specialKeys =  ["P","O","I"]; //Keys for special messages. DO not use WASD.
//let specialMessages = ["I am hungry","I am a happy snake", "Hisssss"]; //For every special key, add one special message. We could also make an object...
//USING AN OBJECT FOR THIS EXAMPLE. DO NOT ADD KEYS AND VALUES FOR W,A,S,D because those are used to control movement.
let keyMessages = {
	"P": "I am hungry",
	"O": "I am a happy snake",
	"I": "I love being a Snake",
	"U": "I will win"
}

const setupInput = function (conn) {
	
  connection = conn; //Conn is received from play.js. Assign it to a global variable to make it available OUTSIDE the setupInput function.
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  
   process.stdin.on('data', (key) => {
	handleUserInput(key); //Passing key as a parameter.
});
  
  return stdin;
};

const handleUserInput = function (key) {
	key = key.toUpperCase(); //Make the input upperCase to simplify things.
	console.log(key);
  // your code here
  if (key === '\u0003') {
	console.log("Game over");
    process.exit();
	}
	else{
		let command = ""; //Initialize the command as an empty string to avoid sending an undefined variable.
		let is_command_a_message= false;
		if (key in keyMessages){
			//Using object:
			command = "Say: " + keyMessages[key];
			 is_command_a_message = true;
		} 
		//Using arrays:
		
		//if (specialKeys.indexOf(key)>-1){
			//command = "Say: " + specialMessages[specialKeys.indexOf(key)];  //Gets the index of the key pressed from the specialKeys array and looks for the message to send from the specialMessages array
		//}
		if (key === "W"){
			command =  'Move: up';
		}
		if (key === "A"){
			command =  'Move: left';
		}
		if (key === "S"){
			command =  'Move: down';
		}
		if (key === "D"){
			command =  'Move: right';
		}
		connection.write(command); //Write the command
		//Stop the interval if already active.
		if (!is_command_a_message){ //We will not do this if the new command is a message.
			clearInterval(commandInterval); //Everytime a command is sent, a new interval is created. We need to clear the previous interval before starting a new one. If not, all actions would repeat forever.
			commandInterval = setInterval(() => { 
			connection.write(command);
			}, 400);
		}
		else{
			connection.write(command); //If the command is a message, just display the message. No intervals here.
		}
		
	}
}


module.exports = {
  setupInput
};