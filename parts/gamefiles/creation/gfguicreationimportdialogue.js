// GFGUICreationImportDialogue Class...
// game file:
function GFGUICreationImportDialogue() {
	this.mSprite = new Sprite();
	
	this.mDOMImport = new GUIDOMContainer();
	this.mDOMInputBox = new GUIDOMInputBox();
	
	this.mButtons = new Array();
	this.mButtons[0] = new GUIButton();
	this.mButtons[1] = new GUIButton();
	
	this.mConfirmText = new Text();
	this.mExtraText = new Text();
	this.mBaseStr = "CTRL + V (or RMB -> Paste) to paste map segment string from clipboard.";
	
	this.mCurrentSeg = false;
}

GFGUICreationImportDialogue.prototype.SetUp = function() {
	var pos = new IVec2(nmain.game.mCanvasSize.mX / 2, nmain.game.mCanvasSize.mY / 2);
	pos.mX -= 212; pos.mY -= 54;
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_importdialogue_back");
		
		this.mSprite.mPos.Set(pos.mX, pos.mY);
		this.mSprite.mDepth = -5100;
		this.mSprite.SetTexture(tex);
		this.mSprite.mAbsolute = true;
	}
	
	{
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		
		var txt = new Text();
		txt.SetFont(font);
		txt.SetFontSize(12);
		
		this.mDOMInputBox.SetUp(new IVec2(pos.mX + 12, pos.mY + 48), txt);
		this.mDOMInputBox.SetWidth(400);
	}
	
	{
		{
			var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_confirmbutton");
			
			this.mButtons[0].SetUp(new IVec2(pos.mX + 182, pos.mY + 76), new IVec2(60, 26), -5101);
			
			this.mButtons[0].mSpriteIdle.SetAnimatedTexture(tex, 4, 1, -1, -1);
			this.mButtons[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mButtons[0].mSpriteHover.SetAnimatedTexture(tex, 4, 1, -1, -1);
			this.mButtons[0].mSpriteHover.SetCurrentFrame(1);
			
			this.mButtons[0].mSpriteDown.SetAnimatedTexture(tex, 4, 1, -1, -1);
			this.mButtons[0].mSpriteDown.SetCurrentFrame(2);
			
			this.mButtons[0].mSpriteInactive.SetAnimatedTexture(tex, 4, 1, -1, -1);
			this.mButtons[0].mSpriteInactive.SetCurrentFrame(3);
		}
		
		{
			var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_cancelbutton");
			
			this.mButtons[1].SetUp(new IVec2(pos.mX + 400, pos.mY + 84), new IVec2(18, 18), -5101);
			
			this.mButtons[1].mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[1].mSpriteIdle.SetCurrentFrame(0);
			
			this.mButtons[1].mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[1].mSpriteHover.SetCurrentFrame(1);
			
			this.mButtons[1].mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[1].mSpriteDown.SetCurrentFrame(2);
			
			this.mButtons[1].mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[1].mSpriteInactive.SetCurrentFrame(0);
		}
	}
	
	{
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		
		{
			this.mConfirmText.SetFont(font);
			this.mConfirmText.SetFontSize(12);
			this.mConfirmText.mAbsolute = true;
			this.mConfirmText.mString = "Import";
			this.mConfirmText.mAlign = "centre";
			this.mConfirmText.mPos.Set(pos.mX + 212, pos.mY + 82);
			this.mConfirmText.mColour = "#270100";
			this.mConfirmText.mDepth = -5102;
		}
		
		{
			this.mExtraText.SetFont(font);
			this.mExtraText.SetFontSize(12);
			this.mExtraText.mAlign = "centre";
			this.mExtraText.mAbsolute = true;
			this.mExtraText.mString = this.mBaseStr;
			this.mExtraText.mDepth = -5100;
			this.mExtraText.mPos.Set(nmain.game.mCanvasSize.mX / 2, pos.mY + 108 + 6);
			this.mExtraText.mShadow = true;
		}
	}
}

