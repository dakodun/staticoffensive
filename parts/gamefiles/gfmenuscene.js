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
	
	this.mInput = new GUIInputBox();
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
		var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
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
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_inputbox");
		var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
		
		this.mInput.mInputText.SetFont(font);
		this.mInput.mInputText.SetFontSize(12);
		this.mInput.mInputText.mColour = "#000000";
		
		this.mInput.mRenderCanvas.mPos.Set(16, 5);
		this.mInput.mRenderCanvas.mSize.Set(-16, -5);
		
		this.mInput.SetUp(new IVec2(0, 0), new IVec2(126, 26), -5000);
		
		this.mInput.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mInput.mSpriteIdle.SetCurrentFrame(0);
		
		this.mInput.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mInput.mSpriteHover.SetCurrentFrame(1);
		
		this.mInput.mSpriteFocus.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mInput.mSpriteFocus.SetCurrentFrame(2);
		
		this.mInput.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mInput.mSpriteInactive.SetCurrentFrame(0);
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
	
	this.mInput.Input();
}

// handles game logic
GFMenuScene.prototype.Process = function() {
	{
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		for (var i = 0; i < this.mButtons.length; ++i) {
			this.mButtons[i].Process(pt);
		}
		
		this.mInput.Process(pt);
	}
	
	{
		if (this.mButtons[0].OnClick() == true) {
			nmgrs.sceneMan.ChangeScene(new GFTestScene());
		}
		else if (this.mButtons[1].OnClick() == true) {
			nmgrs.sceneMan.ChangeScene(new GFCreationScene());
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
	
	arr = arr.concat(this.mInput.GetRenderData());
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render();
}
// ...End

