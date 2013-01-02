// GFCreationScene Class...
// game file:
function GFCreationScene() {
	this.mPersist = false;
	
	this.mCam = new Camera();
	this.mBatch = new RenderBatch();
	this.mMap = new GFMapSegment();
	
	this.mMapControl = new GFGUIMapControl();
	this.mCreationControl = new GFGUICreationControl();
	
	this.mMap = new GFCreationMap();
	
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
	
	{
		var bp = new GFBluePrint();
		bp.SetUp("a:tileset_test;{70oa?70oa?70oa?70oa?70oa!70oa?70oa?70oa?70oa?70oa!" +
				"70oa?70oa?70oa?70oa?70oa!70oa?70oa?70oa?70oa?70oa!70oa?70oa?70oa?70oa?70oa}");
		
		var seg = new GFMapSegment();
		seg.mPos.Set(0, 0); seg.SetUp(bp);
		
		this.mMap.mSegment.Copy(seg);
		this.mMap.mBounds[0] = this.mMap.mSegment.mBounds.mBounds[0];
		this.mMap.mBounds[1] = this.mMap.mSegment.mBounds.mBounds[1];
		this.mMap.mBounds[2] = this.mMap.mSegment.mBounds.mBounds[2];
		this.mMap.mBounds[3] = this.mMap.mSegment.mBounds.mBounds[3];
		
		this.mMap.SetUp();
	}
	
	var trans = new IVec2(nmain.game.mCanvasSize.mX / 2, nmain.game.mCanvasSize.mY / 2);
	trans.mX -= this.mMap.mSegment.mBounds.GetWidth() / 2; trans.mY -= 30;
	trans.mX = -(Math.round(trans.mX)); trans.mY = -(Math.round(trans.mY));
	this.mCam.Translate(trans);
}

// cleans up the scene object
GFCreationScene.prototype.TearDown = function() {
	
}

// handles user input
GFCreationScene.prototype.Input = function() {
	if (this.mCreationControl.mDialogueOpen == "") {
		this.mMapControl.Input();
	}
	
	this.mCreationControl.Input();
}

// handles game logic
GFCreationScene.prototype.Process = function() {
	{
		if (this.mCreationControl.mDialogueOpen == "") {
			this.mMapControl.Process();
			
			if (this.mHoveringUI == false) {
				this.mMap.Process();
			}
			else {
				this.mMap.UnselectTile();
			}
		}
		else {
			this.mMap.UnselectTile();
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
	
	this.mBatch.Clear();
	
	var arr = new Array();
	arr = arr.concat(this.mMapControl.GetRenderData());
	arr = arr.concat(this.mCreationControl.GetRenderData());
	arr = arr.concat(this.mMap.GetRenderData());
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(this.mCam);
}
// ...End

