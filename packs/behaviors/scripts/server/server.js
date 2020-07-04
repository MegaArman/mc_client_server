
const serverSystem = server.registerSystem(0, 0);
const dcm = require("./DaylightCycleManager")(serverSystem);

// Setup which events to listen for
serverSystem.initialize = () =>
{
	// Enable full logging, useful for seeing errors
	// const scriptLoggerConfig = serverSystem
	// 	.createEventData("minecraft:script_logger_config");
	// scriptLoggerConfig.data.log_errors = true;
	// scriptLoggerConfig.data.log_information = true;
	// scriptLoggerConfig.data.log_warnings = true;
	// serverSystem
	// 	.broadcastEvent("minecraft:script_logger_config", scriptLoggerConfig);
};

serverSystem.commandCallback =  (commandResultData) =>
{
	const eventData = this.createEventData("minecraft:display_chat_event");
	if (eventData)
	{
		eventData.data.message =
			JSON.stringify(commandResultData.data, null, "    ");
		this.broadcastEvent("minecraft:display_chat_event", eventData);
	}
};

let tickCount = 0;
dcm.setDayLength(200);
dcm.setNightLength(40);
serverSystem.update = function()
{
	tickCount++;
	// if (tickCount === 100)
	// {
	// 	const chatEventData = serverSystem
	// 		.createEventData("minecraft:display_chat_event");
	// 	chatEventData.data.message = "five sec mark";
	// 	serverSystem
	// 		.broadcastEvent("minecraft:display_chat_event", chatEventData);
	// }
	dcm.update(tickCount);
};
