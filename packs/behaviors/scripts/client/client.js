const clientSystem = client.registerSystem(0, 0);

// Setup which events to listen for
clientSystem.initialize = () =>
{
	// const eventDataDefaults = {narf: false};
	// clientSystem.registerEventData("gettingstarted:pinky", eventDataDefaults);
	// const scriptLoggerConfig =
	// 	clientSystem.createEventData("minecraft:script_logger_config");
	// scriptLoggerConfig.data.log_errors = true;
	// scriptLoggerConfig.data.log_information = true;
	// scriptLoggerConfig.data.log_warnings = true;
	// clientSystem
	// 	.broadcastEvent("minecraft:script_logger_config", scriptLoggerConfig);
};

clientSystem.update = () =>
{
};
