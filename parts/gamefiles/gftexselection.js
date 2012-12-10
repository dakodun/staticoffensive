// GFTexSelection Class...
// game file:
function GFTexSelection() {
	this.mPos = new IVec2(0, 0);
	
	this.mSegment = new GFMapSegment();
	this.mTexDisp = new Text();
}

GFTexSelection.prototype.SetUp = function(tex) {
	var bp = new GFBluePrint();
	bp.SetUp("60oc53oc40or70oc70oc30or00oc11oc20o");
	
	var seg = new GFMapSegment();
	seg.SetUp(bp, tex);
	
	this.mSegment.Copy(seg);
	
	this.mTexDisp = tex;
}

GFTexSelection.prototype.GetRenderData = function() {
	
}
