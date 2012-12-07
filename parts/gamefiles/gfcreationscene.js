// GFCreationScene Class...
// game file:
function GFCreationScene() {
	this.mPersist = false;
	
	this.mCam = new Camera();
	this.mBatch = new RenderBatch();
	this.mMap = new GFMapSegment();
	
	this.mMapControl = new GFGUIMapControl();
	this.mCreationControl = new GFGUICreationControl();
	
	this.mTestText = new Text();
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
	this.mCreationControl.SetUp();
	
	var font = nmgrs.resMan.mFontStore.GetResource("pf_tempesta_seven_bold");
	this.mTestText.SetFont(font);
	this.mTestText.SetFontSize(8);
	this.mTestText.mString = "AAAAA\nAAAAAAAAA\nAAAAAAAAAAAA";
	this.mTestText.mAlign = "right";
	this.mTestText.mShadow = true;
	this.mTestText.mPos.Set(100, 0);
}

// cleans up the scene object
GFCreationScene.prototype.TearDown = function() {
	
}

// handles user input
GFCreationScene.prototype.Input = function() {
	this.mMapControl.Input();
}

// handles game logic
GFCreationScene.prototype.Process = function() {
	this.mMapControl.Process();
	this.mCreationControl.Process();
	
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
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	
	this.mBatch.Add(this.mTestText);
	
	this.mBatch.Render(this.mCam);
}
// ...End

