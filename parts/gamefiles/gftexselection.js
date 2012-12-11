// GFTexSelection Class...
// game file:
function GFTexSelection() {
	this.mPos = new IVec2(0, 0);
	
	this.mTextureStr = "";
	
	this.mSegment = new GFMapSegment();
	this.mTexDisp = new Text();
	this.mButton = new GUIButton();
}

GFTexSelection.prototype.SetUp = function(pos, texStr) {
	this.mPos.Copy(pos);
	this.mTextureStr = texStr;
	
	{
		var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
		this.mTexDisp.SetFont(font);
		this.mTexDisp.SetFontSize(12);
		this.mTexDisp.mString = texStr;
		this.mTexDisp.mAlign = "centre";
		this.mTexDisp.mPos.Set(this.mPos.mX + 86, this.mPos.mY + 118);
		this.mTexDisp.mShadow = true;
	}
	
	{
		var bp = new GFBluePrint();
		bp.SetUp("60oc53oc40or60oc70oc30or00oc11oc20o");
		
		var seg = new GFMapSegment();
		seg.mPos.Set(0, 0); seg.SetUp(bp, texStr);
		
		this.mSegment.Copy(seg);
		
		this.mSegment.mTiles[3].ChangeZLevel(0);
		for (var i = 0; i < this.mSegment.mTiles.length; ++i) {
			this.mSegment.mTiles[i].mSprite.mPos.mX += this.mPos.mX;
			this.mSegment.mTiles[i].mSprite.mPos.mY += this.mPos.mY + 20;
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_texselect");
		
		this.mButton.SetUp(new IVec2(this.mPos.mX - 9, this.mPos.mY - 9), new IVec2(190, 152), -5000);
		
		this.mButton.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButton.mSpriteIdle.SetCurrentFrame(0);
		
		this.mButton.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButton.mSpriteHover.SetCurrentFrame(1);
		
		this.mButton.mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButton.mSpriteDown.SetCurrentFrame(2);
		
		this.mButton.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButton.mSpriteInactive.SetCurrentFrame(0);
	}
}

GFTexSelection.prototype.Input = function() {
	this.mButton.Input();
}

GFTexSelection.prototype.Process = function(point) {
	this.mButton.Process(point);
}

GFTexSelection.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr = arr.concat(this.mSegment.GetRenderData());
	arr.push(this.mTexDisp);
	arr = arr.concat(this.mButton.GetRenderData());
	
	return arr;
}

GFTexSelection.prototype.OnClick = function() {
	return this.mButton.OnClick();
}
// ...End

