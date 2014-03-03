//(C) Jord Nijhuis 2014

var interval = setInterval(function(){

	if(getPlayerSlot != undefined){

		setCommander();
		clearInterval(interval);
	}
}, 500);


function setCommander(){

	model.send_message('update_commander', {
		commander: { ObjectName: model.preferredCommander().ObjectName }
	});
}

function getPlayerSlot(){

	//Loop through all the armies
	for(var army = 0; army < model.armies().length; army++){

		//Loop through all the slots
		for(var slot = 0; slot < model.armies()[army].openSlots().length; slot++){

			//Found the right slot
			if(model.armies()[army].openSlots()[slot].playerName() == model.displayName())

				return model.armies()[army].openSlots()[slot];
		}
	}
}