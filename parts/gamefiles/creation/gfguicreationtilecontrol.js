// GFGUICreationTileControl Class...
// game file:
function GFGUICreationTileControl() {
	this.mCurrTile = new GFMapTile();
	
	{
		this.mCurrTileText = new Array();
		this.mCurrTileText[0] = new Text();
		this.mCurrTileText[1] = new Text();
		this.mCurrTileText[2] = new Text();
		this.mCurrTileText[3] = new Text();
		this.mCurrTileText[4] = new Text();
		this.mCurrTileText[5] = new Text();
		
		this.mCurrTileText[6] = new Text();
		this.mCurrTileText[7] = new Text();
		
		this.mCurrTileText[8] = new Text();
	}
	
	{
		this.mOptionsArrows = new Array();
		this.mOptionsArrows[0] = new GUIButton();
		this.mOptionsArrows[1] = new GUIButton();
		this.mOptionsArrows[2] = new GUIButton();
		this.mOptionsArrows[3] = new GUIButton();
		this.mOptionsArrows[4] = new GUIButton();
		this.mOptionsArrows[5] = new GUIButton();
		
		this.mSetTexture = new GUIButton();
	}
	
	this.mCurrentType = 0;
	this.mCurrentTexture = "";
	
	{
		this.mZLevels = new Array();
		this.mZLevels[0] = "1";
		this.mZLevels[1] = "1.5";
		this.mZLevels[2] = "2";
		this.mZLevels[3] = "2.5";
		this.mZLevels[4] = "3";
		this.mZLevels[5] = "3.5";
		this.mZLevels[6] = "4";
		this.mZLevels[7] = "-";
		
		this.mSlopeDirections = new Array();
		this.mSlopeDirections[0] = "North";
		this.mSlopeDirections[1] = "East";
		this.mSlopeDirections[2] = "South";
		this.mSlopeDirections[3] = "West";
		
		this.mTypesTile = new Array();
		this.mTypesTile[0] = "o";
		this.mTypesTile[1] = "e";
		this.mTypesTile[2] = "x";
		this.mTypesTile[3] = "b";
		
		this.mTypes = new Array();
		this.mTypes[0] = "None";
		this.mTypes[1] = "Entrance\nOnly";
		this.mTypes[2] = "Exit\nOnly";
		this.mTypes[3] = "Entrance\n& Exit";
	}
}

GFGUICreationTileControl.prototype.SetUp = function(initTex) {
	this.mCurrentTexture = initTex;
	var pos = new IVec2(520, 178);
	
	{ // set up the example tile
		var tex = nmgrs.resMan.mTexStore.GetResource(this.mCurrentTexture);
		
		var tile = new GFMapTile();
		tile.mZ = 0;
		tile.mSlopeDirection = 0;
		tile.mSpecial = "o";
		tile.SetUp(tex);
		this.mCurrTile = tile;
		
		this.mCurrTile.mSprite.mPos.Set(pos.mX, pos.mY);
		this.mCurrTile.mSprite.mDepth = -5000;
		this.mCurrTile.mSprite.mAbsolute = true;
	}
	
	this.SetUpText(pos); // set up the gui text
	this.SetUpButtons(pos); // set up the gui buttons
};

GFGUICreationTileControl.prototype.Input = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	for (var i = 0; i < this.mOptionsArrows.length; ++i) {
		this.mOptionsArrows[i].Input();
	}
	
	this.mSetTexture.Input();
	
	if (nmgrs.inputMan.GetMouseDown(nmouse.button.code.left)) {
		var tile = currScene.mMap.mCurrentTile;
		if (tile != -1) {
			var tex = nmgrs.resMan.mTexStore.GetResource(this.mCurrentTexture);
			
			currScene.mMap.mSegment.mTiles[tile].mBlank = false;
			currScene.mMap.mSegment.mTiles[tile].mZ = this.mCurrTile.mZ;
			currScene.mMap.mSegment.mTiles[tile].mSlopeDirection = this.mCurrTile.mSlopeDirection;
			currScene.mMap.mSegment.mTiles[tile].mSpecial = this.mCurrTile.mSpecial;
			
			currScene.mMap.mSegment.mTiles[tile].SetUp(tex);
			currScene.mMap.mSegment.mTiles[tile].ChangeZLevel(currScene.mMap.mSegment.mCurrZLevel);
			
			currScene.mMap.SetTileBounds(tile);
			currScene.mMap.SetTileSpecial(tile);
		}
	}
}

