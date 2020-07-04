"use strict";

module.exports = (system) =>
{
	system.executeCommand("/gamerule doDaylightCycle false", () =>
	{

	});
	let numCycles = 0;
	const daylightCycleManager = {};
	daylightCycleManager.update = (tickCount) =>
	{
		if (tickCount % 100 === 0)
		{
			numCycles++;
			(numCycles % 2 === 0) ?
				system.executeCommand("/time set day", () =>
				{

				}) :
				system.executeCommand("/time set night", () =>
				{

				});
		}
	};
	return Object.freeze(daylightCycleManager);
};
