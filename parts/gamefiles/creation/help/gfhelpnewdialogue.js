// GFGUICreationHelpDialogue "Content: New Dialogue" methods
GFGUICreationHelpDialogue.prototype.SetUpContentNewDialogue = function(pos) {
	var contentID = 2;
	this.mContent[contentID].SetUp(pos);
	this.mContent[contentID].mText[0] = new Text();
	this.mContent[contentID].mText[1] = new Text();
	this.mContent[contentID].mSprites[0] = new Sprite();
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("help_newdialogue1");
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		
		{
			this.mContent[contentID].mText[0].SetFont(font);
			this.mContent[contentID].mText[0].mDepth = -5102;
			this.mContent[contentID].mText[0].SetFontSize(12);
			this.mContent[contentID].mText[0].mString = "    Creates a new (blank) segment of the specified " +
					"dimensions (x, y); any unsaved changes will be lost. The minimum size is (1, 1) and the " +
					"maximum size is (20, 20).";
			this.mContent[contentID].mText[0].mPos.Set(0, 0);
			this.mContent[contentID].mText[0].mColour = "#C59687";
			this.mContent[contentID].mText[0].mAlign = "left";
			this.mContent[contentID].mText[0].mWrap = true;
			this.mContent[contentID].mText[0].mWrapWidth = 454;
		}
		
		{
			this.mContent[contentID].mSprites[0].mPos.Set(156, 48);
			this.mContent[contentID].mSprites[0].mDepth = -5100;
			this.mContent[contentID].mSprites[0].SetTexture(tex);
		}
		
		{
			this.mContent[contentID].mText[1].SetFont(font);
			this.mContent[contentID].mText[1].mDepth = -5102;
			this.mContent[contentID].mText[1].SetFontSize(12);
			this.mContent[contentID].mText[1].mString = "a. X and Y input boxes; sets the dimensions of the new segment.\n" +
					"       Only accepts valid input.\n" +
					"b. Create button; create new segment of the specified dimensions and\n" +
					"       return to editor.\n" +
					"c. Cancel button; cancel creation and return to the editor.";
			this.mContent[contentID].mText[1].mPos.Set(0, 156);
			this.mContent[contentID].mText[1].mColour = "#C59687";
			this.mContent[contentID].mText[1].mAlign = "left";
		}
	}
}
// ...End

