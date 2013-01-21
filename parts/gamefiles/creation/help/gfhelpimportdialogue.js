// GFGUICreationHelpDialogue "Content: Import Dialogue" methods
GFGUICreationHelpDialogue.prototype.SetUpContentImportDialogue = function(pos) {
	var contentID = 5;
	this.mContent[contentID].SetUp(pos);
	this.mContent[contentID].mText[0] = new Text();
	this.mContent[contentID].mText[1] = new Text();
	this.mContent[contentID].mSprites[0] = new Sprite();
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("help_importdialogue1");
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		
		{
			this.mContent[contentID].mText[0].SetFont(font);
			this.mContent[contentID].mText[0].mDepth = -5102;
			this.mContent[contentID].mText[0].SetFontSize(12);
			this.mContent[contentID].mText[0].mString = "    Imports a segment (in string format) from the " +
					"clipboard; any unsaved changes will be lost.";
			this.mContent[contentID].mText[0].mPos.Set(0, 0);
			this.mContent[contentID].mText[0].mColour = "#C59687";
			this.mContent[contentID].mText[0].mAlign = "left";
			this.mContent[contentID].mText[0].mWrap = true;
			this.mContent[contentID].mText[0].mWrapWidth = 448;
		}
		
		{
			this.mContent[contentID].mSprites[0].mPos.Set(12, 36);
			this.mContent[contentID].mSprites[0].mDepth = -5100;
			this.mContent[contentID].mSprites[0].SetTexture(tex);
		}
		
		{
			this.mContent[contentID].mText[1].SetFont(font);
			this.mContent[contentID].mText[1].mDepth = -5102;
			this.mContent[contentID].mText[1].SetFontSize(12);
			this.mContent[contentID].mText[1].mString = "a. Segment string input box; an input box for the pasting of\n" +
					"       segment string.\n" +
					"b. Import button; convert the string into a segment, load it and\n" +
					"       return to the editor.\n" +
					"c. Cancel button; cancel import and return to the editor.";
			this.mContent[contentID].mText[1].mPos.Set(0, 156);
			this.mContent[contentID].mText[1].mColour = "#C59687";
			this.mContent[contentID].mText[1].mAlign = "left";
		}
	}
}
// ...End

