// GFMapSegmentContainer Class...
// game file: 
function GFMapSegmentContainer() {
	this.mMapSegment = new GFMapSegment();
	this.mRangeStart = new IVec2(0, 0);
	this.mRangeEnd = new IVec2(0, 0);
}
// ...End


// GFMap Class...
// game file: 
function GFMap() {
	this.mSize = new IVec2(0, 0);
	
	this.mSegments = new Array();
	this.mCurrZLevel = 3;
	
	this.mCurrentTile = new IVec2(-1, -1);
};

GFMap.prototype.Copy = function(other) {
	this.mSize.Copy(other.mSize);
	
	this.mSegments.splice(0, this.mSegments.length);
	this.mSegments = this.mSegments.concat(other.mSegments);
	
	this.mCurrZLevel = other.mCurrZLevel;
}

GFMap.prototype.AddSegment = function(segment) {
	var segCont = new GFMapSegmentContainer();
	segCont.mMapSegment.Copy(segment);
	segCont.mRangeStart.Copy(segment.mPos);
	segCont.mRangeEnd.Copy(segment.mPos);
	segCont.mRangeEnd.mX += segment.mSize.mX; segCont.mRangeEnd.mY += segment.mSize.mY;
	
	this.mSegments.push(segCont);
}

GFMap.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	var pt = new IVec2(0, 0);
	pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
	pt.mX += currScene.mCam.mTranslate.mX; pt.mY += currScene.mCam.mTranslate.mY;
	
	var hoveringTile = false;
	for (var i = 0; i < this.mSegments.length; ++i) {
		if (util.PointInConvex(pt, this.mSegments[i].mMapSegment.mBoundsPoly) == true) {
			for (var j = 0; j < this.mSegments[i].mMapSegment.mTiles.length; ++j) {
				if (util.PointInConvex(pt, this.mSegments[i].mMapSegment.mTiles[j].mBoundsPoly) == true) {
					if (this.mCurrentTile.mX != -1 && this.mCurrentTile.mY != -1) {
						var tileCurr = new IVec2(0, 0);
						tileCurr.Copy(this.mSegments[this.mCurrentTile.mX].mMapSegment.mTiles[this.mCurrentTile.mY].mGlobalPos);
						
						var tileCheck = new IVec2(0, 0);
						tileCheck.Copy(this.mSegments[i].mMapSegment.mTiles[j].mGlobalPos);
						
						if (tileCurr.mY < tileCheck.mY) {
							this.mSegments[this.mCurrentTile.mX].mMapSegment.mTiles[this.mCurrentTile.mY].mShowBounds = false;
							
							this.mSegments[i].mMapSegment.mTiles[j].mShowBounds = true;
							this.mCurrentTile.mX = i; this.mCurrentTile.mY = j;
							hoveringTile = true;
						}
						else if (tileCurr.mY == tileCheck.mY) {
							if (tileCurr.mX > tileCheck.mX) {
								this.mSegments[this.mCurrentTile.mX].mMapSegment.mTiles[this.mCurrentTile.mY].mShowBounds = false;
								
								this.mSegments[i].mMapSegment.mTiles[j].mShowBounds = true;
								this.mCurrentTile.mX = i; this.mCurrentTile.mY = j;
								hoveringTile = true;
							}
							else if (tileCurr.mX == tileCheck.mX) {
								hoveringTile = true;
							}
						}
					}
					else {
						this.mSegments[i].mMapSegment.mTiles[j].mShowBounds = true;
						this.mCurrentTile.mX = i; this.mCurrentTile.mY = j;
						hoveringTile = true;
					}
				}
			}
		}
	}
	
	if (hoveringTile == false) {
		if (this.mCurrentTile.mX != -1 && this.mCurrentTile.mY != -1) {
			this.mSegments[this.mCurrentTile.mX].mMapSegment.mTiles[this.mCurrentTile.mY].mShowBounds = false;
			this.mCurrentTile.mX = -1; this.mCurrentTile.mY = -1;
		}
	}
}

GFMap.prototype.GetRenderData = function() {
	var arr = new Array();
	
	for (var i = 0; i < this.mSegments.length; ++i) {
		arr = arr.concat(this.mSegments[i].mMapSegment.GetRenderData());
	}
	
	return arr;
}

GFMap.prototype.ChangeZLevel = function(newLevel) {
	if (this.mCurrZLevel + newLevel <= 3 && this.mCurrZLevel + newLevel >= 0) {
		this.mCurrZLevel += newLevel;
		
		for (var i = 0; i < this.mSegments.length; ++i) {
			this.mSegments[i].mMapSegment.ChangeZLevel(newLevel);
		}
	}
}
// ...End

