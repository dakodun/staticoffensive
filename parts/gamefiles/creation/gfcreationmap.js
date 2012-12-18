// GFCreationMap Class...
// game file: 
function GFCreationMap() {
	this.mSize = new IVec2(0, 0);
	
	this.mSegment = new GFMapSegment();
	this.mCurrZLevel = 3;
	
	this.mCurrentTile = -1;
};

GFCreationMap.prototype.Copy = function(other) {
	this.mSize.Copy(other.mSize);
	
	this.mSegment.Copy(other.mSegment);
	this.mCurrZLevel = other.mCurrZLevel;
	
	this.mCurrentTile = other.mCurrentTile;
}


GFCreationMap.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	var pt = new IVec2(0, 0);
	pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
	pt.mX += currScene.mCam.mTranslate.mX; pt.mY += currScene.mCam.mTranslate.mY;
	
	var hoveringTile = false;
	
	if (util.PointInConvex(pt, this.mSegment.mBoundsPoly) == true) {
		for (var i = 0; i < this.mSegment.mTiles.length; ++i) {
			if (util.PointInConvex(pt, this.mSegment.mTiles[i].mBoundsPoly) == true) {
				if (this.mCurrentTile != -1) {
					var tileCurr = new IVec2(0, 0);
					tileCurr.Copy(this.mSegment.mTiles[this.mCurrentTile].mGlobalPos);
					
					var tileCheck = new IVec2(0, 0);
					tileCheck.Copy(this.mSegment.mTiles[i].mGlobalPos);
					
					if (tileCurr.mY < tileCheck.mY) {
						this.mSegment.mTiles[this.mCurrentTile].mShowBounds = false;
						
						this.mSegment.mTiles[i].mShowBounds = true;
						this.mCurrentTile = i;
						hoveringTile = true;
					}
					else if (tileCurr.mY == tileCheck.mY) {
						if (tileCurr.mX > tileCheck.mX) {
							this.mSegment.mTiles[this.mCurrentTile].mShowBounds = false;
							
							this.mSegment.mTiles[i].mShowBounds = true;
							this.mCurrentTile = i;
							hoveringTile = true;
						}
						else if (tileCurr.mX == tileCheck.mX) {
							hoveringTile = true;
						}
					}
				}
				else {
					this.mSegment.mTiles[i].mShowBounds = true;
					this.mCurrentTile = i;
					hoveringTile = true;
				}
			}
		}
	}
	
	if (hoveringTile == false) {
		if (this.mCurrentTile != -1) {
			this.mSegment.mTiles[this.mCurrentTile].mShowBounds = false;
			this.mCurrentTile = -1;
		}
	}
}

GFCreationMap.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr = arr.concat(this.mSegment.GetRenderData());
	
	return arr;
}

GFCreationMap.prototype.ChangeZLevel = function(newLevel) {
	if (this.mCurrZLevel + newLevel <= 3 && this.mCurrZLevel + newLevel >= 0) {
		this.mCurrZLevel += newLevel;
		
		this.mSegment.ChangeZLevel(newLevel);
	}
}

GFCreationMap.prototype.UnselectTile = function() {
	if (this.mCurrentTile != -1) {
		this.mSegment.mTiles[this.mCurrentTile].mShowBounds = false;
		this.mCurrentTile = -1;
	}
}
// ...End

