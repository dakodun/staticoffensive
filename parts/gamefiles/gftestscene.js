// GFTestScene Class...
// game file:
function GFTestScene() {
	this.mPersist = false;
	
	this.mRand = new RNG(0);
	
	this.mCam = new Camera();
	this.mBatch = new RenderBatch();
	this.mMap = new GFMap();
	
	this.mMapControl = new GFGUIMapControl();
}

// returns the type of this object for validity checking
GFTestScene.prototype.Type = function() {
	return "GFTestScene";
};

// returns whether this scene is to persist or not (when changing to a new scene -- preserves state)
GFTestScene.prototype.Persistent = function() {
	return this.mPersist;
};

// initialises the scene object
GFTestScene.prototype.SetUp = function() {
	{
		var d = new Date();
		this.mRand.SetSeed(d.getTime());
		var seed = this.mRand.GetRandInt(0, 99999999);
		this.mRand.SetSeed(seed);
	}
	
	nmain.game.mClearColour = "#75632F";
	this.mCam.Translate(new IVec2(60, 100));
	
	{
		var bpc = new GFBluePrintCollection();
		
		{
			var arr = new Array();
			arr.push("20xc"); arr.push("20or");
			arr.push("20oc"); arr.push("20x");
			bpc.mInitStore.push(bpc.Convert(arr));
		}
		
		{
			var arr = new Array();
			arr.push("20oc"); arr.push("20xc"); arr.push("20ec"); arr.push("20or");
			arr.push("20ec"); arr.push("20oc"); arr.push("20oc"); arr.push("20xr");
			arr.push("20xc"); arr.push("20oc"); arr.push("20oc"); arr.push("20er");
			arr.push("20oc"); arr.push("20ec"); arr.push("20xc"); arr.push("20o");
			bpc.mRegStore.push(bpc.Convert(arr));
		}
		
		{
			var arr = new Array();
			arr.push("20ec"); arr.push("20oc"); arr.push("20ec"); arr.push("20oc"); arr.push("20er");
			arr.push("20ec"); arr.push("20oc"); arr.push("20ec"); arr.push("20oc"); arr.push("20e");
			bpc.mFinStore.push(bpc.Convert(arr));
		}
		
		var mapGen = new GFMapGen();
		this.mMap.Copy(mapGen.GenerateMap(bpc, 16));
	}
	
	this.mMapControl.SetUp();
}

// cleans up the scene object
GFTestScene.prototype.TearDown = function() {
	
}

// handles user input
GFTestScene.prototype.Input = function() {
	this.mMapControl.Input();
}

// handles game logic
GFTestScene.prototype.Process = function() {
	this.mMapControl.Process();
	
	this.mCam.Process();
}

// handles all drawing tasks
GFTestScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mCam.Apply();
	
	this.mBatch.Clear();
	
	var arr = new Array();
	arr = arr.concat(this.mMap.GetRenderData());
	arr = arr.concat(this.mMapControl.GetRenderData());
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(this.mCam);
}
// ...End

