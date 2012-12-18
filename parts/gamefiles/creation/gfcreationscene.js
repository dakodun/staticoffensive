// GFCreationScene Class...
// game file:
function GFCreationScene() {
	this.mPersist = false;
	
	this.mCam = new Camera();
	this.mBatch = new RenderBatch();
	this.mMap = new GFMapSegment();
	
	this.mMapControl = new GFGUIMapControl();
	this.mCreationControl = new GFGUICreationControl();
	
	this.mCreationMap = new GFCreationMap();
	
	this.mHoveringUI = false;
}

// returns the type of this object for validity checking
GFCreationScene.prototype.Type = function() {
	return "GFCreationScene";
};

// returns whether this scene is to persist or not (when changing to a new scene -- preserves state)
GFCreationScene.prototype.Persistent = function() {
	return this.mPersist;
};

// initialises the scene object
GFCreationScene.prototype.SetUp = function() {
	nmain.game.mClearColour = "#75632F";
	
	this.mMapControl.SetUp();
	this.mCreationControl.SetUp("tileset_test");
}

// cleans up the scene object
GFCreationScene.prototype.TearDown = function() {
	
}

// handles user input
GFCreationScene.prototype.Input = function() {
	if (this.mCreationControl.mDialogueOpen == false) {
		this.mMapControl.Input();
	}
	
	this.mCreationControl.Input();
}

// handles game logic
GFCreationScene.prototype.Process = function() {
	{
		if (this.mCreationControl.mDialogueOpen == false) {
			this.mMapControl.Process();
			
			if (this.mHoveringUI == false) {
				this.mCreationMap.Process();
			}
			else {
				this.mCreationMap.UnselectTile();
			}
		}
		else {
			this.mCreationMap.UnselectTile();
		}
		
		this.mCreationControl.Process();
		
		this.mHoveringUI = this.mMapControl.Hovering();
		if (this.mHoveringUI == false) {
			this.mHoveringUI = this.mCreationControl.Hovering();
		}
	}
	
	this.mCam.Process();
}

// handles all drawing tasks
GFCreationScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mCam.Apply();
	
	this.mBatch.Clear();
	
	var arr = new Array();
	arr = arr.concat(this.mMapControl.GetRenderData());
	arr = arr.concat(this.mCreationControl.GetRenderData());
	arr = arr.concat(this.mCreationMap.GetRenderData());
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(this.mCam);
}
// ...End

