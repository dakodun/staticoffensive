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
		nmgrs.resLoad.QueueTexture("tileset_test", "./res/vis/tileset_test.png");
		nmgrs.resLoad.QueueTexture("tileset_test2", "./res/vis/tileset_test2.png");
		nmgrs.resLoad.QueueTexture("tileset_dirtwhole", "./res/vis/tileset_dirtwhole.png");
		nmgrs.resLoad.QueueTexture("tileset_grasstop", "./res/vis/tileset_grasstop.png");
		nmgrs.resLoad.QueueTexture("tileset_grasswhole", "./res/vis/tileset_grasswhole.png");
		nmgrs.resLoad.QueueTexture("tileset_blue", "./res/vis/tileset_blue.png");
		nmgrs.resLoad.QueueTexture("tileset_red", "./res/vis/tileset_red.png");
		
		nmgrs.resLoad.QueueTexture("gui_map_compassmain", "./res/vis/gui_map_compassmain.png");
		nmgrs.resLoad.QueueTexture("gui_map_compassextra", "./res/vis/gui_map_compassextra.png");
		nmgrs.resLoad.QueueTexture("gui_map_zlevelmain", "./res/vis/gui_map_zlevelmain.png");
		nmgrs.resLoad.QueueTexture("gui_map_zlevelextra", "./res/vis/gui_map_zlevelextra.png");
		
		nmgrs.resLoad.QueueTexture("gui_creation_topbar", "./res/vis/gui_creation_topbar.png");
		nmgrs.resLoad.QueueTexture("gui_creation_arrows", "./res/vis/gui_creation_arrows.png");
		nmgrs.resLoad.QueueTexture("gui_creation_texset", "./res/vis/gui_creation_texset.png");
		
		nmgrs.resLoad.QueueTexture("menu_button", "./res/vis/menu_button.png");
		
		nmgrs.resLoad.QueueFont("pixantiqua", "./res/sys/PixAntiqua");
		
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

