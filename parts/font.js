// Font Class...
// 
function Font() {
	this.mFontName = "";
	this.mLoaded = ""; // the load status of our font
	this.mFailTimer = new Timer();
};

// returns the type of this object for validity checking
Font.prototype.Type = function() {
	return "Font";
};

Font.prototype.LoadFromFile = function(fontName, fontFile) {
	this.mLoaded = "";
	this.mFailTimer.Reset();
	
	this.mFontName = fontName;
	var rule = "@font-face { font-family: " + fontName + "; src: url('" + fontFile + ".ttf'), url('" + fontFile + ".eot'); }";
	
	if (nmain.game.mStyleSheet.styleSheet) {
		nmain.game.mStyleSheet.styleSheet.cssText += rule;
	}
	else {
		nmain.game.mStyleSheet.appendChild(document.createTextNode(rule));
	}
}

Font.prototype.CheckLoadStatus = function() {
	var str = "This is the Test String!";
	var old = nmain.game.mCurrContext.font;
	
	nmain.game.mCurrContext.font = "256px Impact";
	var widthControl = nmain.game.mCurrContext.measureText(str).width;
	
	nmain.game.mCurrContext.font = "256px " + this.mFontName + ", Impact";
	var widthTest = nmain.game.mCurrContext.measureText(str).width;
	
	if (widthControl != widthTest) {
		this.mLoaded = "load";
	}
	
	nmain.game.mCurrContext.font = old;
	
	// timeout after 10 seconds
	if (this.mFailTimer.GetElapsedTime() > 10000) {
		this.mLoaded = "error";
	}
}
// ...End

