// GFGUICreationGenerateDialogue Class...
// game file:
function GFGUICreationGenerateDialogue() {
	this.mPos = new IVec2(0, 0);
	this.mSprite = new Sprite();
	
	this.mListBoxes = new Array();
	this.mListBoxes[0] = new GUIListBox();
	this.mListBoxes[1] = new GUIListBox();
	this.mListBoxes[2] = new GUIListBox();
	this.mListBoxes[3] = new GUIListBox();
	this.mListBoxes[4] = new GUIListBox();
	this.mListBoxes[5] = new GUIListBox();
	
	this.mRedraw = false;
	this.mRenderCanvas = new RenderCanvas();
	
	this.mButtons = new Array();
	this.mButtons[0] = new GUIButton();
	this.mButtons[1] = new GUIButton();
	this.mButtons[2] = new GUIButton();
	
	this.mArrows = new Array();
	this.mArrows[0] = new GUIButton();
	this.mArrows[1] = new GUIButton();
	
	this.mPreviewID = new IVec2(0, 0);
	
	this.mCurrentSeg = false;
	this.mWarning = false;
	
	this.mConfirmText = new Text();
	this.mBackText = new Text();
	this.mWarningText = new Text();
	this.mTypeText = new Text();
	
	this.mCurrentSeg = false;
	this.mSegmentList = new Array();
	this.mSegmentType = 0;
}

