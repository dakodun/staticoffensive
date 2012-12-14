// GFGUICreationControl Class...
// game file:
function GFGUICreationControl() {
	this.mTranslate = new IVec2(0, 0);
	
	// this.mTopBar = new Sprite();
	this.mTopBar = new GFGUICreationBar();
	
	this.mCurrTile = new GFMapTile();
	
	this.mCurrTileText = new Array();
	this.mCurrTileText[0] = new Text();
	this.mCurrTileText[1] = new Text();
	this.mCurrTileText[2] = new Text();
	this.mCurrTileText[3] = new Text();
	this.mCurrTileText[4] = new Text();
	this.mCurrTileText[5] = new Text();
	
	this.mCurrTileText[6] = new Text();
	this.mCurrTileText[7] = new Text();
	
	this.mOptionsArrows = new Array();
	this.mOptionsArrows[0] = new GUIButton();
	this.mOptionsArrows[1] = new GUIButton();
	this.mOptionsArrows[2] = new GUIButton();
	this.mOptionsArrows[3] = new GUIButton();
	this.mOptionsArrows[4] = new GUIButton();
	this.mOptionsArrows[5] = new GUIButton();
	
	this.mSetTexture = new GUIButton();
	
	this.mZLevels = new Array();
	this.mSlopeDirections = new Array();
	this.mTypesTile = new Array();
	this.mTypes = new Array();
	this.mCurrentType = 0;
	this.mCurrentTexture = "";
	
	{
		
		this.mZLevels[0] = "1";
		this.mZLevels[1] = "1.5";
		this.mZLevels[2] = "2";
		this.mZLevels[3] = "2.5";
		this.mZLevels[4] = "3";
		this.mZLevels[5] = "3.5";
		this.mZLevels[6] = "4";
		this.mZLevels[7] = "-";
		
		this.mSlopeDirections[0] = "North";
		this.mSlopeDirections[1] = "East";
		this.mSlopeDirections[2] = "South";
		this.mSlopeDirections[3] = "West";
		
		this.mTypesTile[0] = "o";
		this.mTypesTile[1] = "e";
		this.mTypesTile[2] = "x";
		this.mTypesTile[3] = "b";
		
		this.mTypes[0] = "None";
		this.mTypes[1] = "Entrance\nOnly";
		this.mTypes[2] = "Exit\nOnly";
		this.mTypes[3] = "Entrance\n& Exit";
	}
	
	// this.mBarMenus = new Array();
	// this.mBarMenus[0] = new GUIDropDown();
}

