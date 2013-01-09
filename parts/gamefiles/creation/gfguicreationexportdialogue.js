// GFGUICreationExportDialogue Class...
// game file:
function GFGUICreationExportDialogue() {
	this.mSprite = new Sprite();
	
	this.mDOMExport = new GUIDOMContainer();
	this.mDOMInputBox = new GUIDOMInputBox();
	
	this.mButton = new GUIButton();
	
	this.mExtraText = new Text();
}

GFGUICreationExportDialogue.prototype.SetUp = function() {
	var pos = new IVec2(nmain.game.mCanvasSize.mX / 2, nmain.game.mCanvasSize.mY / 2);
	pos.mX -= 212; pos.mY -= 54;
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_exportdialogue_back");
		
		this.mSprite.mPos.Set(pos.mX, pos.mY);
		this.mSprite.mDepth = -5100;
		this.mSprite.SetTexture(tex);
		this.mSprite.mAbsolute = true;
	}
	
	{
		this.mDOMInputBox.SetUp(new IVec2(pos.mX + 12, pos.mY + 53), "");
		this.mDOMInputBox.SetReadOnly(true);
		this.mDOMInputBox.SetSize(64);
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_cancelbutton");
		
		this.mButton.SetUp(new IVec2(pos.mX + 400, pos.mY + 84), new IVec2(18, 18), -5101);
		
		this.mButton.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButton.mSpriteIdle.SetCurrentFrame(0);
		
		this.mButton.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButton.mSpriteHover.SetCurrentFrame(1);
		
		this.mButton.mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButton.mSpriteDown.SetCurrentFrame(2);
		
		this.mButton.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButton.mSpriteInactive.SetCurrentFrame(0);
	}
	
	{
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		
		{
			this.mExtraText.SetFont(font);
			this.mExtraText.SetFontSize(12);
			this.mExtraText.mAlign = "centre";
			this.mExtraText.mAbsolute = true;
			this.mExtraText.mString = "CTRL + C (or RMB -> Copy) to copy map segment string above.";
			this.mExtraText.mDepth = -5100;
			this.mExtraText.mPos.Set(nmain.game.mCanvasSize.mX / 2, pos.mY + 108 + 6);
			this.mExtraText.mShadow = true;
		}
	}
}

GFGUICreationExportDialogue.prototype.Input = function() {
	this.mButton.Input();
}

GFGUICreationExportDialogue.prototype.Process = function(point) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	this.mDOMExport.Process();
	
	this.mButton.Process(point);
	if (this.mButton.OnClick() == true) {
		this.mDOMExport.Clear();
		currScene.mCreationControl.mDialogueOpen = "";
	}
}

GFGUICreationExportDialogue.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	arr = arr.concat(this.mButton.GetRenderData());
	
	arr.push(this.mExtraText);
	
	return arr;
}

GFGUICreationExportDialogue.prototype.CreateDOM = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	this.mDOMInputBox.SetText(currScene.mMap.ToString());
	
	this.mDOMExport.AddElement(this.mDOMInputBox, "inputBox");
	this.mDOMExport.GetElement("inputBox").SelectAll();
}
// ...End

