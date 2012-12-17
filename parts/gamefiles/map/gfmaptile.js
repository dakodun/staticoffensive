// GFMapTile Class...
// game file: 
function GFMapTile() {
	this.mLocalPos = new IVec2(0, 0); // the position of this tile in the map segment
	this.mGlobalPos = new IVec2(0, 0); // the position of this tile in the entire map
	
	this.mZ = 0;
	this.mSlopeDirection = 0;
	this.mSpecial = "o";
	
	this.mSprite = new Sprite();
	this.mTileFrame = 0;
	this.mBlank = false;
	
	this.mShowBounds = false;
	this.mBounds = new Shape();
	this.mBoundsPoly = new Array();
};

GFMapTile.prototype.SetUp = function(tex) {
	var x = (this.mGlobalPos.mX * 28) + (this.mGlobalPos.mY * 28);
	var y = (this.mGlobalPos.mX * -14) + (this.mGlobalPos.mY * 14);
	
	this.mSprite.SetAnimatedTexture(tex, 35, 7, -1, -1);
	this.mSprite.mPos.Set(x, y);
	this.mSprite.mDepth = 2500 - (this.mGlobalPos.mY * 10) + (this.mGlobalPos.mX * 10);
	
	this.mTileFrame = this.mZ;
	
	if (this.mTileFrame != 7) {
		if (this.mZ % 2 != 0) {
			this.mTileFrame = this.mZ + (this.mSprite.mFramesPerLine * this.mSlopeDirection);
		}
	}
	else {
		this.mBlank = true;
	}
	
	this.mSprite.SetCurrentFrame(this.mTileFrame);
}

GFMapTile.prototype.GetRenderData = function() {
	var arr = new Array(); // an array to store our render data
	
	arr.push(this.mSprite);
	if (this.mShowBounds == true) {
		arr.push(this.mBounds);
	}
	
	return arr;
}

GFMapTile.prototype.ChangeZLevel = function(newLevel) {
	if (this.mBlank == false) {
		if ((newLevel * 2) < this.mZ) {
			var newFrame = 34 - newLevel;
			if (this.mSprite.mCurrFrame != newFrame) {
				this.mSprite.SetCurrentFrame(newFrame);
			}
		}
		else {
			if (this.mSprite.mCurrFrame != this.mTileFrame) {
				this.mSprite.SetCurrentFrame(this.mTileFrame);
			}
		}
	}
}

GFMapTile.prototype.SetBounds = function(bounds) {
	if (bounds != null) {
		this.mBounds.Copy(bounds);
	}
	
	this.mBounds.mOutline = true;
	this.mBounds.mPos.mX += this.mSprite.mPos.mX; this.mBounds.mPos.mY += this.mSprite.mPos.mY;
	this.mBounds.mDepth = 0;
	
	this.mBoundsPoly.splice(0, this.mBoundsPoly.length);
	this.mBoundsPoly = this.mBoundsPoly.concat(this.mBounds.GetPolygon());
}
// ...End