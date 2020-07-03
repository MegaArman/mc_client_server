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
}


serverSystem.commandCallback = function (commandResultData) {
	let eventData = this.createEventData("minecraft:display_chat_event");
	if (eventData) {
		eventData.data.message = "Callback called! Command: " + commandResultData.command + " Data: " + JSON.stringify(commandResultData.data, null, "    ");
		this.broadcastEvent("minecraft:display_chat_event", eventData);
	}
};

let tickCount = 0;
// per-tick updates
serverSystem.update = function() {
	tickCount++;

	if (tickCount % 100 === 0)
	{
		let chatEventData = serverSystem.createEventData("minecraft:display_chat_event");
		chatEventData.data.message = "10 seconds have passed";

		serverSystem.broadcastEvent("minecraft:display_chat_event", chatEventData);

		// serverSystem.executeCommand("/time set day", () => {});
		serverSystem.executeCommand("/time query daytime", (commandResultData) => this.commandCallback(commandResultData));

		 	// this.commandCallback(commandResultData));
	}
	// Any logic that needs to happen every tick on the server.
}

function receivePinkyMessage(parameters) {
	if (parameters.data.narf) {
		//set up chat event data object
		let chatEventData = serverSystem.createEventData("minecraft:display_chat_event");
		chatEventData.data.message = "The same thing we do every night Client. TRY TO TAKE OVER THE WORLD.";
		serverSystem.broadcastEvent("minecraft:display_chat_event", chatEventData);
	}
}
