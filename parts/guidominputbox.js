// GUIDOMInputBox Class...
function GUIDOMInputBox() {
	this.mPos = new IVec2(0, 0);
	
	this.mElement = document.createElement('input');
	this.mElement.type = "text";
	
	this.mOldValue = "";
	
	this.mValidInput = new Array();
	
	{
		this.mAlphaUpper = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
				"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ");
				
		this.mAlphaLower = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
				"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ");
				
		this.mNumbers = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
		
		this.mAlphaNumeric = new Array();
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mAlphaUpper);
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mAlphaLower);
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mNumbers);
		
		{
			var arr = new Array("¬", "!", '"', "£", "$", "%", "^", "&", "*", "(", ")", "_", "+",
					"`", "¦", "-", "=", "[", "{", "]", "}", ";", ":", "'", "@", "#", "~", "\\", "|",
					",", "<", ".", ">", "/", "?");
			
			this.mAlphaNumericPunctuation = new Array();
			this.mAlphaNumericPunctuation = this.mAlphaNumeric.concat(this.mAlphaNumeric);
			this.mAlphaNumericPunctuation = this.mAlphaNumeric.concat(arr);
		}
	}
	
	this.mSelected = false;
	this.mHover = false;
};

GUIDOMInputBox.prototype.Type = function() {
	return "GUIDOMInputBox";
}

GUIDOMInputBox.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	
	this.mElement = other.mElement;
	
	this.mOldValue = other.mOldValue;
	
	this.mValidInput.splice(0, this.mValidInput.length);
	this.mValidInput = this.mValidInput.concat(other.mValidInput);
	
	this.mSelected = other.mSelected;
	this.mHover = other.mHover;
}

GUIDOMInputBox.prototype.SetUp = function(pos, defaultText, inputArr) {
	this.mPos.Copy(pos);
	
	this.mElement.style.position = "absolute";
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
	
	this.mElement.defaultValue = defaultText.mString;
	this.mElement.style.font = defaultText.mFontString;
	
	if (inputArr == null) {
		this.mValidInput = this.mValidInput.concat(this.mAlphaNumericPunctuation);
	}
	else {
		this.mValidInput = this.mValidInput.concat(inputArr);
	}
}

GUIDOMInputBox.prototype.Process = function() {
	if (this.mElement.value != this.mOldValue) {
		var valueStr = this.mElement.value;
		var finalStr = "";
		
		for (var i = 0; i < valueStr.length; ++i) {	
			for (var j = 0; j < this.mValidInput.length; ++j) {
				if (valueStr.charAt(i) == this.mValidInput[j]) {
					finalStr += valueStr.charAt(i);
					break;
				}
			}
		}
		
		this.mElement.value = finalStr;
		this.mOldValue = this.mElement.value;
	}
}

GUIDOMInputBox.prototype.SetPos = function(pos) {
	this.mPos.Copy(pos);
	
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
}

GUIDOMInputBox.prototype.RegisterCallbacks = function(e) {
	this.mElement.onfocus = function(e) {
		nmgrs.inputMan.mDisableBackspace = false;
		this.mSelected = true;
	}
	
	this.mElement.onblur = function(e) {
		nmgrs.inputMan.mDisableBackspace = true;
		this.mSelected = false;
	}
	
	this.mElement.onmouseover = function(e) {
		this.mHover = true;
	}
	
	this.mElement.onmouseout = function(e) {
		this.mHover = false;
	}
}

GUIDOMInputBox.prototype.UnregisterCallbacks = function(e) {
	this.mElement.onfocus = function(e) {
		
	}
	
	this.mElement.onblur = function(e) {
		
	}
	
	this.mElement.onmouseover = function(e) {
		
	}
	
	this.mElement.onmouseout = function(e) {
		
	}
}

GUIDOMInputBox.prototype.GetText = function() {
	return this.mElement.value;
}

GUIDOMInputBox.prototype.SetText = function(text) {
	this.mElement.value = text;
}

GUIDOMInputBox.prototype.GetWidth = function() {
	var str = this.mElement.style.width
	var len = str.length - 2;
	
	return Number(str.substr(0, len));
}

GUIDOMInputBox.prototype.SetWidth = function(width) {
	this.mElement.style.width = width + "px";
}

GUIDOMInputBox.prototype.GetMaxChars = function() {
	return this.mElement.maxLength;
}

GUIDOMInputBox.prototype.SetMaxChars = function(length) {
	this.mElement.maxLength = length;
}

GUIDOMInputBox.prototype.GetReadOnly = function() {
	return this.mElement.readOnly;
}

GUIDOMInputBox.prototype.SetReadOnly = function(readOnly) {
	this.mElement.readOnly = readOnly;
}

GUIDOMInputBox.prototype.SelectAll = function() {
	this.mElement.select();
}
// ...End

