// GFGUICreationBar Class...
// game file:
function GFGUICreationBar() {
	this.mSprite = new Sprite();
	
	this.mMenus = new Array();
	this.mMenus[0] = new GUIDropDown();
}

GFGUICreationBar.prototype.SetUp = function(initOffset) {
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_topbar");
		
		this.mSprite.mPos.Set(8 + initOffset.mX, 10 + initOffset.mY);
		this.mSprite.mDepth = -5000;
		this.mSprite.SetTexture(tex);
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_topmenunew");
		var baseBut = new GUIButton();
		
		baseBut.SetUp(new IVec2(8 + initOffset.mX, 10 + initOffset.mY), new IVec2(54, 24), -5000);
		baseBut.mPos.Set(8, 10);
		
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
		this.AddItem(this.mMenus[0], "old", true);
		this.AddItem(this.mMenus[0], "farts", false);
	}
}

GFGUICreationBar.prototype.Input = function() {
	for (var i = 0; i < this.mMenus.length; ++i) {
		this.mMenus[i].Input();
	}
}

GFGUICreationBar.prototype.Process = function(point, offset) {
	this.mSprite.mPos.mX += offset.mX; this.mSprite.mPos.mY += offset.mY;
	
	for (var i = 0; i < this.mMenus.length; ++i) {
		this.mMenus[i].Process(point);
		
		var newPos = new IVec2(0, 0); newPos.Copy(this.mMenus[i].GetSpritePositions());
		newPos.mX += offset.mX; newPos.mY += offset.mY;
		this.mMenus[i].SetSpritePositions(newPos);
	}
	
	if (this.mMenus[0].OnClick(0) == true) {
		alert("new");
	}
	else if (this.mMenus[0].OnClick(1) == true) {
		alert("old");
	}
	else if (this.mMenus[0].OnClick(2) == true) {
		alert("burps");
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
// ...End

