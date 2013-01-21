// DepthSort function
// sorts renderable resources based on depth
function DepthSort(first, second) {
	// find the difference between the depths
	var firstDepth = first.mDepth;
	var secondDepth = second.mDepth;
	var result = secondDepth - firstDepth;
	
	// if the depths match, then find the difference between the ids
	if (result == 0) {
		result = first.mID - second.mID;
	}
	
	return result; // <0 || >0
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
	this.mRenderData.splice(0, this.mRenderData.length);
	this.mNeedSort = false;
	this.mFrustrumCull = true;
}

// add a renderable object using the appropiate method
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
	this.mNeedSort = true; // new data entered implies a sort may be needed
	
	// make a copy of the sprite
	var spr = new Sprite();
	spr.Copy(sprite);
	
	if (spr.mTex != null) {
		this.mRenderData.push(spr); // add the sprite to the renderables array
	}
}

// add renderable text to the render batch
RenderBatch.prototype.AddText = function(text) {
	this.mNeedSort = true;
	var txt = new Text();
	txt.Copy(text);
	
	this.mRenderData.push(txt);
}

// add renderable shape to the render batch
RenderBatch.prototype.AddShape = function(shape) {
	this.mNeedSort = true;
	var shp = new Shape();
	shp.Copy(shape);
	
	this.mRenderData.push(shp);
}

// add render data to the render batch
RenderBatch.prototype.AddRenderData = function(renderData) {
	this.mNeedSort = true;
	var renData = new RenderData();
	renData.Copy(renderData);
	
	this.mRenderData.push(renData);
}

// add render canvas to the render batch
RenderBatch.prototype.AddRenderCanvas = function(renderCanvas) {
	this.mNeedSort = true;
	var renCanv = new RenderCanvas();
	renCanv.Copy(renderCanvas);
	
	this.mRenderData.push(renCanv);
}

// clear the render batch
RenderBatch.prototype.Clear = function() {
	this.mRenderData.splice(0, this.mRenderData.length);
}

// render the render batch to the context
RenderBatch.prototype.Render = function(camera, target) {
	// use the supplied camera if valid, otherwise use a default camera
	var cam = new Camera();
	if (camera) {
		cam.Copy(camera);
	}
	
	// use the supplied target (context) if valid, otherwise use the main context
	var targ = nmain.game.mCurrContext;
	if (target) {
		targ = target;
	}
	
	// if we need to sort the renderables array
	if (this.mNeedSort == true) {
		// add all depths and ids to an array for sorting
		// this ensures a stable sort since if depths are equal, id will be used
		var arr = new Array();
		for (var i = 0; i < this.mRenderData.length; ++i) {
			var element = new RenderBatchSortElement();
			element.mID = i;
			element.mDepth = this.mRenderData[i].mDepth;
			
			arr.push(element);
		}
		
		arr.sort(DepthSort); // sort our element array by depth
		
		// add our renderable data to a temporary array using the order supplied by the sorted elements array
		var temp = new Array();
		for (var i = 0; i < this.mRenderData.length; ++i) {
			temp.push(this.mRenderData[arr[i].mID]);
		}
		
		// set the contents of our renderables array to the contents of the temporary array
		this.mRenderData.splice(0, this.mRenderData.length);
		this.mRenderData = this.mRenderData.concat(temp);
		
		this.mNeedSort = false; // notify that sort is complete
	}
	
	// variables for the position and size of the screen
	var scrPos = new IVec2(0, 0);
	var scrSize = new IVec2(0, 0);
	
	for (var i = 0; i < this.mRenderData.length; ++i) {
		targ.save(); // save the current transform matrix
		
		// if the renderable is not absolute (position is not relative to the camera)
		if (this.mRenderData[i].mAbsolute == false) {
			cam.Apply(targ); // apply the camera's tranformation matrix
			
			// set the position to the camera's position and the size to the canvas' size
			scrPos.Copy(cam.mTranslate);
			scrSize.Copy(nmain.game.mCanvasSize);
		}
		else {
			// set the position to the origin and the size to the canvas' size
			scrPos.Set(0, 0);
			scrSize.Copy(nmain.game.mCanvasSize);
		}
		
		// call the appropiate render function
		if (this.mRenderData[i].Type() == "Sprite") {
			this.RenderSprite(targ, i, scrPos, scrSize);
		}
		else if (this.mRenderData[i].Type() == "Text") {
			this.RenderText(targ, i, scrPos, scrSize);
		}
		else if (this.mRenderData[i].Type() == "Shape") {
			this.RenderShape(targ, i, scrPos, scrSize);
		}
		else if (this.mRenderData[i].Type() == "RenderData") {
			this.RenderRenderData(targ, i, scrPos, scrSize);
		}
		else if (this.mRenderData[i].Type() == "RenderCanvas") {
			this.RenderRenderCanvas(targ, i, scrPos, scrSize);
		}
		
		targ.restore(); // load the saved transform matrix
	}
}

