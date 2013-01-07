// GUIDOMButton Class...
function GUIDOMButton() {
	this.mPos = new IVec2(0, 0);
	
	this.mElement = document.createElement('button');
	
	this.mHover = false;
	this.mDown = false;
	this.mWasClicked = false;
};

GUIDOMButton.prototype.Type = function() {
	return "GUIDOMButton";
}

GUIDOMButton.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	
	this.mElement = other.mElement;
	
	this.mHover = other.mHover;
	this.mDown = other.mDown;
	this.mWasClicked = other.mWasClicked;
}

GUIDOMButton.prototype.SetUp = function(pos, text) {
	this.mPos.Copy(pos);
	
	this.mElement.style.position = "absolute";
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
	
	var txt = document.createTextNode(text);
	this.mElement.appendChild(txt);
}

GUIDOMButton.prototype.Process = function() {
	
}

GUIDOMButton.prototype.SetPos = function(pos) {
	this.mPos.Copy(pos);
	
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
}

GUIDOMButton.prototype.OnClick = function() {
	if (this.mWasClicked == true) {
		this.mWasClicked = false;
		return true;
	}
	
	return false;
}

GUIDOMButton.prototype.RegisterCallbacks = function(e) {
	this.mElement.onclick = function(e) {
		this.mWasClicked = true;
	}
	
	this.mElement.onmouseover = function(e) {
		this.mHover = true;
	}
	
	this.mElement.onmouseout = function(e) {
		this.mHover = false;
	}
	
	this.mElement.onmousedown = function(e) {
		this.mDown = true;
	}
	
	this.mElement.onmouseup = function(e) {
		this.mDown = false;
	}
}

GUIDOMButton.prototype.UnregisterCallbacks = function(e) {
	this.mElement.onclick = function(e) {
		
	}
	
	this.mElement.onmouseover = function(e) {
		
	}
	
	this.mElement.onmouseout = function(e) {
		
	}
	
	this.mElement.onmousedown = function(e) {
		
	}
	
	this.mElement.onmouseup = function(e) {
		
	}
}
// ...End