GFGUICreationControl.prototype.SetUp = function(initTex) {
	this.mCurrentTexture = initTex;
	
	var currScene = nmgrs.sceneMan.mCurrScene;
	var initOffset = new IVec2();
	initOffset.Copy(currScene.mCam.mTranslate);
	
	this.mTopBar.SetUp(initOffset);
	/* {
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_topbar");
		
		this.mTopBar.mPos.Set(8 + initOffset.mX, 10 + initOffset.mY);
		this.mTopBar.mDepth = -5000;
		this.mTopBar.SetTexture(tex);
	} */
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource(this.mCurrentTexture);
		var tile = new GFMapTile();
		tile.mZ = 0;
		tile.mSlopeDirection = 0;
		tile.mSpecial = "o";
		
		tile.SetUp(tex);
		
		this.mCurrTile = tile;
		this.mCurrTile.mSprite.mPos.Set(540 - 30, 80);
	}
	
	{
		var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
		this.mCurrTileText[0].SetFont(font);
		this.mCurrTileText[0].SetFontSize(12);
		this.mCurrTileText[0].mString = "Z - Level";
		this.mCurrTileText[0].mAlign = "centre";
		this.mCurrTileText[0].mPos.Set(540, 150);
		this.mCurrTileText[0].mColour = "#000000";
		
		this.mCurrTileText[1].SetFont(font);
		this.mCurrTileText[1].SetFontSize(12);
		this.mCurrTileText[1].mString = "Slope Direction";
		this.mCurrTileText[1].mAlign = "centre";
		this.mCurrTileText[1].mPos.Set(540, 200);
		this.mCurrTileText[1].mColour = "#000000";
		
		this.mCurrTileText[2].SetFont(font);
		this.mCurrTileText[2].SetFontSize(12);
		this.mCurrTileText[2].mString = "Type";
		this.mCurrTileText[2].mAlign = "centre";
		this.mCurrTileText[2].mPos.Set(540, 250);
		this.mCurrTileText[2].mColour = "#000000";
		
		this.mCurrTileText[3].SetFont(font);
		this.mCurrTileText[3].SetFontSize(24);
		this.mCurrTileText[3].mString = "1";
		this.mCurrTileText[3].mAlign = "centre";
		this.mCurrTileText[3].mPos.Set(540, 160);
		this.mCurrTileText[3].mShadow = true;
		
		this.mCurrTileText[4].SetFont(font);
		this.mCurrTileText[4].SetFontSize(24);
		this.mCurrTileText[4].mString = "North";
		this.mCurrTileText[4].mAlign = "centre";
		this.mCurrTileText[4].mPos.Set(540, 210);
		this.mCurrTileText[4].mShadow = true;
		
		this.mCurrTileText[5].SetFont(font);
		this.mCurrTileText[5].SetFontSize(24);
		this.mCurrTileText[5].mString = "None";
		this.mCurrTileText[5].mAlign = "centre";
		this.mCurrTileText[5].mPos.Set(540, 260);
		this.mCurrTileText[5].mShadow = true;
		
		this.mCurrTileText[6].SetFont(font);
		this.mCurrTileText[6].SetFontSize(24);
		this.mCurrTileText[6].mString = "Set Texture";
		this.mCurrTileText[6].mAlign = "centre";
		this.mCurrTileText[6].mPos.Set(540, 323);
		this.mCurrTileText[6].mShadow = true;
		
		this.mCurrTileText[7].SetFont(font);
		this.mCurrTileText[7].SetFontSize(12);
		this.mCurrTileText[7].mString = this.mCurrentTexture;
		this.mCurrTileText[7].mAlign = "centre";
		this.mCurrTileText[7].mPos.Set(540, 360);
		this.mCurrTileText[7].mColour = "#000000";
	}
	
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
	
	/* {
		{
			var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_topmenunew");
			var baseBut = new GUIButton();
			
			baseBut.SetUp(new IVec2(8 + initOffset.mX, 10 + initOffset.mY), new IVec2(54, 24), -5000);
			baseBut.mPos.Set(8, 10);
			
			baseBut.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
			baseBut.mSpriteIdle.SetCurrentFrame(0);
			
			baseBut.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
			baseBut.mSpriteHover.SetCurrentFrame(1);
			
			baseBut.mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
			baseBut.mSpriteDown.SetCurrentFrame(2);
			
			baseBut.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
			baseBut.mSpriteInactive.SetCurrentFrame(0);
			
			this.mBarMenus[0].SetUp(baseBut);
		}
		
		{
			var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_dropback");
			var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
			
			{
				var itemBut = new GUIButton();
				itemBut.SetUp(new IVec2(0, 0), new IVec2(176, 16), -5000);
				
				itemBut.mSpriteIdle.SetAnimatedTexture(tex, 6, 1, -1, -1);
				itemBut.mSpriteIdle.SetCurrentFrame(3);
				
				itemBut.mSpriteHover.SetAnimatedTexture(tex, 6, 1, -1, -1);
				itemBut.mSpriteHover.SetCurrentFrame(4);
				
				itemBut.mSpriteDown.SetAnimatedTexture(tex, 6, 1, -1, -1);
				itemBut.mSpriteDown.SetCurrentFrame(5);
				
				itemBut.mSpriteInactive.SetAnimatedTexture(tex, 6, 1, -1, -1);
				itemBut.mSpriteInactive.SetCurrentFrame(3);
				
				var itemTxt = new Text();
				itemTxt.mDepth = -5001;
				itemTxt.SetFont(font);
				itemTxt.SetFontSize(12);
				itemTxt.mString = "create new";
				itemTxt.mAlign = "left";
				itemTxt.mPos.Set(26, 0);
				itemTxt.mColour = "#4A4A66";
					
				this.mBarMenus[0].AddItem(itemBut, itemTxt);
			}
			
			{
				var itemBut = new GUIButton();
				itemBut.SetUp(new IVec2(0, 0), new IVec2(176, 16), -5000);
				
				itemBut.mSpriteIdle.SetAnimatedTexture(tex, 6, 1, -1, -1);
				itemBut.mSpriteIdle.SetCurrentFrame(0);
				
				itemBut.mSpriteHover.SetAnimatedTexture(tex, 6, 1, -1, -1);
				itemBut.mSpriteHover.SetCurrentFrame(1);
				
				itemBut.mSpriteDown.SetAnimatedTexture(tex, 6, 1, -1, -1);
				itemBut.mSpriteDown.SetCurrentFrame(2);
				
				itemBut.mSpriteInactive.SetAnimatedTexture(tex, 6, 1, -1, -1);
				itemBut.mSpriteInactive.SetCurrentFrame(0);
				
				var itemTxt = new Text();
				itemTxt.mDepth = -5001;
				itemTxt.SetFont(font);
				itemTxt.SetFontSize(12);
				itemTxt.mString = "restore old";
				itemTxt.mAlign = "left";
				itemTxt.mPos.Set(26, 0);
				itemTxt.mColour = "#4A4A66";
					
				this.mBarMenus[0].AddItem(itemBut, itemTxt);
			}
			
			{
				var itemBut = new GUIButton();
				itemBut.SetUp(new IVec2(0, 0), new IVec2(176, 16), -5000);
				
				itemBut.mSpriteIdle.SetAnimatedTexture(tex, 6, 1, -1, -1);
				itemBut.mSpriteIdle.SetCurrentFrame(3);
				
				itemBut.mSpriteHover.SetAnimatedTexture(tex, 6, 1, -1, -1);
				itemBut.mSpriteHover.SetCurrentFrame(4);
				
				itemBut.mSpriteDown.SetAnimatedTexture(tex, 6, 1, -1, -1);
				itemBut.mSpriteDown.SetCurrentFrame(5);
				
				itemBut.mSpriteInactive.SetAnimatedTexture(tex, 6, 1, -1, -1);
				itemBut.mSpriteInactive.SetCurrentFrame(3);
				
				var itemTxt = new Text();
				itemTxt.mDepth = -5001;
				itemTxt.SetFont(font);
				itemTxt.SetFontSize(12);
				itemTxt.mString = "obliterate";
				itemTxt.mAlign = "left";
				itemTxt.mPos.Set(26, 0);
				itemTxt.mColour = "#4A4A66";
					
				this.mBarMenus[0].AddItem(itemBut, itemTxt);
			}
		}
	} */
	
	this.mTranslate.Copy(currScene.mCam.mTranslate);
};

