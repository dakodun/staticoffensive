// GUIDropDown Class...
function GUIDropDown() {
	this.mPos = new IVec2(0, 0);
	this.mBase = new GUIButton();
	
	this.mItems = new Array();
	this.mItemsText = new Array();
	
	this.mExpanded = false;
};

GUIDropDown.prototype.SetUp = function(baseButton) {
	this.mPos.Copy(baseButton.mPos);
	this.mBase.Copy(baseButton);
}

GUIDropDown.prototype.Input = function() {
	this.mBase.Input();
	
	if (this.mExpanded == true) {
		for (var i = 0; i < this.mItems.length; ++i) {
			this.mItems[i].Input();
		}
	}
	
	if (this.mExpanded == true) {
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left)) {
			var thisClick = this.mBase.mHover;
			
			if (thisClick == false) {
				for (var i = 0; i < this.mItems.length; ++i) {
					thisClick = this.mItems[i].mHover;
					if (thisClick == true) {
						break;
					}
				}
			}
			
			if (thisClick == false) {
				this.mExpanded = !this.mExpanded;
			}
		}
	}
}

GUIDropDown.prototype.Process = function(point) {
	this.mBase.Process(point);
	
	if (this.mBase.OnClick() == true) {
		this.mExpanded = !this.mExpanded;
	}
	
	if (this.mExpanded == true) {
		for (var i = 0; i < this.mItems.length; ++i) {
			this.mItems[i].Process(point);
		}
	}
}

GUIDropDown.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mExpanded == true) {
		arr.push(this.mBase.mSpriteDown);
		
		for (var i = 0; i < this.mItems.length; ++i) {
			arr = arr.concat(this.mItems[i].GetRenderData());
		}
		
		for (var i = 0; i < this.mItemsText.length; ++i) {
			arr.push(this.mItemsText[i]);
		}
	}
	else {
		arr = arr.concat(this.mBase.GetRenderData());
	}
	
	return arr;
}

GUIDropDown.prototype.OnClick = function(itemID) {
	if (itemID >= 0 && itemID < this.mItems.length) {
		if (this.mItems[itemID].OnClick()) {
			this.mExpanded = false;
			return true;
		}
	}
	
	return false;
}

GUIDropDown.prototype.GetSpritePositions = function() {
	return this.mBase.mSpriteIdle.mPos;
}

GUIDropDown.prototype.SetSpritePositions = function(pos) {
	this.mBase.mSpriteIdle.mPos.Copy(pos);
	this.mBase.mSpriteHover.mPos.Copy(pos);
	this.mBase.mSpriteDown.mPos.Copy(pos);
	this.mBase.mSpriteInactive.mPos.Copy(pos);
}

GUIDropDown.prototype.SetSpriteDepths = function(depth) {
	this.mBase.mSpriteIdle.mDepth = depth;
	this.mBase.mSpriteHover.mDepth = depth;
	this.mBase.mSpriteDown.mDepth = depth;
	this.mBase.mSpriteInactive.mDepth = depth;
}

GUIDropDown.prototype.AddItem = function(itemButton, text) {
	var but = new GUIButton();
	but.Copy(itemButton);
	
	var txt = new Text();
	txt.Copy(text);
	
	var newPos = new IVec2(0, 0);
	
	if (this.mItems.length == 0) {
		newPos.Copy(this.mPos);
		newPos.mY += this.mBase.mSize.mY;
	}
	else {
		var id = this.mItems.length - 1;
		newPos.Copy(this.mItems[id].mPos);
		newPos.mY += this.mItems[id].mSize.mY;
	}
	
	but.mPos.mX += newPos.mX; but.mPos.mY += newPos.mY;
	but.SetSpritePositions(but.mPos);
	
	txt.mPos.mX += newPos.mX; txt.mPos.mY += newPos.mY;
	
	this.mItems.push(but);
	this.mItemsText.push(txt);
}
// ...End

