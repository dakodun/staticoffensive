// GUIInputBox Class...
function GUIInputBoxCaret() {
	this.mShape = new Shape();
	
	this.mFlash = 0;
	this.mPlace = 0;
	
	this.mScroll = 0;
	this.mScrollTimer = 0;
	
	this.mLeftBound = 0;
	this.mRightBound = 0;
}

GUIInputBoxCaret.prototype.SetUp = function(pos, depth, leftBound, rightBound) {
	this.mShape.mPos.Copy(pos);
	this.mShape.mDepth = depth;
	this.mShape.mColour = "#000000";
	
	this.mLeftBound = leftBound;
	this.mRightBound = rightBound;
}

GUIInputBoxCaret.prototype.Input = function(inputText) {
	if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.left)) {
		this.mPlace--;
		if (this.mPlace < 0) {
			this.mPlace = 0;
		}
		
		this.mScroll = -1;
		this.mScrollTimer = 0;
		this.mFlash = 0;
	}
	else if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.right)) {
		this.mPlace++;
		if (this.mPlace > inputText.mString.length) {
			this.mPlace = inputText.mString.length;
		}
		
		this.mScroll = 1;
		this.mScrollTimer = 0;
		this.mFlash = 0;
	}
	else if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.left) == false &&
			nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.right) == false) {
		
		if (this.mScroll != 0) {
			this.mScroll = 0;
			this.mFlash = 0;
		}
	}
}

GUIInputBoxCaret.prototype.Process = function(inputText, renderCanvas) {
	// if we are scorlling with the arrow keys
	if (this.mScroll != 0) {
		// if scroll timer has elapse
		if (this.mScrollTimer > 0.5) {
			this.mPlace += this.mScroll; // move the caret's place in the text
			
			// check boundaries
			if (this.mPlace < 0) {
				this.mPlace = 0;
			}
			else if (this.mPlace > inputText.mString.length) {
				this.mPlace = inputText.mString.length;
			}
			
			this.mScrollTimer = 0.48; // lower scroll timer (partially reset)
		}
		else {
			this.mScrollTimer += 1 / nmain.game.mFrameLimit; // increment the timer
		}
	}
	else {
		// process the caret flash timer (caret doesn't flash when moving)
		if (this.mFlash > 2) {
			this.mFlash = 0;
		}
		else {
			this.mFlash += 2 / nmain.game.mFrameLimit;
		}
	}
	
	// if caret's position in text has been moved
	if (true) {
		// create a new text object, copy our input text and then create a substring
		var txt = new Text();
		txt.Copy(inputText);
		txt.mString = inputText.mString.substr(0, this.mPlace);
		
		this.mShape.mPos.mX = inputText.mPos.mX + renderCanvas.mPos.mX + txt.GetWidth() - 1; // move the caret's position on canvas
		
		// if the caret is past the left bound
		if (this.mShape.mPos.mX > this.mRightBound) {
			var diff = this.mShape.mPos.mX - this.mRightBound; // find out how much past it is
			
			// move the text and caret's position on canvas
			inputText.mPos.mX -= diff;
			this.mShape.mPos.mX -= diff;
			
			// redraw the render canvase
			renderCanvas.Clear();
			renderCanvas.RenderTo(inputText);
		}
		else if (this.mShape.mPos.mX < this.mLeftBound - 1) { // otherwise if it is past the right bound
			var diff = (this.mLeftBound - 1) - this.mShape.mPos.mX;
			
			inputText.mPos.mX += diff;
			this.mShape.mPos.mX += diff;
			
			renderCanvas.Clear();
			renderCanvas.RenderTo(inputText);
		}
	}
}

GUIInputBoxCaret.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mFlash < 1) {
		arr.push(this.mShape);
	}
	
	return arr;
}

GUIInputBoxCaret.prototype.SetSize = function(size) {
	this.mShape.Clear();
	
	this.mShape.AddPoint(new IVec2(size.mX, 0));
	this.mShape.AddPoint(new IVec2(size.mX, size.mY));
	this.mShape.AddPoint(new IVec2(0, size.mY));
}
// ...End


// GUIInputBox Class...
function GUIInputBox() {
	this.mPos = new IVec2(0, 0);
	this.mSize = new IVec2(0, 0);
	this.mDepth = 0;
	
	this.mStatus = "idle";
	this.mSpriteIdle = new Sprite();
	this.mSpriteHover = new Sprite();
	this.mSpriteFocus = new Sprite();
	this.mSpriteInactive = new Sprite();
	
	this.mInputText = new Text();
	this.mBox = new GUIButton();
	this.mHasFocus = false;
	
	this.mCaret = new GUIInputBoxCaret();
	
	this.mBackspace = false;
	this.mBackspaceTimer = 0;
	
	this.mRenderCanvas = new RenderCanvas();
	this.mInputString = "";
	
	this.mActive = true;
};

