// GFGUIMapControl Class...
// game file:
function GFGUIMapControl() {
	this.mCompassMain = new Array();
	this.mCompassMain[0] = new GUIButton(); // north
	this.mCompassMain[1] = new GUIButton(); // east
	this.mCompassMain[2] = new GUIButton(); // south
	this.mCompassMain[3] = new GUIButton(); // west
	
	this.mZLevelMain = new Array();
	this.mZLevelMain[0] = new GUIButton(); // up
	this.mZLevelMain[1] = new GUIButton(); // down
	
	this.mBack = new Sprite();
	this.mZLevelExtra = new Sprite();
	
	this.mKeyDown = new Array();
	this.mKeyDown[0] = false;
	this.mKeyDown[1] = false;
	this.mKeyDown[2] = false;
	this.mKeyDown[3] = false;
	
	this.mKeyDown[4] = false;
	this.mKeyDown[5] = false;
}

GFGUIMapControl.prototype.SetUp = function() {
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_compassmain");
		
		{
			this.mCompassMain[0].SetUp(new IVec2(304, 386), new IVec2(64, 36), -5000);
			this.mCompassMain[0].mPos.Set(304, 386);
			
			this.mCompassMain[0].mSpriteIdle.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mCompassMain[0].mSpriteHover.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[0].mSpriteHover.SetCurrentFrame(4);
			
			this.mCompassMain[0].mSpriteDown.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[0].mSpriteDown.SetCurrentFrame(8);
			
			this.mCompassMain[0].mSpriteInactive.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mCompassMain[1].SetUp(new IVec2(380, 386), new IVec2(64, 36), -5000);
			this.mCompassMain[1].mPos.Set(380, 386);
			
			this.mCompassMain[1].mSpriteIdle.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[1].mSpriteIdle.SetCurrentFrame(1);
			
			this.mCompassMain[1].mSpriteHover.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[1].mSpriteHover.SetCurrentFrame(5);
			
			this.mCompassMain[1].mSpriteDown.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[1].mSpriteDown.SetCurrentFrame(9);
			
			this.mCompassMain[1].mSpriteInactive.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[1].mSpriteInactive.SetCurrentFrame(1);
		}
		
		{
			this.mCompassMain[2].SetUp(new IVec2(380, 434), new IVec2(64, 36), -5000);
			this.mCompassMain[2].mPos.Set(380, 434);
			
			this.mCompassMain[2].mSpriteIdle.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[2].mSpriteIdle.SetCurrentFrame(2);
			
			this.mCompassMain[2].mSpriteHover.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[2].mSpriteHover.SetCurrentFrame(6);
			
			this.mCompassMain[2].mSpriteDown.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[2].mSpriteDown.SetCurrentFrame(10);
			
			this.mCompassMain[2].mSpriteInactive.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[2].mSpriteInactive.SetCurrentFrame(2);
		}
		
		{
			this.mCompassMain[3].SetUp(new IVec2(304, 434), new IVec2(64, 36), -5000);
			this.mCompassMain[3].mPos.Set(304, 434);
			
			this.mCompassMain[3].mSpriteIdle.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[3].mSpriteIdle.SetCurrentFrame(3);
			
			this.mCompassMain[3].mSpriteHover.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[3].mSpriteHover.SetCurrentFrame(7);
			
			this.mCompassMain[3].mSpriteDown.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[3].mSpriteDown.SetCurrentFrame(11);
			
			this.mCompassMain[3].mSpriteInactive.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[3].mSpriteInactive.SetCurrentFrame(3);
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_zlevelmain");
		
		{
			this.mZLevelMain[0].SetUp(new IVec2(196, 386), new IVec2(64, 36), -5000);
			this.mZLevelMain[0].mPos.Set(196, 386);
			
			this.mZLevelMain[0].mSpriteIdle.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mZLevelMain[0].mSpriteHover.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[0].mSpriteHover.SetCurrentFrame(2);
			
			this.mZLevelMain[0].mSpriteDown.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[0].mSpriteDown.SetCurrentFrame(4);
			
			this.mZLevelMain[0].mSpriteInactive.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mZLevelMain[1].SetUp(new IVec2(196, 434), new IVec2(64, 36), -5000);
			this.mZLevelMain[1].mPos.Set(196, 434);
			
			this.mZLevelMain[1].mSpriteIdle.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[1].mSpriteIdle.SetCurrentFrame(1);
			
			this.mZLevelMain[1].mSpriteHover.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[1].mSpriteHover.SetCurrentFrame(3);
			
			this.mZLevelMain[1].mSpriteDown.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[1].mSpriteDown.SetCurrentFrame(5);
			
			this.mZLevelMain[1].mSpriteInactive.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[1].mSpriteInactive.SetCurrentFrame(1);
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_back");
		
		this.mBack.mPos.Set(200, 390);
		this.mBack.mDepth = -4999;
		this.mBack.SetTexture(tex);
		this.mBack.mAbsolute = true;
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_zlevelextra");
		
		this.mZLevelExtra.mPos.Set(264, 396);
		this.mZLevelExtra.mDepth = -5000;
		this.mZLevelExtra.SetAnimatedTexture(tex, 4, 4, -1, -1);
		this.mZLevelExtra.SetCurrentFrame(3);
		this.mZLevelExtra.mAbsolute = true;
	}
};

GFGUIMapControl.prototype.Input = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{ // map scrolling
		{ // keyboard input
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.up)) {
				this.mKeyDown[0] = true;
			}
			else {
				this.mKeyDown[0] = false;
			}
			
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.right)) {
				this.mKeyDown[1] = true;
			}
			else {
				this.mKeyDown[1] = false;
			}
			
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.down)) {
				this.mKeyDown[2] = true;
			}
			else {
				this.mKeyDown[2] = false;
			}
			
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.left)) {
				this.mKeyDown[3] = true;
			}
			else {
				this.mKeyDown[3] = false;
			}
		}
		
		// mouse input (gui button)
		for (var i = 0; i < this.mCompassMain.length; ++i) {
			this.mCompassMain[i].Input();
		}
	}
	
	{ // map z-level control
		{ // keyboard input
			if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.q)) {
				currScene.mMap.ChangeZLevel(1);
				this.mZLevelExtra.SetCurrentFrame(currScene.mMap.mCurrZLevel);
				
				this.mKeyDown[4] = true;
			}
			else if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.q) == false) {
				this.mKeyDown[4] = false;
			}
			
			if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.e)) {
				currScene.mMap.ChangeZLevel(-1);
				this.mZLevelExtra.SetCurrentFrame(currScene.mMap.mCurrZLevel);
				
				this.mKeyDown[5] = true;
			}
			else if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.e) == false) {
				this.mKeyDown[5] = false;
			}
		}
		
		// mouse input (gui button)
		for (var i = 0; i < this.mZLevelMain.length; ++i) {
			this.mZLevelMain[i].Input();
		}
	}
}

