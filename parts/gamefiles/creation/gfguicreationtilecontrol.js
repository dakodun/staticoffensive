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

GFGUICreationTileControl.prototype.SetUp = function(initTex, initOffset) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	this.mCurrentTexture = initTex;
	
	{ // set up the example tile
		var tex = nmgrs.resMan.mTexStore.GetResource(this.mCurrentTexture);
		
		var tile = new GFMapTile();
		tile.mZ = 0;
		tile.mSlopeDirection = 0;
		tile.mSpecial = "o";
		tile.SetUp(tex);
		this.mCurrTile = tile;
		
		this.mCurrTile.mSprite.mPos.Set(540 - 30, 80);
	}
	
	this.SetUpText(initOffset); // set up the gui text
	this.SetUpButtons(initOffset); // set up the gui buttons
};

GFGUICreationTileControl.prototype.Input = function() {
	for (var i = 0; i < this.mOptionsArrows.length; ++i) {
		this.mOptionsArrows[i].Input();
	}
	
	this.mSetTexture.Input();
}

GFGUICreationTileControl.prototype.Process = function(point, offset) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{
		this.mCurrTile.mSprite.mPos.mX += offset.mX; this.mCurrTile.mSprite.mPos.mY += offset.mY;
		
		for (var i = 0; i < this.mCurrTileText.length; ++i) {
			this.mCurrTileText[i].mPos.mX += offset.mX; this.mCurrTileText[i].mPos.mY += offset.mY;
		}
		
		for (var i = 0; i < this.mOptionsArrows.length; ++i) {
			this.mOptionsArrows[i].Process(point);
			
			var newPos = new IVec2(0, 0); newPos.Copy(this.mOptionsArrows[i].GetSpritePositions());
			newPos.mX += offset.mX; newPos.mY += offset.mY;
			this.mOptionsArrows[i].SetSpritePositions(newPos);
		}
		
		{
			this.mSetTexture.Process(point);
			
			var newPos = new IVec2(0, 0); newPos.Copy(this.mSetTexture.GetSpritePositions());
			newPos.mX += offset.mX; newPos.mY += offset.mY;
			this.mSetTexture.SetSpritePositions(newPos);
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
		}
		else if (this.mOptionsArrows[1].OnClick() == true) {
			this.mCurrTile.mZ = (this.mCurrTile.mZ + 1) % 8;
			
			this.UpdateTileSprite();
			this.mCurrTileText[3].mString = this.mZLevels[this.mCurrTile.mZ];
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
		}
		else if (this.mOptionsArrows[5].OnClick() == true) {
			this.mCurrentType = (this.mCurrentType + 1) % 4;
			
			this.mCurrTile.mSpecial = this.mTypesTile[this.mCurrentType];
			this.mCurrTileText[5].mString = this.mTypes[this.mCurrentType];
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
	
	for (var i = 0; i < this.mCurrTileText.length; ++i) {
		arr.push(this.mCurrTileText[i]);
	}
	
	arr = arr.concat(this.mCurrTile.GetRenderData());
	
	for (var i = 0; i < this.mOptionsArrows.length; ++i) {
		arr = arr.concat(this.mOptionsArrows[i].GetRenderData());
	}
	
	arr = arr.concat(this.mSetTexture.GetRenderData());
	
	return arr;
}

GFGUICreationTileControl.prototype.SetUpText = function(initOffset) {
	var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
	
	{	
		this.mCurrTileText[0].SetFont(font);
		this.mCurrTileText[0].SetFontSize(12);
		this.mCurrTileText[0].mString = "Z - Level";
		this.mCurrTileText[0].mAlign = "centre";
		this.mCurrTileText[0].mPos.Set(540 + initOffset.mX, 150 + initOffset.mY);
		this.mCurrTileText[0].mColour = "#000000";
		
		this.mCurrTileText[1].SetFont(font);
		this.mCurrTileText[1].SetFontSize(12);
		this.mCurrTileText[1].mString = "Slope Direction";
		this.mCurrTileText[1].mAlign = "centre";
		this.mCurrTileText[1].mPos.Set(540 + initOffset.mX, 200 + initOffset.mY);
		this.mCurrTileText[1].mColour = "#000000";
		
		this.mCurrTileText[2].SetFont(font);
		this.mCurrTileText[2].SetFontSize(12);
		this.mCurrTileText[2].mString = "Type";
		this.mCurrTileText[2].mAlign = "centre";
		this.mCurrTileText[2].mPos.Set(540 + initOffset.mX, 250 + initOffset.mY);
		this.mCurrTileText[2].mColour = "#000000";
		
		this.mCurrTileText[6].SetFont(font);
		this.mCurrTileText[6].SetFontSize(24);
		this.mCurrTileText[6].mString = "Set Texture";
		this.mCurrTileText[6].mAlign = "centre";
		this.mCurrTileText[6].mPos.Set(540 + initOffset.mX, 323 + initOffset.mY);
		this.mCurrTileText[6].mShadow = true;
	}
	
	{
		this.mCurrTileText[3].SetFont(font);
		this.mCurrTileText[3].SetFontSize(24);
		this.mCurrTileText[3].mString = "1";
		this.mCurrTileText[3].mAlign = "centre";
		this.mCurrTileText[3].mPos.Set(540 + initOffset.mX, 160 + initOffset.mY);
		this.mCurrTileText[3].mShadow = true;
		
		this.mCurrTileText[4].SetFont(font);
		this.mCurrTileText[4].SetFontSize(24);
		this.mCurrTileText[4].mString = "North";
		this.mCurrTileText[4].mAlign = "centre";
		this.mCurrTileText[4].mPos.Set(540 + initOffset.mX, 210 + initOffset.mY);
		this.mCurrTileText[4].mShadow = true;
		
		this.mCurrTileText[5].SetFont(font);
		this.mCurrTileText[5].SetFontSize(24);
		this.mCurrTileText[5].mString = "None";
		this.mCurrTileText[5].mAlign = "centre";
		this.mCurrTileText[5].mPos.Set(540 + initOffset.mX, 260 + initOffset.mY);
		this.mCurrTileText[5].mShadow = true;
		
		this.mCurrTileText[7].SetFont(font);
		this.mCurrTileText[7].SetFontSize(12);
		this.mCurrTileText[7].mString = this.mCurrentTexture;
		this.mCurrTileText[7].mAlign = "centre";
		this.mCurrTileText[7].mPos.Set(540 + initOffset.mX, 360 + initOffset.mY);
		this.mCurrTileText[7].mColour = "#000000";
	}
}

GFGUICreationTileControl.prototype.SetUpButtons = function(initOffset) {
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_arrows");
		
		{
			this.mOptionsArrows[0].SetUp(new IVec2(460 + initOffset.mX, 150 + initOffset.mY), new IVec2(22, 38), -5000);
			this.mOptionsArrows[0].mPos.Set(460, 150);
			
			this.mOptionsArrows[0].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mOptionsArrows[0].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[0].mSpriteHover.SetCurrentFrame(1);
			
			this.mOptionsArrows[0].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[0].mSpriteDown.SetCurrentFrame(2);
			
			this.mOptionsArrows[0].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mOptionsArrows[1].SetUp(new IVec2(600 + initOffset.mX, 150 + initOffset.mY), new IVec2(22, 38), -5000);
			this.mOptionsArrows[1].mPos.Set(600, 150);
			
			this.mOptionsArrows[1].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[1].mSpriteIdle.SetCurrentFrame(3);
			
			this.mOptionsArrows[1].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[1].mSpriteHover.SetCurrentFrame(4);
			
			this.mOptionsArrows[1].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[1].mSpriteDown.SetCurrentFrame(5);
			
			this.mOptionsArrows[1].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[1].mSpriteInactive.SetCurrentFrame(3);
		}
		
		{
			this.mOptionsArrows[2].SetUp(new IVec2(460 + initOffset.mX, 200 + initOffset.mY), new IVec2(22, 38), -5000);
			this.mOptionsArrows[2].mPos.Set(460, 200);
			
			this.mOptionsArrows[2].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[2].mSpriteIdle.SetCurrentFrame(0);
			
			this.mOptionsArrows[2].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[2].mSpriteHover.SetCurrentFrame(1);
			
			this.mOptionsArrows[2].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[2].mSpriteDown.SetCurrentFrame(2);
			
			this.mOptionsArrows[2].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[2].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mOptionsArrows[3].SetUp(new IVec2(600 + initOffset.mX, 200 + initOffset.mY), new IVec2(22, 38), -5000);
			this.mOptionsArrows[3].mPos.Set(600, 200);
			
			this.mOptionsArrows[3].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[3].mSpriteIdle.SetCurrentFrame(3);
			
			this.mOptionsArrows[3].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[3].mSpriteHover.SetCurrentFrame(4);
			
			this.mOptionsArrows[3].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[3].mSpriteDown.SetCurrentFrame(5);
			
			this.mOptionsArrows[3].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[3].mSpriteInactive.SetCurrentFrame(3);
		}
		
		{
			this.mOptionsArrows[4].SetUp(new IVec2(460 + initOffset.mX, 250 + initOffset.mY), new IVec2(22, 38), -5000);
			this.mOptionsArrows[4].mPos.Set(460, 250);
			
			this.mOptionsArrows[4].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[4].mSpriteIdle.SetCurrentFrame(0);
			
			this.mOptionsArrows[4].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[4].mSpriteHover.SetCurrentFrame(1);
			
			this.mOptionsArrows[4].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[4].mSpriteDown.SetCurrentFrame(2);
			
			this.mOptionsArrows[4].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[4].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mOptionsArrows[5].SetUp(new IVec2(600 + initOffset.mX, 250 + initOffset.mY), new IVec2(22, 38), -5000);
			this.mOptionsArrows[5].mPos.Set(600, 250);
			
			this.mOptionsArrows[5].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[5].mSpriteIdle.SetCurrentFrame(3);
			
			this.mOptionsArrows[5].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[5].mSpriteHover.SetCurrentFrame(4);
			
			this.mOptionsArrows[5].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[5].mSpriteDown.SetCurrentFrame(5);
			
			this.mOptionsArrows[5].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[5].mSpriteInactive.SetCurrentFrame(3);
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_texset");
		
		this.mSetTexture.SetUp(new IVec2(460 + initOffset.mX, 320 + initOffset.mY), new IVec2(162, 38), -5000);
		this.mSetTexture.mPos.Set(460, 320);
		
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
// ...End

