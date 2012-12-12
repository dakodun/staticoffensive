// GUIInputBox Class...
function GUIInputBox() {
	this.mPos = new IVec2(0, 0);
	
	this.mInputText = new Text();
	this.mHasFocus = false;
};

GUIInputBox.prototype.SetUp = function() {
	
}

GUIInputBox.prototype.Input = function() {
	if (this.mHasFocus == true) {
		this.mInputText.mString += nmgrs.inputMan.mTextInput;
		
		// handle backspace
	}
}

GUIInputBox.prototype.Process = function() {
	//if need update
	//create new canvas of same size and width
	//get new context
	//render text in position
	//get image data using pos and size of inputbox
	//use image data to render
}

GUIInputBox.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mInputText);
	
	return arr;
}
// ...End

