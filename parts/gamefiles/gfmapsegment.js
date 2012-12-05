// GFMapSegment Class...
// game file: a segment (or piece) of a map
function GFMapSegment() {
	this.mPos = new IVec2(0, 0); // the position (offset) of this map segment with the entire map
	this.mSize = new IVec2(0, 0); // the dimensions of this map segment (in terms of tile numbers, not pixels)
	this.mTiles = new Array(); // an array of the tile objects that make up this map segment
	
	this.mCurrZLevel = 3;
};

GFMapSegment.prototype.SetUp = function(blueprint) {
	var tex = nmgrs.resMan.mTexStore.GetResource("tileset_test");
	this.mSize.Copy(blueprint.mSize);
	
	for (var i = 0; i < blueprint.mTiles.length; ++i) {
		var tile = new GFMapTile();
		tile.mLocalPos.Copy(blueprint.mTiles[i].mPos);
		tile.mGlobalPos.Set(tile.mLocalPos.mX + this.mPos.mX, tile.mLocalPos.mY + this.mPos.mY);
		tile.mZ = blueprint.mTiles[i].mZ;
		tile.mSpecial = blueprint.mTiles[i].mSpecial;
		
		tile.SetUp(tex);
		
		this.mTiles.push(tile);
	}
}

// returns the appropiate render data
GFMapSegment.prototype.GetRenderData = function(renderLevel) {
	var arr = new Array(); // an array to store our render data
	
	// for our entire map segment array
	for (var i = 0; i < this.mTiles.length; ++i) {
		arr = arr.concat(this.mTiles[i].GetRenderData(renderLevel)); // get and add the render data returned by the tile
	}
	
	return arr; // return the retrieved render data
}


GFMapSegment.prototype.ChangeZLevel = function(newLevel) {
	if (this.mCurrZLevel + newLevel <= 3 && this.mCurrZLevel + newLevel >= 0) {
		this.mCurrZLevel += newLevel;
		// for our entire map segment array
		for (var i = 0; i < this.mTiles.length; ++i) {
			this.mTiles[i].ChangeZLevel(this.mCurrZLevel);
		}
	}
}
// ...End

