// GFTexSelScene Class...
// game file:
function GFTexSelScene() {
	this.mPersist = false;
	
	this.mBatch = new RenderBatch();
	
	this.mTexSelections = new Array();
	this.mCurrPage = 0;
	this.mMaxPage = 0;
	
	this.mPagePos = new Array();
	this.mPagePos[0] = new IVec2(20, 22);
	this.mPagePos[1] = new IVec2(233, 22);
	this.mPagePos[2] = new IVec2(447, 22);
	this.mPagePos[3] = new IVec2(20, 262);
	this.mPagePos[4] = new IVec2(233, 262);
	this.mPagePos[5] = new IVec2(447, 262);
	
	this.mArrows = new Array();
	this.mArrows[0] = new GUIButton();
	this.mArrows[1] = new GUIButton();
	
	this.mCancel = new GUIButton();
	this.mCancelText = new Text();
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
	for (var i = 0; i < nmgrs.resMan.mTexStore.mStore.length; ++i) {
		var str = nmgrs.resMan.mTexStore.mStore[i].mResName;
		if (str.length >= 7) {
			if (str.substr(0, 7) == "tileset") {
				var id = this.mTexSelections.length % 6;
				var texSel = new GFTexSelection();
				texSel.SetUp(this.mPagePos[id], str);
				
				this.mTexSelections.push(texSel);
			}
		}
	}
	
	this.mMaxPage = Math.floor(this.mTexSelections.length / 7);
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_arrows");
		
		{
			this.mArrows[0].SetUp(new IVec2(8, 434), new IVec2(22, 38), -5000);
			
			this.mArrows[0].mSpriteIdle.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mArrows[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mArrows[0].mSpriteHover.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mArrows[0].mSpriteHover.SetCurrentFrame(2);
			
			this.mArrows[0].mSpriteDown.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mArrows[0].mSpriteDown.SetCurrentFrame(4);
			
			this.mArrows[0].mSpriteInactive.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mArrows[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mArrows[1].SetUp(new IVec2(610, 434), new IVec2(22, 38), -5000);
			
			this.mArrows[1].mSpriteIdle.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mArrows[1].mSpriteIdle.SetCurrentFrame(1);
			
			this.mArrows[1].mSpriteHover.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mArrows[1].mSpriteHover.SetCurrentFrame(3);
			
			this.mArrows[1].mSpriteDown.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mArrows[1].mSpriteDown.SetCurrentFrame(5);
			
			this.mArrows[1].mSpriteInactive.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mArrows[1].mSpriteInactive.SetCurrentFrame(1);
		}
	}
	
	{
		{
			var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_texset");
			
			this.mCancel.SetUp(new IVec2(239, 434), new IVec2(162, 38), 100);
			
			this.mCancel.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mCancel.mSpriteIdle.SetCurrentFrame(0);
			
			this.mCancel.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mCancel.mSpriteHover.SetCurrentFrame(1);
			
			this.mCancel.mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mCancel.mSpriteDown.SetCurrentFrame(2);
			
			this.mCancel.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mCancel.mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
			this.mCancelText.SetFont(font);
			this.mCancelText.SetFontSize(23);
			this.mCancelText.mString = "Cancel";
			this.mCancelText.mAlign = "centre";
			this.mCancelText.mPos.Set(320, 439);
			this.mCancelText.mColour = "#270100";
		}
	}
}

// cleans up the scene object
GFTexSelScene.prototype.TearDown = function() {
	
}

// handles user input
GFTexSelScene.prototype.Input = function() {
	for (var i = 0; i < this.mArrows.length; ++i) {
		this.mArrows[i].Input();
	}
	
	this.mCancel.Input();
	
	var max = ((this.mCurrPage + 1) * 6);
	if (max > this.mTexSelections.length) {
		max = this.mTexSelections.length;
	}
	
	for (var i = this.mCurrPage * 6; i < max; ++i) {
		this.mTexSelections[i].Input();
	}
}

// handles game logic
GFTexSelScene.prototype.Process = function() {
	{
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		for (var i = 0; i < this.mArrows.length; ++i) {
			this.mArrows[i].Process(pt);
		}
		
		this.mCancel.Process(pt);
		
		if (this.mCancel.mStatus == "down") {
			this.mCancelText.mColour = "#0B0505";
		}
		else if (this.mCancel.mStatus == "hover") {
			this.mCancelText.mColour = "#501E11";
		}
		else {
			this.mCancelText.mColour = "#270100";
		}
		
		for (var i = 0; i < this.mTexSelections.length; ++i) {
			this.mTexSelections[i].Process(pt);
		}
	}
	
	{
		if (this.mArrows[0].OnClick() == true) {
			this.mCurrPage--;
			if (this.mCurrPage < 0) {
				this.mCurrPage = 0;
			}
		}
		else if (this.mArrows[1].OnClick() == true) {
			this.mCurrPage++;
			if (this.mCurrPage > this.mMaxPage) {
				this.mCurrPage = this.mMaxPage;
			}
		}
		else if (this.mCancel.OnClick() == true) {
			nmgrs.sceneMan.ChangeScene(new GFCreationScene());
		}
		else {
			for (var i = 0; i < this.mTexSelections.length; ++i) {
				if (this.mTexSelections[i].OnClick() == true) {
					this.mPersist = true;
					nmgrs.sceneMan.ReadyScene(new GFCreationScene());
					nmgrs.sceneMan.mReadyScene.mCreationControl.mTileControl.mCurrentTexture = this.mTexSelections[i].mTextureStr;
					nmgrs.sceneMan.mReadyScene.mCreationControl.mTileControl.UpdateTileSprite();
					nmgrs.sceneMan.SwitchScene();
					break;
				}
			}
		}
	}
}

// handles all drawing tasks
GFTexSelScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	var max = ((this.mCurrPage + 1) * 6);
	if (max > this.mTexSelections.length) {
		max = this.mTexSelections.length;
	}
	
	for (var i = this.mCurrPage * 6; i < max; ++i) {
		arr = arr.concat(this.mTexSelections[i].GetRenderData());
	}
	
	{
		if (this.mCurrPage != 0) {
			arr = arr.concat(this.mArrows[0].GetRenderData());
		}
		
		if (this.mCurrPage != this.mMaxPage) {
			arr = arr.concat(this.mArrows[1].GetRenderData());
		}
	}
	
	arr = arr.concat(this.mCancel.GetRenderData());
	arr.push(this.mCancelText);
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render();
}
// ...End