GFGUICreationControl.prototype.Input = function() {
	for (var i = 0; i < this.mOptionsArrows.length; ++i) {
		this.mOptionsArrows[i].Input();
	}
	
	this.mSetTexture.Input();
	
	this.mTopBar.Input();
	// this.mBarMenus[0].Input();
}

GFGUICreationControl.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	var offset = new IVec2(0, 0);
	offset.mX = currScene.mCam.mTranslate.mX - this.mTranslate.mX;
	offset.mY = currScene.mCam.mTranslate.mY - this.mTranslate.mY;
	
	{
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		this.mCurrTile.mSprite.mPos.mX += offset.mX; this.mCurrTile.mSprite.mPos.mY += offset.mY;
		// this.mTopBar.mPos.mX += offset.mX; this.mTopBar.mPos.mY += offset.mY;
		
		for (var i = 0; i < this.mCurrTileText.length; ++i) {
			this.mCurrTileText[i].mPos.mX += offset.mX; this.mCurrTileText[i].mPos.mY += offset.mY;
		}
		
		for (var i = 0; i < this.mOptionsArrows.length; ++i) {
			this.mOptionsArrows[i].Process(pt);
			
			var newPos = new IVec2(0, 0); newPos.Copy(this.mOptionsArrows[i].GetSpritePositions());
			newPos.mX += offset.mX; newPos.mY += offset.mY;
			this.mOptionsArrows[i].SetSpritePositions(newPos);
		}
		
		{
			this.mSetTexture.Process(pt);
			
			var newPos = new IVec2(0, 0); newPos.Copy(this.mSetTexture.GetSpritePositions());
			newPos.mX += offset.mX; newPos.mY += offset.mY;
			this.mSetTexture.SetSpritePositions(newPos);
		}
		
		this.mTopBar.Process(pt, offset);
		/* {
			this.mBarMenus[0].Process(pt);
			
			var newPos = new IVec2(0, 0); newPos.Copy(this.mBarMenus[0].GetSpritePositions());
			newPos.mX += offset.mX; newPos.mY += offset.mY;
			this.mBarMenus[0].SetSpritePositions(newPos);
		} */
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
			
			// this.mCurrentTexture = "tileset_test_2";
			// this.UpdateTileSprite();
		}
		
		/* if (this.mBarMenus[0].OnClick(0) == true) {
			alert("create new");
		}
		else if (this.mBarMenus[0].OnClick(1) == true) {
			alert("restore old");
		}
		else if (this.mBarMenus[0].OnClick(2) == true) {
			alert("obliterate");
		} */
	}
	
	this.mTranslate.Copy(currScene.mCam.mTranslate);
}

GFGUICreationControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	// arr.push(this.mTopBar);
	
	for (var i = 0; i < this.mCurrTileText.length; ++i) {
		arr.push(this.mCurrTileText[i]);
	}
	
	arr = arr.concat(this.mCurrTile.GetRenderData());
	
	for (var i = 0; i < this.mOptionsArrows.length; ++i) {
		arr = arr.concat(this.mOptionsArrows[i].GetRenderData());
	}
	
	arr = arr.concat(this.mSetTexture.GetRenderData());
	
	// arr = arr.concat(this.mBarMenus[0].GetRenderData());
	arr = arr.concat(this.mTopBar.GetRenderData());
	
	return arr;
}

GFGUICreationControl.prototype.UpdateTileSprite = function() {
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

