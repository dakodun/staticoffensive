// GFGUICreationHelpDialogue "Content: Index" methods
GFGUICreationHelpDialogue.prototype.SetUpIndex = function(pos) {
	{
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		
		for (var i = 0; i < this.mText.length; ++i) {
			this.mText[i].SetFont(font);
			this.mText[i].mAbsolute = true;
			this.mText[i].mDepth = -5102;
		}
	}
	
	{
		this.mText[0].SetFontSize(16);
		this.mText[0].mString = "Editor Controls";
		this.mText[0].mPos.Set(pos.mX + 100, pos.mY + 110);
		this.mText[0].mColour = "#C59687";
		this.mText[0].mJustifyWidth = -1;
		this.mText[0].mAlign = "left";
		
		this.mText[1].SetFontSize(12);
		this.mText[1].mString = "... Map Controls";
		this.mText[1].mPos.Set(pos.mX + 130, pos.mY + 130);
		this.mText[1].mColour = "#88ACDD";
		this.mText[1].mJustifyWidth = 100;
		this.mText[1].mAlign = "justify";
		
		this.mText[2].SetFontSize(12);
		this.mText[2].mString = "... Tile Controls";
		this.mText[2].mPos.Set(pos.mX + 130, pos.mY + 146);
		this.mText[2].mColour = "#88ACDD";
		this.mText[2].mJustifyWidth = 100;
		this.mText[2].mAlign = "justify";
		
		
		this.mText[3].SetFontSize(16);
		this.mText[3].mString = "File Menu";
		this.mText[3].mPos.Set(pos.mX + 100, pos.mY + 172);
		this.mText[3].mColour = "#C59687";
		this.mText[3].mJustifyWidth = -1;
		this.mText[3].mAlign = "left";
		
		this.mText[4].SetFontSize(12);
		this.mText[4].mString = "... New Dialogue";
		this.mText[4].mPos.Set(pos.mX + 130, pos.mY + 192);
		this.mText[4].mColour = "#88ACDD";
		this.mText[4].mJustifyWidth = 120;
		this.mText[4].mAlign = "justify";
		
		this.mText[5].SetFontSize(12);
		this.mText[5].mString = "... Save Dialogue";
		this.mText[5].mPos.Set(pos.mX + 130, pos.mY + 208);
		this.mText[5].mColour = "#88ACDD";
		this.mText[5].mJustifyWidth = 120;
		this.mText[5].mAlign = "justify";
		
		this.mText[6].SetFontSize(12);
		this.mText[6].mString = "... Load Dialogue";
		this.mText[6].mPos.Set(pos.mX + 130, pos.mY + 224);
		this.mText[6].mColour = "#88ACDD";
		this.mText[6].mJustifyWidth = 120;
		this.mText[6].mAlign = "justify";
		
		this.mText[7].SetFontSize(12);
		this.mText[7].mString = "... Import Dialogue";
		this.mText[7].mPos.Set(pos.mX + 130, pos.mY + 240);
		this.mText[7].mColour = "#88ACDD";
		this.mText[7].mJustifyWidth = 120;
		this.mText[7].mAlign = "justify";
		
		this.mText[8].SetFontSize(12);
		this.mText[8].mString = "... Export Dialogue";
		this.mText[8].mPos.Set(pos.mX + 130, pos.mY + 256);
		this.mText[8].mColour = "#88ACDD";
		this.mText[8].mJustifyWidth = 120;
		this.mText[8].mAlign = "justify";
		
		
		this.mText[9].SetFontSize(16);
		this.mText[9].mString = "Play Menu";
		this.mText[9].mPos.Set(pos.mX + 100, pos.mY + 282);
		this.mText[9].mColour = "#C59687";
		this.mText[9].mJustifyWidth = -1;
		this.mText[9].mAlign = "left";
		
		this.mText[10].SetFontSize(12);
		this.mText[10].mString = "... Generate Map Dialogue";
		this.mText[10].mPos.Set(pos.mX + 130, pos.mY + 302);
		this.mText[10].mColour = "#88ACDD";
		this.mText[10].mJustifyWidth = 160;
		this.mText[10].mAlign = "justify";
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("blank");
		
		{
			this.mButtons[0].SetUp(new IVec2(pos.mX + 130, pos.mY + 130), new IVec2(100, 12), -5101);
			this.mButtons[1].SetUp(new IVec2(pos.mX + 130, pos.mY + 146), new IVec2(100, 12), -5101);
			
			this.mButtons[2].SetUp(new IVec2(pos.mX + 130, pos.mY + 192), new IVec2(120, 12), -5101);
			this.mButtons[3].SetUp(new IVec2(pos.mX + 130, pos.mY + 208), new IVec2(120, 12), -5101);
			this.mButtons[4].SetUp(new IVec2(pos.mX + 130, pos.mY + 224), new IVec2(120, 12), -5101);
			this.mButtons[5].SetUp(new IVec2(pos.mX + 130, pos.mY + 240), new IVec2(120, 12), -5101);
			this.mButtons[6].SetUp(new IVec2(pos.mX + 130, pos.mY + 256), new IVec2(120, 12), -5101);
			
			this.mButtons[7].SetUp(new IVec2(pos.mX + 130, pos.mY + 302), new IVec2(160, 12), -5101);
			
			for (var i = 0; i < this.mButtons.length; ++i) {
				this.mButtons[i].mSpriteIdle.SetTexture(tex);
				this.mButtons[i].mSpriteHover.SetTexture(tex);
				this.mButtons[i].mSpriteDown.SetTexture(tex);
				this.mButtons[i].mSpriteInactive.SetTexture(tex);
			}
		}
	}
}

GFGUICreationHelpDialogue.prototype.ProcessIndexTextState = function() {
	document.getElementsByTagName("body")[0].style.cursor = 'auto';
	var hovering = false;
	
	var arr = new Array(1, 2, 4, 5, 6, 7, 8, 10);
	for (var i = 0; i < this.mButtons.length; ++i) {
		if (this.mButtons[i].mStatus == "down") {
			this.mText[arr[i]].mColour = "#43547A";
			hovering = true;
		}
		else if (this.mButtons[i].mStatus == "hover") {
			this.mText[arr[i]].mColour = "#CEE3E9";
			hovering = true;
		}
		else {
			this.mText[arr[i]].mColour = "#88ACDD";
		}
	}
	
	if (hovering == true) {
		document.getElementsByTagName("body")[0].style.cursor = 'pointer';
	}
}

GFGUICreationHelpDialogue.prototype.ProcessIndexButtonClick = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		if (this.mButtons[i].OnClick() == true) {
			this.RedrawHelp(i + 1);
			
			document.getElementsByTagName("body")[0].style.cursor = 'auto';
			break;
		}
	}
}
// ...End

