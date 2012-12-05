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
		
		nmgrs.resLoad.QueueTexture("gui_map_compassmain", "./res/vis/gui_map_compassmain.png");
		nmgrs.resLoad.QueueTexture("gui_map_compassextra", "./res/vis/gui_map_compassextra.png");
		nmgrs.resLoad.QueueTexture("gui_map_zlevelmain", "./res/vis/gui_map_zlevelmain.png");
		nmgrs.resLoad.QueueTexture("gui_map_zlevelextra", "./res/vis/gui_map_zlevelextra.png");
		
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
		nmgrs.sceneMan.ChangeScene(new GFTestScene());
	}
}

// handles all drawing tasks
InitScene.prototype.Render = function() {
	
}
// ...End

