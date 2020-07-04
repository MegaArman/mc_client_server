"use strict";
const DAY = "day";
const NIGHT = "night";

//TODO make singleton?
module.exports = (system) =>
{

	system.executeCommand("/gamerule doDaylightCycle false", () =>
	{
	});
	const daylightCycleManager = {};
	let timeOfDay = DAY; //TODO should be game depending
	let dayLength = 100;
	let nightLength = 100;

	const timeSet = () =>
	{
		system.executeCommand(`/time set ${timeOfDay}`, () =>
		{
		});
	};

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
			timeSet();
		}
		else if (timeOfDay === NIGHT && (tickCount % nightLength === 0))
		{
			timeOfDay = DAY;
			timeSet();
		}
	};
	return Object.freeze(daylightCycleManager);
};
