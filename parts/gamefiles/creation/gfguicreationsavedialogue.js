// GFGUICreationSaveDialogue Class...
// game file:
function GFGUICreationSaveDialogue() {
	this.mSprite = new Sprite();
	
	this.mInputBox = new GUIInputBox();
	this.mOldString = "";
	
	this.mButtons = new Array();
	this.mButtons[0] = new GUIButton();
	this.mButtons[1] = new GUIButton();
	
	this.mWarningOverwrite = false;
	this.mWarningOutOfMemory = false;
	
	this.mBackText = new Text();
	this.mConfirmText = new Text();
	this.mWarningOverwriteText = new Text();
	this.mWarningOutOfMemoryText = new Text();
}

GFGUICreationSaveDialogue.prototype.SetUp = function() {
	var pos = new IVec2(nmain.game.mCanvasSize.mX / 2, nmain.game.mCanvasSize.mY / 2);
	pos.mX -= 72; pos.mY -= 77;
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_savedialogue_back");
		
		this.mSprite.mPos.Set(pos.mX, pos.mY);
		this.mSprite.mDepth = -5100;
		this.mSprite.SetTexture(tex);
		this.mSprite.mAbsolute = true;
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_savedialogue_textinput");
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		
		this.mInputBox.mInputText.SetFont(font);
		this.mInputBox.mInputText.SetFontSize(12);
		this.mInputBox.mInputText.mColour = "#000000";
		
		this.mInputBox.mRenderCanvas.mPos.Set(4, 2);
		this.mInputBox.mRenderCanvas.mSize.Set(-9, -2);
		
		this.mInputBox.SetUp(new IVec2(pos.mX + 7, pos.mY + 42), new IVec2(130, 22), -5101);
		this.mInputBox.mCaret.mShape.mPos.mY += 2;
		
		{
			this.mInputBox.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mInputBox.mSpriteIdle.SetCurrentFrame(0);
			
			this.mInputBox.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mInputBox.mSpriteHover.SetCurrentFrame(1);
			
			this.mInputBox.mSpriteFocus.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mInputBox.mSpriteFocus.SetCurrentFrame(2);
			
			this.mInputBox.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mInputBox.mSpriteInactive.SetCurrentFrame(0);
		}
	}
	
	{
		{
			var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_confirmbutton");
			
			this.mButtons[0].SetUp(new IVec2(pos.mX + 42, pos.mY + 81), new IVec2(60, 26), -5101);
			
			this.mButtons[0].mSpriteIdle.SetAnimatedTexture(tex, 4, 1, -1, -1);
			this.mButtons[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mButtons[0].mSpriteHover.SetAnimatedTexture(tex, 4, 1, -1, -1);
			this.mButtons[0].mSpriteHover.SetCurrentFrame(1);
			
			this.mButtons[0].mSpriteDown.SetAnimatedTexture(tex, 4, 1, -1, -1);
			this.mButtons[0].mSpriteDown.SetCurrentFrame(2);
			
			this.mButtons[0].mSpriteInactive.SetAnimatedTexture(tex, 4, 1, -1, -1);
			this.mButtons[0].mSpriteInactive.SetCurrentFrame(3);
		}
		
		{
			var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_cancelbutton");
			
			this.mButtons[1].SetUp(new IVec2(pos.mX + 119, pos.mY + 88), new IVec2(18, 18), -5101);
			
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
		
		{
			this.mBackText.SetFont(font);
			this.mBackText.SetFontSize(12);
			this.mBackText.mAbsolute = true;
			this.mBackText.mString = "Enter segment name:";
			this.mBackText.mAlign = "centre";
			this.mBackText.mPos.Set(pos.mX + 72, pos.mY + 26);
			this.mBackText.mColour = "#C8B792";
			this.mBackText.mDepth = -5102;
		}
		
		{
			this.mConfirmText.SetFont(font);
			this.mConfirmText.SetFontSize(12);
			this.mConfirmText.mAbsolute = true;
			this.mConfirmText.mString = "Save";
			this.mConfirmText.mAlign = "centre";
			this.mConfirmText.mPos.Set(pos.mX + 72, pos.mY + 87);
			this.mConfirmText.mColour = "#270100";
			this.mConfirmText.mDepth = -5102;
		}
		
		{
			this.mWarningOverwriteText.SetFont(font);
			this.mWarningOverwriteText.SetFontSize(12);
			this.mWarningOverwriteText.mAbsolute = true;
			this.mWarningOverwriteText.mString = "Warning: overwriting!";
			this.mWarningOverwriteText.mAlign = "centre";
			this.mWarningOverwriteText.mPos.Set(pos.mX + 72, pos.mY + 64);
			this.mWarningOverwriteText.mColour = "#DF5B4E";
			this.mWarningOverwriteText.mDepth = -5102;
		}
		
		{
			this.mWarningOutOfMemoryText.SetFont(font);
			this.mWarningOutOfMemoryText.SetFontSize(12);
			this.mWarningOutOfMemoryText.mAlign = "centre";
			this.mWarningOutOfMemoryText.mAbsolute = true;
			this.mWarningOutOfMemoryText.mDepth = -5100;
			this.mWarningOutOfMemoryText.mPos.Set(nmain.game.mCanvasSize.mX / 2, pos.mY + 113 + 6);
			this.mWarningOutOfMemoryText.mString = "Not enough space left in localStorage to save current segment!\n";
			this.mWarningOutOfMemoryText.mString += "Delete previous segments via the load option in the file menu";
			this.mWarningOutOfMemoryText.mShadow = true;
		}
	}
}

GFGUICreationSaveDialogue.prototype.Input = function() {
	this.mInputBox.Input();
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		this.mButtons[i].Input();
	}
}

