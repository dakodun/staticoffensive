// RenderData Class...
// 
function RenderData() {
	this.mImageData = null;
	
	this.mDepth = 0;
	
	this.mPos = new IVec2(0, 0);
	this.mSize = new IVec2(0, 0);
	this.mRotation = 0;
	
	this.mAbsolute = false;
};

// returns the type of this object for validity checking
RenderData.prototype.Type = function() {
	return "RenderData";
}

// make a copy of another (other) renderdata (copy constructor)
RenderData.prototype.Copy = function(other) {
	this.mImageData = other.mImageData;
	this.mDepth = other.mDepth;
	
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	this.mRotation = other.mRotation;
	
	this.mAbsolute = other.mAbsolute;
}

// return the width of the render data
RenderData.prototype.GetWidth = function() {
	return this.mSize.mX;
}

// return the height of the render data
RenderData.prototype.GetHeight = function() {
	return this.mSize.mY;
}

RenderData.prototype.CreateFromArray = function(size, data) {
	this.mSize.Copy(size);
	
	this.mImageData = nmain.game.mCurrContext.createImageData(this.GetWidth(), this.GetHeight());
	for (var i = 0; i < data.length; ++i) {
		this.mImageData.data[i] = data[i];
	}
}

RenderData.prototype.CreateFromScreen = function(screen, pos, size) {
	this.mSize.Copy(size);
	
	this.mImageData = screen.getImageData(pos.mX, pos.mX, this.mSize.mX, this.mSize.mY);
}
// ..End

