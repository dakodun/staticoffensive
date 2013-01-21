function GFHelpContent() {
	this.mCam = new Camera();
	this.mRenderCanvas = new RenderCanvas();
	
	this.mSprites = new Array();
	this.mText = new Array();
	
	this.mRedraw = true;
	
	this.mLowerBound = 0;
};

GFHelpContent.prototype.SetUp = function(pos) {
	this.mRenderCanvas.mPos.Set(pos.mX + 26, pos.mY + 91);
	this.mRenderCanvas.SetDimensions(new IVec2(448, 336));
	
	this.mRenderCanvas.mDepth = -5101;
	this.mRenderCanvas.mAbsolute = true;
	
	this.mRenderCanvas.mFrustrumCull = false;
}

GFHelpContent.prototype.Process = function() {
	if (this.mRedraw == true) {
		this.mRenderCanvas.Clear();
		var arr = new Array();
		
		for (var i = 0; i < this.mText.length; ++i) {
			arr.push(this.mText[i]);
		}
		
		for (var i = 0; i < this.mSprites.length; ++i) {
			arr.push(this.mSprites[i]);
		}
		
		{
			var arrSort = new Array();
			for (var i = 0; i < arr.length; ++i) {
				var element = new RenderBatchSortElement();
				element.mID = i;
				element.mDepth = arr[i].mDepth;
				
				arrSort.push(element);
			}
			
			arrSort.sort(DepthSort);
			
			var temp = new Array();
			for (var i = 0; i < arr.length; ++i) {
				temp.push(arr[arrSort[i].mID]);
			}
			
			arr.splice(0, arr.length);
			arr = arr.concat(temp);
		}
		
		this.mRenderCanvas.mContext.save();
		for (var i = 0; i < arr.length; ++i) {
			this.mRenderCanvas.RenderTo(arr[i], this.mCam);
		}
		
		this.mRenderCanvas.mContext.restore();
		
		this.mRedraw = false;
	}
}

GFHelpContent.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mRenderCanvas);
	
	return arr;
}


// GFGUICreationHelpDialogue Class...
// game file:
function GFGUICreationHelpDialogue() {
	this.mSprite = new Sprite();
	
	this.mBackButton = new GUIButton();
	this.mBackText = new Text();
	
	this.mArrows = new Array();
	this.mArrows[0] = new GUIButton();
	this.mArrows[1] = new GUIButton();
	
	this.mOption = 0;
	this.mTitleText = new Text();
	this.mSubtitleText = new Text();
	
	{
		this.mButtons = new Array();
		this.mButtons[0] = new GUIButton();
		this.mButtons[1] = new GUIButton();
		this.mButtons[2] = new GUIButton();
		this.mButtons[3] = new GUIButton();
		this.mButtons[4] = new GUIButton();
		this.mButtons[5] = new GUIButton();
		this.mButtons[6] = new GUIButton();
		this.mButtons[7] = new GUIButton();
		
		this.mText = new Array();
		this.mText[0] = new Text();
		this.mText[1] = new Text();
		this.mText[2] = new Text();
		this.mText[3] = new Text();
		this.mText[4] = new Text();
		this.mText[5] = new Text();
		this.mText[6] = new Text();
		this.mText[7] = new Text();
		this.mText[8] = new Text();
		this.mText[9] = new Text();
		this.mText[10] = new Text();
	}
	
	this.mContent = new Array();
	this.mContent[0] = new GFHelpContent();
	this.mContent[1] = new GFHelpContent();
	
	this.mContent[2] = new GFHelpContent();
	this.mContent[3] = new GFHelpContent();
	this.mContent[4] = new GFHelpContent();
	this.mContent[5] = new GFHelpContent();
	this.mContent[6] = new GFHelpContent();
	
	this.mContent[7] = new GFHelpContent();
};

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
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_loaddialogue_listbox_arrows");
		
		{
			this.mArrows[0].SetUp(new IVec2(pos.mX + 476, pos.mY + 38), new IVec2(16, 16), -5101);
			
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
			this.mArrows[1].SetUp(new IVec2(pos.mX + 476, pos.mY + 447), new IVec2(16, 16), -5101);
			
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
			this.mTitleText.mColour = "#C59687";
			this.mTitleText.mDepth = -5102;
			this.mTitleText.mShadow = true;
			this.mTitleText.mShadowColour = "#80433C";
			
			this.mSubtitleText.SetFont(font);
			this.mSubtitleText.SetFontSize(18);
			this.mSubtitleText.mAbsolute = true;
			this.mSubtitleText.mString = "Do you need help? Then select and option below:";
			this.mSubtitleText.mAlign = "centre";
			this.mSubtitleText.mPos.Set(pos.mX + 250, pos.mY + 62);
			this.mSubtitleText.mColour = "#9C5249";
			this.mSubtitleText.mDepth = -5102;
		}
	}
	
	{
		this.SetUpIndex(pos);
		
		this.SetUpContentMapControls(pos);
		this.SetUpContentTileControls(pos);
		
		this.SetUpContentNewDialogue(pos);
		this.SetUpContentSaveDialogue(pos);
		this.SetUpContentLoadDialogue(pos);
		this.SetUpContentImportDialogue(pos);
		this.SetUpContentExportDialogue(pos);
		
		this.SetUpContentGenerateDialogue(pos);
	}
}