GFGUICreationTileControl.prototype.Process = function(point) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{
		for (var i = 0; i < this.mOptionsArrows.length; ++i) {
			this.mOptionsArrows[i].Process(point);
		}
		
		this.mSetTexture.Process(point);
		
		if (this.mSetTexture.mStatus == "down") {
			this.mCurrTileText[6].mColour = "#0B0505";
		}
		else if (this.mSetTexture.mStatus == "hover") {
			this.mCurrTileText[6].mColour = "#501E11";
		}
		else {
			this.mCurrTileText[6].mColour = "#270100";
		}
	}
	
	{
		if (this.mOptionsArrows[0].OnClick() == true) {
			this.mCurrTile.mZ--;
			if (this.mCurrTile.mZ < 0) {
				this.mCurrTile.mZ = 7;
			}
			
			this.UpdateTileSprite();
			this.mCurrTileText[3].mString = this.mZLevels[this.mCurrTile.mZ];
			
			{
				this.mCurrTileText[8].mPos.Copy(this.mCurrTile.mSprite.mPos);
				this.mCurrTileText[8].mPos.mX += 30;
				this.mCurrTileText[8].mPos.mY += 8 + (8 * (3 - Math.floor(this.mCurrTile.mZ / 2)));
				
				if (this.mCurrTile.mZ % 2 != 0) {
					this.mCurrTileText[8].mPos.mY -= 4;
				}
			}
		}
		else if (this.mOptionsArrows[1].OnClick() == true) {
			this.mCurrTile.mZ = (this.mCurrTile.mZ + 1) % 8;
			
			this.UpdateTileSprite();
			this.mCurrTileText[3].mString = this.mZLevels[this.mCurrTile.mZ];
			
			{
				this.mCurrTileText[8].mPos.Copy(this.mCurrTile.mSprite.mPos);
				this.mCurrTileText[8].mPos.mX += 30;
				this.mCurrTileText[8].mPos.mY += 8 + (8 * (3 - Math.floor(this.mCurrTile.mZ / 2)));
				
				if (this.mCurrTile.mZ % 2 != 0) {
					this.mCurrTileText[8].mPos.mY -= 4;
				}
			}
		}
		else if (this.mOptionsArrows[2].OnClick() == true) {
			this.mCurrTile.mSlopeDirection--;
			if (this.mCurrTile.mSlopeDirection < 0) {
				this.mCurrTile.mSlopeDirection = 3;
			}
			
			this.UpdateTileSprite();
			this.mCurrTileText[4].mString = this.mSlopeDirections[this.mCurrTile.mSlopeDirection];
		}
		else if (this.mOptionsArrows[3].OnClick() == true) {
			this.mCurrTile.mSlopeDirection = (this.mCurrTile.mSlopeDirection + 1) % 4;
			
			this.UpdateTileSprite();
			this.mCurrTileText[4].mString = this.mSlopeDirections[this.mCurrTile.mSlopeDirection];
		}
		else if (this.mOptionsArrows[4].OnClick() == true) {
			this.mCurrentType--;
			if (this.mCurrentType < 0) {
				this.mCurrentType = 3;
			}
			
			this.mCurrTile.mSpecial = this.mTypesTile[this.mCurrentType];
			this.mCurrTileText[5].mString = this.mTypes[this.mCurrentType];
			
			{
				switch (this.mCurrTile.mSpecial) {
					case 'e' :
						this.mCurrTileText[8].mString = "Ent";
						break;
					case 'x' :
						this.mCurrTileText[8].mString = "Ext";
						break;
					case 'b' :
						this.mCurrTileText[8].mString = "Bth";
						break;
					case 'o' :
						this.mCurrTileText[8].mString = "";
						break;
				}
			}
		}
		else if (this.mOptionsArrows[5].OnClick() == true) {
			this.mCurrentType = (this.mCurrentType + 1) % 4;
			
			this.mCurrTile.mSpecial = this.mTypesTile[this.mCurrentType];
			this.mCurrTileText[5].mString = this.mTypes[this.mCurrentType];
			
			{
				switch (this.mCurrTile.mSpecial) {
					case 'e' :
						this.mCurrTileText[8].mString = "Ent";
						break;
					case 'x' :
						this.mCurrTileText[8].mString = "Ext";
						break;
					case 'b' :
						this.mCurrTileText[8].mString = "Bth";
						break;
					case 'o' :
						this.mCurrTileText[8].mString = "";
						break;
				}
			}
		}
		else if (this.mSetTexture.OnClick() == true) {
			currScene.mPersist = true;
			nmgrs.sceneMan.ReadyScene(new GFTexSelScene());
			nmgrs.sceneMan.SwitchScene();
		}
	}
}

GFGUICreationTileControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	for (var i = 0; i < this.mCurrTileText.length - 1; ++i) {
		arr.push(this.mCurrTileText[i]);
	}
	
	if (this.mCurrTile.mBlank == false) {
		arr.push(this.mCurrTileText[8]);
	}
	
	arr = arr.concat(this.mCurrTile.GetRenderData());
	
	for (var i = 0; i < this.mOptionsArrows.length; ++i) {
		arr = arr.concat(this.mOptionsArrows[i].GetRenderData());
	}
	
	arr = arr.concat(this.mSetTexture.GetRenderData());
	
	return arr;
}

GFGUICreationTileControl.prototype.SetUpText = function(pos) {
	var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
	
	{	
		for (var i = 0; i < this.mCurrTileText.length; ++i) {
			this.mCurrTileText[i].SetFont(font);
			this.mCurrTileText[i].SetFontSize(24);
			this.mCurrTileText[i].mAlign = "centre";
			this.mCurrTileText[i].mAbsolute = true;
		}
		
		this.mCurrTileText[0].SetFontSize(12);
		this.mCurrTileText[0].mString = "Z - Level";
		this.mCurrTileText[0].mPos.Set(pos.mX + 31, pos.mY + 70);
		this.mCurrTileText[0].mColour = "#000000";
		
		this.mCurrTileText[1].SetFontSize(12);
		this.mCurrTileText[1].mString = "Slope Direction";
		this.mCurrTileText[1].mPos.Set(pos.mX + 31, pos.mY + 120);
		this.mCurrTileText[1].mColour = "#000000";
		
		this.mCurrTileText[2].SetFontSize(12);
		this.mCurrTileText[2].mString = "Type";
		this.mCurrTileText[2].mPos.Set(pos.mX + 31, pos.mY + 170);
		this.mCurrTileText[2].mColour = "#000000";
		
		this.mCurrTileText[6].SetFontSize(23);
		this.mCurrTileText[6].mString = "Set Texture";
		this.mCurrTileText[6].mPos.Set(pos.mX + 32, pos.mY + 245);
		this.mCurrTileText[6].mColour = "#270100";
	}
	
	{
		this.mCurrTileText[3].mString = "1";
		this.mCurrTileText[3].mPos.Set(pos.mX + 31, pos.mY + 80);
		this.mCurrTileText[3].mShadow = true;
		
		this.mCurrTileText[4].mString = "North";
		this.mCurrTileText[4].mPos.Set(pos.mX + 31, pos.mY + 130);
		this.mCurrTileText[4].mShadow = true;
		
		this.mCurrTileText[5].mString = "None";
		this.mCurrTileText[5].mPos.Set(pos.mX + 31, pos.mY + 180);
		this.mCurrTileText[5].mShadow = true;
		
		this.mCurrTileText[7].SetFontSize(12);
		this.mCurrTileText[7].mString = this.mCurrentTexture;
		this.mCurrTileText[7].mPos.Set(pos.mX + 31, pos.mY + 280);
		this.mCurrTileText[7].mColour = "#000000";
	}
	
	{
		this.mCurrTileText[8].SetFontSize(12);
		this.mCurrTileText[8].mString = "";
		this.mCurrTileText[8].mShadow = true;
		this.mCurrTileText[8].mDepth = this.mCurrTile.mSprite.mDepth - 1;
		
		this.mCurrTileText[8].mPos.Copy(this.mCurrTile.mSprite.mPos);
		this.mCurrTileText[8].mPos.mX += 30;
		this.mCurrTileText[8].mPos.mY += 8 + (8 * (3 - Math.floor(this.mCurrTile.mZ / 2)));
		
		if (this.mCurrTile.mZ % 2 != 0) {
			this.mCurrTileText[8].mPos.mY -= 4;
		}
	}
}

