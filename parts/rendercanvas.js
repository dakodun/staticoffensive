// RenderCanvas Class...
// a renderable canvas (like an image)
function RenderCanvas() {
	this.mCanvas = document.createElement('canvas');
	this.mCanvas.width = 0; this.mCanvas.height = 0;
	this.mContext = this.mCanvas.getContext("2d");
	
	this.mDepth = 0;
	
	this.mAlpha = 1.0;
	
	this.mPos = new IVec2(0, 0);
	this.mSize = new IVec2(0, 0);
	this.mRotation = 0;
};

// returns the type of this object for validity checking
RenderCanvas.prototype.Type = function() {
	return "RenderCanvas";
}

// make a copy of another (other) rendercanvas (copy constructor)
RenderCanvas.prototype.Copy = function(other) {
	this.Clear();
	this.SetDimensions(other.mSize);
	this.mContext.drawImage(other.mCanvas, 0, 0);
	
	this.mDepth = other.mDepth;
	
	this.mAlpha = other.mAlpha;
	
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	this.mRotation = other.mRotation;
}

RenderCanvas.prototype.RenderTo = function(renderable) {
	var batch = new RenderBatch();
	batch.Clear();
	
	batch.Add(renderable);
	
	batch.Render(null, this.mContext);
}

RenderCanvas.prototype.Clear = function() {
	this.mContext.setTransform(1, 0, 0, 1, 0, 0);
	this.mContext.clearRect(0, 0, this.mSize.mX, this.mSize.mY);
}

RenderCanvas.prototype.SetDimensions = function(size) {
	this.mSize.Copy(size);
	
	this.mCanvas.width = this.mSize.mX; this.mCanvas.height = this.mSize.mY;
}

RenderCanvas.prototype.GetWidth = function() {
	return this.mSize.mX;
}

RenderCanvas.prototype.GetHeight = function() {
	return this.mSize.mY;
}
// ...End

