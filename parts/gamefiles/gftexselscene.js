// GFTexSelScene Class...
// game file:
function GFTexSelScene() {
	this.mPersist = false;
}

// returns the type of this object for validity checking
GFTexSelScene.prototype.Type = function() {
	return "GFTexSelScene";
};

// returns whether this scene is to persist or not (when changing to a new scene -- preserves state)
GFTexSelScene.prototype.Persistent = function() {
	return this.mPersist;
};

// initialises the scene object
GFTexSelScene.prototype.SetUp = function() {
	
}

// cleans up the scene object
GFTexSelScene.prototype.TearDown = function() {
	
}

// handles user input
GFTexSelScene.prototype.Input = function() {
	if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left)) {
		this.mPersist = true;
		nmgrs.sceneMan.ReadyScene(new GFCreationScene());
		
		// set the current texture
		
		nmgrs.sceneMan.SwitchScene();
	}
}

// handles game logic
GFTexSelScene.prototype.Process = function() {
	
}

// handles all drawing tasks
GFTexSelScene.prototype.Render = function() {
	// display a grid of textures with sample maps and texture name
}
// ...End

