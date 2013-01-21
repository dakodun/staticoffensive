// GFGUICreationHelpDialogue "Content: Tile Control" methods
GFGUICreationHelpDialogue.prototype.SetUpContentTileControls = function(pos) {
	var contentID = 1;
	this.mContent[contentID].SetUp(pos);
	this.mContent[contentID].mLowerBound = 74;
	this.mContent[contentID].mText[0] = new Text();
	this.mContent[contentID].mText[1] = new Text();
	this.mContent[contentID].mSprites[0] = new Sprite();
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("help_tilecontrol1");
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		
		{
			this.mContent[contentID].mText[0].SetFont(font);
			this.mContent[contentID].mText[0].mDepth = -5102;
			this.mContent[contentID].mText[0].SetFontSize(12);
			this.mContent[contentID].mText[0].mString = "    Controls various attributes for the current tile " + 
					"(the tile that will be placed with left click) such as the " +
					"height, direction, special attributes and texture.";
			this.mContent[contentID].mText[0].mPos.Set(0, 0);
			this.mContent[contentID].mText[0].mColour = "#C59687";
			this.mContent[contentID].mText[0].mAlign = "left";
			this.mContent[contentID].mText[0].mWrap = true;
			this.mContent[contentID].mText[0].mWrapWidth = 454;
		}
		
		{
			this.mContent[contentID].mSprites[0].mPos.Set(139, 48);
			this.mContent[contentID].mSprites[0].mDepth = -5100;
			this.mContent[contentID].mSprites[0].SetTexture(tex);
		}
		
		{
			this.mContent[contentID].mText[1].SetFont(font);
			this.mContent[contentID].mText[1].mDepth = -5102;
			this.mContent[contentID].mText[1].SetFontSize(12);
			this.mContent[contentID].mText[1].mString = "a. A visual example of the current tile.\n" +
					"b. The height of the current tile from 0 (blank) to 6 including slopes.\n" +
					"c. The direction of the tile's slope (if applicable); low to high.\n" +
					"d. Sets the current tile's special status (entrance, exit, both or none).\n" +
					"       The special status is used for connectivity during map generation.\n" +
					"e. Goes to the texture selection scene to change the current texture.\n";
			this.mContent[contentID].mText[1].mPos.Set(0, 333);
			this.mContent[contentID].mText[1].mColour = "#C59687";
			this.mContent[contentID].mText[1].mAlign = "left";
		}
	}
	
	
}
// ...End

