// GFGUICreationControl Class...
// game file:
function GFGUICreationControl() {
	this.mTranslate = new IVec2(0, 0);
	
	this.mTopBar = new GFGUICreationBar();
	this.mTileControl = new GFGUICreationTileControl();
	this.mNewDialogue = new GFGUICreationNewDialogue();
	
	this.mDialogueOpen = false;
	this.mBlackout = new Shape();
}

GFGUICreationControl.prototype.SetUp = function(initTex) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	var initOffset = new IVec2();
	initOffset.Copy(currScene.mCam.mTranslate);
	
	this.mTopBar.SetUp(initOffset);
	this.mTileControl.SetUp(initTex, initOffset);
	this.mNewDialogue.SetUp(initOffset);
	
	{
		this.mBlackout.mPos.Copy(initOffset);
		this.mBlackout.mDepth = -5005;
		this.mBlackout.mColour = "#000000";
		this.mBlackout.mAlpha = 0.75;
		
		this.mBlackout.AddPoint(new IVec2(nmain.game.mCanvasSize.mX, 0));
		this.mBlackout.AddPoint(new IVec2(nmain.game.mCanvasSize.mX, nmain.game.mCanvasSize.mY));
		this.mBlackout.AddPoint(new IVec2(0, nmain.game.mCanvasSize.mY));
	}
	
	this.mTranslate.Copy(currScene.mCam.mTranslate);
};

GFGUICreationControl.prototype.Input = function() {
	if (this.mDialogueOpen == false) {
		this.mTopBar.Input();
		this.mTileControl.Input();
	}
	else {
		this.mNewDialogue.Input();
	}
}

GFGUICreationControl.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	var offset = new IVec2(0, 0);
	offset.mX = currScene.mCam.mTranslate.mX - this.mTranslate.mX;
	offset.mY = currScene.mCam.mTranslate.mY - this.mTranslate.mY;
	
	{
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		if (this.mDialogueOpen == false) {
			this.mTopBar.Process(pt);
			this.mTileControl.Process(pt);
		}
		else {
			this.mNewDialogue.Process(pt);
		}
	}
	
	{
		this.mTopBar.UpdatePosition(offset);
		this.mTileControl.UpdatePosition(offset);
		this.mNewDialogue.UpdatePosition(offset);
		
		this.mBlackout.mPos.mX += offset.mX;
		this.mBlackout.mPos.mY += offset.mY;
	}
	
	this.mTranslate.Copy(currScene.mCam.mTranslate);
}

GFGUICreationControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr = arr.concat(this.mTopBar.GetRenderData());
	arr = arr.concat(this.mTileControl.GetRenderData());
	
	if (this.mDialogueOpen == true) {
		arr.push(this.mBlackout);
		arr = arr.concat(this.mNewDialogue.GetRenderData());
	}
	
	return arr;
}

GFGUICreationControl.prototype.Hovering = function() {
	if (this.mTopBar.Hovering() == true) {
		return true;
	}
	
	if (this.mTileControl.Hovering() == true) {
		return true;
	}
	
	return false;
}
// ...End