// logic for rendering a sprite
RenderBatch.prototype.RenderSprite = function(targ, id, scrPos, scrSize) {
	var spr = this.mRenderData[id]; // get a copy of the sprite to be rendered
	
	// store the sprite's position and size
	var sprPos = new IVec2(0, 0); sprPos.Copy(spr.GetPosition());
	var sprSize = new IVec2(spr.GetWidth(), spr.GetHeight());
	
	var intersect = true; // assume instersection occurs initially
	if (this.mFrustrumCull == true) { // if frustrum culling is to be performed
		// check for a rectangle collision between the sprite's boundingbox and the screen
		intersect = util.RectangleCollision(sprPos, sprSize, scrPos, scrSize, false);
	}
	
	// if we have a collision then render
	if (intersect == true) {
		// store the current alpha value and then set it to the sprite's alpha value
		var oldAlpha = targ.globalAlpha;
		targ.globalAlpha = spr.mAlpha;
		
		// translate and rotate the target context to position the sprite
		targ.translate(spr.GetPosition().mX, spr.GetPosition().mY);
		targ.rotate(spr.mRotation * (Math.PI / 180));
		
		// draw the sprite texture using clip and scale values
		targ.drawImage(spr.mTex.mImg, spr.mClipPos.mX, spr.mClipPos.mY,
				spr.mClipSize.mX, spr.mClipSize.mY, 0, 0,
				spr.GetWidth() * spr.mScale.mX, spr.GetHeight() * spr.mScale.mY);
		
		targ.globalAlpha = oldAlpha; // restore the old alpha value
	}
}

