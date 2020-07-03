const ticksPerSecond = 20;

var serverSystem = server.registerSystem(0, 0);

// Setup which events to listen for
serverSystem.initialize = function () {
	// Register any events you will send to the client
	// system.registerEventData(...)

	// Register any components you will attach to game objects
	// system.registerComponent(...)

	// Set up any events you wish to listen to
	serverSystem.listenForEvent("gettingstarted:pinky", eventData => receivePinkyMessage(eventData));



	// Enable full logging, useful for seeing errors, you will probably want to disable this for
	// release versions of your scripts.
	// Generally speaking it's not recommended to use broadcastEvent in initialize, but for configuring logging it's fine.
	const scriptLoggerConfig = serverSystem.createEventData("minecraft:script_logger_config");
	scriptLoggerConfig.data.log_errors = true;
	scriptLoggerConfig.data.log_information = true;
	scriptLoggerConfig.data.log_warnings = true;
	serverSystem.broadcastEvent("minecraft:script_logger_config", scriptLoggerConfig);

	//OTHER
	// let chatEventData = serverSystem.createEventData("minecraft:display_chat_event");
	// chatEventData.data.message = "called.";
	// serverSystem.broadcastEvent("minecraft:display_chat_event", chatEventData);
	// DaylightCycleManager();
}


serverSystem.commandCallback = function (commandResultData) {
	let eventData = this.createEventData("minecraft:display_chat_event");
	if (eventData) {
		eventData.data.message = JSON.stringify(commandResultData.data, null, "    ");
		// eventData.data.message = commandResultData.data.body.split(" ")[2];
		this.broadcastEvent("minecraft:display_chat_event", eventData);
	}
};

//TIME BASED FUNCTIONS

//set to daytime : /gamerule doDaylightCycle false
//stop game from computing time: /ga
//look at game day time and if approaching night set to day
//set how long a certain time of day based on a range ex: timeset 13000 24000 10min sets night time to be 10 min long
//(this will last even as api def changes for noon, midnight etc)
//^^^ no. scale with normal time. if you want a 1min day and 1 min night, set each min lol.
//option to scale whole game day cycle
//use executeCommand
//what about when user logs out
//make a singleton

const DaylightCycleManager = () =>
{
	serverSystem.executeCommand("/gamerule doDaylightCycle false", () => {});
	let numCycles = 0;
	const dayLightCycleManager = {};
	dayLightCycleManager.update = (tickCount) =>
	{
		if (tickCount % 100 === 0)
		{
			numCycles++;
			(numCycles % 2 === 0) ?
				serverSystem.executeCommand("/time set day", () => {}) :
				serverSystem.executeCommand("/time set night", () => {});
		}
	}

	return Object.freeze(dayLightCycleManager);
};

let dcm = DaylightCycleManager();
let tickCount = 0;
// per-tick updates
serverSystem.update = function()
{
	tickCount++;
	if (tickCount === 100)
	{
		let chatEventData = serverSystem.createEventData("minecraft:display_chat_event");
		chatEventData.data.message = "five sec mark";
		serverSystem.broadcastEvent("minecraft:display_chat_event", chatEventData);
	}
	dcm.update(tickCount);
}

function receivePinkyMessage(parameters) {
	if (parameters.data.narf) {
		//set up chat event data object
		let chatEventData = serverSystem.createEventData("minecraft:display_chat_event");
		chatEventData.data.message = "The same thing we do every night Client. TRY TO TAKE OVER THE WORLD.";
		serverSystem.broadcastEvent("minecraft:display_chat_event", chatEventData);
	}
}