GFGUICreationHelpDialogue.prototype.Input = function() {
	this.mBackButton.Input();
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		this.mButtons[i].Input();
	}
	
	for (var i = 0; i < this.mArrows.length; ++i) {
		this.mArrows[i].Input();
	}
}

GFGUICreationHelpDialogue.prototype.Process = function(point) {
	this.mBackButton.Process(point);
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		this.mButtons[i].Process(point);
	}
	
	for (var i = 0; i < this.mArrows.length; ++i) {
		this.mArrows[i].Process(point);
	}
	
	this.ProcessTextState();
	this.ProcessButtonClick();
	
	if (this.mOption == 0) {
		this.ProcessIndexTextState();
		this.ProcessIndexButtonClick();
	}
	
	if (this.mOption > 0) {
		this.mContent[this.mOption - 1].Process();
	}
}

GFGUICreationHelpDialogue.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	
	arr = arr.concat(this.mBackButton.GetRenderData());
	arr.push(this.mBackText);
	
	arr.push(this.mTitleText);
	arr.push(this.mSubtitleText);
	
	if (this.mOption == 0) {
		for (var i = 0; i < this.mText.length; ++i) {
			arr.push(this.mText[i]);
		}
	}
	else {
		if (this.mContent[this.mOption - 1].mCam.mTranslate.mY > 0) {
			arr = arr.concat(this.mArrows[0].GetRenderData());
		}
		
		if (this.mContent[this.mOption - 1].mCam.mTranslate.mY < this.mContent[this.mOption - 1].mLowerBound) {
			arr = arr.concat(this.mArrows[1].GetRenderData());
		}
		
		arr = arr.concat(this.mContent[this.mOption - 1].GetRenderData());
	}
	
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
		else {
			this.RedrawHelp(0);
		}
	}
	
	if (this.mOption > 0) {
		if (this.mArrows[0].mDown == true) {
			if (this.mContent[this.mOption - 1].mCam.mTranslate.mY > 0) {
				this.mContent[this.mOption - 1].mCam.Translate(new IVec2(0, -4));
				this.mContent[this.mOption - 1].mRedraw = true;
			}
		}
		else if (this.mArrows[1].mDown == true) {
			if (this.mContent[this.mOption - 1].mCam.mTranslate.mY < this.mContent[this.mOption - 1].mLowerBound) {
				this.mContent[this.mOption - 1].mCam.Translate(new IVec2(0, 4));
				this.mContent[this.mOption - 1].mRedraw = true;
			}
		}
	}
}

GFGUICreationHelpDialogue.prototype.RedrawHelp = function(option) {
	this.mOption = option;
	
	if (option == 0) {
		this.mTitleText.mString = "Welcome to the Help Screen!";
		this.mSubtitleText.mString = "Do you need help? Then select and option below:";
	}
	else if (option == 1) {
		this.mTitleText.mString = "Editor Controls";
		this.mSubtitleText.mString = "Map Controls";
	}
	else if (option == 2) {
		this.mTitleText.mString = "Editor Controls";
		this.mSubtitleText.mString = "Tile Controls";
	}
	else if (option == 3) {
		this.mTitleText.mString = "File Menu";
		this.mSubtitleText.mString = "New Dialogue";
	}
	else if (option == 4) {
		this.mTitleText.mString = "File Menu";
		this.mSubtitleText.mString = "Save Dialogue";
	}
	else if (option == 5) {
		this.mTitleText.mString = "File Menu";
		this.mSubtitleText.mString = "Load Dialogue";
	}
	else if (option == 6) {
		this.mTitleText.mString = "File Menu";
		this.mSubtitleText.mString = "Import Dialogue";
	}
	else if (option == 7) {
		this.mTitleText.mString = "File Menu";
		this.mSubtitleText.mString = "Export Dialogue";
	}
	else if (option == 8) {
		this.mTitleText.mString = "Play Menu";
		this.mSubtitleText.mString = "Export Dialogue";
	}
}
// ...End