GFGUIMapControl.prototype.Process = function() {
	// reference to the current scene
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{ // process all gui button elements
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		for (var i = 0; i < this.mCompassMain.length; ++i) {
			this.mCompassMain[i].Process(pt);
		}
		
		for (var i = 0; i < this.mZLevelMain.length; ++i) {
			this.mZLevelMain[i].Process(pt);
		}
	}
	
	{ // handle main compass gui elements being held down
		if (this.mCompassMain[0].mDown == true || this.mKeyDown[0] == true) {
			var x = 0;
			if (currScene.mCam.mTranslate.mX + (nmain.game.mCanvasSize.mX / 2) - 2 > currScene.mMap.mBounds[0]) {
				x = -2;
			}
			
			var y = 0;
			if (currScene.mCam.mTranslate.mY  + (nmain.game.mCanvasSize.mY / 2) - 1 > currScene.mMap.mBounds[1]) {
				y = -1;
			}
			
			currScene.mCam.Translate(new IVec2(x, y));
		}
		
		if (this.mCompassMain[1].mDown == true || this.mKeyDown[1] == true) {
			var x = 0;
			if (currScene.mCam.mTranslate.mX + (nmain.game.mCanvasSize.mX / 2) + 2 < currScene.mMap.mBounds[2]) {
				x = 2;
			}
			
			var y = 0;
			if (currScene.mCam.mTranslate.mY  + (nmain.game.mCanvasSize.mY / 2) - 1 > currScene.mMap.mBounds[1]) {
				y = -1;
			}
			
			currScene.mCam.Translate(new IVec2(x, y));
		}
		
		if (this.mCompassMain[2].mDown == true || this.mKeyDown[2] == true) {
			var x = 0;
			if (currScene.mCam.mTranslate.mX + (nmain.game.mCanvasSize.mX / 2) + 2 < currScene.mMap.mBounds[2]) {
				x = 2;
			}
			
			var y = 0;
			if (currScene.mCam.mTranslate.mY  + (nmain.game.mCanvasSize.mY / 2) + 1 < currScene.mMap.mBounds[3]) {
				y = 1;
			}
			
			currScene.mCam.Translate(new IVec2(x, y));
		}
		
		if (this.mCompassMain[3].mDown == true || this.mKeyDown[3] == true) {
			var x = 0;
			if (currScene.mCam.mTranslate.mX + (nmain.game.mCanvasSize.mX / 2) - 2 > currScene.mMap.mBounds[0]) {
				x = -2;
			}
			
			var y = 0;
			if (currScene.mCam.mTranslate.mY  + (nmain.game.mCanvasSize.mY / 2) + 1 < currScene.mMap.mBounds[3]) {
				y = 1;
			}
			
			currScene.mCam.Translate(new IVec2(x, y));
		}
		
	}
	
	{ // handle main zlevel gui elements being pressed
		if (this.mZLevelMain[0].OnClick() == true) {
			currScene.mMap.ChangeZLevel(1);
			this.mZLevelExtra.SetCurrentFrame(currScene.mMap.mCurrZLevel);
		}
		else if (this.mZLevelMain[1].OnClick() == true) {
			currScene.mMap.ChangeZLevel(-1);
			this.mZLevelExtra.SetCurrentFrame(currScene.mMap.mCurrZLevel);
		}
	}
}

GFGUIMapControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mBack);
	
	// for all main compass gui elements
	for (var i = 0; i < this.mCompassMain.length; ++i) {
		if (this.mKeyDown[i] == true) {
			arr.push(this.mCompassMain[i].mSpriteDown);
		}
		else {
			arr = arr.concat(this.mCompassMain[i].GetRenderData()); // add to render
		}
	}
	
	// for all main zlevel gui elements
	for (var i = 0; i < this.mZLevelMain.length; ++i) {
		if (this.mKeyDown[i + 4] == true) {
			arr.push(this.mZLevelMain[i].mSpriteDown);
		}
		else {
			arr = arr.concat(this.mZLevelMain[i].GetRenderData()); // add to render
		}
	}
	
	// add extra zlevel gui
	arr.push(this.mZLevelExtra);
	
	return arr;
}

GFGUIMapControl.prototype.Hovering = function() {
	{
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		var tl = new IVec2(0, 0); tl.Copy(this.mBack.mPos);
		tl.mX += 2; tl.mY +=  2;
		
		var br = new IVec2(0, 0); br.Copy(this.mBack.mPos);
		br.mX += this.mBack.GetWidth() + 3; br.mY += this.mBack.GetHeight() + 3;
		
		if (util.PointInRectangle(pt, tl, br)) {
			return true;
		}
	}
	
	for (var i = 0; i < this.mCompassMain.length; ++i) {
		if (this.mCompassMain[i].mHover == true) {
			return true;
		}
	}
	
	for (var i = 0; i < this.mZLevelMain.length; ++i) {
		if (this.mZLevelMain[i].mHover == true) {
			return true;
		}
	}
	
	return false;
}
// ...End

