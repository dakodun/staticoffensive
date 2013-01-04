// GFGridTile Class...
// game file: 
function GFGridTile() {
	this.mTile = new Sprite();
	this.mID = -1;
};
// ...End


// GFSpecialTile Class...
// game file: 
function GFSpecialTile() {
	this.mText = new Text();
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
		this.mGridBase.mPos.Set(           4,  43);
		this.mGridBase.AddPoint(new IVec2(27, -13));
		this.mGridBase.AddPoint(new IVec2(53,   0));
		this.mGridBase.AddPoint(new IVec2(53,   1));
		this.mGridBase.AddPoint(new IVec2(26,  14));
		this.mGridBase.AddPoint(new IVec2( 0,   1));
		
		this.mGridBase.mOutline = true;
	}
	
	this.mSpecial = new Array();
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
	
	this.mSpecial.splice(0, this.mSpecial.length);
	this.mSpecial = this.mSpecial.concat(other.mSpecial);
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
		
		this.SetTileSpecial(i);
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
	
	for (var i = 0; i < this.mSpecial.length; ++i) {
		arr.push(this.mSpecial[i].mText);
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
}

GFCreationMap.prototype.SetTileSpecial = function(id) {
	for (var i = 0; i < this.mSpecial.length; ++i) {
		if (this.mSpecial[i].mID == id) {
			this.mSpecial.splice(i, 1);
			break;
		}
	}
	
	if (this.mSegment.mTiles[id].mBlank == false) {
		if (this.mSegment.mTiles[id].mSpecial != 'o') {
			var special = new Text();
			
			var font = nmgrs.resMan.mFontStore.GetResource("mainfont");
			special.SetFont(font);
			special.SetFontSize(12);
			special.mAlign = "centre";
			special.mDepth = 0;
			special.mShadow = true;
			
			special.mPos.Copy(this.mSegment.mTiles[id].mSprite.mPos);
			special.mPos.mX += 30; special.mPos.mY += 8 + (8 * (3 - Math.floor(this.mSegment.mTiles[id].mZ / 2)));
			
			if (this.mSegment.mTiles[id].mZ % 2 != 0) {
				special.mPos.mY -= 4;
			}
			
			switch (this.mSegment.mTiles[id].mSpecial) {
				case 'e' :
					special.mString = "Ent";
					break;
				case 'x' :
					special.mString = "Ext";
					break;
				case 'b' :
					special.mString = "Bth";
					break;
			}
			
			var specialTile = new GFSpecialTile();
			specialTile.mText = special; specialTile.mID = id;
			this.mSpecial.push(specialTile);
		}
	}
}

GFCreationMap.prototype.ToString = function() {
	var texArr = new Array();
	var texAlph = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
			"m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
	
	var texStr = "";
	
	var tileStr = "";
	for (var y = 0; y < this.mSegment.mSize.mY; ++y) {
		for (var x = 0; x < this.mSegment.mSize.mX; ++x) {
			var id = x + (y * this.mSegment.mSize.mX);
			tileStr += this.mSegment.mTiles[id].mZ;
			tileStr += this.mSegment.mTiles[id].mSlopeDirection;
			tileStr += this.mSegment.mTiles[id].mSpecial;
			
			{
				var found = false;
				
				for (var i = 0; i < texArr.length; ++i) {
					if (texArr[i] == this.mSegment.mTiles[id].mTexResString) {
						tileStr += texAlph[i];
						
						found = true;
						break;
					}
				}
				
				if (found == false) {
					texArr.push(this.mSegment.mTiles[id].mTexResString);
					texStr += texAlph[texArr.length - 1];
					texStr += ":";
					texStr += texArr[texArr.length - 1];
					texStr += ";";
					
					tileStr += texAlph[texArr.length - 1];
				}
			}
			
			if (x < this.mSegment.mSize.mX - 1) {
				tileStr += "?";
			}
		}
		
		if (y < this.mSegment.mSize.mY - 1) {
			tileStr += "!";
		}
	}
	
	return (texStr + "{" + tileStr + "}");
}
// ...End