GFGUICreationSaveDialogue.prototype.Process = function(point) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{
		this.mInputBox.Process(point);
		
		for (var i = 0; i < this.mButtons.length; ++i) {
			this.mButtons[i].Process(point);
		}
		
		if (this.mButtons[0].mActive == false) {
			this.mConfirmText.mColour = "#1E1915";
		}
		else {
			if (this.mButtons[0].mStatus == "down") {
				this.mConfirmText.mColour = "#0B0505";
			}
			else if (this.mButtons[0].mStatus == "hover") {
				this.mConfirmText.mColour = "#501E11";
			}
			else {
				this.mConfirmText.mColour = "#270100";
			}
		}
	}
	
	{
		if (this.mInputBox.mInputText.mString == "") {
			this.mButtons[0].mActive = false;
		}
		else {
			this.mButtons[0].mActive = true;
		}
		
		if (this.mInputBox.mInputText.mString != this.mOldString) {
			var nameString = "seg";
			nameString += this.mInputBox.mInputText.mString;
			
			var ls = new LocalStorage();
			if (ls.Exists(nameString)) {
				this.mWarningOverwrite = true;
			}
			else {
				this.mWarningOverwrite = false;
			}
		}
	}
	
	{
		if (this.mButtons[0].OnClick() == true) {
			var nameString = "seg";
			nameString += this.mInputBox.mInputText.mString;
			
			var segString = "";
			segString = currScene.mMap.ToString();
			
			var ls = new LocalStorage();
			
			if (ls.Save(nameString, segString, true)) {
				currScene.mCreationControl.mDialogueOpen = "";
				
				this.mWarningOverwrite = false;
				this.mWarningOutOfMemory = false;
				this.mInputBox.SetText("");
			}
			else {
				this.mWarningOutOfMemory = true;
			}
		}
		else if (this.mButtons[1].OnClick() == true) {
			currScene.mCreationControl.mDialogueOpen = "";
			
			this.mWarningOverwrite = false;
			this.mWarningOutOfMemory = false;
			this.mInputBox.SetText("");
		}
	}
	
	this.mOldString = this.mInputBox.mInputText.mString;
}

GFGUICreationSaveDialogue.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	arr = arr.concat(this.mInputBox.GetRenderData());
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		arr = arr.concat(this.mButtons[i].GetRenderData());
	}
	
	arr.push(this.mBackText);
	arr.push(this.mConfirmText);
	
	if (this.mWarningOverwrite == true) {
		arr.push(this.mWarningOverwriteText);
	}
	
	if (this.mWarningOutOfMemory == true) {
		arr.push(this.mWarningOutOfMemoryText);
	}
	
	return arr;
}
// ...End

