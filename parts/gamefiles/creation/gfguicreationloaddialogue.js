// GFGUICreationLoadDialogue Class...
// game file:
function GFGUICreationLoadDialogue() {
	this.mPos = new IVec2(0, 0);
	this.mSprite = new Sprite();
	
	this.mListBox = new GUIListBox();
	this.mOldSelected = -1;
	
	this.mRedraw = false;
	this.mRenderCanvas = new RenderCanvas();
	
	this.mButtons = new Array();
	this.mButtons[0] = new GUIButton();
	this.mButtons[1] = new GUIButton();
	this.mButtons[2] = new GUIButton();
	
	this.mCurrentSeg = false;
	this.mWarning = false;
	
	this.mConfirmText = new Text();
	this.mDeleteText = new Text();
	this.mWarningText = new Text();
	
	this.mSegmentList = new Array();
}

GFGUICreationLoadDialogue.prototype.SetUp = function() {
	var pos = new IVec2(nmain.game.mCanvasSize.mX / 2, nmain.game.mCanvasSize.mY / 2);
	pos.mX -= 161; pos.mY -= 161;
	this.mPos.Copy(pos);
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_loaddialogue_back");
		
		this.mSprite.mPos.Set(pos.mX, pos.mY);
		this.mSprite.mDepth = -5100;
		this.mSprite.SetTexture(tex);
		this.mSprite.mAbsolute = true;
	}
	
	{
		this.mListBox.SetUp(new IVec2(pos.mX + 58, pos.mY + 40), -5101, "gui_creation_loaddialogue_listbox_arrows");
		this.mListBox.mItemsMax = 5;
	}
	
	{
		this.mRenderCanvas.mPos.Set(pos.mX, pos.mY);
		this.mRenderCanvas.SetDimensions(new IVec2(320, 160));
		
		this.mRenderCanvas.mDepth = -5101;
		this.mRenderCanvas.mAbsolute = true;
		
		this.mRenderCanvas.mFrustrumCull = false;
	}
	
	{
		{
			var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_confirmbutton");
			
			this.mButtons[0].SetUp(new IVec2(pos.mX + 132, pos.mY + 130), new IVec2(60, 26), -5101);
			
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
			var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_confirmbutton");
			
			this.mButtons[1].SetUp(new IVec2(pos.mX + 57, pos.mY + 130), new IVec2(60, 26), -5101);
			
			this.mButtons[1].mSpriteIdle.SetAnimatedTexture(tex, 4, 1, -1, -1);
			this.mButtons[1].mSpriteIdle.SetCurrentFrame(0);
			
			this.mButtons[1].mSpriteHover.SetAnimatedTexture(tex, 4, 1, -1, -1);
			this.mButtons[1].mSpriteHover.SetCurrentFrame(1);
			
			this.mButtons[1].mSpriteDown.SetAnimatedTexture(tex, 4, 1, -1, -1);
			this.mButtons[1].mSpriteDown.SetCurrentFrame(2);
			
			this.mButtons[1].mSpriteInactive.SetAnimatedTexture(tex, 4, 1, -1, -1);
			this.mButtons[1].mSpriteInactive.SetCurrentFrame(3);
		}
		
		{
			var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_cancelbutton");
			
			this.mButtons[2].SetUp(new IVec2(pos.mX + 247, pos.mY + 137), new IVec2(18, 18), -5101);
			
			this.mButtons[2].mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[2].mSpriteIdle.SetCurrentFrame(0);
			
			this.mButtons[2].mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[2].mSpriteHover.SetCurrentFrame(1);
			
			this.mButtons[2].mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[2].mSpriteDown.SetCurrentFrame(2);
			
			this.mButtons[2].mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[2].mSpriteInactive.SetCurrentFrame(0);
		}
	}
	
	{
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		
		{
			this.mConfirmText.SetFont(font);
			this.mConfirmText.SetFontSize(12);
			this.mConfirmText.mAbsolute = true;
			this.mConfirmText.mString = "Load";
			this.mConfirmText.mAlign = "centre";
			this.mConfirmText.mPos.Set(pos.mX + 162, pos.mY + 136);
			this.mConfirmText.mColour = "#270100";
			this.mConfirmText.mDepth = -5102;
		}
		
		{
			this.mDeleteText.SetFont(font);
			this.mDeleteText.SetFontSize(12);
			this.mDeleteText.mAbsolute = true;
			this.mDeleteText.mString = "Delete";
			this.mDeleteText.mAlign = "centre";
			this.mDeleteText.mPos.Set(pos.mX + 87, pos.mY + 136);
			this.mDeleteText.mColour = "#270100";
			this.mDeleteText.mDepth = -5102;
		}
		
		{
			this.mWarningText.SetFont(font);
			this.mWarningText.SetFontSize(12);
			this.mWarningText.mAlign = "centre";
			this.mWarningText.mAbsolute = true;
			this.mWarningText.mDepth = -5100;
			this.mWarningText.mPos.Set(nmain.game.mCanvasSize.mX / 2, pos.mY + 322 + 6);
			this.mWarningText.mShadow = true;
		}
	}
}

