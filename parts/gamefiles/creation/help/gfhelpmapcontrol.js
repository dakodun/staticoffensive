// GFGUICreationHelpDialogue "Content: Map Control" methods
GFGUICreationHelpDialogue.prototype.SetUpContentMapControls = function(pos) {
	var contentID = 0;
	this.mContent[contentID].SetUp(pos);
	this.mContent[contentID].mLowerBound = 126;
	this.mContent[contentID].mText[0] = new Text();
	this.mContent[contentID].mText[1] = new Text();
	this.mContent[contentID].mText[2] = new Text();
	this.mContent[contentID].mText[3] = new Text();
	this.mContent[contentID].mSprites[0] = new Sprite();
	this.mContent[contentID].mSprites[1] = new Sprite();
	
	{
		var tex1 = nmgrs.resMan.mTexStore.GetResource("help_mapcontrol1");
		var tex2 = nmgrs.resMan.mTexStore.GetResource("help_mapcontrol2");
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		
		{
			this.mContent[contentID].mText[0].SetFont(font);
			this.mContent[contentID].mText[0].mDepth = -5102;
			this.mContent[contentID].mText[0].SetFontSize(12);
			this.mContent[contentID].mText[0].mString = "    Moves the camera north, east, south and west, and moves " +
					"up and down z-levels. Allows navigation when working with larger segments and the lowering of " +
					"taller blocks to reveal any smaller blocks that might be masked behind.";
			this.mContent[contentID].mText[0].mPos.Set(0, 0);
			this.mContent[contentID].mText[0].mColour = "#C59687";
			this.mContent[contentID].mText[0].mAlign = "left";
			this.mContent[contentID].mText[0].mWrap = true;
			this.mContent[contentID].mText[0].mWrapWidth = 454;
		}
		
		{
			this.mContent[contentID].mSprites[0].mPos.Set(100, 60);
			this.mContent[contentID].mSprites[0].mDepth = -5100;
			this.mContent[contentID].mSprites[0].SetTexture(tex1);
		}
		
		{
			this.mContent[contentID].mText[1].SetFont(font);
			this.mContent[contentID].mText[1].mDepth = -5102;
			this.mContent[contentID].mText[1].SetFontSize(12);
			this.mContent[contentID].mText[1].mString = "a. Move up or down z-levels (alternative keys: Q and E).\n" +
					"b. Move north, east, south or west (alternative keys: W, D, S and A).";
			this.mContent[contentID].mText[1].mPos.Set(0, 156);
			this.mContent[contentID].mText[1].mColour = "#C59687";
			this.mContent[contentID].mText[1].mAlign = "left";
		}
		
		{
			this.mContent[contentID].mText[2].SetFont(font);
			this.mContent[contentID].mText[2].mDepth = -5102;
			this.mContent[contentID].mText[2].SetFontSize(12);
			this.mContent[contentID].mText[2].mString = "    The segment editing area: left clicking on an empty tile " +
					"or an existing tile will replace it with a tile with the current attributes; hold left click to paint.";
			this.mContent[contentID].mText[2].mPos.Set(0, 204);
			this.mContent[contentID].mText[2].mColour = "#C59687";
			this.mContent[contentID].mText[2].mAlign = "left";
			this.mContent[contentID].mText[2].mWrap = true;
			this.mContent[contentID].mText[2].mWrapWidth = 450;
		}
		
		{
			this.mContent[contentID].mSprites[1].mPos.Set(82, 252);
			this.mContent[contentID].mSprites[1].mDepth = -5100;
			this.mContent[contentID].mSprites[1].SetTexture(tex2);
		}
		
		{
			this.mContent[contentID].mText[3].SetFont(font);
			this.mContent[contentID].mText[3].mDepth = -5102;
			this.mContent[contentID].mText[3].SetFontSize(12);
			this.mContent[contentID].mText[3].mString = "a. Blank tile; a representation for a blank tile (only visible in\n" +
					"       segment editor).\n" +
					"b. Tile highlight; white outline that indicates the currently\n" +
					"       selected tile.";
			this.mContent[contentID].mText[3].mPos.Set(0, 410);
			this.mContent[contentID].mText[3].mColour = "#C59687";
			this.mContent[contentID].mText[3].mAlign = "left";
		}
	}
}
// ...End