GFGUICreationGenerateDialogue.prototype.SetUp = function() {
	var pos = new IVec2(nmain.game.mCanvasSize.mX / 2, nmain.game.mCanvasSize.mY / 2);
	pos.mX -= 227; pos.mY -= 161;
	this.mPos.Copy(pos);
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_generatedialogue_back");
		
		this.mSprite.mPos.Set(pos.mX, pos.mY);
		this.mSprite.mDepth = -5100;
		this.mSprite.SetTexture(tex);
		this.mSprite.mAbsolute = true;
	}
	
	{
		{
			this.mListBoxes[0].SetUp(new IVec2(pos.mX + 7, pos.mY + 40), -5101, "gui_creation_loaddialogue_listbox_arrows");
			this.mListBoxes[0].mItemsMax = 5;
			
			this.mListBoxes[1].SetUp(new IVec2(pos.mX + 241, pos.mY + 40), -5101, "gui_creation_loaddialogue_listbox_arrows");
			this.mListBoxes[1].mItemsMax = 5;
		}
		
		{
			this.mListBoxes[2].SetUp(new IVec2(pos.mX + 7, pos.mY + 40), -5101, "gui_creation_loaddialogue_listbox_arrows");
			this.mListBoxes[2].mItemsMax = 5;
			
			this.mListBoxes[3].SetUp(new IVec2(pos.mX + 241, pos.mY + 40), -5101, "gui_creation_loaddialogue_listbox_arrows");
			this.mListBoxes[3].mItemsMax = 5;
		}
		
		{
			this.mListBoxes[4].SetUp(new IVec2(pos.mX + 7, pos.mY + 40), -5101, "gui_creation_loaddialogue_listbox_arrows");
			this.mListBoxes[4].mItemsMax = 5;
			
			this.mListBoxes[5].SetUp(new IVec2(pos.mX + 241, pos.mY + 40), -5101, "gui_creation_loaddialogue_listbox_arrows");
			this.mListBoxes[5].mItemsMax = 5;
		}
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
			
			this.mButtons[0].SetUp(new IVec2(pos.mX + 198, pos.mY + 130), new IVec2(60, 26), -5101);
			
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
			
			this.mButtons[1].SetUp(new IVec2(pos.mX + 135, pos.mY + 130), new IVec2(60, 26), -5101);
			
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
			
			this.mButtons[2].SetUp(new IVec2(pos.mX + 430, pos.mY + 137), new IVec2(18, 18), -5101);
			
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
			this.mConfirmText.mString = "Next";
			this.mConfirmText.mAlign = "centre";
			this.mConfirmText.mPos.Set(pos.mX + 228, pos.mY + 136);
			this.mConfirmText.mColour = "#270100";
			this.mConfirmText.mDepth = -5102;
		}
		
		{
			this.mBackText.SetFont(font);
			this.mBackText.SetFontSize(12);
			this.mBackText.mAbsolute = true;
			this.mBackText.mString = "Back";
			this.mBackText.mAlign = "centre";
			this.mBackText.mPos.Set(pos.mX + 165, pos.mY + 136);
			this.mBackText.mColour = "#270100";
			this.mBackText.mDepth = -5102;
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
		
		{
			this.mTypeText.SetFont(font);
			this.mTypeText.SetFontSize(12);
			this.mTypeText.mAbsolute = true;
			this.mTypeText.mString = "Initial Segments";
			this.mTypeText.mAlign = "centre";
			this.mTypeText.mPos.Set(pos.mX + 344, pos.mY + 134);
			this.mTypeText.mColour = "#D0C3AE";
			this.mTypeText.mDepth = -5102;
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_generatedialogue_arrows");
		
		{
			this.mArrows[0].SetUp(new IVec2(pos.mX + 218, pos.mY + 48), new IVec2(18, 32), -5101);
			
			this.mArrows[0].mSpriteIdle.SetAnimatedTexture(tex, 8, 2, -1, -1);
			this.mArrows[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mArrows[0].mSpriteHover.SetAnimatedTexture(tex, 8, 2, -1, -1);
			this.mArrows[0].mSpriteHover.SetCurrentFrame(2);
			
			this.mArrows[0].mSpriteDown.SetAnimatedTexture(tex, 8, 2, -1, -1);
			this.mArrows[0].mSpriteDown.SetCurrentFrame(4);
			
			this.mArrows[0].mSpriteInactive.SetAnimatedTexture(tex, 8, 2, -1, -1);
			this.mArrows[0].mSpriteInactive.SetCurrentFrame(6);
		}
		
		{
			this.mArrows[1].SetUp(new IVec2(pos.mX + 218, pos.mY + 84), new IVec2(18, 32), -5101);
			
			this.mArrows[1].mSpriteIdle.SetAnimatedTexture(tex, 8, 2, -1, -1);
			this.mArrows[1].mSpriteIdle.SetCurrentFrame(1);
			
			this.mArrows[1].mSpriteHover.SetAnimatedTexture(tex, 8, 2, -1, -1);
			this.mArrows[1].mSpriteHover.SetCurrentFrame(3);
			
			this.mArrows[1].mSpriteDown.SetAnimatedTexture(tex, 8, 2, -1, -1);
			this.mArrows[1].mSpriteDown.SetCurrentFrame(5);
			
			this.mArrows[1].mSpriteInactive.SetAnimatedTexture(tex, 8, 2, -1, -1);
			this.mArrows[1].mSpriteInactive.SetCurrentFrame(7);
		}
	}
}

GFGUICreationGenerateDialogue.prototype.Input = function() {
	for (var i = this.mSegmentType; i < this.mSegmentType + 2; ++i) {
		this.mListBoxes[i].Input();
	}
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		this.mButtons[i].Input();
	}
	
	for (var i = 0; i < this.mArrows.length; ++i) {
		this.mArrows[i].Input();
	}
}

GFGUICreationGenerateDialogue.prototype.Process = function(point) {
	this.RedrawPreview();
	
	{
		for (var i = this.mSegmentType; i < this.mSegmentType + 2; ++i) {
			this.mListBoxes[i].Process(point);
			
			for (var j = 0; j < this.mListBoxes[i].mItems.length; ++j) {
				if (this.mListBoxes[i].mItems[j].OnClick() == true) {
					this.mPreviewID.Set(i, j);
					this.mRedraw = true;
				}
			}
		}
	}
	
	{
		for (var i = 0; i < this.mButtons.length; ++i) {
			this.mButtons[i].Process(point);
		}
		
		for (var i = 0; i < this.mArrows.length; ++i) {
			this.mArrows[i].Process(point);
		}
		
		this.ProcessButtonState();
		this.ProcessTextState();
		this.ProcessButtonClick();
	}	
}

