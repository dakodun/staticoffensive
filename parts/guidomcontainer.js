// GUIDOMElement Class...
function GUIDOMElement() {
	this.mGUIElement = null;
	this.mName = "";
};
// ...End


// GUIDOMContainer Class...
function GUIDOMContainer() {
	this.mOldCanvas = new IVec2(0, 0);
	this.mOldCanvas.Copy(nmain.game.mCanvasPos);
	
	this.mElements = new Array();
};

GUIDOMContainer.prototype.Process = function() {
	if (this.mOldCanvas.mX != nmain.game.mCanvasPos.mX || this.mOldCanvas.mY != nmain.game.mCanvasPos.mY) {
		var diff = new IVec2(nmain.game.mCanvasPos.mX - this.mOldCanvas.mX,
				nmain.game.mCanvasPos.mY - this.mOldCanvas.mY);
		
		for (var i = 0; i < this.mElements.length; ++i) {
			var pos = new IVec2(0, 0); pos.Copy(this.mElements[i].mGUIElement.mPos);
			this.mElements[i].mGUIElement.SetPos(pos);
		}
		
		this.mOldCanvas.Copy(nmain.game.mCanvasPos);
	}
}

GUIDOMContainer.prototype.Add = function(element, elementName) {
	var found = false;
	for (var i = 0; i < this.mElements.length; ++i) {
		if (this.mElements[i].mName == elementName) {
			found = true;
			break;
		}
	}
	
	if (found == false) {
		var elem = new GUIDOMElement();
		elem.mGUIElement = element;
		elem.mName = elementName;
		
		this.mElements.push(elem);
		var id = this.mElements.length - 1;
		document.body.appendChild(this.mElements[id].mGUIElement.mElement);
	}
}

GUIDOMContainer.prototype.Remove = function(elementName) {
	var id = -1;
	for (var i = 0; i < this.mElements.length; ++i) {
		if (this.mElements[i].mName == elementName) {
			id = i;
			break;
		}
	}
	
	if (id >= 0) {
		document.body.removeChild(this.mElements[id].mGUIElement.mElement);
		this.mElements.splice(id, 1);
	}
}

GUIDOMContainer.prototype.Clear = function() {
	for (var i = 0; i < this.mElements.length; ++i) {
		document.body.removeChild(this.mElements[i].mGUIElement.mElement);
	}
	
	this.mElements.splice(0, this.mElements.length);
}
// ...End

