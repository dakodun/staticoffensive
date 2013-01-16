// DepthSort function
// sorts renderable resources based on depth
function DepthSort(first, second) {
	var firstDepth = first.mDepth;
	var secondDepth = second.mDepth;
	var result = secondDepth - firstDepth;
	
	if (result == 0) {
		result =  first.mID - second.mID;
	}
	
	return result;
};
// ...End


// RenderBatchSortElement Class...
function RenderBatchSortElement() {
	this.mID = -1;
	this.mDepth = 0;
};
// ...End


// RenderBatch Class...
// a render batch handles all drawing operations and draws according to depth (z) values
function RenderBatch() {
	this.mRenderData = new Array();
	
	this.mNeedSort = false;
	this.mFrustrumCull = true;
};

// initialise the render batch
RenderBatch.prototype.SetUp = function() {
	
}

// clean up the render batch
RenderBatch.prototype.TearDown = function() {
	
}

RenderBatch.prototype.Add = function(renderable) {
	if (renderable.Type() == "Sprite") {
		this.AddSprite(renderable);
	}
	else if (renderable.Type() == "Text") {
		this.AddText(renderable);
	}
	else if (renderable.Type() == "Shape") {
		this.AddShape(renderable);
	}
	else if (renderable.Type() == "RenderData") {
		this.AddRenderData(renderable);
	}
	else if (renderable.Type() == "RenderCanvas") {
		this.AddRenderCanvas(renderable);
	}
}

// add a sprite to the render batch
RenderBatch.prototype.AddSprite = function(sprite) {
	this.mNeedSort = true;
	var spr = new Sprite();
	spr.Copy(sprite);
	
	if (spr.mTex != null) {
		this.mRenderData.push(spr);
	}
	// this.mRenderData.sort(DepthSort); // sort the queue
}

// add renderable text to the render batch
RenderBatch.prototype.AddText = function(text) {
	this.mNeedSort = true;
	var txt = new Text();
	txt.Copy(text);
	
	this.mRenderData.push(txt);
	// this.mRenderData.sort(DepthSort); // sort the queue
}

// add renderable shape to the render batch
RenderBatch.prototype.AddShape = function(shape) {
	this.mNeedSort = true;
	var shp = new Shape();
	shp.Copy(shape);
	
	this.mRenderData.push(shp);
	// this.mRenderData.sort(DepthSort); // sort the queue
}

// add render data to the render batch
RenderBatch.prototype.AddRenderData = function(renderData) {
	this.mNeedSort = true;
	var renData = new RenderData();
	renData.Copy(renderData);
	
	this.mRenderData.push(renData);
	// this.mRenderData.sort(DepthSort); // sort the queue
}

// add render canvas to the render batch
RenderBatch.prototype.AddRenderCanvas = function(renderCanvas) {
	this.mNeedSort = true;
	var renCanv = new RenderCanvas();
	renCanv.Copy(renderCanvas);
	
	this.mRenderData.push(renCanv);
	// this.mRenderData.sort(DepthSort); // sort the queue
}

// clear the render batch
RenderBatch.prototype.Clear = function() {
	this.mRenderData.splice(0, this.mRenderData.length);
}

