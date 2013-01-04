// GUIDOMButton Class...
function GUIDOMButton() {
	this.mPos = new IVec2(0, 0);
	
	this.mElement = document.createElement('button');
	this.mText = null
};

GUIDOMButton.prototype.Copy = function(other) {
	
}

GUIDOMButton.prototype.SetUp = function(pos, text) {
	this.mPos.Copy(pos);
	
	this.mElement.style.position = "absolute";
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
	
	this.mText = document.createTextNode(text);
	this.mElement.appendChild(this.mText);
}

GUIDOMButton.prototype.SetPos = function(pos) {
	this.mPos.Copy(pos);
	
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
}
// ...End

