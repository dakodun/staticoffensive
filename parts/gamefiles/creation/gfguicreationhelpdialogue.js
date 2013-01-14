// GFGUICreationHelpDialogue Class...
// game file:
function GFGUICreationHelpDialogue() {
	this.mSprite = new Sprite();
	
	this.mBackButton = new GUIButton();
	this.mBackText = new Text();
	
	this.mOption = 0;
	this.mRenderCanvas = new RenderCanvas();
	this.mTitleText = new Text();
}

GFGUICreationHelpDialogue.prototype.SetUp = function() {
	var pos = new IVec2(nmain.game.mCanvasSize.mX / 2, nmain.game.mCanvasSize.mY / 2);
	pos.mX -= 250; pos.mY -= 235;
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_helpdialogue_back");
		
		this.mSprite.mPos.Set(pos.mX, pos.mY);
		this.mSprite.mDepth = -5100;
		this.mSprite.SetTexture(tex);
		this.mSprite.mAbsolute = true;
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_confirmbutton");
		
		this.mBackButton.SetUp(new IVec2(pos.mX + 220, pos.mY + 439), new IVec2(60, 26), -5101);
		
		this.mBackButton.mSpriteIdle.SetAnimatedTexture(tex, 4, 1, -1, -1);
		this.mBackButton.mSpriteIdle.SetCurrentFrame(0);
		
		this.mBackButton.mSpriteHover.SetAnimatedTexture(tex, 4, 1, -1, -1);
		this.mBackButton.mSpriteHover.SetCurrentFrame(1);
		
		this.mBackButton.mSpriteDown.SetAnimatedTexture(tex, 4, 1, -1, -1);
		this.mBackButton.mSpriteDown.SetCurrentFrame(2);
		
		this.mBackButton.mSpriteInactive.SetAnimatedTexture(tex, 4, 1, -1, -1);
		this.mBackButton.mSpriteInactive.SetCurrentFrame(3);
	}
	
	{
		{
			var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
			
			this.mBackText.SetFont(font);
			this.mBackText.SetFontSize(12);
			this.mBackText.mAbsolute = true;
			this.mBackText.mString = "Back";
			this.mBackText.mAlign = "centre";
			this.mBackText.mPos.Set(pos.mX + 250, pos.mY + 445);
			this.mBackText.mColour = "#270100";
			this.mBackText.mDepth = -5102;
			
			this.mTitleText.SetFont(font);
			this.mTitleText.SetFontSize(24);
			this.mTitleText.mAbsolute = true;
			this.mTitleText.mString = "Welcome to the Help Screen!";
			this.mTitleText.mAlign = "centre";
			this.mTitleText.mPos.Set(pos.mX + 250, pos.mY + 38);
			this.mTitleText.mColour = "#000000";
			this.mTitleText.mDepth = -5102;
		}
	}
}

GFGUICreationHelpDialogue.prototype.Input = function() {
	this.mBackButton.Input();
}

GFGUICreationHelpDialogue.prototype.Process = function(point) {
	this.mBackButton.Process(point);
	
	this.ProcessTextState();
	this.ProcessButtonClick();
}

GFGUICreationHelpDialogue.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	
	arr = arr.concat(this.mBackButton.GetRenderData());
	arr.push(this.mBackText);
	
	arr.push(this.mTitleText);
	
	return arr;
}

GFGUICreationHelpDialogue.prototype.ProcessTextState = function() {
	if (this.mBackButton.mActive == false) {
		this.mBackText.mColour = "#1E1915";
	}
	else {
		if (this.mBackButton.mStatus == "down") {
			this.mBackText.mColour = "#0B0505";
		}
		else if (this.mBackButton.mStatus == "hover") {
			this.mBackText.mColour = "#501E11";
		}
		else {
			this.mBackText.mColour = "#270100";
		}
	}
}

GFGUICreationHelpDialogue.prototype.ProcessButtonClick = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	if (this.mBackButton.OnClick() == true) {
		if (this.mOption == 0) {
			currScene.mCreationControl.mDialogueOpen = "";
		}
	}
}

GFGUICreationHelpDialogue.prototype.RedrawHelp = function(option) {
	this.mOption = option;
	this.mRenderCanvas.Clear();
	
	if (option == 0) {
		// set title text
		
		// add content
	}
}
// ...End

