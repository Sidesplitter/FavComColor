//(C) Jord Nijhuis 2014

var colors = {
	"PURPLE"	: [113, 52,  165],
	"RED"		: [210, 50,  44 ],
	"ORANGE"	: [255, 144, 47 ],
	"BLUE"		: [51,  151, 197],
	"WHITE"		: [200, 200, 200],
	"YELLOW"	: [219, 217, 37 ],
	"GREEN" 	: [83,  119, 48 ],
	"BLACK" 	: [25,  25,  25 ],
	"DARK BLUE"	: [59,  54,  182],
	"PINK"		: [206, 51,  122],
	"BROWN"		: [142, 107, 68 ]
}

initialSettingValue("favColor", "None");

//Delay to make sure everything is ready
setTimeout(function(){

	setColor();
	setCommander();
}, 2000);


function setCommander(){

	model.send_message('update_commander', {
		commander: { ObjectName: model.preferredCommander().ObjectName }
	});
}

function setColor(){

	var settings = decode(localStorage.settings);

	//No favorite color
	if(settings.favColor == "None") 
		return;
	//First choice not avaiable
	if(!isColorAvaiable("rgb(" + colors[settings.favColor] + ")")) 
		settings.favColor = settings.favColorAlt;

	//Second choice not avaiable
	if(!isColorAvaiable("rgb(" + colors[settings.favColor] + ")")) 
		return;

	//Second choice does not exist
	if(colors[settings.favColor] == undefined) return; 
	
	//Loop through all the colors
	var colorInterval = setInterval(function(){

		//Wee, we found it
		if(getPlayerSlot().primaryColor() == "rgb(" + colors[settings.favColor] + ")")

			clearInterval(colorInterval);
		//Keep searching
		else
			model.send_message("next_primary_color");
		
	}, 500);
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

function isColorAvaiable(rgb){

	//Loop through all the armies
	for(var army = 0; army < model.armies().length; army++){

		//Loop through all the slots
		for(var slot = 0; slot < model.armies()[army].openSlots().length; slot++){

			//Is the color the same
			if(model.armies()[army].openSlots()[slot].primaryColor() == rgb)

				return false;
		}
	}

	return true;
}