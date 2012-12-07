// GFGUICreationControl Class...
// game file:
function GFGUICreationControl() {
	this.mTopBar = new Sprite();
}

GFGUICreationControl.prototype.SetUp = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	var initOffset = new IVec2();
	initOffset.Copy(currScene.mCam.mTranslate);
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_topbar");
		
		this.mTopBar.mPos.Set(8 + initOffset.mX, 10 + initOffset.mY);
		this.mTopBar.mDepth = -5000;
		this.mTopBar.SetTexture(tex);
	}
};

GFGUICreationControl.prototype.Input = function() {
	
}

GFGUICreationControl.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	this.mTopBar.mPos.Set(8 + currScene.mCam.mTranslate.mX, 10 + currScene.mCam.mTranslate.mY);
}

GFGUICreationControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mTopBar);
	
	return arr;
}
// ...End