GFGUICreationImportDialogue.prototype.Input = function() {
	for (var i = 0; i < this.mButtons.length; ++i) {
		this.mButtons[i].Input();
	}
}

GFGUICreationImportDialogue.prototype.Process = function(point) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	this.mDOMImport.Process();
	
	{
		for (var i = 0; i < this.mButtons.length; ++i) {
			this.mButtons[i].Process(point);
		}
		
		if ((this.mDOMImport.GetElement("inputBox").GetText()).length == 0) {
			this.mButtons[0].mActive = false;
		}
		else {
			this.mButtons[0].mActive = true;
		}
		
		if (this.mButtons[0].mActive == false) {
			this.mConfirmText.mColour = "#1E1915";
		}
		else {
			if (this.mButtons[0].mStatus == "down") {
				this.mConfirmText.mColour = "#0B0505";
			}
			else if (this.mButtons[0].mStatus == "hover") {
				this.mConfirmText.mColour = "#501E11";
				
				if (this.mCurrentSeg == true) {
					this.mExtraText.mString = this.mBaseStr + "\nWarning: importing this segment will discard the current segment!";
				}
			}
			else {
				this.mConfirmText.mColour = "#270100";
				
				if (this.mExtraText.mString != this.mBaseStr) {
					this.mExtraText.mString = this.mBaseStr;
				}
			}
		}
	}
	
	{
		if (this.mButtons[0].OnClick() == true) {
			var bp = new GFBluePrint();
			bp.SetUp(this.mDOMImport.GetElement("inputBox").GetText());
			
			var seg = new GFMapSegment();
			seg.mPos.Set(0, 0); seg.SetUp(bp);
			
			var map = new GFCreationMap(); currScene.mMap.Copy(map);
			currScene.mMap.mSegment.Copy(seg);
			currScene.mMap.mBounds[0] = currScene.mMap.mSegment.mBounds.mBounds[0];
			currScene.mMap.mBounds[1] = currScene.mMap.mSegment.mBounds.mBounds[1];
			currScene.mMap.mBounds[2] = currScene.mMap.mSegment.mBounds.mBounds[2];
			currScene.mMap.mBounds[3] = currScene.mMap.mSegment.mBounds.mBounds[3];
			
			currScene.mMap.SetUp();
			
			{
				currScene.mCam.Translate(new IVec2(-currScene.mCam.mTranslate.mX, -currScene.mCam.mTranslate.mY));
				
				var trans = new IVec2(nmain.game.mCanvasSize.mX / 2, nmain.game.mCanvasSize.mY / 2);
				trans.mX -= currScene.mMap.mSegment.mBounds.GetWidth() / 2; trans.mY -= 30;
				trans.mX = -(Math.round(trans.mX)); trans.mY = -(Math.round(trans.mY));
				currScene.mCam.Translate(trans);
			}
			
			currScene.mMapControl.mZLevelExtra.SetCurrentFrame(currScene.mMap.mCurrZLevel);
			
			this.mDOMImport.Clear();
			currScene.mCreationControl.mDialogueOpen = "";
		}
		else if (this.mButtons[1].OnClick() == true) {
			this.mDOMImport.Clear();
			currScene.mCreationControl.mDialogueOpen = "";
		}
	}
}

GFGUICreationImportDialogue.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		arr = arr.concat(this.mButtons[i].GetRenderData());
	}
	
	arr.push(this.mConfirmText);
	arr.push(this.mExtraText);
	
	return arr;
}

GFGUICreationImportDialogue.prototype.CreateDOM = function() {
	this.mDOMInputBox.SetText("");
	
	this.mDOMImport.AddElement(this.mDOMInputBox, "inputBox");
	this.mDOMImport.GetElement("inputBox").SelectAll();
	
	{
		var currScene = nmgrs.sceneMan.mCurrScene;
		
		this.mCurrentSeg = false;
		for (var i = 0; i < currScene.mMap.mSegment.mTiles.length; ++i) {
			if (currScene.mMap.mSegment.mTiles[i].mZ != 7) {
				this.mCurrentSeg = true;
				break;
			}
		}
	}
}
// ...End

