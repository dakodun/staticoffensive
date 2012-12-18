// GFGUICreationNewDialogue Class...
// game file:
function GFGUICreationNewDialogue() {
	this.mSprite = new Sprite();
	
	this.mInputBoxes = new Array();
	this.mInputBoxes[0] = new GUIInputBox();
	this.mInputBoxes[1] = new GUIInputBox();
	
	this.mButtons = new Array();
	this.mButtons[0] = new GUIButton();
	this.mButtons[1] = new GUIButton();
}

GFGUICreationNewDialogue.prototype.SetUp = function(initOffset) {
	var pos = new IVec2(8, 38);
	pos.mX += initOffset.mX; pos.mX += initOffset.mY;
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_back");
		
		this.mSprite.mPos.Set(pos.mX, pos.mY);
		this.mSprite.mDepth = -5100;
		this.mSprite.SetTexture(tex);
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_textinput");
		var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
		
		{
			this.mInputBoxes[0].mInputText.SetFont(font);
			this.mInputBoxes[0].mInputText.SetFontSize(12);
			this.mInputBoxes[0].mInputText.mColour = "#000000";
			
			this.mInputBoxes[0].mRenderCanvas.mPos.Set(4, 2);
			this.mInputBoxes[0].mRenderCanvas.mSize.Set(-4, -2);
			
			this.mInputBoxes[0].SetUp(new IVec2(pos.mX + 18, pos.mY + 28), new IVec2(30, 22), -5101, this.mInputBoxes[0].mNumbers);
			this.mInputBoxes[0].mMaxChars = 2;
			this.mInputBoxes[0].mCaret.mShape.mPos.mY += 2;
			
			{
				this.mInputBoxes[0].mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[0].mSpriteIdle.SetCurrentFrame(0);
				
				this.mInputBoxes[0].mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[0].mSpriteHover.SetCurrentFrame(1);
				
				this.mInputBoxes[0].mSpriteFocus.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[0].mSpriteFocus.SetCurrentFrame(2);
				
				this.mInputBoxes[0].mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[0].mSpriteInactive.SetCurrentFrame(0);
			}
		}
		
		{
			this.mInputBoxes[1].mInputText.SetFont(font);
			this.mInputBoxes[1].mInputText.SetFontSize(12);
			this.mInputBoxes[1].mInputText.mColour = "#000000";
			
			this.mInputBoxes[1].mRenderCanvas.mPos.Set(4, 2);
			this.mInputBoxes[1].mRenderCanvas.mSize.Set(-4, -2);
			
			this.mInputBoxes[1].SetUp(new IVec2(pos.mX + 82, pos.mY + 28), new IVec2(30, 22), -5101, this.mInputBoxes[1].mNumbers);
			this.mInputBoxes[1].mMaxChars = 2;
			this.mInputBoxes[1].mCaret.mShape.mPos.mY += 2;
			
			{
				this.mInputBoxes[1].mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[1].mSpriteIdle.SetCurrentFrame(0);
				
				this.mInputBoxes[1].mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[1].mSpriteHover.SetCurrentFrame(1);
				
				this.mInputBoxes[1].mSpriteFocus.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[1].mSpriteFocus.SetCurrentFrame(2);
				
				this.mInputBoxes[1].mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[1].mSpriteInactive.SetCurrentFrame(0);
			}
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_confirmbutton");
		
		this.mButtons[0].SetUp(new IVec2(pos.mX + 36, pos.mY + 64), new IVec2(60, 26), -5101);
		// this.mButtons[0].mPos.Set(pos.mX + 36, pos.mY + 64);
		
		this.mButtons[0].mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButtons[0].mSpriteIdle.SetCurrentFrame(0);
		
		this.mButtons[0].mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButtons[0].mSpriteHover.SetCurrentFrame(1);
		
		this.mButtons[0].mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButtons[0].mSpriteDown.SetCurrentFrame(2);
		
		this.mButtons[0].mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButtons[0].mSpriteInactive.SetCurrentFrame(0);
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_cancelbutton");
		
		this.mButtons[1].SetUp(new IVec2(pos.mX + 112, pos.mY + 72), new IVec2(18, 18), -5101);
		// this.mButtons[1].mPos.Set(pos.mX + 112, pos.mY + 72);
		
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

GFGUICreationNewDialogue.prototype.Input = function() {
	for (var i = 0; i < this.mInputBoxes.length; ++i) {
		this.mInputBoxes[i].Input();
	}
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		this.mButtons[i].Input();
	}
}

GFGUICreationNewDialogue.prototype.Process = function(point) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{
		for (var i = 0; i < this.mInputBoxes.length; ++i) {
			this.mInputBoxes[i].Process(point);
			
			{
				if (this.mInputBoxes[0].mInputText.mString.length > 0) {
					var x = Number(this.mInputBoxes[i].mInputText.mString);
					if (x == 0) {
						this.mInputBoxes[i].SetText("");
					}
					else if (this.mInputBoxes[i].mInputText.mString.charAt(0) == "0") {
						this.mInputBoxes[i].SetText(this.mInputBoxes[i].mInputText.mString.charAt(1));
					}
					else if (x > 20) {
						this.mInputBoxes[i].SetText("20");
					}
				}
			}
		}
		
		for (var i = 0; i < this.mButtons.length; ++i) {
			this.mButtons[i].Process(point);
		}
	}
	
	{
		if (this.mButtons[0].OnClick() == true) {
			var x = Number(this.mInputBoxes[0].mInputText.mString);
			var y = Number(this.mInputBoxes[1].mInputText.mString);
			
			if ((x >= 1 && x <= 20) && (y >= 1 && y <= 20)) {
				var str = "a:" + "tileset_test" + ";{";
				for (var i = 0; i < y; ++i) {
					for (var j = 0; j < x; ++j) {
						str += "20oa";
						
						if (j < x - 1) {
							str += "?";
						}
					}
					
					if (i < y - 1) {
						str += "!";
					}
				}
				
				str += "}";
				
				var bp = new GFBluePrint();
				bp.SetUp(str);
				
				var seg = new GFMapSegment();
				seg.mPos.Set(0, 0); seg.SetUp(bp);
				
				currScene.mCreationMap.mSegment.Copy(seg);
				
				currScene.mCreationControl.mDialogueOpen = false;
				
				for (var i = 0; i < this.mInputBoxes.length; ++i) {
					this.mInputBoxes[i].SetText("");
				}
			}
		}
		else if (this.mButtons[1].OnClick() == true) {
			currScene.mCreationControl.mDialogueOpen = false;
			
			for (var i = 0; i < this.mInputBoxes.length; ++i) {
				this.mInputBoxes[i].SetText("");
			}
		}
	}
}

GFGUICreationNewDialogue.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	
	for (var i = 0; i < this.mInputBoxes.length; ++i) {
		arr = arr.concat(this.mInputBoxes[i].GetRenderData());
	}
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		arr = arr.concat(this.mButtons[i].GetRenderData());
	}
	
	return arr;
}

GFGUICreationNewDialogue.prototype.UpdatePosition = function(offset) {
	this.mSprite.mPos.mX += offset.mX; this.mSprite.mPos.mY += offset.mY;
	
	for (var i = 0; i < this.mInputBoxes.length; ++i) {
		var newPos = new IVec2(0, 0); newPos.Copy(this.mInputBoxes[i].GetSpritePositions());
		newPos.mX += offset.mX; newPos.mY += offset.mY;
		this.mInputBoxes[i].SetSpritePositions(newPos);
	}
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		var newPos = new IVec2(0, 0); newPos.Copy(this.mButtons[i].GetSpritePositions());
		newPos.mX += offset.mX; newPos.mY += offset.mY;
		this.mButtons[i].SetSpritePositions(newPos);
	}
}
// ...End

