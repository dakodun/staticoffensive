// GFGUICreationHelpDialogue "Content: Generate Dialogue" methods
GFGUICreationHelpDialogue.prototype.SetUpContentGenerateDialogue = function(pos) {
	var contentID = 7;
	this.mContent[contentID].SetUp(pos);
	this.mContent[contentID].mRenderCanvas.SetDimensions(new IVec2(454, 336));
	this.mContent[contentID].mRenderCanvas.mPos.Set(pos.mX + 23, pos.mY + 91);
	this.mContent[contentID].mLowerBound = 194;
	this.mContent[contentID].mText[0] = new Text();
	this.mContent[contentID].mText[1] = new Text();
	this.mContent[contentID].mSprites[0] = new Sprite();
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("help_generatedialogue1");
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		
		{
			this.mContent[contentID].mText[0].SetFont(font);
			this.mContent[contentID].mText[0].mDepth = -5102;
			this.mContent[contentID].mText[0].SetFontSize(12);
			this.mContent[contentID].mText[0].mString = "    Generates a playable map from user created segments. " +
					"There are 3 types of segment: initial, regular and final. There can be only 1 initial and final " +
					"segments which are place at the start and end of map generation respectively. Regular segments " +
					"make up the bulk of the map.";
			this.mContent[contentID].mText[0].mPos.Set(0, 0);
			this.mContent[contentID].mText[0].mColour = "#C59687";
			this.mContent[contentID].mText[0].mAlign = "left";
			this.mContent[contentID].mText[0].mWrap = true;
			this.mContent[contentID].mText[0].mWrapWidth = 456;
		}
		
		{
			this.mContent[contentID].mSprites[0].mPos.Set(0, 60);
			this.mContent[contentID].mSprites[0].mDepth = -5100;
			this.mContent[contentID].mSprites[0].SetTexture(tex);
		}
		
		{
			this.mContent[contentID].mText[1].SetFont(font);
			this.mContent[contentID].mText[1].mDepth = -5102;
			this.mContent[contentID].mText[1].SetFontSize(12);
			this.mContent[contentID].mText[1].mString = "a. Unused segments list box; a scrollable list of all saved segments in\n" +
					"       the local storage that are unused.\n" +
					"b. Next/Finish button; go to the next segment type or generate map\n" + 
					"       if done.\n" +
					"c. Cancel button; cancel generation and return to the editor.\n" +
					"d. Back button; return the the previous segment type selection.\n" +
					"e. Used segments list box; a scrollable list of all currently\n" +
					"       used segments.\n" +
					"f. Select/deselect buttons; buttons to transfer between used and unused.\n" +
					"g. Segment preview; a scaled preview of the selected segment.\n" +
					"h. Segment type; the type of segment currently being selected.";
			this.mContent[contentID].mText[1].mPos.Set(0, 394);
			this.mContent[contentID].mText[1].mColour = "#C59687";
			this.mContent[contentID].mText[1].mAlign = "left";
		}
	}
	
	
}
// ...End

