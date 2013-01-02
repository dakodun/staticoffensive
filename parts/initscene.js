// InitScene Class...
// self contained parts of the game such as different screens, levels or game modes
function InitScene() {
	this.mPersist = false;
}

// returns the type of this object for validity checking
InitScene.prototype.Type = function() {
	return "InitScene";
};

// returns whether this scene is to persist or not (when changing to a new scene -- preserves state)
InitScene.prototype.Persistent = function() {
	return this.mPersist;
};

// initialises the scene object
InitScene.prototype.SetUp = function() {
	try {
		nmgrs.resLoad.QueueTexture("tileset_test", "./res/vis/tilesets/tileset_test.png");
		nmgrs.resLoad.QueueTexture("tileset_test2", "./res/vis/tilesets/tileset_test2.png");
		nmgrs.resLoad.QueueTexture("tileset_dirtwhole", "./res/vis/tilesets/tileset_dirtwhole.png");
		nmgrs.resLoad.QueueTexture("tileset_grasstop", "./res/vis/tilesets/tileset_grasstop.png");
		nmgrs.resLoad.QueueTexture("tileset_grasswhole", "./res/vis/tilesets/tileset_grasswhole.png");
		nmgrs.resLoad.QueueTexture("tileset_blue", "./res/vis/tilesets/tileset_blue.png");
		nmgrs.resLoad.QueueTexture("tileset_red", "./res/vis/tilesets/tileset_red.png");
		nmgrs.resLoad.QueueTexture("gridtile", "./res/vis/tilesets/gridtile.png");
		
		nmgrs.resLoad.QueueTexture("gui_map_compassmain", "./res/vis/gui/gui_map_compassmain.png");
		nmgrs.resLoad.QueueTexture("gui_map_back", "./res/vis/gui/gui_map_back.png");
		nmgrs.resLoad.QueueTexture("gui_map_zlevelmain", "./res/vis/gui/gui_map_zlevelmain.png");
		nmgrs.resLoad.QueueTexture("gui_map_zlevelextra", "./res/vis/gui/gui_map_zlevelextra.png");
		
		nmgrs.resLoad.QueueTexture("gui_creation_topbar", "./res/vis/gui/gui_creation_topbar.png");
		nmgrs.resLoad.QueueTexture("gui_creation_topmenunew", "./res/vis/gui/gui_creation_topmenunew.png");
		nmgrs.resLoad.QueueTexture("gui_creation_dropback", "./res/vis/gui/gui_creation_dropback.png");
		nmgrs.resLoad.QueueTexture("gui_creation_dropbottom", "./res/vis/gui/gui_creation_dropbottom.png");
		nmgrs.resLoad.QueueTexture("gui_creation_arrows", "./res/vis/gui/gui_creation_arrows.png");
		nmgrs.resLoad.QueueTexture("gui_creation_texset", "./res/vis/gui/gui_creation_texset.png");
		nmgrs.resLoad.QueueTexture("gui_texselect", "./res/vis/gui/gui_texselect.png");
		
		{ // textures for creation "new" dialogue box
			nmgrs.resLoad.QueueTexture("gui_creation_newdialogue_back", "./res/vis/gui/gui_creation_newdialogue_back.png");
			nmgrs.resLoad.QueueTexture("gui_creation_newdialogue_textinput", "./res/vis/gui/gui_creation_newdialogue_textinput.png");
			nmgrs.resLoad.QueueTexture("gui_creation_newdialogue_cancelbutton", "./res/vis/gui/gui_creation_newdialogue_cancelbutton.png");
			nmgrs.resLoad.QueueTexture("gui_creation_newdialogue_confirmbutton", "./res/vis/gui/gui_creation_newdialogue_confirmbutton.png");
		}
		
		{ // textures for creation "save" dialogue box
			nmgrs.resLoad.QueueTexture("gui_creation_savedialogue_back", "./res/vis/gui/gui_creation_savedialogue_back.png");
			nmgrs.resLoad.QueueTexture("gui_creation_savedialogue_textinput", "./res/vis/gui/gui_creation_savedialogue_textinput.png");
		}
		
		nmgrs.resLoad.QueueTexture("menu_button", "./res/vis/gui/menu_button.png");
		
		{ // main game font
			nmgrs.resLoad.QueueFont("mainfont", "./res/sys/Kingthings Serifique");
		}
		
		nmgrs.resLoad.AcquireResources();
		nmgrs.resLoad.mIntervalID = setInterval(function() {nmgrs.resLoad.ProgressCheck();}, 0);
	} catch(e) {
		alert(e.What());
	}
}

// cleans up the scene object
InitScene.prototype.TearDown = function() {
	
}

// handles user input
InitScene.prototype.Input = function() {
	
}

// handles game logic
InitScene.prototype.Process = function() {
	if (nmgrs.resLoad.mWorking == false) {
		nmgrs.sceneMan.ChangeScene(new GFMenuScene());
	}
}

// handles all drawing tasks
InitScene.prototype.Render = function() {
	
}
// ...End

