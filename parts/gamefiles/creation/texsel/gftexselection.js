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
		var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
		this.mTexDisp.SetFont(font);
		this.mTexDisp.SetFontSize(12);
		this.mTexDisp.mString = texStr;
		this.mTexDisp.mAlign = "centre";
		this.mTexDisp.mPos.Set(this.mPos.mX + 86, this.mPos.mY + 118);
		this.mTexDisp.mShadow = true;
	}
	
	{
		var bp = new GFBluePrint();
		bp.SetUp("a:" + texStr + ";{60oa?53oa?40oa!60oa?70oa?30oa!00oa?11oa?20oa}");
		
		var seg = new GFMapSegment();
		seg.mPos.Set(0, 0); seg.SetUp(bp);
		
		this.mSegment.Copy(seg);
		
		
		this.mSegment.mTiles[3].ChangeZLevel(0);
		this.mSegment.mTiles[3].SetBounds(this.mSegment.mTileBounds.mBounds[this.mSegment.mTiles[3].mSprite.mCurrFrame]);
		for (var i = 0; i < this.mSegment.mTiles.length; ++i) {
			this.mSegment.mTiles[i].mSprite.mPos.mX += this.mPos.mX;
			this.mSegment.mTiles[i].mSprite.mPos.mY += this.mPos.mY + 20;
			
			this.mSegment.mTiles[i].mBounds.mPos.mX += this.mPos.mX;
			this.mSegment.mTiles[i].mBounds.mPos.mY += this.mPos.mY + 20;
		}
		
		this.mSegment.mBounds.mPos.mX += this.mPos.mX;
		this.mSegment.mBounds.mPos.mY += this.mPos.mY + 20;
		this.mSegment.mBoundsPoly.splice(0, this.mSegment.mBoundsPoly.length);
		this.mSegment.mBoundsPoly = this.mSegment.mBoundsPoly.concat(this.mSegment.mBounds.GetPolygon());
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_texselect");
		
		this.mButton.SetUp(new IVec2(this.mPos.mX - 10, this.mPos.mY - 11), new IVec2(202, 153), 10000);
		
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