// logic for rendering text
RenderBatch.prototype.RenderText = function(targ, id, scrPos, scrSize) {
	var txt = this.mRenderData[id]; // get a copy of the text to be rendered
	var txtArr = txt.mString.split("\n"); // split the text at any new line characters
	
	// if text wrap is enabled
	if (txt.mWrap == true) {
		targ.font = txt.mFontString; // set the font so that text measurements are correct
		
		var txtArrNew = new Array(); // an array to hold our new text strings
		for (var j = 0; j < txtArr.length; ++j) { // for all current text strings ("\n" delimited)
			var split = txtArr[j].split(" "); // split at " " (space)
			var str = ""; // our new string
			var width = 0; // our new string's width
			
			// for all current 'words' (" " delimited)
			for (var k = 0; k < split.length; ++k) {
				// if the current width + the width of the current 'word' (" " delimited) is less than the specified wrap width
				if (width + targ.measureText(split[k]).width <= txt.mWrapWidth) {
					str += split[k]; // add the current 'word' to the new string
					str += " "; // add a space to the new string
					width = targ.measureText(str).width; // caluclate the new width of the new string
				}
				else { // otherwise it is larger
					txtArrNew.push(str); // add the new string to the array
					str = ""; // reset the new string
					width = 0; // reset the width
					k--; // decrement iterator so we repeat the current 'word'
				}
			}
			
			// when we reach here, if width is greater than 0, then we still have a string to push
			if (width > 0) {
				txtArrNew.push(str); // add the final string
			}
		}
		
		// replace the old text array with the new (wrapped) one
		txtArr.splice(0, txtArr.length);
		txtArr = txtArr.concat(txtArrNew);
	}
	
	// store the text's position and size
	var txtPos = new IVec2(0, 0); txtPos.Copy(txt.GetPosition());
	var txtSize = new IVec2(txt.GetWidth(), txt.GetHeight());
	
	var intersect = true; // assume instersection occurs initially
	if (this.mFrustrumCull == true) { // if frustrum culling is to be performed
		// check for a rectangle collision between the text's boundingbox and the screen
		intersect = util.RectangleCollision(txtPos, txtSize, scrPos, scrSize, false);
	}
	
	// if we have a collision then render
	if (intersect == true) {
		// set the font of the text (size and family)
		targ.font = txt.mFontString;
		
		// translate and rotate the target context to position the text
		targ.translate(txt.mPos.mX, txt.mPos.mY + txt.mFontSize);
		targ.rotate(txt.mRotation * (Math.PI / 180));
		
		// for all delimited text strings
		for (var j = 0; j < txtArr.length; ++j) {
			// if alignment is justify
			if (txt.mAlign == "justify") {
				// split the text string at " " (space)
				var spacingArr = new Array();
				spacingArr = txtArr[j].split(" ");
				
				// calculate the extra width we need to fill when justifying the text
				var justifyWidth = txt.mJustifyWidth;
				for (var k = 0; k < spacingArr.length; ++k) {
					justifyWidth -= targ.measureText(spacingArr[k]).width;
				}
				
				// if the text fits into the justify space (0 = nothing needs done, <0 = too large)
				if (justifyWidth > 0) {
					var gap = 0; // assume gap between words is 0
					if (spacingArr.length - 1 > 0) { // if there is more than one 'word' (" " delimited strings)
						gap = justifyWidth / (spacingArr.length - 1); // calculate the gap between each word
					}
					
					var hAlign = 0; // set alignment to the left point
					
					// for all 'words' (" " delimited strings)
					for (var k = 0; k < spacingArr.length; ++k) {
						// if a shadow is to be drawn
						if (txt.mShadow == true) {
							if (txt.mOutline == true) {
								targ.strokeStyle = txt.mShadowColour; // set the colour of the stroked text shadow
								targ.strokeText(spacingArr[k], hAlign + 2, (txt.mFontSize * j) + 2); // draw offset stroked text
							}
							else {
								targ.fillStyle = txt.mShadowColour; // set the colour of the filled text shadow
								targ.fillText(spacingArr[k], hAlign + 2, (txt.mFontSize * j) + 2); // draw offset filled text
							}
						}
						
						if (txt.mOutline == true) {
							targ.strokeStyle = txt.mColour; // set the colour of the stroked text
							targ.strokeText(spacingArr[k], hAlign, txt.mFontSize * j); // draw stroked text
						}
						else {
							targ.fillStyle = txt.mColour; // set the colour of the filled text
							targ.fillText(spacingArr[k], hAlign, txt.mFontSize * j); // draw filled text
						}
						
						// increment the alignment point by the width of the previous 'word' and the common gap
						hAlign += targ.measureText(spacingArr[k]).width;
						hAlign += gap;
					}
				}
				else { // otherwise text is to long to be justified
					var hAlign = 0; // set alignment to the left point
					
					// if a shadow is to be drawn
					if (txt.mShadow == true) {
						if (txt.mOutline == true) {
							targ.strokeStyle = txt.mShadowColour; // set the colour of the stroked text shadow
							targ.strokeText(txtArr[j], hAlign + 2, (txt.mFontSize * j) + 2); // draw offset stroked text
						}
						else {
							targ.fillStyle = txt.mShadowColour; // set the colour of the filled text shadow
							targ.fillText(txtArr[j], hAlign + 2, (txt.mFontSize * j) + 2); // draw offset filled text
						}
					}
					
					if (txt.mOutline == true) {
						targ.strokeStyle = txt.mColour; // set the colour of the stroked text
						targ.strokeText(txtArr[j], hAlign, txt.mFontSize * j); // draw stroked text
					}
					else {
						targ.fillStyle = txt.mColour; // set the colour of the filled text
						targ.fillText(txtArr[j], hAlign, txt.mFontSize * j); // draw filled text
					}
				}
			}
			else { // otherwise not justify
				var hAlign = 0; // assume alignment is at the left point of the text string initially
				
				// if alignment is centred
				if (txt.mAlign == "centre") {
					// set alignment to the centre point of the text string
					hAlign = Math.round(0 - (targ.measureText(txtArr[j]).width / 2));
				}
				else if (txt.mAlign == "right") { // else if align is right aligned
					// set alignment to the right point of the text string
					hAlign = Math.round(0 - targ.measureText(txtArr[j]).width);
				}
				
				// if a shadow is to be drawn
				if (txt.mShadow == true) {
					if (txt.mOutline == true) {
						targ.strokeStyle = txt.mShadowColour; // set the colour of the stroked text shadow
						targ.strokeText(txtArr[j], hAlign + 2, (txt.mFontSize * j) + 2); // draw offset stroked text
					}
					else {
						targ.fillStyle = txt.mShadowColour; // set the colour of the filled text shadow
						targ.fillText(txtArr[j], hAlign + 2, (txt.mFontSize * j) + 2); // draw offset filled text
					}
				}
				
				if (txt.mOutline == true) {
					targ.strokeStyle = txt.mColour; // set the colour of the stroked text
					targ.strokeText(txtArr[j], hAlign, txt.mFontSize * j); // draw stroked text
				}
				else {
					targ.fillStyle = txt.mColour; // set the colour of the filled text
					targ.fillText(txtArr[j], hAlign, txt.mFontSize * j); // draw filled text
				}
			}
		}
	} 
}

