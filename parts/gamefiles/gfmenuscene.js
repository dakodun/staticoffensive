// GFMenuScene Class...
// game file:
function GFMenuScene() {
	this.mPersist = false;
	
	this.mBatch = new RenderBatch();
	
	this.mButtons = new Array();
	this.mButtons[0] = new GUIButton();
	this.mButtons[1] = new GUIButton();
	
	this.mButtonsText = new Array();
	this.mButtonsText[0] = new Text();
	this.mButtonsText[1] = new Text();
}

// returns the type of this object for validity checking
GFMenuScene.prototype.Type = function() {
	return "GFMenuScene";
};

// returns whether this scene is to persist or not (when changing to a new scene -- preserves state)
GFMenuScene.prototype.Persistent = function() {
	return this.mPersist;
};

// initialises the scene object
GFMenuScene.prototype.SetUp = function() {
	nmain.game.mClearColour = "#75632F";
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("menu_button");
		
		{
			this.mButtons[0].SetUp(new IVec2(192, 20), new IVec2(256, 64), -5000);
			this.mButtons[0].mPos.Set(192, 20);
			
			this.mButtons[0].mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mButtons[0].mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[0].mSpriteHover.SetCurrentFrame(1);
			
			this.mButtons[0].mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[0].mSpriteDown.SetCurrentFrame(2);
			
			this.mButtons[0].mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mButtons[1].SetUp(new IVec2(192, 100), new IVec2(256, 64), -5000);
			this.mButtons[1].mPos.Set(192, 100);
			
			this.mButtons[1].mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[1].mSpriteIdle.SetCurrentFrame(0);
			
			this.mButtons[1].mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[1].mSpriteHover.SetCurrentFrame(1);
			
			this.mButtons[1].mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[1].mSpriteDown.SetCurrentFrame(2);
			
			this.mButtons[1].mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[1].mSpriteInactive.SetCurrentFrame(0);
		}
	}
	
	{
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		this.mButtonsText[0].SetFont(font);
		this.mButtonsText[0].SetFontSize(24);
		this.mButtonsText[0].mString = "To TestScene";
		this.mButtonsText[0].mAlign = "centre";
		this.mButtonsText[0].mPos.Set(320, 35);
		this.mButtonsText[0].mShadow = true;
		this.mButtonsText[0].mDepth = -5000;
		
		this.mButtonsText[1].SetFont(font);
		this.mButtonsText[1].SetFontSize(24);
		this.mButtonsText[1].mString = "To CreationScene";
		this.mButtonsText[1].mAlign = "centre";
		this.mButtonsText[1].mPos.Set(320, 115);
		this.mButtonsText[1].mShadow = true;
		this.mButtonsText[1].mDepth = -5000;
	}
}

// cleans up the scene object
GFMenuScene.prototype.TearDown = function() {
	
}

// handles user input
GFMenuScene.prototype.Input = function() {
	for (var i = 0; i < this.mButtons.length; ++i) {
		this.mButtons[i].Input();
	}
}

// handles game logic
GFMenuScene.prototype.Process = function() {
	{
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		for (var i = 0; i < this.mButtons.length; ++i) {
			this.mButtons[i].Process(pt);
		}
	}
	
	{
		if (this.mButtons[0].OnClick() == true) {
			var bpc = new GFBluePrintCollection();
			
			{
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
			}
			
			nmgrs.sceneMan.RequestSceneChange(new GFTestScene());
			nmgrs.sceneMan.mReadyScene.mBPCollection.Copy(bpc);
			
		}
		else if (this.mButtons[1].OnClick() == true) {
			nmgrs.sceneMan.RequestSceneChange(new GFCreationScene());
		}
	}
}

// handles all drawing tasks
GFMenuScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	for (var i = 0; i < this.mButtons.length; ++i) {
		arr = arr.concat(this.mButtons[i].GetRenderData());
	}
	
	for (var i = 0; i < this.mButtonsText.length; ++i) {
		arr.push(this.mButtonsText[i]);
	}
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render();
}
// ...End

