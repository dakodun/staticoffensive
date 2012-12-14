// GFGUICreationControl Class...
// game file:
function GFGUICreationControl() {
	this.mTranslate = new IVec2(0, 0);
	
	this.mTopBar = new GFGUICreationBar();
	this.mTileControl = new GFGUICreationTileControl();
}

GFGUICreationControl.prototype.SetUp = function(initTex) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	var initOffset = new IVec2();
	initOffset.Copy(currScene.mCam.mTranslate);
	
	this.mTopBar.SetUp(initOffset);
	this.mTileControl.SetUp(initTex, initOffset);
	
	this.mTranslate.Copy(currScene.mCam.mTranslate);
};

GFGUICreationControl.prototype.Input = function() {
	this.mTopBar.Input();
	this.mTileControl.Input();
}

GFGUICreationControl.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	var offset = new IVec2(0, 0);
	offset.mX = currScene.mCam.mTranslate.mX - this.mTranslate.mX;
	offset.mY = currScene.mCam.mTranslate.mY - this.mTranslate.mY;
	
	{
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		this.mTopBar.Process(pt, offset);
		this.mTileControl.Process(pt, offset);
	}
	
	this.mTranslate.Copy(currScene.mCam.mTranslate);
}

GFGUICreationControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr = arr.concat(this.mTopBar.GetRenderData());
	arr = arr.concat(this.mTileControl.GetRenderData());
	
	return arr;
}
// ...End