GFGUICreationLoadDialogue.prototype.Input = function() {
	this.mListBox.Input();
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		this.mButtons[i].Input();
	}
}

GFGUICreationLoadDialogue.prototype.Process = function(point) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	this.RedrawPreview();
	
	{
		this.mListBox.Process(point);
		
		for (var i = 0; i < this.mButtons.length; ++i) {
			this.mButtons[i].Process(point);
		}
		
		if (this.mListBox.mItems.length == 0) {
			this.mButtons[0].mActive = false;
			this.mButtons[1].mActive = false;
		}
		else {
			this.mButtons[0].mActive = true;
			this.mButtons[1].mActive = true;
		}
		
		this.mWarning = false;
		this.mWarningText.mString = "";
		
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
					this.mWarning = true;
					this.mWarningText.mString = "Warning: loading this segment will discard the current segment!";
				}
			}
			else {
				this.mConfirmText.mColour = "#270100";
			}
		}
		
		if (this.mButtons[1].mActive == false) {
			this.mDeleteText.mColour = "#1E1915";
		}
		else {
			if (this.mButtons[1].mStatus == "down") {
				this.mDeleteText.mColour = "#0B0505";
			}
			else if (this.mButtons[1].mStatus == "hover") {
				this.mDeleteText.mColour = "#501E11";
				
				this.mWarning = true;
				this.mWarningText.mString = "Warning: deleting this segment is irreversible!";
			}
			else {
				this.mDeleteText.mColour = "#270100";
			}
		}
	}
	
	{
		if (this.mButtons[0].OnClick() == true) {
			var ls = new LocalStorage();
			var segKey = "seg" + this.mListBox.GetActive();
			
			if (ls.Exists(segKey) == true) {
				var bp = new GFBluePrint();
				bp.SetUp(ls.Load(segKey));
				
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
			}
			
			currScene.mMapControl.mZLevelExtra.SetCurrentFrame(currScene.mMap.mCurrZLevel);
			
			currScene.mCreationControl.mDialogueOpen = "";
		}
		else if (this.mButtons[1].OnClick() == true) {
			var ls = new LocalStorage();
			var segKey = "seg" + this.mListBox.GetActive();
			ls.Delete(segKey);
			
			this.mListBox.RemoveItem(this.mListBox.mSelected);
			this.mOldSelected = -1;
		}
		else if (this.mButtons[2].OnClick() == true) {
			currScene.mCreationControl.mDialogueOpen = "";
		}
	}
	
	if (this.mOldSelected != this.mListBox.mSelected) {
		this.mRedraw = true;
		this.mOldSelected = this.mListBox.mSelected;
	}
}

GFGUICreationLoadDialogue.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	arr = arr.concat(this.mListBox.GetRenderData());
	
	if (this.mListBox.mItems.length > 0) {
		arr.push(this.mRenderCanvas);
	}
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		arr = arr.concat(this.mButtons[i].GetRenderData());
	}
	
	arr.push(this.mConfirmText);
	arr.push(this.mDeleteText);
	
	if (this.mWarning == true) {
		arr.push(this.mWarningText);
	}
	
	return arr;
}

