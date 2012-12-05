// GFBluePrintTile Class...
// game file: 
function GFBluePrintTile() {
	this.mPos = new IVec2(0, 0);
	
	this.mZ = 0;
	this.mSpecial = 0;
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
				bpTile.mSpecial = Number(tiles[id].charAt(1));
				this.mTiles.push(bpTile);
				id++;
			}
		}
	}
}
// ...End


// GFBluePrintContainer Class...
// game file: 
function GFBluePrintContainer() {
	this.mInitialBluePrints = new Array();
	this.mRegularBluePrints = new Array();
	this.mFinalBluePrints = new Array();
};

GFBluePrintContainer.prototype.SetUp = function() {
	var initArr = new Array();
	initArr.push("00c02c00r02c00c02r00c02c00");
	for (var i = 0; i < initArr.length; ++i) {
		var bp = new GFBluePrint();
		bp.SetUp(initArr[i]);
		this.mInitialBluePrints.push(bp);
	}
	
	var regArr = new Array();
	regArr.push("01c02c01r02c00c02r01c02c01");
	for (var i = 0; i < regArr.length; ++i) {
		var bp = new GFBluePrint();
		bp.SetUp(regArr[i]);
		this.mRegularBluePrints.push(bp);
	}
	
	var finArr = new Array();
	finArr.push("01c01r01c01");
	for (var i = 0; i < finArr.length; ++i) {
		var bp = new GFBluePrint();
		bp.SetUp(finArr[i]);
		this.mFinalBluePrints.push(bp);
	}
}
// ...End