GUIInputBox.prototype.SetUp = function(pos, size, depth) {
	this.mPos.Copy(pos);
	this.mSize.Copy(size);
	this.mDepth = depth;
	
	this.mBox.SetUp(pos, size, depth);
	
	this.mRenderCanvas.mPos.mX += pos.mX;
	this.mRenderCanvas.mPos.mY += pos.mY;
	
	var dim = new IVec2(0, 0); dim.Copy(this.mRenderCanvas.mSize);
	dim.mY += size.mY;
	dim.mX += size.mX;
	this.mRenderCanvas.SetDimensions(dim);
	
	this.mRenderCanvas.mDepth = depth - 1;
	
	{
		this.mSpriteIdle.mPos.Copy(pos);
		this.mSpriteIdle.mDepth = depth;
		
		this.mSpriteHover.mPos.Copy(pos);
		this.mSpriteHover.mDepth = depth;
		
		this.mSpriteFocus.mPos.Copy(pos);
		this.mSpriteFocus.mDepth = depth;
		
		this.mSpriteInactive.mPos.Copy(pos);
		this.mSpriteInactive.mDepth = depth;
	}
	
	{
		this.mCaret.SetUp(this.mRenderCanvas.mPos, depth - 2, this.mRenderCanvas.mPos.mX,
				this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX);
		this.mCaret.SetSize(new IVec2(1, size.mY - 10));
		this.mCaret.mShape.mColour = "#4A4A4A";
	}
}

GUIInputBox.prototype.Input = function() {
	if (this.mHasFocus == true) {
		this.mInputString += nmgrs.inputMan.mTextInput;
		
		if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.backspace)) {
			this.mBackspace = true;
			this.mBackspaceTimer = 0;
			
			if (this.mInputText.mString.length > 0) {
				var newStr = this.mInputText.mString.substr(0, this.mCaret.mPlace - 1);
				newStr += this.mInputText.mString.substr(this.mCaret.mPlace,  this.mInputText.mString.length - this.mCaret.mPlace);
				
				this.mInputText.mString = newStr;
				this.mCaret.mPlace--;
				if (this.mCaret.mPlace < 0) {
					this.mCaret.mPlace = 0;
				}
				
				// if text is not currently filling the render canvas
				if ((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth() <
						this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) {
					
					// if text is wider and is able to fill the render canvas
					if (this.mInputText.GetWidth() >= this.mRenderCanvas.mSize.mX) {
						// move the text to ensure render canvas is filled
						var shift = (this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) -
								((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth());
						this.mInputText.mPos.mX += shift;
					}
				}
				
				this.mRenderCanvas.Clear();
				this.mRenderCanvas.RenderTo(this.mInputText);
			}
		}
		else if (nmgrs.inputMan.GetKeyboardReleased(nkeyboard.key.code.backspace)) {
			this.mBackspace = false;
		}
		
		this.mCaret.Input(this.mInputText);
	}
	
	this.mBox.Input();
	if (this.mHasFocus == true) {
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left)) {
			if (this.mBox.mHover == false) {
				this.mHasFocus = !this.mHasFocus;
			}
		}
	}
}

GUIInputBox.prototype.Process = function(point) {
	this.mBox.Process(point);
	
	if (this.mBox.OnClick() == true) {
		if (this.mHasFocus == false) {
			this.mHasFocus = true;
			this.mCaret.mFlash = 0;
		}
	}
	
	if (this.mBackspace == true) {
		if (this.mBackspaceTimer > 0.5) {
			var newStr = this.mInputText.mString.substr(0, this.mCaret.mPlace - 1);
			newStr += this.mInputText.mString.substr(this.mCaret.mPlace,  this.mInputText.mString.length - this.mCaret.mPlace);
			
			this.mInputText.mString = newStr;
			this.mCaret.mPlace--;
			if (this.mCaret.mPlace < 0) {
				this.mCaret.mPlace = 0;
			}
			
			this.mBackspaceTimer = 0.48;
			
			this.mRenderCanvas.Clear();
			this.mRenderCanvas.RenderTo(this.mInputText);
		}
		else {
			this.mBackspaceTimer += 1 / nmain.game.mFrameLimit;
		}
	}
	
	if (this.mInputString.length > 0) {
		var newStr = this.mInputText.mString.substr(0, this.mCaret.mPlace);
		newStr += this.mInputString;
		newStr += this.mInputText.mString.substr(this.mCaret.mPlace,  this.mInputText.mString.length - this.mCaret.mPlace);
		
		this.mInputText.mString = newStr;
		this.mCaret.mPlace += this.mInputString.length;
		this.mInputString = "";
		
		this.mRenderCanvas.Clear();
		this.mRenderCanvas.RenderTo(this.mInputText);
	}
	
	{
		this.mCaret.Process(this.mInputText, this.mRenderCanvas);
	}
	
	{
		if (this.mActive == true) {
			if (this.mHasFocus == false) {
				if (this.mBox.mHover == true) {
					this.mStatus = "hover";
				}
				else {
					this.mStatus = "idle";
				}
			}
			else {
				this.mStatus = "focus";
			}
		}
		
		if (this.mActive == true) {
			if (this.mStatus == "hover") {
				this.mSpriteHover.Process();
			}
			else if (this.mStatus == "focus") {
				this.mSpriteFocus.Process()
			}
			else {
				this.mSpriteIdle.Process()
			}
		}
		else {
			this.mSpriteInactive.Process()
		}
	}
}

GUIInputBox.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mRenderCanvas);
	
	if (this.mActive == true) {
		if (this.mStatus == "hover") {
			arr.push(this.mSpriteHover);
		}
		else if (this.mStatus == "focus") {
			arr.push(this.mSpriteFocus);
			
			arr = arr.concat(this.mCaret.GetRenderData());
		}
		else {
			arr.push(this.mSpriteIdle);
		}
	}
	else {
		arr.push(this.mSpriteInactive);
	}
	
	return arr;
}
// ...End

