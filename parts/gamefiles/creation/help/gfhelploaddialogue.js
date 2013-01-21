// GFGUICreationHelpDialogue "Content: Load Dialogue" methods
GFGUICreationHelpDialogue.prototype.SetUpContentLoadDialogue = function(pos) {
	var contentID = 4;
	this.mContent[contentID].SetUp(pos);
	this.mContent[contentID].mLowerBound = 130;
	this.mContent[contentID].mText[0] = new Text();
	this.mContent[contentID].mText[1] = new Text();
	this.mContent[contentID].mSprites[0] = new Sprite();
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("help_loaddialogue1");
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		
		{
			this.mContent[contentID].mText[0].SetFont(font);
			this.mContent[contentID].mText[0].mDepth = -5102;
			this.mContent[contentID].mText[0].SetFontSize(12);
			this.mContent[contentID].mText[0].mString = "    Loads the saved segment into the editor; "
					+ "any unsaved changes will be lost.";
			this.mContent[contentID].mText[0].mPos.Set(0, 0);
			this.mContent[contentID].mText[0].mColour = "#C59687";
			this.mContent[contentID].mText[0].mAlign = "left";
			this.mContent[contentID].mText[0].mWrap = true;
			this.mContent[contentID].mText[0].mWrapWidth = 454;
		}
		
		{
			this.mContent[contentID].mSprites[0].mPos.Set(63, 36);
			this.mContent[contentID].mSprites[0].mDepth = -5100;
			this.mContent[contentID].mSprites[0].SetTexture(tex);
		}
		
		{
			this.mContent[contentID].mText[1].SetFont(font);
			this.mContent[contentID].mText[1].mDepth = -5102;
			this.mContent[contentID].mText[1].SetFontSize(12);
			this.mContent[contentID].mText[1].mString = "a. Saved segments list box; a scrollable list of all saved segments\n" +
					"       in the local storage.\n" +
					"b. Load button; load the selected segment from local storage and\n" +
					"      return to the editor.\n" +
					"c. Cancel button; cancel load and return to the editor.\n" +
					"d. Delete button; delete the selected segment from local storage.\n" +
					"e. Segment preview; a scaled preview of the selected segment.";
			this.mContent[contentID].mText[1].mPos.Set(0, 370);
			this.mContent[contentID].mText[1].mColour = "#C59687";
			this.mContent[contentID].mText[1].mAlign = "left";
		}
	}
}
// ...End

