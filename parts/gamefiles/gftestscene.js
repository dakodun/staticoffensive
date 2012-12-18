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
			arr.push("a:tileset_blue;");
			arr.push("{");
			arr.push("20xa?"); arr.push("20oa!");
			arr.push("20oa?"); arr.push("20xa");
			arr.push("}");
			bpc.mInitStore.push(bpc.Convert(arr));
		}
		
		{
			var arr = new Array();
			arr.push("a:tileset_dirtwhole;");
			arr.push("b:tileset_grasstop;");
			arr.push("c:tileset_grasswhole;");
			arr.push("{");
			arr.push("20ob?"); arr.push("20xb?"); arr.push("20eb?"); arr.push("20ob!");
			arr.push("20ec?"); arr.push("20oa?"); arr.push("20ob?"); arr.push("20xb!");
			arr.push("20xc?"); arr.push("20ob?"); arr.push("20ob?"); arr.push("20ea!");
			arr.push("20oa?"); arr.push("20ec?"); arr.push("20xa?"); arr.push("20ob");
			arr.push("}");
			bpc.mRegStore.push(bpc.Convert(arr));
		}
		
		{
			var arr = new Array();
			arr.push("a:tileset_red;");
			arr.push("{");
			arr.push("20ea?"); arr.push("20oa?"); arr.push("20ea?"); arr.push("20oa?"); arr.push("20ea!");
			arr.push("20ea?"); arr.push("20oa?"); arr.push("20ea?"); arr.push("20oa?"); arr.push("20ea");
			arr.push("}");
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
	if (this.mMapControl.Hovering() == false) {
		this.mMap.Process();
	}
	else {
		this.mMap.UnselectTile();
	}
	
	this.mCam.Process();
}

// handles all drawing tasks
GFTestScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	
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

