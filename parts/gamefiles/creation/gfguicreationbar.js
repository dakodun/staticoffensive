// GFGUICreationBar Class...
// game file:
function GFGUICreationBar() {
	this.mSprite = new Sprite();
	
	this.mMenus = new Array();
	this.mMenus[0] = new GUIDropDown();
	this.mMenus[1] = new GUIDropDown();
	
	this.mMenusText = new Array();
	this.mMenusText[0] = new Text();
	this.mMenusText[1] = new Text();
	
	this.mDropBottoms = new Array();
	this.mDropBottoms[0] = new Sprite();
	this.mDropBottoms[1] = new Sprite();
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
		
		{
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
			var baseBut = new GUIButton();
			
			baseBut.SetUp(new IVec2(76, 3), new IVec2(54, 26), -5000);
			baseBut.mPos.Set(76, 3);
			
			baseBut.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
			baseBut.mSpriteIdle.SetCurrentFrame(0);
			
			baseBut.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
			baseBut.mSpriteHover.SetCurrentFrame(1);
			
			baseBut.mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
			baseBut.mSpriteDown.SetCurrentFrame(2);
			
			baseBut.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
			baseBut.mSpriteInactive.SetCurrentFrame(0);
			
			this.mMenus[1].SetUp(baseBut);
			this.AddItem(this.mMenus[1], "generate map", false);
			var newPos = new IVec2(0, 0); newPos.Copy(this.mMenus[1].mItems[0].mPos); newPos.mY += 3;
			this.mMenus[1].mItems[0].mPos.Copy(newPos);
			this.mMenus[1].mItems[0].SetSpritePositions(newPos);
			this.mMenus[1].mItemsText[0].mPos.mY += 3;
		}
	}
	
	{
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		
		{
			this.mMenusText[0].SetFont(font);
			this.mMenusText[0].SetFontSize(12);
			this.mMenusText[0].mAbsolute = true;
			this.mMenusText[0].mString = "File";
			this.mMenusText[0].mAlign = "centre";
			this.mMenusText[0].mPos.Set(42, 9);
			this.mMenusText[0].mColour = "#270100";
			this.mMenusText[0].mDepth = -5001;
		}
		
		{
			this.mMenusText[1].SetFont(font);
			this.mMenusText[1].SetFontSize(12);
			this.mMenusText[1].mAbsolute = true;
			this.mMenusText[1].mString = "Play";
			this.mMenusText[1].mAlign = "centre";
			this.mMenusText[1].mPos.Set(102, 9);
			this.mMenusText[1].mColour = "#270100";
			this.mMenusText[1].mDepth = -5001;
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_dropbottom");
		
		{
			var id = this.mMenus[0].mItems.length - 1;
			this.mDropBottoms[0].mPos.Copy(this.mMenus[0].mItems[id].mPos);
			this.mDropBottoms[0].mPos.mY += this.mMenus[0].mItems[id].mSpriteIdle.GetHeight();
			this.mDropBottoms[0].mDepth = -5001;
			this.mDropBottoms[0].SetTexture(tex);
			this.mDropBottoms[0].mAbsolute = true;
		}
		
		{
			var id = this.mMenus[1].mItems.length - 1;
			this.mDropBottoms[1].mPos.Copy(this.mMenus[1].mItems[id].mPos);
			this.mDropBottoms[1].mPos.mY += this.mMenus[1].mItems[id].mSpriteIdle.GetHeight();
			this.mDropBottoms[1].mDepth = -5001;
			this.mDropBottoms[1].SetTexture(tex);
			this.mDropBottoms[1].mAbsolute = true;
		}
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
	
	for (var i = 0; i < this.mMenusText.length; ++i) {
		if (this.mMenus[i].mStatus == "down") {
			this.mMenusText[i].mColour = "#0B0505";
		}
		else if (this.mMenus[i].mStatus == "hover") {
			this.mMenusText[i].mColour = "#501E11";
		}
		else {
			this.mMenusText[i].mColour = "#270100";
		}
	}
	
	{
		if (this.mMenus[0].OnClick(0) == true) {
			currScene.mCreationControl.mDialogueOpen = "new";
		}
		else if (this.mMenus[0].OnClick(1) == true) {
			currScene.mCreationControl.mDialogueOpen = "save";
		}
		else if (this.mMenus[0].OnClick(2) == true) {
			currScene.mCreationControl.mDialogueControl.mDialogues["load"].PopulateSegmentList();
			currScene.mCreationControl.mDialogueOpen = "load";
		}
		else if (this.mMenus[0].OnClick(3) == true) {
			currScene.mCreationControl.mDialogueControl.mDialogues["import"].CreateDOM();
			currScene.mCreationControl.mDialogueOpen = "import";
		}
		else if (this.mMenus[0].OnClick(4) == true) {
			currScene.mCreationControl.mDialogueControl.mDialogues["export"].CreateDOM();
			currScene.mCreationControl.mDialogueOpen = "export";
		}
	}
}

GFGUICreationBar.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	
	for (var i = 0; i < this.mMenus.length; ++i) {
		arr = arr.concat(this.mMenus[i].GetRenderData());
		arr.push(this.mMenusText[i]);
		
		if (this.mMenus[i].mExpanded == true) {
			arr.push(this.mDropBottoms[i]);
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
		
		var tl = new IVec2(0, 2);
		var br = new IVec2(1, 3);
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

