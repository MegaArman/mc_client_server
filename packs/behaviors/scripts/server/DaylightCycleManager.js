"use strict";


const DAY = "day";
const NIGHT = "night";

module.exports = (system) =>
{

	system.executeCommand("/gamerule doDaylightCycle false", () =>
	{
	});
	const daylightCycleManager = {};
	let timeOfDay = DAY; //TODO should be game depending
	let dayLength = 100;
	let nightLength = 100;

  daylightCycleManager.setDayLength = (length) =>
	{
		dayLength = length;
	};

  daylightCycleManager.setNightLength = (length) =>
	{
		nightLength = length;
	};

	daylightCycleManager.update = (tickCount) =>
	{
		if (timeOfDay === DAY && (tickCount % dayLength === 0)) //5 sec passed
		{
			timeOfDay = NIGHT;
			system.executeCommand("/time set night", () => //TODO string literal
			{
			});
		}
		else if (timeOfDay === NIGHT && (tickCount % nightLength === 0))
		{
			timeOfDay = DAY;
			system.executeCommand("/time set day", () =>
			{
			});
		}
	};
	return Object.freeze(daylightCycleManager);
};
