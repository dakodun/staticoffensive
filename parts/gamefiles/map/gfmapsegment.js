// GFMapConnectivity Class...
// game file: 
function GFMapConnectivity() {
	this.mNorth = false;
	this.mEast = false;
	this.mSouth = false;
	this.mWest = false;
	
	this.mGlobalPos = new IVec2(0, 0);
	
	this.mZ = 0;
	this.mSlopeDirection = 0;
};

GFMapConnectivity.prototype.GetCompatible = function(other) {
	var resultArr = new Array();
	resultArr[0] = false; resultArr[1] = false;
	resultArr[2] = false; resultArr[3] = false;
	
	var excludeArr = new Array();
	excludeArr[0] = false; excludeArr[1] = false;
	excludeArr[2] = false; excludeArr[3] = false;
	
	if (this.mZ == other.mZ - 1 || this.mZ == other.mZ || this.mZ == other.mZ + 1) {
		if (this.mZ % 2 == 0) { // this is flat
			if (other.mZ % 2 != 0) { // other is a slope
				if (this.mZ == other.mZ - 1) { // we're lower than other
					// exclude opposite of other.SlopeDirection
					excludeArr[(other.mSlopeDirection + 2) % 4] = true;
				}
				else { // we're higher than other
					// exclude other.SlopeDirection
					excludeArr[other.mSlopeDirection] = true;
				}
			}
		}
		else { // this is a slope
			if (other.mZ % 2 == 0) { // other is flat
				if (this.mZ == other.mZ - 1) { // we're lower than other
					// exclude opposite of this.SlopeDirection
					excludeArr[(this.mSlopeDirection + 2) % 4] = true;
					
				}
				else { // we're higher than other
					// exclude this.SlopeDirection
					excludeArr[this.mSlopeDirection] = true;
				}
			}
			else { // other is a slope
				if (this.mSlopeDirection == other.mSlopeDirection) {
					excludeArr[(this.mSlopeDirection + 2) % 4] = true;
					excludeArr[this.mSlopeDirection] = true;
				}
			}
		}
		
		{
			if (this.mNorth == true && other.mSouth == true) {
				if (excludeArr[0] == false) {
					resultArr[0] = true;
				}
			}
			
			if (this.mEast == true && other.mWest == true) {
				if (excludeArr[1] == false) {
					resultArr[1] = true;
				}
			}
			
			if (this.mSouth == true && other.mNorth == true) {
				if (excludeArr[2] == false) {
					resultArr[2] = true;
				}
			}
			
			if (this.mWest == true && other.mEast == true) {
				if (excludeArr[3] == false) {
					resultArr[3] = true;
				}
			}
		}
	}
	
	return resultArr;
}
// ...End


// GFMapSegment Class...
// game file: a segment (or piece) of a map
function GFMapSegment() {
	this.mPos = new IVec2(0, 0); // the position (offset) of this map segment with the entire map
	this.mSize = new IVec2(0, 0); // the dimensions of this map segment (in terms of tile numbers, not pixels)
	this.mTiles = new Array(); // an array of the tile objects that make up this map segment
	
	this.mCurrZLevel = 3;
	
	this.mExits = new Array();
	this.mEntrances = new Array();
	
	this.mTileBounds = new GFMapTileBounds();
	
	this.mShowBounds = false;
	this.mBounds = new Shape();
	this.mBoundsPoly = new Array();
};

GFMapSegment.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	
	this.mTiles.splice(0, this.mTiles.length);
	this.mTiles = this.mTiles.concat(other.mTiles);
	
	this.mCurrZLevel = other.mCurrZLevel;
	
	this.mExits.splice(0, this.mExits.length);
	this.mExits = this.mExits.concat(other.mExits);
	
	this.mEntrances.splice(0, this.mEntrances.length);
	this.mEntrances = this.mEntrances.concat(other.mEntrances);
	
	this.mShowBounds = other.mShowBounds;
	this.mBounds.Copy(other.mBounds);
	
	this.mBoundsPoly.splice(0, this.mBoundsPoly.length);
	this.mBoundsPoly = this.mBoundsPoly.concat(other.mBoundsPoly);
}

