// Text Class...
// renderable text
function Text() {
	this.mFont = null;
	this.mFontSize = 12;
	this.mFontString = "12px Arial";
	
	this.mString = "";
	this.mColour = "#FFFFFF";
	this.mShadowColour = "#000000";
	this.mDepth = 0;
	
	this.mPos = new IVec2(0, 0);
	this.mOutline = false;
	this.mShadow = false;
	this.mRotation = 0;
	
	this.mAlign = "left";
	this.mJustifyWidth = -1;
	
	this.mAbsolute = false;
};

// returns the type of this object for validity checking
Text.prototype.Type = function() {
	return "Text";
}

// make a copy of another (other) text (copy constructor)
Text.prototype.Copy = function(other) {
	this.mFont = other.mFont;
	this.mFontSize = other.mFontSize;
	this.mFontString = other.mFontString;
	
	this.mString = other.mString;
	this.mColour = other.mColour;
	this.mShadowColour = other.mShadowColour;
	this.mDepth = other.mDepth;
	
	this.mPos.Copy(other.mPos);
	this.mOutline = other.mOutline;
	this.mShadow = other.mShadow;
	this.mRotation = other.mRotation;
	
	this.mAlign = other.mAlign;
	this.mJustifyWidth = other.mJustifyWidth;
	
	this.mAbsolute = other.mAbsolute;
}

// return the width of the text
Text.prototype.GetWidth = function() {
	var longest = 0;
	if (this.mString.length > 0) {
		var old = nmain.game.mCurrContext.font;
		nmain.game.mCurrContext.font = this.mFontString;
		
		var txtArr = this.mString.split("\n");
		for (var i = 0; i < txtArr.length; ++i) {
			var strLen = nmain.game.mCurrContext.measureText(txtArr[i]).width;
			if (strLen > longest) {
				longest = strLen;
			}
		}
		
		nmain.game.mCurrContext.font = old;
	}
	
	return longest;
}

// return the height of the text
Text.prototype.GetHeight = function() {
	var txtArr = this.mString.split("\n");
	return this.mFontSize * txtArr.length;
}

// 
Text.prototype.SetFont = function(font) {
	this.mFont = font;
	this.mFontString = String(this.mFontSize) + "px " + this.mFont.mFontName;
}

// 
Text.prototype.SetFontSize = function(size) {
	this.mFontSize = size;
	this.mFontString = String(this.mFontSize) + "px " + this.mFont.mFontName;
}
// ...End

