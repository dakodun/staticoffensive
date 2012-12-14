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
			this.mSegments[i].mMapSegment.mCurrZLevel += newLevel;
			// for our entire map segment array
			for (var j = 0; j < this.mSegments[i].mMapSegment.mTiles.length; ++j) {
				this.mSegments[i].mMapSegment.mTiles[j].ChangeZLevel(this.mSegments[i].mMapSegment.mCurrZLevel);
			}
		}
	}
}
// ...End

