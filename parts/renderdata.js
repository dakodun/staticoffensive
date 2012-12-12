// RenderData Class...
// 
function RenderData() {
	this.mData = new Array();
	
	this.mDepth = 0;
	
	this.mPos = new IVec2(0, 0);
	this.mSize = new IVec2(0, 0);
	this.mRotation = 0;
};

// returns the type of this object for validity checking
RenderData.prototype.Type = function() {
	return "RenderData";
}

// make a copy of another (other) renderdata (copy constructor)
RenderData.prototype.Copy = function(other) {
	this.mData.splice(0, this.mData.length);
	this.mData = this.mData.concat(other.mData);
	
	this.mDepth = other.mDepth;
	
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	this.mRotation = other.mRotation;
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
	
	this.mData.splice(0, this.mData.length);
	this.mData = this.mData.concat(data);
}

RenderData.prototype.CreateFromScreen = function(screen, pos, size) {
	this.mSize.Copy(size);
	
	var imgData = screen.getImageData(pos.mX, pos.mX, this.mSize.mX, this.mSize.mY);
	this.mData.splice(0, this.mData.length);
	
	for (var i = 0; i < imgData.data.length; ++i) {
		this.mData.push(imgData.data[i]);
	}
}
// ..End