GFGUICreationTileControl.prototype.SetUpButtons = function(pos) {
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_arrows");
		
		{
			this.mOptionsArrows[0].SetUp(new IVec2(pos.mX - 49, pos.mY + 70), new IVec2(22, 38), -5000);
			this.mOptionsArrows[0].mPos.Set(pos.mX - 49, pos.mY + 70);
			
			this.mOptionsArrows[0].mSpriteIdle.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mOptionsArrows[0].mSpriteHover.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[0].mSpriteHover.SetCurrentFrame(2);
			
			this.mOptionsArrows[0].mSpriteDown.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[0].mSpriteDown.SetCurrentFrame(4);
			
			this.mOptionsArrows[0].mSpriteInactive.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mOptionsArrows[1].SetUp(new IVec2(pos.mX + 91, pos.mY + 70), new IVec2(22, 38), -5000);
			this.mOptionsArrows[1].mPos.Set(pos.mX + 91, pos.mY + 70);
			
			this.mOptionsArrows[1].mSpriteIdle.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[1].mSpriteIdle.SetCurrentFrame(1);
			
			this.mOptionsArrows[1].mSpriteHover.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[1].mSpriteHover.SetCurrentFrame(3);
			
			this.mOptionsArrows[1].mSpriteDown.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[1].mSpriteDown.SetCurrentFrame(5);
			
			this.mOptionsArrows[1].mSpriteInactive.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[1].mSpriteInactive.SetCurrentFrame(1);
		}
		
		{
			this.mOptionsArrows[2].SetUp(new IVec2(pos.mX - 49, pos.mY + 120), new IVec2(22, 38), -5000);
			this.mOptionsArrows[2].mPos.Set(pos.mX - 49, pos.mY + 120);
			
			this.mOptionsArrows[2].mSpriteIdle.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[2].mSpriteIdle.SetCurrentFrame(0);
			
			this.mOptionsArrows[2].mSpriteHover.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[2].mSpriteHover.SetCurrentFrame(2);
			
			this.mOptionsArrows[2].mSpriteDown.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[2].mSpriteDown.SetCurrentFrame(4);
			
			this.mOptionsArrows[2].mSpriteInactive.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[2].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mOptionsArrows[3].SetUp(new IVec2(pos.mX + 91, pos.mY + 120), new IVec2(22, 38), -5000);
			this.mOptionsArrows[3].mPos.Set(pos.mX + 91, pos.mY + 120);
			
			this.mOptionsArrows[3].mSpriteIdle.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[3].mSpriteIdle.SetCurrentFrame(1);
			
			this.mOptionsArrows[3].mSpriteHover.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[3].mSpriteHover.SetCurrentFrame(3);
			
			this.mOptionsArrows[3].mSpriteDown.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[3].mSpriteDown.SetCurrentFrame(5);
			
			this.mOptionsArrows[3].mSpriteInactive.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[3].mSpriteInactive.SetCurrentFrame(1);
		}
		
		{
			this.mOptionsArrows[4].SetUp(new IVec2(pos.mX - 49, pos.mY + 170), new IVec2(22, 38), -5000);
			this.mOptionsArrows[4].mPos.Set(pos.mX - 49, pos.mY + 170);
			
			this.mOptionsArrows[4].mSpriteIdle.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[4].mSpriteIdle.SetCurrentFrame(0);
			
			this.mOptionsArrows[4].mSpriteHover.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[4].mSpriteHover.SetCurrentFrame(2);
			
			this.mOptionsArrows[4].mSpriteDown.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[4].mSpriteDown.SetCurrentFrame(4);
			
			this.mOptionsArrows[4].mSpriteInactive.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[4].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mOptionsArrows[5].SetUp(new IVec2(pos.mX + 91, pos.mY + 170), new IVec2(22, 38), -5000);
			this.mOptionsArrows[5].mPos.Set(pos.mX + 91, pos.mY + 170);
			
			this.mOptionsArrows[5].mSpriteIdle.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[5].mSpriteIdle.SetCurrentFrame(1);
			
			this.mOptionsArrows[5].mSpriteHover.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[5].mSpriteHover.SetCurrentFrame(3);
			
			this.mOptionsArrows[5].mSpriteDown.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[5].mSpriteDown.SetCurrentFrame(5);
			
			this.mOptionsArrows[5].mSpriteInactive.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mOptionsArrows[5].mSpriteInactive.SetCurrentFrame(1);
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_texset");
		
		this.mSetTexture.SetUp(new IVec2(pos.mX - 49, pos.mY + 240), new IVec2(162, 38), 100);
		this.mSetTexture.mPos.Set(pos.mX - 49, pos.mY + 240);
		
		this.mSetTexture.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mSetTexture.mSpriteIdle.SetCurrentFrame(0);
		
		this.mSetTexture.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mSetTexture.mSpriteHover.SetCurrentFrame(1);
		
		this.mSetTexture.mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mSetTexture.mSpriteDown.SetCurrentFrame(2);
		
		this.mSetTexture.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mSetTexture.mSpriteInactive.SetCurrentFrame(0);
	}
}