GFGUICreationGenerateDialogue.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	
	arr.push(this.mRenderCanvas);
	
	for (var i = this.mSegmentType; i < this.mSegmentType + 2; ++i) {
		arr = arr.concat(this.mListBoxes[i].GetRenderData());
	}
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		arr = arr.concat(this.mButtons[i].GetRenderData());
	}
	
	arr.push(this.mConfirmText);
	arr.push(this.mBackText);
	arr.push(this.mTypeText);
	
	for (var i = 0; i < this.mArrows.length; ++i) {
		arr = arr.concat(this.mArrows[i].GetRenderData());
	}
	
	if (this.mWarning == true) {
		arr.push(this.mWarningText);
	}
	
	return arr;
}

GFGUICreationGenerateDialogue.prototype.PopulateSegmentList = function() {
	this.mRenderCanvas.Clear();
	this.mPreviewID.Set(0, 0);
	this.mSegmentType = 0;
	
	this.mSegmentList.splice(0, this.mSegmentList.length);
	this.mListBoxes[0].Clear();
	this.mListBoxes[1].Clear();
	this.mListBoxes[2].Clear();
	this.mListBoxes[3].Clear();
	this.mListBoxes[4].Clear();
	this.mListBoxes[5].Clear();
	
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
			this.mListBoxes[0].AddItem(itemBut, itemTxt);
			this.mListBoxes[2].AddItem(itemBut, itemTxt);
			this.mListBoxes[4].AddItem(itemBut, itemTxt);
		}
	}
	
	this.mRedraw = true;
}

GFGUICreationGenerateDialogue.prototype.RedrawPreview = function() {
	if (this.mRedraw == true) {
		var bp = new GFBluePrint();
		var ls = new LocalStorage();
		
		if (this.mPreviewID.mX < this.mListBoxes.length) {
			if (this.mPreviewID.mY < this.mListBoxes[this.mPreviewID.mX].mItemsText.length) {
				var segKey = "seg" + this.mListBoxes[this.mPreviewID.mX].mItemsText[this.mPreviewID.mY].mString;
				
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
							
							this.mNeedSort = false;
						}
						
						this.mRenderCanvas.mContext.save();
						this.mRenderCanvas.mContext.scale(0.25, 0.25);
						for (var i = 0; i < arr.length; ++i) {
							this.mRenderCanvas.RenderTo(arr[i]);
						}
						
						this.mRenderCanvas.mContext.restore();
						
						this.mRenderCanvas.mPos.Set(this.mPos.mX + 225 - ((seg.mBounds.GetWidth() / 4) / 2),
								this.mPos.mY + 240 - ((seg.mBounds.GetHeight() / 4) / 2));
					}
				}
			}
		}
		
		this.mRedraw = false;
	}
}

GFGUICreationGenerateDialogue.prototype.ProcessButtonState = function() {
	if (this.mSegmentType == 0) {
		this.mButtons[1].mActive = false;
	}
	else {
		this.mButtons[1].mActive = true;
	}
	
	if (this.mListBoxes[this.mSegmentType].mItems.length == 0) {
		this.mArrows[1].mActive = false;
	}
	else {
		this.mArrows[1].mActive = true;
	}
	
	if (this.mListBoxes[this.mSegmentType + 1].mItems.length == 0) {
		this.mArrows[0].mActive = false;
		this.mButtons[0].mActive = false;
	}
	else {
		this.mArrows[0].mActive = true;
		this.mButtons[0].mActive = true;
	}
}

GFGUICreationGenerateDialogue.prototype.ProcessTextState = function() {
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
			
			if (this.mSegmentType == 4 && this.mCurrentSeg == true) {
				this.mWarning = true;
				this.mWarningText.mString = "Warning: loading this segment will discard the current segment!";
			}
		}
		else {
			this.mConfirmText.mColour = "#270100";
		}
	}
	
	if (this.mButtons[1].mActive == false) {
		this.mBackText.mColour = "#1E1915";
	}
	else {
		if (this.mButtons[1].mStatus == "down") {
			this.mBackText.mColour = "#0B0505";
		}
		else if (this.mButtons[1].mStatus == "hover") {
			this.mBackText.mColour = "#501E11";
		}
		else {
			this.mBackText.mColour = "#270100";
		}
	}
	
	if (this.mSegmentType == 4) {
		if (this.mConfirmText.mString != "Finish") {
			this.mConfirmText.mString = "Finish";
		}
	}
	else {
		if (this.mConfirmText.mString != "Next") {
			this.mConfirmText.mString = "Next";
		}
	}
	
	if (this.mSegmentType == 0) {
		this.mTypeText.mString = "Initial Segments";
	}
	else if (this.mSegmentType == 2) {
		this.mTypeText.mString = "Regular Segments";
	}
	else if (this.mSegmentType == 4) {
		this.mTypeText.mString = "Final Segments";
	}
}

