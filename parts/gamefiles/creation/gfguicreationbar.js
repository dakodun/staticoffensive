// GFGUICreationBar Class...
// game file:
function GFGUICreationBar() {
	this.mSprite = new Sprite();
	
	this.mMenus = new Array();
	this.mMenus[0] = new GUIDropDown();
}

GFGUICreationBar.prototype.SetUp = function() {
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_topbar");
		
		this.mSprite.mPos.Set(8, 10);
		this.mSprite.mDepth = -5000;
		this.mSprite.SetTexture(tex);
		this.mSprite.mAbsolute = true;
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_topmenunew");
		var baseBut = new GUIButton();
		
		baseBut.SetUp(new IVec2(12, 36), new IVec2(38, 18), -5000);
		baseBut.mPos.Set(12, 36);
		
		baseBut.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
		baseBut.mSpriteIdle.SetCurrentFrame(0);
		
		baseBut.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
		baseBut.mSpriteHover.SetCurrentFrame(1);
		
		baseBut.mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
		baseBut.mSpriteDown.SetCurrentFrame(2);
		
		baseBut.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
		baseBut.mSpriteInactive.SetCurrentFrame(0);
		
		this.mMenus[0].SetUp(baseBut);
		this.AddItem(this.mMenus[0], "new", false);
		var newPos = new IVec2(0, 0); newPos.Copy(this.mMenus[0].mItems[0].mPos); newPos.mY += 2;
		this.mMenus[0].mItems[0].mPos.Copy(newPos);
		this.mMenus[0].mItems[0].SetSpritePositions(newPos);
		
		this.AddItem(this.mMenus[0], "load", true);
		this.AddItem(this.mMenus[0], "import", false);
		this.AddItem(this.mMenus[0], "export", true);
	}
}

GFGUICreationBar.prototype.Input = function() {
	for (var i = 0; i < this.mMenus.length; ++i) {
		this.mMenus[i].Input();
	}
}

GFGUICreationBar.prototype.Process = function(point) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	for (var i = 0; i < this.mMenus.length; ++i) {
		this.mMenus[i].Process(point);
	}
	
	{
		if (this.mMenus[0].OnClick(0) == true) {
			currScene.mCreationControl.mDialogueOpen = true;
		}
		else if (this.mMenus[0].OnClick(1) == true) {
			
		}
		else if (this.mMenus[0].OnClick(2) == true) {
			
		}
		else if (this.mMenus[0].OnClick(3) == true) {
			
		}
	}
}

GFGUICreationBar.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	
	for (var i = 0; i < this.mMenus.length; ++i) {
		arr = arr.concat(this.mMenus[i].GetRenderData());
	}
	
	return arr;
}

GFGUICreationBar.prototype.AddItem = function(menu, text, alt) {
	var baseFrame = 0;
	if (alt == true) {
		baseFrame = 3;
	}
	
	var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_dropback");
	var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
	
	{
		var itemBut = new GUIButton();
		itemBut.SetUp(new IVec2(0, 0), new IVec2(176, 16), -5000);
		
		itemBut.mSpriteIdle.SetAnimatedTexture(tex, 6, 1, -1, -1);
		itemBut.mSpriteIdle.SetCurrentFrame(baseFrame);
		
		itemBut.mSpriteHover.SetAnimatedTexture(tex, 6, 1, -1, -1);
		itemBut.mSpriteHover.SetCurrentFrame(baseFrame + 1);
		
		itemBut.mSpriteDown.SetAnimatedTexture(tex, 6, 1, -1, -1);
		itemBut.mSpriteDown.SetCurrentFrame(baseFrame + 2);
		
		itemBut.mSpriteInactive.SetAnimatedTexture(tex, 6, 1, -1, -1);
		itemBut.mSpriteInactive.SetCurrentFrame(baseFrame);
		
		var itemTxt = new Text();
		itemTxt.mDepth = -5001;
		itemTxt.SetFont(font);
		itemTxt.SetFontSize(12);
		itemTxt.mString = text;
		itemTxt.mAlign = "left";
		itemTxt.mPos.Set(26, 0);
		itemTxt.mColour = "#4A4A66";
			
		menu.AddItem(itemBut, itemTxt);
	}
}

GFGUICreationBar.prototype.Hovering = function() {
	{
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		var tl = new IVec2(10, 12);
		var br = new IVec2(11, 13);
		br.mX += this.mSprite.GetWidth(); br.mY += this.mSprite.GetHeight();
		
		if (util.PointInRectangle(pt, tl, br)) {
			return true;
		}
	}
	
	for (var i = 0; i < this.mMenus.length; ++i) {
		if (this.mMenus[i].mHover == true) {
			return true;
		}
	}
	
	return false;
}
// ...End

