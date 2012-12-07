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
	
	this.mCompassExtra = new Sprite();
	this.mZLevelExtra = new Sprite();
	
	this.mTranslate = new IVec2(0, 0);
}

GFGUIMapControl.prototype.SetUp = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	var initOffset = new IVec2();
	initOffset.Copy(currScene.mCam.mTranslate);
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_compassmain");
		
		{
			this.mCompassMain[0].SetUp(new IVec2(512 + initOffset.mX, 10 + initOffset.mY), new IVec2(40, 22), -5000);
			this.mCompassMain[0].mPos.Set(512, 10);
			
			this.mCompassMain[0].mSpriteIdle.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mCompassMain[0].mSpriteHover.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[0].mSpriteHover.SetCurrentFrame(1);
			
			this.mCompassMain[0].mSpriteDown.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[0].mSpriteDown.SetCurrentFrame(2);
			
			this.mCompassMain[0].mSpriteInactive.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mCompassMain[1].SetUp(new IVec2(584 + initOffset.mX, 10 + initOffset.mY), new IVec2(40, 22), -5000);
			this.mCompassMain[1].mPos.Set(584, 10);
			
			this.mCompassMain[1].mSpriteIdle.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[1].mSpriteIdle.SetCurrentFrame(3);
			
			this.mCompassMain[1].mSpriteHover.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[1].mSpriteHover.SetCurrentFrame(4);
			
			this.mCompassMain[1].mSpriteDown.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[1].mSpriteDown.SetCurrentFrame(5);
			
			this.mCompassMain[1].mSpriteInactive.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[1].mSpriteInactive.SetCurrentFrame(3);
		}
		
		{
			this.mCompassMain[2].SetUp(new IVec2(512 + initOffset.mX, 46 + initOffset.mY), new IVec2(40, 22), -5000);
			this.mCompassMain[2].mPos.Set(512, 46);
			
			this.mCompassMain[2].mSpriteIdle.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[2].mSpriteIdle.SetCurrentFrame(6);
			
			this.mCompassMain[2].mSpriteHover.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[2].mSpriteHover.SetCurrentFrame(7);
			
			this.mCompassMain[2].mSpriteDown.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[2].mSpriteDown.SetCurrentFrame(8);
			
			this.mCompassMain[2].mSpriteInactive.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[2].mSpriteInactive.SetCurrentFrame(6);
		}
		
		{
			this.mCompassMain[3].SetUp(new IVec2(584 + initOffset.mX, 46 + initOffset.mY), new IVec2(40, 22), -5000);
			this.mCompassMain[3].mPos.Set(584, 46);
			
			this.mCompassMain[3].mSpriteIdle.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[3].mSpriteIdle.SetCurrentFrame(9);
			
			this.mCompassMain[3].mSpriteHover.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[3].mSpriteHover.SetCurrentFrame(10);
			
			this.mCompassMain[3].mSpriteDown.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[3].mSpriteDown.SetCurrentFrame(11);
			
			this.mCompassMain[3].mSpriteInactive.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[3].mSpriteInactive.SetCurrentFrame(9);
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_zlevelmain");
		
		{
			this.mZLevelMain[0].SetUp(new IVec2(422 + initOffset.mX, 10 + initOffset.mY), new IVec2(38, 22), -5000);
			this.mZLevelMain[0].mPos.Set(422, 10);
			
			this.mZLevelMain[0].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mZLevelMain[0].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[0].mSpriteHover.SetCurrentFrame(1);
			
			this.mZLevelMain[0].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[0].mSpriteDown.SetCurrentFrame(2);
			
			this.mZLevelMain[0].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mZLevelMain[1].SetUp(new IVec2(422 + initOffset.mX, 46 + initOffset.mY), new IVec2(38, 22), -5000);
			this.mZLevelMain[1].mPos.Set(422, 46);
			
			this.mZLevelMain[1].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[1].mSpriteIdle.SetCurrentFrame(3);
			
			this.mZLevelMain[1].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[1].mSpriteHover.SetCurrentFrame(4);
			
			this.mZLevelMain[1].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[1].mSpriteDown.SetCurrentFrame(5);
			
			this.mZLevelMain[1].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[1].mSpriteInactive.SetCurrentFrame(3);
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_compassextra");
		
		this.mCompassExtra.mPos.Set(554 + initOffset.mX, 32 + initOffset.mY);
		this.mCompassExtra.mDepth = -5000;
		this.mCompassExtra.SetTexture(tex);
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_zlevelextra");
		
		this.mZLevelExtra.mPos.Set(468 + initOffset.mX, 6 + initOffset.mY);
		this.mZLevelExtra.mDepth = -5000;
		this.mZLevelExtra.SetAnimatedTexture(tex, 4, 4, -1, -1);
		this.mZLevelExtra.SetCurrentFrame(3);
	}
};