// logic for rendering shapes
RenderBatch.prototype.RenderShape = function(targ, id, scrPos, scrSize) {
	var shp = this.mRenderData[id]; // get a copy of the shape to be rendered
	
	// store the shapes's position and size
	var shpPos = new IVec2(shp.mPos.mX + shp.mBounds[0], shp.mPos.mY + shp.mBounds[1]);
	var shpSize = new IVec2(shp.GetWidth(), shp.GetHeight());
	
	var intersect = true; // assume instersection occurs initially
	if (this.mFrustrumCull == true) { // if frustrum culling is to be performed
		// check for a rectangle collision between the shape's boundingbox and the screen
		intersect = util.RectangleCollision(shpPos, shpSize, scrPos, scrSize, false);
	}
	
	// if we have a collision then render
	if (intersect == true) {
		var pos = shp.GetPosition(); // get the shape's position
		
		// save current alpha and width values and set to shape's values
		var oldAlpha = targ.globalAlpha; targ.globalAlpha = shp.mAlpha;
		var oldLineWidth = targ.lineWidth; targ.lineWidth = shp.mLineWidth;
		
		// start the path and move the shape's position
		targ.beginPath();
		targ.moveTo(pos.mX, pos.mY);
		
		// for all points in the shape
		for (var j = 0; j < shp.mPoints.length; ++j) {
			// draw a line to the point
			var pt = new IVec2(); pt.Copy(shp.mPoints[j]);
			targ.lineTo(pos.mX + pt.mX, pos.mY + pt.mY);
		}
		
		targ.closePath(); // finish the path
		
		// if shape is to be filled
		if (shp.mOutline == false) {
			// set the fill colour and draw the filled shape
			targ.fillStyle = shp.mColour;
			targ.fill();
		}
		else {
			// set the stroke colour and draw the shape outline
			targ.strokeStyle = shp.mColour;
			targ.stroke();
		}
		
		// restore old alpha and width values
		targ.globalAlpha = oldAlpha;
		targ.lineWidth = oldLineWidth;
	}
}

// logic for rendering render data
RenderBatch.prototype.RenderRenderData = function(targ, id, scrPos, scrSize) {
	var renData = this.mRenderData[id]; // get a copy of the render data to be rendered
	
	// store the render data's position and size
	var rdPos = new IVec2(0, 0); rdPos.Copy(renData.mPos);
	var rdSize = new IVec2(renData.GetWidth(), renData.GetHeight());
	
	var intersect = true; // assume instersection occurs initially
	if (this.mFrustrumCull == true) { // if frustrum culling is to be performed
		// check for a rectangle collision between the render data's boundingbox and the screen
		intersect = util.RectangleCollision(rdPos, rdSize, scrPos, scrSize, false);
	}
	
	// if we have a collision then render
	if (intersect == true) {
		// translate and rotate the target context to position the render data
		targ.translate(renData.mPos.mX, renData.mPos.mY);
		targ.rotate(renData.mRotation * (Math.PI / 180));
		
		// draw the render data to the target context
		targ.putImageData(renData.mImageData, renData.mPos.mX, renData.mPos.mY);
	}
}

// logic for rendering render canvas
RenderBatch.prototype.RenderRenderCanvas = function(targ, id, scrPos, scrSize) {
	var canv = this.mRenderData[id]; // get a copy of the render canvas to be rendered
	
	// store the render canvas's position and size
	var canvPos = new IVec2(0, 0); canvPos.Copy(canv.mPos);
	var canvSize = new IVec2(canv.GetWidth(), canv.GetHeight());
	
	var intersect = true; // assume instersection occurs initially
	if (this.mFrustrumCull == true) { // if frustrum culling is to be performed
		// check for a rectangle collision between the render canvas's boundingbox and the screen
		intersect = util.RectangleCollision(canvPos, canvSize, scrPos, scrSize, false);
	}
	
	// if we have a collision then render
	if (intersect == true) {
		// store the current alpha value and then set it to the render canvas' alpha value
		var oldAlpha = targ.globalAlpha;
		targ.globalAlpha = canv.mAlpha;
		
		// translate and rotate the target context to position the render canvas
		targ.translate(canv.mPos.mX, canv.mPos.mY);
		targ.rotate(canv.mRotation * (Math.PI / 180));
		
		// draw the render canvas
		targ.drawImage(canv.mCanvas, 0, 0);
		
		// restore the old alpha value
		targ.globalAlpha = oldAlpha;
	}
}
// ...End

