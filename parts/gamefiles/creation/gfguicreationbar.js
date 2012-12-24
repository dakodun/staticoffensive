// GFGUICreationBar Class...
// game file:
function GFGUICreationBar() {
	this.mSprite = new Sprite();
	
	this.mMenus = new Array();
	this.mMenus[0] = new GUIDropDown();
	this.mDropBottom = new Sprite();
}

GFGUICreationBar.prototype.SetUp = function() {
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_topbar");
		
		this.mSprite.mPos.Set(0, 0);
		this.mSprite.mDepth = -5000;
		this.mSprite.SetTexture(tex);
		this.mSprite.mAbsolute = true;
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_topmenunew");
		var baseBut = new GUIButton();
		
		baseBut.SetUp(new IVec2(16, 3), new IVec2(54, 26), -5000);
		baseBut.mPos.Set(16, 3);
		
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
		var newPos = new IVec2(0, 0); newPos.Copy(this.mMenus[0].mItems[0].mPos); newPos.mY += 3;
		this.mMenus[0].mItems[0].mPos.Copy(newPos);
		this.mMenus[0].mItems[0].SetSpritePositions(newPos);
		this.mMenus[0].mItemsText[0].mPos.mY += 3;
		
		this.AddItem(this.mMenus[0], "save", true);
		this.AddItem(this.mMenus[0], "load", false);
		this.AddItem(this.mMenus[0], "import", true);
		this.AddItem(this.mMenus[0], "export", false);
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_dropbottom");
		
		var id = this.mMenus[0].mItems.length - 1;
		this.mDropBottom.mPos.Copy(this.mMenus[0].mItems[id].mPos);
		this.mDropBottom.mPos.mY += this.mMenus[0].mItems[id].mSpriteIdle.GetHeight();
		this.mDropBottom.mDepth = -5001;
		this.mDropBottom.SetTexture(tex);
		this.mDropBottom.mAbsolute = true;
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
		else if (this.mMenus[0].OnClick(4) == true) {
			
		}
	}
}

GFGUICreationBar.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	
	for (var i = 0; i < this.mMenus.length; ++i) {
		arr = arr.concat(this.mMenus[i].GetRenderData());
		
		if (this.mMenus[i].mExpanded == true) {
			arr.push(this.mDropBottom);
		}
	}
	
	return arr;
}

GFGUICreationBar.prototype.AddItem = function(menu, text, alt) {
	var baseFrame = 0;
	if (alt == true) {
		baseFrame = 1;
	}
	
	var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_dropback");
	var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
	
	{
		var itemBut = new GUIButton();
		itemBut.SetUp(new IVec2(0, 0), new IVec2(176, 16), -5000);
		
		itemBut.mSpriteIdle.SetAnimatedTexture(tex, 6, 2, -1, -1);
		itemBut.mSpriteIdle.SetCurrentFrame(baseFrame);
		
		itemBut.mSpriteHover.SetAnimatedTexture(tex, 6, 2, -1, -1);
		itemBut.mSpriteHover.SetCurrentFrame(baseFrame + 2);
		
		itemBut.mSpriteDown.SetAnimatedTexture(tex, 6, 2, -1, -1);
		itemBut.mSpriteDown.SetCurrentFrame(baseFrame + 4);
		
		itemBut.mSpriteInactive.SetAnimatedTexture(tex, 6, 2, -1, -1);
		itemBut.mSpriteInactive.SetCurrentFrame(baseFrame);
		
		var itemTxt = new Text();
		itemTxt.mDepth = -5001;
		itemTxt.SetFont(font);
		itemTxt.SetFontSize(12);
		itemTxt.mString = text;
		itemTxt.mAlign = "left";
		itemTxt.mPos.Set(26, 0);
		itemTxt.mColour = "#C8B792";
			
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

