// GFGridTile Class...
// game file: 
function GFGridTile() {
	this.mTile = new Sprite();
	this.mID = -1;
};
// ...End


// GFCreationMap Class...
// game file: 
function GFCreationMap() {
	this.mSize = new IVec2(0, 0);
	
	this.mSegment = new GFMapSegment();
	this.mCurrZLevel = 3;
	
	this.mCurrentTile = -1;
	
	this.mBounds = new Array();
	this.mBounds[0] = 0;
	this.mBounds[1] = 0;
	this.mBounds[2] = 0;
	this.mBounds[3] = 0;
	
	this.mGrid = new Array();
	
	{
		this.mGridBase = new Shape();
		this.mGridBase.mPos.Set(           8,  42);
		this.mGridBase.AddPoint(new IVec2(20, -10));
		this.mGridBase.AddPoint(new IVec2(23, -10));
		this.mGridBase.AddPoint(new IVec2(43,   0));
		this.mGridBase.AddPoint(new IVec2(43,   3));
		this.mGridBase.AddPoint(new IVec2(23,  13));
		this.mGridBase.AddPoint(new IVec2(20,  13));
		this.mGridBase.AddPoint(new IVec2( 0,   3));
		
		this.mGridBase.mOutline = true;
	}
};

GFCreationMap.prototype.Copy = function(other) {
	this.mSize.Copy(other.mSize);
	
	this.mSegment.Copy(other.mSegment);
	this.mCurrZLevel = other.mCurrZLevel;
	
	this.mCurrentTile = other.mCurrentTile;
	
	this.mBounds.splice(0, this.mBounds.length);
	this.mBounds = this.mBounds.concat(other.mBounds);
	
	this.mGrid.splice(0, this.mGrid.length);
	this.mGrid = this.mGrid.concat(other.mGrid);
}

GFCreationMap.prototype.SetUp = function() {
	this.mGrid.splice(0, this.mGrid.length);
	
	for (var i = 0; i < this.mSegment.mTiles.length; ++i) {
		if (this.mSegment.mTiles[i].mBlank == true) {
			var tex = nmgrs.resMan.mTexStore.GetResource("gridtile");
			
			var grid = new Sprite();
			grid.SetTexture(tex);
			grid.mPos.Copy(this.mSegment.mTiles[i].mSprite.mPos);
			grid.mDepth = this.mSegment.mTiles[i].mSprite.mDepth;
			
			var gridTile = new GFGridTile();
			gridTile.mTile = grid; gridTile.mID = i;
			this.mGrid.push(gridTile);
			
			this.mSegment.mTiles[i].SetBounds(this.mGridBase);
		}
	}
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
				var result = this.HighlightTile(i);
				if (result == true) {
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
	
	for (var i = 0; i < this.mGrid.length; ++i) {
		arr.push(this.mGrid[i].mTile);
	}
	
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

GFCreationMap.prototype.HighlightTile = function(id) {
	if (this.mCurrentTile != -1) {
		var tileCurr = new IVec2(0, 0);
		tileCurr.Copy(this.mSegment.mTiles[this.mCurrentTile].mGlobalPos);
		
		var tileCheck = new IVec2(0, 0);
		tileCheck.Copy(this.mSegment.mTiles[id].mGlobalPos);
		
		if (tileCurr.mY < tileCheck.mY) {
			this.mSegment.mTiles[this.mCurrentTile].mShowBounds = false;
			
			this.mSegment.mTiles[id].mShowBounds = true;
			this.mCurrentTile = id;
			return true;
		}
		else if (tileCurr.mY == tileCheck.mY) {
			if (tileCurr.mX > tileCheck.mX) {
				this.mSegment.mTiles[this.mCurrentTile].mShowBounds = false;
				
				this.mSegment.mTiles[id].mShowBounds = true;
				this.mCurrentTile = id;
				return true;
			}
			else if (tileCurr.mX == tileCheck.mX) {
				return true;
			}
		}
	}
	else {
		this.mSegment.mTiles[id].mShowBounds = true;
		this.mCurrentTile = id;
		return true;
	}
	
	return false
}

GFCreationMap.prototype.SetTileBounds = function(id) {
	var currFrame = this.mSegment.mTiles[id].mSprite.mCurrFrame;
	
	if (typeof(this.mSegment.mTileBounds.mBounds[currFrame]) != "undefined") { 
		var bounds = new Shape(); bounds.Copy(this.mSegment.mTileBounds.mBounds[currFrame]);
		this.mSegment.mTiles[id].SetBounds(bounds);
		
		var foundID = -1;
		for (var i = 0; i < this.mGrid.length; ++i) {
			if (this.mGrid[i].mID == id) {
				foundID = i;
				break;
			}
		}
		
		if (this.mSegment.mTiles[id].mBlank == true) {
			if (foundID < 0) {
				var tex = nmgrs.resMan.mTexStore.GetResource("gridtile");
				
				var grid = new Sprite();
				grid.SetTexture(tex);
				grid.mPos.Copy(this.mSegment.mTiles[id].mSprite.mPos);
				grid.mDepth = this.mSegment.mTiles[id].mSprite.mDepth;
				
				var gridTile = new GFGridTile();
				gridTile.mTile = grid; gridTile.mID = id;
				this.mGrid.push(gridTile);
			}
			
			this.mSegment.mTiles[id].SetBounds(this.mGridBase);
		}
		else {
			if (foundID >= 0) {
				this.mGrid.splice(foundID, 1);
			}
		}
	}
	else {
		/* if (this.mSegment.mTiles[id].mBlank == true) {
			var tex = nmgrs.resMan.mTexStore.GetResource("gridtile");
			
			var grid = new Sprite();
			grid.SetTexture(tex);
			grid.mPos.Copy(this.mSegment.mTiles[id].mSprite.mPos);
			grid.mDepth = this.mSegment.mTiles[id].mSprite.mDepth;
			
			var gridTile = new GFGridTile();
			gridTile.mTile = grid; gridTile.mID = i;
			this.mGrid.push(gridTile);
			
			this.mSegment.mTiles[i].SetBounds(this.mGridBase);
		} */
	}
}
// ...End

