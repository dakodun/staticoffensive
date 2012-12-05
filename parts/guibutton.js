// GUIButton Class...
function GUIButton() {
	this.mPos = new IVec2(0, 0);
	this.mSize = new IVec2(0, 0);
	
	this.mStatus = "idle";
	this.mSpriteIdle = new Sprite();
	this.mSpriteHover = new Sprite();
	this.mSpriteDown = new Sprite();
	this.mSpriteInactive = new Sprite();
	
	this.mActive = true;
	this.mHover = false;
	this.mDown = false;
	this.mWasClicked = false;
};

GUIButton.prototype.SetUp = function(pos, size, depth) {
	this.mPos.Copy(pos);
	this.mSize.Copy(size);
	
	this.mSpriteIdle.mPos.Copy(pos);
	this.mSpriteIdle.mDepth = depth;
	
	this.mSpriteHover.mPos.Copy(pos);
	this.mSpriteHover.mDepth = depth;
	
	this.mSpriteDown.mPos.Copy(pos);
	this.mSpriteDown.mDepth = depth;
	
	this.mSpriteInactive.mPos.Copy(pos);
	this.mSpriteInactive.mDepth = depth;
}

GUIButton.prototype.Input = function() {
	if (this.mActive == true) {
		if (this.mHover == true) {
			if (nmgrs.inputMan.GetMouseReleased(nmouse.button.code.left)) {
				if (this.mDown == true) {
					this.mWasClicked = true;
				}
			}
			else if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left)) {
				this.mDown = true;
			}
		}
		
		if (nmgrs.inputMan.GetMouseReleased(nmouse.button.code.left)) {
			this.mDown = false;
		}
	}
}

GUIButton.prototype.Process = function(point) {
	if (this.mActive == true) {
		var tl = new IVec2(0, 0); tl.Copy(this.mPos);
		var br = new IVec2(0, 0); br.Copy(this.mPos);
		br.mX += this.mSize.mX; br.mY += this.mSize.mY;
		if (util.PointInRectangle(point, tl, br)) {
			this.mHover = true;
			if (this.mDown == false) {
				this.mStatus = "hover";
			}
			else {
				this.mStatus = "down";
			}
		}
		else {
			this.mHover = false;
			this.mStatus = "idle";
		}
	}
	
	if (this.mActive == true) {
		if (this.mStatus == "hover") {
			this.mSpriteHover.Process();
		}
		else if (this.mStatus == "down") {
			this.mSpriteDown.Process()
		}
		else {
			this.mSpriteIdle.Process()
		}
	}
	else {
		this.mSpriteInactive.Process()
	}
}

GUIButton.prototype.OnClick = function() {
	if (this.mWasClicked == true) {
		this.mWasClicked = false;
		return true;
	}
	
	return false;
}

GUIButton.prototype.GetRenderData = function() {
	var arr = new Array();
	if (this.mActive == true) {
		if (this.mStatus == "hover") {
			arr.push(this.mSpriteHover);
		}
		else if (this.mStatus == "down") {
			arr.push(this.mSpriteDown);
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

GUIButton.prototype.GetSpritePositions = function() {
	return this.mSpriteIdle.mPos;
}

GUIButton.prototype.SetSpritePositions = function(pos) {
	this.mSpriteIdle.mPos.Copy(pos);
	this.mSpriteHover.mPos.Copy(pos);
	this.mSpriteDown.mPos.Copy(pos);
	this.mSpriteInactive.mPos.Copy(pos);
}

GUIButton.prototype.SetSpriteDepths = function(depth) {
	this.mSpriteIdle.mDepth = depth;
	this.mSpriteHover.mDepth = depth;
	this.mSpriteDown.mDepth = depth;
	this.mSpriteInactive.mDepth = depth;
}
// ...End