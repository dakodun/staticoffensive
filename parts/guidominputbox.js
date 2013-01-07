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
}

GUIDOMInputBox.prototype.SetUp = function(pos, defaultText, inputArr) {
	this.mPos.Copy(pos);
	
	this.mElement.style.position = "absolute";
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
	
	this.mElement.defaultValue = defaultText;
	
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

GUIDOMButton.prototype.RegisterCallbacks = function(e) {
	
}

GUIDOMButton.prototype.UnregisterCallbacks = function(e) {
	
}

GUIDOMButton.prototype.GetText = function() {
	return this.mElement.value;
}

GUIDOMButton.prototype.SetText = function(text) {
	this.mElement.value = text;
}

GUIDOMButton.prototype.GetSize = function() {
	return this.mElement.size;
}

GUIDOMButton.prototype.SetSize = function(size) {
	this.mElement.size = size;
}

GUIDOMButton.prototype.GetMaxChars = function() {
	return this.mElement.maxLength;
}

GUIDOMButton.prototype.SetMaxChars = function(length) {
	this.mElement.maxLength = length;
} 

GUIDOMButton.prototype.SelectAll = function() {
	this.mElement.select()
}
// ...End