GFGUICreationLoadDialogue.prototype.PopulateSegmentList = function() {
	this.mRenderCanvas.Clear();
	
	this.mSegmentList.splice(0, this.mSegmentList.length);
	this.mListBox.Clear();
	this.mOldSelected = -1;
	
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
	
	var ls = new LocalStorage;
	
	for (var i = 0; i < ls.mLength; ++i) {
		var key = ls.Key(i);
		if (key.substr(0, 3) == "seg") {
			this.mSegmentList.push(ls.Key(i));
		}
	}
	
	this.mSegmentList.sort();
	
	var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_loaddialogue_listbox");
	var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
	
	{
		var itemBut = new GUIButton();
		itemBut.SetUp(new IVec2(0, 0), new IVec2(186, 16), -5101);
		
		itemBut.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
		itemBut.mSpriteIdle.SetCurrentFrame(0);
		
		itemBut.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
		itemBut.mSpriteHover.SetCurrentFrame(1);
		
		itemBut.mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
		itemBut.mSpriteDown.SetCurrentFrame(2);
		
		itemBut.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
		itemBut.mSpriteInactive.SetCurrentFrame(0);
		
		var itemTxt = new Text();
		itemTxt.mDepth = -5102;
		itemTxt.SetFont(font);
		itemTxt.SetFontSize(12);
		itemTxt.mAlign = "left";
		itemTxt.mPos.Set(2, 0);
		itemTxt.mColour = "#2E150F";
		
		for (var i = 0; i < this.mSegmentList.length; ++i) {
			itemTxt.mString = this.mSegmentList[i].substr(3, this.mSegmentList[i].length - 3);
			this.mListBox.AddItem(itemBut, itemTxt);
		}
	}
	
	this.mRedraw = true;
}

GFGUICreationLoadDialogue.prototype.RedrawPreview = function() {
	if (this.mRedraw == true) {
		var bp = new GFBluePrint();
		var ls = new LocalStorage();
		var segKey = "seg" + this.mListBox.GetActive();
		
		if (ls.Exists(segKey) == true) {
			bp.SetUp(ls.Load(segKey));
			
			var seg = new GFMapSegment();
			seg.mPos.Set(0, 0); seg.SetUp(bp);
			
			{
				for (var i = 0; i < seg.mTiles.length; ++i) {
					// seg.mTiles[i].mSprite.mPos.mX += 0;
					seg.mTiles[i].mSprite.mPos.mY += -(seg.mBounds.mBounds[1]);
					
					// seg.mTiles[i].mBounds.mPos.mX += 0;
					seg.mTiles[i].mBounds.mPos.mY += -(seg.mBounds.mBounds[1]);
				}
				
				// seg.mBounds.mPos.mX += 0;
				seg.mBounds.mPos.mY += -(seg.mBounds.mBounds[1]);
				seg.mBoundsPoly.splice(0, seg.mBoundsPoly.length);
				seg.mBoundsPoly = seg.mBoundsPoly.concat(seg.mBounds.GetPolygon());
			}
			
			this.mRenderCanvas.Clear();
			
			{
				var arr = new Array();
				arr = arr.concat(seg.GetRenderData());
				
				{
					var arrSort = new Array();
					for (var i = 0; i < arr.length; ++i) {
						var element = new RenderBatchSortElement();
						element.mID = i;
						element.mDepth = arr[i].mDepth;
						
						arrSort.push(element);
					}
					
					arrSort.sort(DepthSort);
					
					var temp = new Array();
					for (var i = 0; i < arr.length; ++i) {
						temp.push(arr[arrSort[i].mID]);
					}
					
					arr.splice(0, arr.length);
					arr = arr.concat(temp);
				}
				
				this.mRenderCanvas.mContext.save();
				this.mRenderCanvas.mContext.scale(0.25, 0.25);
				for (var i = 0; i < arr.length; ++i) {
					this.mRenderCanvas.RenderTo(arr[i]);
				}
				
				this.mRenderCanvas.mContext.restore();
				
				this.mRenderCanvas.mPos.Set(this.mPos.mX + 161 - ((seg.mBounds.GetWidth() / 4) / 2),
						this.mPos.mY + 240 - ((seg.mBounds.GetHeight() / 4) / 2));
			}
		}
		
		this.mRedraw = false;
	}
}
// ...End