GFGUIMapControl.prototype.Input = function() {
	{ // map scrolling
		{ // keyboard input
			var trans = new IVec2(0, 0);
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.up)) {
				trans.mX += 2; trans.mY += 1;
			}
			
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.right)) {
				trans.mX += -2; trans.mY += 1;
			}
			
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.down)) {
				trans.mX += -2; trans.mY += -1;
			}
			
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.left)) {
				trans.mX += 2; trans.mY += -1;
			}
			
			this.mTranslate.Copy(trans);
		}
		
		// mouse input (gui button)
		for (var i = 0; i < this.mCompassMain.length; ++i) {
			this.mCompassMain[i].Input();
		}
	}
	
	{ // map z-level control
		var currScene = nmgrs.sceneMan.mCurrScene;
		{ // keyboard input
			if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.q)) {
				currScene.mMap.ChangeZLevel(-1);
				this.mZLevelExtra.SetCurrentFrame(currScene.mMap.mCurrZLevel);
			}
			
			if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.e)) {
				currScene.mMap.ChangeZLevel(1);
				this.mZLevelExtra.SetCurrentFrame(currScene.mMap.mCurrZLevel);
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
	
	// process any necessary keyboard translation
	if (this.mTranslate.mX != 0 || this.mTranslate.mY != 0) {
		currScene.mCam.Translate(this.mTranslate);
	}
	
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
		if (this.mCompassMain[0].mDown == true) {
			currScene.mCam.Translate(new IVec2(2, 1));
			this.mTranslate.mX += 2; this.mTranslate.mY += 1;
		}
		else if (this.mCompassMain[1].mDown == true) {
			currScene.mCam.Translate(new IVec2(-2, 1));
			this.mTranslate.mX -= 2; this.mTranslate.mY += 1;
		}
		else if (this.mCompassMain[2].mDown == true) {
			currScene.mCam.Translate(new IVec2(2, -1));
			this.mTranslate.mX += 2; this.mTranslate.mY -= 1;
		}
		else if (this.mCompassMain[3].mDown == true) {
			currScene.mCam.Translate(new IVec2(-2, -1));
			this.mTranslate.mX -= 2; this.mTranslate.mY -= 1;
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
	
	// if the camera view has changed
	if (currScene.mCam.mViewUpdated == true) {
		// for all main compass gui elements
		for (var i = 0; i < this.mCompassMain.length; ++i) {
			// find new position using translation offset and update gui to remain at same point on screen
			var newPos = new IVec2(0, 0); newPos.Copy(this.mCompassMain[i].GetSpritePositions());
			newPos.mX -= this.mTranslate.mX; newPos.mY -= this.mTranslate.mY;
			this.mCompassMain[i].SetSpritePositions(newPos);
		}
		
		// for all main zlevel gui elements
		for (var i = 0; i < this.mZLevelMain.length; ++i) {
			// find new position using translation offset and update gui to remain at same point on screen
			var newPos = new IVec2(0, 0); newPos.Copy(this.mZLevelMain[i].GetSpritePositions());
			newPos.mX -= this.mTranslate.mX; newPos.mY -= this.mTranslate.mY;
			this.mZLevelMain[i].SetSpritePositions(newPos);
		}
		
		{
			this.mCompassExtra.mPos.Set(554 + currScene.mCam.mTranslate.mX, 32 + currScene.mCam.mTranslate.mY);
			this.mZLevelExtra.mPos.Set(468 + currScene.mCam.mTranslate.mX, 6 + currScene.mCam.mTranslate.mY);
		}
	}
}

GFGUIMapControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	// for all main compass gui elements
	for (var i = 0; i < this.mCompassMain.length; ++i) {
		arr = arr.concat(this.mCompassMain[i].GetRenderData()); // add to render
	}
	
	// for all main zlevel gui elements
	for (var i = 0; i < this.mZLevelMain.length; ++i) {
		arr = arr.concat(this.mZLevelMain[i].GetRenderData()); // add to render
	}
	
	// add extra compass gui
	arr.push(this.mCompassExtra);
	
	// add extra zlevel gui
	arr.push(this.mZLevelExtra);
	
	return arr;
}
// ...End

