// GFGUICreationControl Class...
// game file:
function GFGUICreationControl() {
	this.mTopBar = new GFGUICreationBar();
	this.mTileControl = new GFGUICreationTileControl();
	
	this.mDialogueControl = new GFGUICreationDialogueControl();
	this.mDialogueOpen = "";
	this.mBlackout = new Shape();
}

GFGUICreationControl.prototype.SetUp = function(initTex) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	this.mTopBar.SetUp();
	this.mTileControl.SetUp(initTex);
	
	this.mDialogueControl.SetUp();
	
	{
		this.mBlackout.mPos.Set(0, 0);
		this.mBlackout.mDepth = -5005;
		this.mBlackout.mColour = "#000000";
		this.mBlackout.mAlpha = 0.75;
		this.mBlackout.mAbsolute = true;
		
		this.mBlackout.AddPoint(new IVec2(nmain.game.mCanvasSize.mX, 0));
		this.mBlackout.AddPoint(new IVec2(nmain.game.mCanvasSize.mX, nmain.game.mCanvasSize.mY));
		this.mBlackout.AddPoint(new IVec2(0, nmain.game.mCanvasSize.mY));
	}
};

GFGUICreationControl.prototype.Input = function() {
	if (this.mDialogueOpen == "") {
		this.mTopBar.Input();
		this.mTileControl.Input();
	}
	else {
		this.mDialogueControl.Input(this.mDialogueOpen);
	}
}

GFGUICreationControl.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		if (this.mDialogueOpen == "") {
			this.mTopBar.Process(pt);
			this.mTileControl.Process(pt);
		}
		else {
			this.mDialogueControl.Process(this.mDialogueOpen, pt);
		}
	}
}

GFGUICreationControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr = arr.concat(this.mTopBar.GetRenderData());
	arr = arr.concat(this.mTileControl.GetRenderData());
	
	if (this.mDialogueOpen != "") {
		arr.push(this.mBlackout);
		arr = arr.concat(this.mDialogueControl.GetRenderData(this.mDialogueOpen));
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

