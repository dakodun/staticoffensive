// GFGUICreationNewDialogue Class...
// game file:
function GFGUICreationNewDialogue() {
	this.mSprite = new Sprite();
	
	this.mInputBoxes = new Array();
	this.mInputBoxes[0] = new GUIInputBox();
	this.mInputBoxes[1] = new GUIInputBox();
	
	this.mButtons = new Array();
	this.mButtons[0] = new GUIButton();
	this.mButtons[1] = new GUIButton();
}

GFGUICreationNewDialogue.prototype.SetUp = function(initOffset) {
	var pos = new IVec2(10, 100);
	pos.mX += initOffset.mX; pos.mX += initOffset.mY;
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_back");
		
		this.mSprite.mPos.Set(pos.mX, pos.mY);
		this.mSprite.mDepth = -5100;
		this.mSprite.SetTexture(tex);
	}
	// x input (18, 28)
	// y input (82, 28)
	
	// confirm (36, 64)
	// cancel (112, 72)
}

GFGUICreationNewDialogue.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	
	return arr;
}
// ...End

