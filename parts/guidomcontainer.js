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
	for (var i = 0; i < this.mElements.length; ++i) {
		this.mElements[i].mGUIElement.Process();
		
		if (this.mOldCanvas.mX != nmain.game.mCanvasPos.mX || this.mOldCanvas.mY != nmain.game.mCanvasPos.mY) {
			var diff = new IVec2(nmain.game.mCanvasPos.mX - this.mOldCanvas.mX,
					nmain.game.mCanvasPos.mY - this.mOldCanvas.mY);
			
			var pos = new IVec2(0, 0); pos.Copy(this.mElements[i].mGUIElement.mPos);
			this.mElements[i].mGUIElement.SetPos(pos);
		}
	}
	
	this.mOldCanvas.Copy(nmain.game.mCanvasPos);
}

GUIDOMContainer.prototype.AddElement = function(element, elementName) {
	var found = false;
	for (var i = 0; i < this.mElements.length; ++i) {
		if (this.mElements[i].mName == elementName) {
			found = true;
			break;
		}
	}
	
	if (found == false) {
		var elem = new GUIDOMElement();
		
		{
			if (element.Type() == "GUIDOMButton") {
				elem.mGUIElement = new GUIDOMButton();
			}
			else if (element.Type() == "GUIDOMInputBox") {
				elem.mGUIElement = new GUIDOMInputBox();
			}
		}
		
		elem.mGUIElement.Copy(element);
		elem.mName = elementName;
		
		this.mElements.push(elem);
		var id = this.mElements.length - 1;
		document.body.appendChild(this.mElements[id].mGUIElement.mElement);
		
		this.mElements[id].mGUIElement.RegisterCallbacks();
	}
}

GUIDOMContainer.prototype.RemoveElement = function(elementName) {
	var id = -1;
	for (var i = 0; i < this.mElements.length; ++i) {
		if (this.mElements[i].mName == elementName) {
			id = i;
			break;
		}
	}
	
	if (id >= 0) {
		this.mElements[id].mGUIElement.UnregisterCallbacks();
		
		document.body.removeChild(this.mElements[id].mGUIElement.mElement);
		this.mElements.splice(id, 1);
	}
}

GUIDOMContainer.prototype.GetElement = function(elementName) {
	for (var i = 0; i < this.mElements.length; ++i) {
		if (this.mElements[i].mName == elementName) {
			return this.mElements[i].mGUIElement;
		}
	}
	
	throw Exception("Resource not found.");
}

GUIDOMContainer.prototype.Clear = function() {
	for (var i = 0; i < this.mElements.length; ++i) {
		this.mElements[i].mGUIElement.UnregisterCallbacks();
		
		document.body.removeChild(this.mElements[i].mGUIElement.mElement);
	}
	
	this.mElements.splice(0, this.mElements.length);
}
// ...End