GFGUICreationGenerateDialogue.prototype.ProcessButtonClick = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	if (this.mButtons[0].OnClick() == true) {
		if (this.mSegmentType < 4) {
			this.mSegmentType += 2;
			
			this.mRenderCanvas.Clear();
			this.mRedraw = true;
			
			if (this.mListBoxes[this.mPreviewID.mX].mItemsText.length > 0) {
				this.mPreviewID.Set(this.mSegmentType, 0);
			}
			else {
				this.mPreviewID.Set(this.mSegmentType + 1, 0);
			}
		}
		else {
			var bpc = new GFBluePrintCollection();
			var ls = new LocalStorage();
			
			for (var i = 0; i < this.mListBoxes[1].mItems.length; ++i) {
				var segKey = "seg" + this.mListBoxes[1].mItemsText[i].mString;
				
				if (ls.Exists(segKey) == true) {
					bpc.mInitStore.push(ls.Load(segKey));
				}
			}
			
			for (var i = 0; i < this.mListBoxes[3].mItems.length; ++i) {
				var segKey = "seg" + this.mListBoxes[3].mItemsText[i].mString;
				
				if (ls.Exists(segKey) == true) {
					bpc.mRegStore.push(ls.Load(segKey));
				}
			}
			
			for (var i = 0; i < this.mListBoxes[5].mItems.length; ++i) {
				var segKey = "seg" + this.mListBoxes[5].mItemsText[i].mString;
				
				if (ls.Exists(segKey) == true) {
					bpc.mFinStore.push(ls.Load(segKey));
				}
			}
			
			nmgrs.sceneMan.mCurrScene.mPersist = false;
			nmgrs.sceneMan.RequestSceneChange(new GFTestScene());
			nmgrs.sceneMan.mReadyScene.mBPCollection.Copy(bpc);
		}
	}
	else if (this.mButtons[1].OnClick() == true) {
		this.mSegmentType -= 2;
		
		this.mRenderCanvas.Clear();
		this.mRedraw = true;
		
		if (this.mListBoxes[this.mPreviewID.mX].mItemsText.length > 0) {
			this.mPreviewID.Set(this.mSegmentType, 0);
		}
		else {
			this.mPreviewID.Set(this.mSegmentType + 1, 0);
		}
	}
	else if (this.mButtons[2].OnClick() == true) {
		currScene.mCreationControl.mDialogueOpen = "";
	}
	
	if (this.mArrows[0].OnClick() == true) {
		var selected = this.mListBoxes[this.mSegmentType + 1].mSelected;
		if (selected >= 0) {
			var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_loaddialogue_listbox");
			var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
			
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
			
			itemTxt.mString = this.mListBoxes[this.mSegmentType + 1].GetActive();
			
			this.mListBoxes[this.mSegmentType].AddItem(itemBut, itemTxt);
			this.mListBoxes[this.mSegmentType + 1].RemoveItem(selected);
		}
	}
	else if (this.mArrows[1].OnClick() == true) {
		var selected = this.mListBoxes[this.mSegmentType].mSelected;
		if (selected >= 0) {
			var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_loaddialogue_listbox");
			var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
			
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
			
			itemTxt.mString = this.mListBoxes[this.mSegmentType].GetActive();
			
			this.mListBoxes[this.mSegmentType + 1].AddItem(itemBut, itemTxt);
			this.mListBoxes[this.mSegmentType].RemoveItem(selected);
		}
	}
}
// ...End