GFMapSegment.prototype.SetUp = function(blueprint) {
	this.mSize.Copy(blueprint.mSize);
	
	{
		var x = (this.mPos.mX * 28) + (this.mPos.mY * 28);
		var y = (this.mPos.mX * -14) + (this.mPos.mY * 14);
		this.mBounds.mPos.Set(x, y + 14);
		
		this.mBounds.mOutline = true;
		this.mBounds.mDepth = 0;
		
		this.mBounds.AddPoint(new IVec2(28 * this.mSize.mX, -14 * this.mSize.mX));
		this.mBounds.AddPoint(new IVec2(28 * this.mSize.mX + 3, -14 * this.mSize.mX));
		this.mBounds.AddPoint(new IVec2((28 * this.mSize.mX) + (28 * this.mSize.mY) + 3, (-14 * this.mSize.mX) + (14 * this.mSize.mY)));
		this.mBounds.AddPoint(new IVec2((28 * this.mSize.mX) + (28 * this.mSize.mY) + 3, (-14 * this.mSize.mX) + (14 * this.mSize.mY) + 31));
		this.mBounds.AddPoint(new IVec2((28 * this.mSize.mY) + 3, (14 * this.mSize.mY) + 31));
		this.mBounds.AddPoint(new IVec2(28 * this.mSize.mY, (14 * this.mSize.mY) + 31));
		this.mBounds.AddPoint(new IVec2(0, 31));
		
		this.mBoundsPoly = this.mBoundsPoly.concat(this.mBounds.GetPolygon());
	}
	
	for (var i = 0; i < blueprint.mTiles.length; ++i) {
		var tex = nmgrs.resMan.mTexStore.GetResource(blueprint.mTiles[i].mTex);
		
		var tile = new GFMapTile();
		tile.mLocalPos.Copy(blueprint.mTiles[i].mPos);
		tile.mGlobalPos.Set(tile.mLocalPos.mX + this.mPos.mX, tile.mLocalPos.mY + this.mPos.mY);
		tile.mZ = blueprint.mTiles[i].mZ;
		tile.mSlopeDirection = blueprint.mTiles[i].mSlopeDirection;
		tile.mSpecial = blueprint.mTiles[i].mSpecial;
		
		tile.SetUp(tex);
		
		if (typeof(this.mTileBounds.mBounds[tile.mSprite.mCurrFrame]) != "undefined") { 
			tile.SetBounds(this.mTileBounds.mBounds[tile.mSprite.mCurrFrame]);
		}
		else {
			tile.SetBounds(this.mTileBounds.mBounds[7]);
		}
		
		this.mTiles.push(tile);
		
		if (tile.mSpecial != "o") {
			var mc = new GFMapConnectivity();
			if (tile.mLocalPos.mY == 0) {
				mc.mNorth = true;
			}
			
			if (tile.mLocalPos.mX == this.mSize.mX - 1) {
				mc.mEast = true;
			}
			
			if (tile.mLocalPos.mY == this.mSize.mY - 1) {
				mc.mSouth = true;
			}
			
			if (tile.mLocalPos.mX == 0) {
				mc.mWest = true;
			}
			
			mc.mGlobalPos.Copy(tile.mGlobalPos);
			mc.mZ = tile.mZ;
			mc.mSlopeDirection = tile.mSlopeDirection;
				
			if (tile.mSpecial == "x" || tile.mSpecial == "b") {
				this.mExits.push(mc);
			}
			
			if (tile.mSpecial == "e" || tile.mSpecial == "b") {
				this.mEntrances.push(mc);
			}
		}
	}
}

// returns the appropiate render data
GFMapSegment.prototype.GetRenderData = function() {
	var arr = new Array(); // an array to store our render data
	
	// for our entire map segment array
	for (var i = 0; i < this.mTiles.length; ++i) {
		arr = arr.concat(this.mTiles[i].GetRenderData()); // get and add the render data returned by the tile
	}
	
	if (this.mShowBounds == true) {
		arr.push(this.mBounds);
	}
	
	return arr; // return the retrieved render data
}


GFMapSegment.prototype.ChangeZLevel = function(newLevel) {
	if (this.mCurrZLevel + newLevel <= 3 && this.mCurrZLevel + newLevel >= 0) {
		this.mCurrZLevel += newLevel;
		// for our entire map segment array
		for (var i = 0; i < this.mTiles.length; ++i) {
			if (this.mTiles[i].mBlank == false) {
				this.mTiles[i].ChangeZLevel(this.mCurrZLevel);
				this.mTiles[i].SetBounds(this.mTileBounds.mBounds[this.mTiles[i].mSprite.mCurrFrame]);
			}
		}
	}
}
// ...End