// render the render batch to the context
RenderBatch.prototype.Render = function(camera, target) {
	var cam = new Camera();
	if (camera) {
		cam.Copy(camera);
	}
	
	var targ = nmain.game.mCurrContext;
	if (target) {
		targ = target;
	}
	
	if (this.mNeedSort == true) {
		var arr = new Array();
		for (var i = 0; i < this.mRenderData.length; ++i) {
			var element = new RenderBatchSortElement();
			element.mID = i;
			element.mDepth = this.mRenderData[i].mDepth;
			
			arr.push(element);
		}
		
		arr.sort(DepthSort);
		
		var temp = new Array();
		for (var i = 0; i < this.mRenderData.length; ++i) {
			temp.push(this.mRenderData[arr[i].mID]);
		}
		
		this.mRenderData.splice(0, this.mRenderData.length);
		this.mRenderData = this.mRenderData.concat(temp);
		
		this.mNeedSort = false;
	}
	
	var scrTL = new IVec2(0, 0);
	var scrBR = new IVec2(0, 0);
	
	for (var i = 0; i < this.mRenderData.length; ++i) {
		targ.save();
		
		if (this.mRenderData[i].mAbsolute == false) {
			cam.Apply();
			scrTL.Set(0 + cam.mTranslate.mX, 0 + cam.mTranslate.mY);
			scrBR.Set(nmain.game.mCanvasSize.mX + cam.mTranslate.mX, nmain.game.mCanvasSize.mY + cam.mTranslate.mY);
		}
		else {
			scrTL.Set(0, 0);
			scrBR.Set(nmain.game.mCanvasSize.mX, nmain.game.mCanvasSize.mY);
		}
		
		if (this.mRenderData[i].Type() == "Sprite") {
			var spr = this.mRenderData[i];
			
			var sprTL = new IVec2(spr.GetPosition().mX, spr.GetPosition().mY);
			var sprBR = new IVec2(spr.GetPosition().mX + spr.GetWidth(), spr.GetPosition().mY + spr.GetHeight());
			
			var intersect = false;
			if (this.mFrustrumCull == true) {
				var left = sprTL.mX;
				var right = scrBR.mX;
				if (scrTL.mX < sprTL.mX) {
					left = scrTL.mX;
					right = sprBR.mX;
				}
				
				if (right - left < spr.GetWidth() + nmain.game.mCanvasSize.mX) {
					var top = sprTL.mY;
					var bottom = scrBR.mY;
					if (scrTL.mY < sprTL.mY) {
						top = scrTL.mY;
						bottom = sprBR.mY;
					}
					
					if (bottom - top < spr.GetHeight() + nmain.game.mCanvasSize.mY) {
						intersect = true;
					}
				}
			}
			else {
				intersect = true;
			}
			
			if (intersect == true) {
				var oldAlpha = targ.globalAlpha;
				targ.globalAlpha = spr.mAlpha;
				
				targ.translate(spr.GetPosition().mX, spr.GetPosition().mY);
				targ.rotate(spr.mRotation * (Math.PI / 180));
				
				targ.drawImage(spr.mTex.mImg, spr.mClipPos.mX, spr.mClipPos.mY,
						spr.mClipSize.mX, spr.mClipSize.mY, 0, 0,
						spr.GetWidth() * spr.mScale.mX, spr.GetHeight() * spr.mScale.mY);
				
				targ.globalAlpha = oldAlpha;
			}
		}
		else if (this.mRenderData[i].Type() == "Text") {
			var txt = this.mRenderData[i];
			var txtArr = txt.mString.split("\n");
			
			var txtTL = new IVec2(txt.mPos.mX, txt.mPos.mY);
			var txtBR = new IVec2(txt.mPos.mX + txt.GetWidth(), txt.mPos.mY + txt.GetHeight());
			
			var intersect = false;
			if (this.mFrustrumCull == true) {
				var left = txtTL.mX;
				var right = scrBR.mX;
				if (scrTL.mX < txtTL.mX) {
					left = scrTL.mX;
					right = txtBR.mX;
				}
				
				if (right - left < txt.GetWidth() + nmain.game.mCanvasSize.mX) {
					var top = txtTL.mY;
					var bottom = scrBR.mY;
					if (scrTL.mY < txtTL.mY) {
						top = scrTL.mY;
						bottom = txtBR.mY;
					}
					
					if (bottom - top < txt.GetHeight() + nmain.game.mCanvasSize.mY) {
						intersect = true;
					}
				}
			}
			else {
				intersect = true;
			}
			
			if (intersect == true) {
				targ.font = txt.mFontString;
				targ.strokeStyle = txt.mColour;
				
				targ.translate(txt.mPos.mX, txt.mPos.mY + txt.mFontSize);
				targ.rotate(txt.mRotation * (Math.PI / 180));
				
				if (txt.mOutline == true) {
					for (var j = 0; j < txtArr.length; ++j) {
						if (txt.mAlign == "justify") {
							var spacingArr = new Array();
							spacingArr = txtArr[j].split(" ");
							
							var justifyWidth = txt.mJustifyWidth;
							for (var k = 0; k < spacingArr.length; ++k) {
								justifyWidth -= targ.measureText(spacingArr[k]).width;
							}
							
							if (justifyWidth > 0) {
								var gap = 0;
								if (spacingArr.length > 0) {
									gap = justifyWidth / (spacingArr.length - 1);
								}
								
								var hAlign = 0;
								for (var k = 0; k < spacingArr.length; ++k) {
									if (txt.mShadow == true) {
										targ.fillStyle = txt.mShadowColour;
										targ.fillText(spacingArr[k], hAlign + 2, (txt.mFontSize * j) + 2);
									}
									
									targ.fillStyle = txt.mColour;
									targ.fillText(spacingArr[k], hAlign, txt.mFontSize * j);
									
									hAlign += targ.measureText(spacingArr[k]).width;
									hAlign += gap;
								}
							}
							else {
								var hAlign = 0;
								if (txt.mShadow == true) {
									targ.fillStyle = txt.mShadowColour;
									targ.fillText(txtArr[j], hAlign + 2, (txt.mFontSize * j) + 2);
								}
								
								targ.fillStyle = txt.mColour;
								targ.fillText(txtArr[j], hAlign, txt.mFontSize * j);
							}
						}
						else {
							var hAlign = 0;
							if (txt.mAlign == "centre") {
								hAlign = Math.round(0 - (targ.measureText(txtArr[j]).width / 2));
							}
							else if (txt.mAlign == "right") {
								hAlign = Math.round(0 - targ.measureText(txtArr[j]).width);
							}
							
							targ.strokeText(txtArr[j], hAlign, txt.mFontSize * j);
						}
					}
				}
				else {
					for (var j = 0; j < txtArr.length; ++j) {
						if (txt.mAlign == "justify") {
							var spacingArr = new Array();
							spacingArr = txtArr[j].split(" ");
							
							var justifyWidth = txt.mJustifyWidth;
							for (var k = 0; k < spacingArr.length; ++k) {
								justifyWidth -= targ.measureText(spacingArr[k]).width;
							}
							
							if (justifyWidth > 0) {
								var gap = 0;
								if (spacingArr.length > 0) {
									gap = justifyWidth / (spacingArr.length - 1);
								}
								
								var hAlign = 0;
								for (var k = 0; k < spacingArr.length; ++k) {
									if (txt.mShadow == true) {
										targ.fillStyle = txt.mShadowColour;
										targ.fillText(spacingArr[k], hAlign + 2, (txt.mFontSize * j) + 2);
									}
									
									targ.fillStyle = txt.mColour;
									targ.fillText(spacingArr[k], hAlign, txt.mFontSize * j);
									
									hAlign += targ.measureText(spacingArr[k]).width;
									hAlign += gap;
								}
							}
							else {
								var hAlign = 0;
								if (txt.mShadow == true) {
									targ.fillStyle = txt.mShadowColour;
									targ.fillText(txtArr[j], hAlign + 2, (txt.mFontSize * j) + 2);
								}
								
								targ.fillStyle = txt.mColour;
								targ.fillText(txtArr[j], hAlign, txt.mFontSize * j);
							}
						}
						else {
							var hAlign = 0;
							if (txt.mAlign == "centre") {
								hAlign = Math.round(0 - (targ.measureText(txtArr[j]).width / 2));
							}
							else if (txt.mAlign == "right") {
								hAlign = Math.round(0 - targ.measureText(txtArr[j]).width);
							}
							
							if (txt.mShadow == true) {
								targ.fillStyle = txt.mShadowColour;
								targ.fillText(txtArr[j], hAlign + 2, (txt.mFontSize * j) + 2);
							}
							
							targ.fillStyle = txt.mColour;
							targ.fillText(txtArr[j], hAlign, txt.mFontSize * j);
						}
					}
				}
			}
		}
		else if (this.mRenderData[i].Type() == "Shape") {
			var shp = this.mRenderData[i];
			var pos = shp.GetPosition();
			
			var shpTL = new IVec2(shp.mPos.mX + shp.mBounds[0], shp.mPos.mY + shp.mBounds[1]);
			var shpBR = new IVec2(shp.mPos.mX + shp.mBounds[2], shp.mPos.mY + shp.mBounds[3]);
			
			var intersect = false;
			if (this.mFrustrumCull == true) {
				var left = shpTL.mX;
				var right = scrBR.mX;
				if (scrTL.mX < shpTL.mX) {
					left = scrTL.mX;
					right = shpBR.mX;
				}
				
				if (right - left < shp.GetWidth() + nmain.game.mCanvasSize.mX) {
					var top = shpTL.mY;
					var bottom = scrBR.mY;
					if (scrTL.mY < shpTL.mY) {
						top = scrTL.mY;
						bottom = shpBR.mY;
					}
					
					if (bottom - top < shp.GetHeight() + nmain.game.mCanvasSize.mY) {
						intersect = true;
					}
				}
			}
			else {
				intersect = true;
			}
			
			if (intersect == true) {
				targ.fillStyle = shp.mColour;
				targ.strokeStyle = shp.mColour;
				
				var oldAlpha = targ.globalAlpha;
				targ.globalAlpha = shp.mAlpha;
				
				var oldLineWidth = targ.lineWidth;
				targ.lineWidth = shp.mLineWidth;
				
				targ.beginPath();
				targ.moveTo(pos.mX, pos.mY);
				
				for (var j = 0; j < shp.mPoints.length; ++j) {
					var pt = new IVec2();
					pt.Copy(shp.mPoints[j]);
					targ.lineTo(pos.mX + pt.mX, pos.mY + pt.mY);
				}
				
				targ.closePath();
				
				if (shp.mOutline == false) {
					targ.fill();
				}
				else {
					
					targ.stroke();
				}
				
				targ.globalAlpha = oldAlpha;
				targ.lineWidth = oldLineWidth;
			}
		}
		else if (this.mRenderData[i].Type() == "RenderData") {
			var renData = this.mRenderData[i];
			
			var idTL = new IVec2(renData.mPos.mX, renData.mPos.mY);
			var idBR = new IVec2(renData.mPos.mX + renData.GetWidth(), renData.mPos.mY + renData.GetHeight());
			
			var intersect = false;
			if (this.mFrustrumCull == true) {
				var left = idTL.mX;
				var right = scrBR.mX;
				if (scrTL.mX < idTL.mX) {
					left = scrTL.mX;
					right = idBR.mX;
				}
				
				if (right - left < renData.GetWidth() + nmain.game.mCanvasSize.mX) {
					var top = idTL.mY;
					var bottom = scrBR.mY;
					if (scrTL.mY < idTL.mY) {
						top = scrTL.mY;
						bottom = idBR.mY;
					}
					
					if (bottom - top < renData.GetHeight() + nmain.game.mCanvasSize.mY) {
						intersect = true;
					}
				}
			}
			else {
				intersect = true;
			}
			
			if (intersect == true) {
				targ.translate(renData.mPos.mX, renData.mPos.mY);
				targ.rotate(renData.mRotation * (Math.PI / 180));
				
				targ.putImageData(renData.mImageData, renData.mPos.mX, renData.mPos.mY);
			}
		}
		else if (this.mRenderData[i].Type() == "RenderCanvas") {
			var canv = this.mRenderData[i];
			
			var canvTL = new IVec2(canv.mPos.mX, canv.mPos.mY);
			var canvBR = new IVec2(canv.mPos.mX + canv.GetWidth(), canv.mPos.mY + canv.GetHeight());
			
			var intersect = false;
			if (this.mFrustrumCull == true) {
				var left = canvTL.mX;
				var right = scrBR.mX;
				if (scrTL.mX < canvTL.mX) {
					left = scrTL.mX;
					right = canvBR.mX;
				}
				
				if (right - left < canv.GetWidth() + nmain.game.mCanvasSize.mX) {
					var top = canvTL.mY;
					var bottom = scrBR.mY;
					if (scrTL.mY < canvTL.mY) {
						top = scrTL.mY;
						bottom = canvBR.mY;
					}
					
					if (bottom - top < canv.GetHeight() + nmain.game.mCanvasSize.mY) {
						intersect = true;
					}
				}
			}
			else {
				intersect = true;
			}
			
			if (intersect == true) {
				var oldAlpha = targ.globalAlpha;
				targ.globalAlpha = canv.mAlpha;
				
				targ.translate(canv.mPos.mX, canv.mPos.mY);
				targ.rotate(canv.mRotation * (Math.PI / 180));
				
				targ.drawImage(canv.mCanvas, 0, 0);
				
				targ.globalAlpha = oldAlpha;
			}
		}
		
		targ.restore();
	}
}

// ...End

