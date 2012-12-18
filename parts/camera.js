// Camera Class...
// a 2d camera (or a view) is a self contained affine transform
// todo: maintain a transform matrix for translation as well as rotation and scaling
function Camera() {
	this.mTranslate = new IVec2(0, 0); // current translation
	
	this.mViewUpdated = false; // indication whether the camera state has been altered
}

// make a copy of another (other) camera (copy constructor)
Camera.prototype.Copy = function(other) {
	this.mTranslate.Copy(other.mTranslate); // call ivec2 copy (copy constructor)
}

// processes camera every frame
Camera.prototype.Process = function() {
	if (this.mViewUpdated == true) {
		this.mViewUpdated = false;
	}
}

// apply the camera's transform to the canvas
Camera.prototype.Apply = function() {
	nmain.game.mCurrContext.translate(-this.mTranslate.mX, -this.mTranslate.mY); // apply translation
}

// apply a transformation to the camera
Camera.prototype.Translate = function(trans) {
	this.mTranslate.Set(this.mTranslate.mX + trans.mX, this.mTranslate.mY + trans.mY);
	this.mViewUpdated = true;
}
// ...End