GFGUICreationTileControl.prototype.UpdateTileSprite = function() {
	this.mCurrTileText[7].mString = this.mCurrentTexture;
	
	var tex = nmgrs.resMan.mTexStore.GetResource(this.mCurrentTexture);
	this.mCurrTile.mSprite.SetAnimatedTexture(tex, 35, 7, -1, -1);
	
	this.mCurrTile.mTileFrame = this.mCurrTile.mZ;
	this.mCurrTile.mBlank = false;
	
	if (this.mCurrTile.mTileFrame != 7) {
		if (this.mCurrTile.mZ % 2 != 0) {
			this.mCurrTile.mTileFrame = this.mCurrTile.mZ + (this.mCurrTile.mSprite.mFramesPerLine * this.mCurrTile.mSlopeDirection);
		}
	}
	else {
		this.mCurrTile.mBlank = true;
	}
	
	this.mCurrTile.mSprite.SetCurrentFrame(this.mCurrTile.mTileFrame);
}

GFGUICreationTileControl.prototype.Hovering = function() {
	{
		var currScene = nmgrs.sceneMan.mCurrScene;
		
		var pt = new IVec2(0, 0); pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		pt.mX += currScene.mCam.mTranslate.mX; pt.mY += currScene.mCam.mTranslate.mY;
		
		var tl = new IVec2(0, 0); tl.Copy(this.mCurrTile.mSprite.mPos);
		tl.mX += 2; tl.mY += 2;
		
		var br = new IVec2(0, 0); br.Copy(this.mCurrTile.mSprite.mPos);
		br.mX += this.mCurrTile.mSprite.GetWidth() + 3; br.mY += this.mCurrTile.mSprite.GetHeight() + 3;
		
		if (util.PointInRectangle(pt, tl, br)) {
			return true;
		}
	}
	
	for (var i = 0; i < this.mOptionsArrows.length; ++i) {
		if (this.mOptionsArrows[i].mHover == true) {
			return true;
		}
	}
	
	if (this.mSetTexture.mHover == true) {
		return true;
	}
	
	return false;
}
// ...End

