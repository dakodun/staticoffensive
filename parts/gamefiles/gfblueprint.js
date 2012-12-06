// GFBluePrintTile Class...
// game file: 
function GFBluePrintTile() {
	this.mPos = new IVec2(0, 0);
	
	this.mZ = 0;
	this.mSpecial = "o";
	this.mSlopeDirection = 0;
};
// ...End


// GFBluePrint Class...
// game file: 
function GFBluePrint() {
	this.mSize = new IVec2(0, 0);
	this.mTiles = new Array();
};

GFBluePrint.prototype.Copy = function(other) {
	this.mSize.Copy(other.mSize);
	
	this.mTiles.splice(0, this.mTiles.length);
	this.mTiles = this.mTiles.concat(other.mTiles);
}

GFBluePrint.prototype.SetUp = function(bpstring) {
	var rows = bpstring.split('r');
	var tiles = new Array();
	
	if (rows.length > 0) {
		{
			var cols = rows[0].split('c');
			this.mSize.Set(cols.length, rows.length);
		}
		
		for (var i = 0; i < rows.length; ++i) {
			var split = rows[i].split('c');
			tiles = tiles.concat(split);
		}
		
		var id = 0;
		for (var y = 0; y < this.mSize.mY; ++y) {
			for (var x = 0; x < this.mSize.mX; ++x) {
				var bpTile = new GFBluePrintTile();
				bpTile.mPos.Set(x, y);
				bpTile.mZ = Number(tiles[id].charAt(0));
				bpTile.mSlopeDirection = Number(tiles[id].charAt(1));
				bpTile.mSpecial = tiles[id].charAt(2);
				this.mTiles.push(bpTile);
				id++;
			}
		}
	}
}
// ...End


// GFBluePrintCollection Class...
// game file: 
function GFBluePrintCollection() {
	this.mInitStore = new Array();
	this.mRegStore = new Array();
	this.mFinStore = new Array();
}

GFBluePrintCollection.prototype.Copy = function(other) {
	this.mInitStore.splice(0, this.mInitStore.length);
	this.mInitStore = this.mInitStore.concat(other.mInitStore);
	
	this.mRegStore.splice(0, this.mRegStore.length);
	this.mRegStore = this.mRegStore.concat(other.mRegStore);
	
	this.mFinStore.splice(0, this.mFinStore.length);
	this.mFinStore = this.mFinStore.concat(other.mFinStore);
}

GFBluePrintCollection.prototype.Convert = function(bparr) {
	var str = "";
	for (var i = 0; i < bparr.length; ++i) {
		str += bparr[i];
	}
	
	return str;
}
// ...End

