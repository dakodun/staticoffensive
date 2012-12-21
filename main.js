/* **************************************************************** **
**	
**	Copyright (c) 2012 Iain M. Crawford
**
**	This software is provided 'as-is', without any express or
**	implied warranty. In no event will the authors be held liable
**	for any damages arising from the use of this software.
**
**	Permission is granted to anyone to use this software for any
**	purpose, including commercial applications, and to alter it
**	and redistribute it freely, subject to the following
**	restrictions:
** 
**		1. The origin of this software must not be misrepresented;
**		   you must not claim that you wrote the original
**		   software. If you use this software in a product, an
**		   acknowledgment in the product documentation would be
**		   appreciated but is not required.
**
**		2. Altered source versions must be plainly marked as such,
**		   and must not be misrepresented as being the original
**		   software.
**
**		3. This notice may not be removed or altered from any
**		   source distribution.
** **************************************************************** */

// IVec2 Class...
// a 2d vector of integers
function IVec2(x, y) {
	this.mX = x; // x value of our 2d vector
	this.mY = y; // y value of our 2d vector
};

// returns the type of this object for validity checking
IVec2.prototype.Type = function() {
	return "IVec2";
};

// returns formatted output for this vector
IVec2.prototype.Output = function() {
	return "(" + this.mX + ", " + this.mY + ")";
};

// make a copy of another (other) ivec2 (copy constructor)
IVec2.prototype.Copy = function(other) {
	// copy x and y
	this.mX = other.mX;
	this.mY = other.mY;
};

// set the x and y components of the vector
IVec2.prototype.Set = function(x, y) {
	this.mX = x; // x value of our 2d vector
	this.mY = y; // y value of our 2d vector
};
// ...End


// FVec2 Class...
// a 2d vector of floats
function FVec2(x, y) {
	this.mX = x; // x value of our 2d vector
	this.mY = y; // y value of our 2d vector
};

// returns the type of this object for validity checking
FVec2.prototype.Type = function() {
	return "FVec2";
};

// returns formatted output for this vector
FVec2.prototype.Output = function() {
	return "(" + this.mX + ", " + this.mY + ")";
};

// make a copy of another (other) fvec2 (copy constructor)
FVec2.prototype.Copy = function(other) {
	// copy x and y
	this.mX = other.mX;
	this.mY = other.mY;
};

// set the x and y components of the vector
FVec2.prototype.Set = function(x, y) {
	this.mX = x; // x value of our 2d vector
	this.mY = y; // y value of our 2d vector
};
// ...End


// Exception Class...
// a custom exception
function Exception(what) {
	this.mWhat = what; // information about this exception
};

// returns information about this exception
Exception.prototype.What = function() {
	return this.mWhat;
};
// ...End


// 
var util = new function() {
	this.PointInRectangle = function(point, topLeft, bottomRight) {
		if ((point.mX > topLeft.mX) && (point.mX < bottomRight.mX) &&
				(point.mY > topLeft.mY) && (point.mY < bottomRight.mY)) {
			
			return true;
		}
		
		return false;
	};
	
	this.PointInConvex = function(point, polygon) {
		if (polygon.length > 2) {
			var pt = new IVec2(0, 0); pt.Copy(point);
			pt.mX -= 3; pt.mY -= 3;
			
			var poly = new Array();
			poly = poly.concat(polygon);
			poly.push(polygon[0]);
			
			for (var i = 0; i < poly.length - 1; ++i) {
				var x1 = pt.mX - poly[i].mX;
				var y1 = pt.mY - poly[i].mY;
				var x2 = poly[i + 1].mX - poly[i].mX;
				var y2 = poly[i + 1].mY - poly[i].mY;
				
				if ((x1 * y2) - (y1 * x2) > 0) {
					
					return false;
				}
			}
			
			return true;
		}
		
		return false;
	}
	
	this.RectangleCollision = function(rectAPos, rectASize, rectBPos, rectBSize, touchingCounts) {
		var intersect = false;
		
		var width = rectASize.mX + rectBSize.mX;
		var height = rectASize.mY + rectBSize.mY;
		
		var left = rectAPos.mX;
		var right = rectBPos.mX + rectBSize.mX;
		if (rectBPos.mX < rectAPos.mX) {
			left = rectBPos.mX;
			right = rectAPos.mX + rectASize.mX;
		}
		
		if (right - left < width || (touchingCounts == true && right - left == width)) {
			var top = rectAPos.mY;
			var bottom = rectBPos.mY + rectBSize.mY;
			if (rectBPos.mY < rectAPos.mY) {
				top = rectBPos.mY;
				bottom = rectAPos.mY + rectASize.mY;
			}
			
			if (bottom - top < height || (touchingCounts == true && bottom - top == height)) {
				intersect = true;
			}
		}
		
		return intersect;
	}
	
	this.ShuffleArray = function(randGen, inputArr) {
		var output = new Array();
		var input = new Array();
		input = input.concat(inputArr);
		
		while (input.length > 0) {
			var id = randGen.GetRandInt(0, input.length - 1);
			output.push(input[id]);
			input.splice(id, 1);
		}
		
		return output;
	};
};
// ...End


// AStarTile Class
//
function AStarTile() {
	this.mID = 0;
	this.mParent = -1;
	this.mG = 0;
	this.mH = 0;
	
	this.mValid = true;
}

AStarTile.prototype.Copy = function(other) {
	this.mID = other.mID;
	this.mParent = other.mParent;
	this.mG = other.mG;
	this.mH = other.mH;
	
	this.mValid = other.mValid;
}
// ...End

// AStar Class
//
function AStar() {
	this.mMap = new Array();
	this.mMapSize = new IVec2(0, 0);
}

AStar.prototype.SetUp = function(size) {
	this.mMap.splice(0, this.mMap.length);
	this.mMapSize.Copy(size);
	
	for (var y = 0; y < size.mY; ++y) {
		for (var x = 0; x < size.mX; ++x) {
			var defaultTile = new AStarTile()
			defaultTile.mID = x + (y * size.mX);
			this.mMap.push(defaultTile);
		}
	}
}

AStar.prototype.FindPath = function(startID, endID) {
	var exit = false;
	var pathEnd = false;
	var closedList = new Array();
	var openList = new Array();
	openList.push(startID);
	
	while (exit == false) {
		var lowestID = 0;
		for (var i = 0; i < openList.length; ++i) {
			if (this.mMap[openList[i]].mG + this.mMap[openList[i]].mH <
					this.mMap[openList[lowestID]].mG + this.mMap[openList[lowestID]].mH) {
				
				lowestID = i;
			}
		}
		
		var thisID = openList[lowestID];
		closedList.push(thisID);
		openList.splice(lowestID, 1);
		
		if (thisID == endID) {
			exit = true;
			pathEnd = true;
		}
		else {
			// check tile to the left
			// check if there is a tile to the left (boundary check)
			if (thisID % this.mMapSize.mX > 0) {
				var adjID = thisID - 1;
				var valid = true;
				
				// check if the tile is traversable
				if (this.mMap[adjID].mValid == true) {
					// check if the tile is already on the closed list
					for (var i = 0; i < closedList.length; ++i) {
						if (adjID == closedList[i]) {
							valid = false; // not valid, ignore
							break;
						}
					}
				}
				else { // otherwise not valid, ignore
					valid = false;
				}
				
				// if tile is valid
				if (valid == true) {
					var inOpen = false;
					
					// check if it isalready on the open list
					for (var i = 0; i < openList.length; ++i) {
						if (adjID == openList[i]) {
							inOpen = true;
							break;
						}
					}
					
					// if it isn't
					if (inOpen == false) {
						openList.push(adjID);
						this.mMap[adjID].mID = adjID;
						this.mMap[adjID].mParent = thisID;
						this.mMap[adjID].mG = this.mMap[thisID].mG + 1;
						
						var thisPos = this.IDToPos(adjID);
						var targetPos = this.IDToPos(endID);
						
						this.mMap[adjID].mH = Math.abs(thisPos.mX - targetPos.mX) + Math.abs(thisPos.mY - targetPos.mY);
					}
					else { // otherwise check if this is a shorter path
						if (this.mMap[thisID].mG + 1 < this.mMap[adjID].mG) {
							this.mMap[adjID].mParent = thisID;
							this.mMap[adjID].mG = this.mMap[thisID].mG + 1;
						}
					}
				}
			}
			
			// check tile to the right
			if (thisID % this.mMapSize.mX < this.mMapSize.mX - 1) {
				var adjID = thisID + 1;
				var valid = true;
				if (this.mMap[adjID].mValid == true) {
					for (var i = 0; i < closedList.length; ++i) {
						if (adjID == closedList[i]) {
							valid = false;
							break;
						}
					}
				}
				else {
					valid = false;
				}
				
				if (valid == true) {
					var inOpen = false;
					for (var i = 0; i < openList.length; ++i) {
						if (adjID == openList[i]) {
							inOpen = true;
							break;
						}
					}
					
					if (inOpen == false) {
						openList.push(adjID);
						this.mMap[adjID].mID = adjID;
						this.mMap[adjID].mParent = thisID;
						this.mMap[adjID].mG = this.mMap[thisID].mG + 1;
						
						var thisPos = this.IDToPos(adjID);
						var targetPos = this.IDToPos(endID);
						
						this.mMap[adjID].mH = Math.abs(thisPos.mX - targetPos.mX) + Math.abs(thisPos.mY - targetPos.mY);
					}
					else {
						if (this.mMap[thisID].mG + 1 < this.mMap[adjID].mG) {
							this.mMap[adjID].mParent = thisID;
							this.mMap[adjID].mG = this.mMap[thisID].mG + 1;
						}
					}
				}
			}
			
			// check tile above
			if (Math.floor(thisID / this.mMapSize.mX) > 0) {
				var adjID = thisID - this.mMapSize.mX;
				var valid = true;
				if (this.mMap[adjID].mValid == true) {
					for (var i = 0; i < closedList.length; ++i) {
						if (adjID == closedList[i]) {
							valid = false;
							break;
						}
					}
				}
				else {
					valid = false;
				}
				
				if (valid == true) {
					var inOpen = false;
					for (var i = 0; i < openList.length; ++i) {
						if (adjID == openList[i]) {
							inOpen = true;
							break;
						}
					}
					
					if (inOpen == false) {
						openList.push(adjID);
						this.mMap[adjID].mID = adjID;
						this.mMap[adjID].mParent = thisID;
						this.mMap[adjID].mG = this.mMap[thisID].mG + 1;
						
						var thisPos = this.IDToPos(adjID);
						var targetPos = this.IDToPos(endID);
						
						this.mMap[adjID].mH = Math.abs(thisPos.mX - targetPos.mX) + Math.abs(thisPos.mY - targetPos.mY);
					}
					else {
						if (this.mMap[thisID].mG + 1 < this.mMap[adjID].mG) {
							this.mMap[adjID].mParent = thisID;
							this.mMap[adjID].mG = this.mMap[thisID].mG + 1;
						}
					}
				}
			}
			
			// check tile below
			if (Math.floor(thisID / this.mMapSize.mX) < this.mMapSize.mY - 1) {
				var adjID = thisID + this.mMapSize.mX;
				var valid = true;
				if (this.mMap[adjID].mValid == true) {
					for (var i = 0; i < closedList.length; ++i) {
						if (adjID == closedList[i]) {
							valid = false;
							break;
						}
					}
				}
				else {
					valid = false;
				}
				
				if (valid == true) {
					var inOpen = false;
					for (var i = 0; i < openList.length; ++i) {
						if (adjID == openList[i]) {
							inOpen = true;
							break;
						}
					}
					
					if (inOpen == false) {
						openList.push(adjID);
						this.mMap[adjID].mID = adjID;
						this.mMap[adjID].mParent = thisID;
						this.mMap[adjID].mG = this.mMap[thisID].mG + 1;
						
						var thisPos = this.IDToPos(adjID);
						var targetPos = this.IDToPos(endID);
						
						this.mMap[adjID].mH = Math.abs(thisPos.mX - targetPos.mX) + Math.abs(thisPos.mY - targetPos.mY);
					}
					else {
						if (this.mMap[thisID].mG + 1 < this.mMap[adjID].mG) {
							this.mMap[adjID].mParent = thisID;
							this.mMap[adjID].mG = this.mMap[thisID].mG + 1;
						}
					}
				}
			}
			
			if (openList.length == 0) {
				exit = true;
			}
		}
	}
	
	exit = false;
	var path = new Array();
	var prev = 0;
	
	if (pathEnd == true) {
		path.push(endID);
		prev = endID;
	}
	else {
		var arbitID = 0;
		var currDist = -1;
		
		var endPos = new IVec2(0, 0);
		endPos.Copy(this.IDToPos(endID));
		
		for (var i = 0; i < closedList.length; ++i) {
			var thisPos = new IVec2(0, 0);
			thisPos.Copy(this.IDToPos(closedList[i]));
			
			var dist = Math.abs(thisPos.mX - endPos.mX) + Math.abs(thisPos.mY - endPos.mY);
			if (dist < currDist || currDist < 0) {
				currDist = dist;
				arbitID = closedList[i];
			}
			else if (dist == currDist) {
				if (thisPos.mY > this.IDToPos(arbitID).mY) {
					currDist = dist;
					arbitID = closedList[i];
				}
			}
		}
		
		path.push(arbitID);
		prev = arbitID;
	}
	
	while (exit == false) {
		if (this.mMap[prev].mParent >= 0) {
			path.push(this.mMap[prev].mParent);
			prev = this.mMap[prev].mParent;
		}
		else {
			exit = true;
		}
	}
	
	return path;
}

AStar.prototype.IDToPos = function(id) {
	var pos = new IVec2(0, 0);
	pos.mY = Math.floor(id / this.mMapSize.mX);
	pos.mX = id - (this.mMapSize.mX * pos.mY);
	
	return pos;
}

AStar.prototype.PosToID = function(pos) {
	var id = pos.mX + (this.mMapSize.mX * pos.mY);
	return id;
}
// ...End


// enums...
var nkeyboard = {
	key : {
		code : {
			a		: 65,
			A		: 65,
			b		: 66,
			B		: 66,
			c		: 67,
			C		: 67,
			d		: 68,
			D		: 68,
			e		: 69,
			E		: 69,
			f		: 70,
			F		: 70,
			g		: 71,
			G		: 71,
			h		: 72,
			H		: 72,
			i		: 73,
			I		: 73,
			j		: 74,
			J		: 74,
			k		: 75,
			K		: 75,
			l		: 76,
			L		: 76,
			m		: 77,
			M		: 77,
			n		: 78,
			N		: 78,
			o		: 79,
			O		: 79,
			p		: 80,
			P		: 80,
			q		: 81,
			Q		: 81,
			r		: 82,
			R		: 82,
			s		: 83,
			S		: 83,
			t		: 84,
			T		: 84,
			u		: 85,
			U		: 85,
			v		: 86,
			V		: 86,
			w		: 87,
			W		: 87,
			x		: 88,
			X		: 88,
			y		: 89,
			Y		: 89,
			z		: 90,
			Z		: 90,
			
			num0	: 48,
			num1	: 49,
			num2	: 50,
			num3	: 51,
			num4	: 52,
			num5	: 53,
			num6	: 54,
			num7	: 55,
			num8	: 56,
			num9	: 57,
			
			left 	: 37,
			up 		: 38,
			right 	: 39,
			down 	: 40,
			
			backspace: 8
		}
	}
};

var nmouse = {
	button : {
		code : {
			left 	: 0,
			middle 	: 1,
			down 	: 2
		}
	}
};
// ...End


// input callbacks...
// register our call back to handle key down (and pressed)
document.onkeydown = function(e) {
	nmgrs.inputMan.HandleKeyDown(e);
}

// register our call back to handle key up (and released)
document.onkeyup = function(e) {
	nmgrs.inputMan.HandleKeyUp(e);
}

document.onkeypress = function(e) {
	nmgrs.inputMan.HandleKeyPress(e);
}

// register our call back to handle mouse movement
document.onmousemove = function(e) {
	nmgrs.inputMan.HandleMouseMove(e);
}

// register our call back to handle button down (and pressed)
document.onmousedown = function(e) {
	nmgrs.inputMan.HandleMouseDown(e);
}

// register our call back to handle button up (and released)
document.onmouseup = function(e) {
	nmgrs.inputMan.HandleMouseUp(e);
}
// ...End

// InputManager Class...
// handles user input (kayboard and mouse)
function InputManager() {
	// the state of each key (up to 255)
	this.mKeyStates = new Array();
	for (var i = 0; i < 255; ++i) {
		this.mKeyStates[i] = 0;
	}
	
	// the state of each mouse button (left, right and middle)
	this.mButtonStates = new Array();
	for (var i = 0; i < 3; ++i) {
		this.mButtonStates[i] = 0;
	}
	
	this.mLocalMouseCoords = new IVec2(0, 0); // coordinates of the mouse in the canvas
	this.mGlobalMouseCoords = new IVec2(0, 0); // coordinates of the mouse in the page
	
	this.mTextInput = "";
}

// process the input manager (update key and button states)
InputManager.prototype.Process = function() {
	// update all key states
	for (var i = 0; i < 255; ++i) {
		if (this.mKeyStates[i] == 2) { // if key was pressed last frame
			this.mKeyStates[i] = 1; // it is now down
		}
		else if (this.mKeyStates[i] == 3) { // if key was released last frame
			this.mKeyStates[i] = 0; // it is now up
		}
	}
	
	// update all button states
	for (var i = 0; i < 3; ++i) {
		if (this.mButtonStates[i] == 2) { // if button was pressed last frame
			this.mButtonStates[i] = 1; // it is now down
		}
		else if (this.mButtonStates[i] == 3) { // if button was released last frame
			this.mButtonStates[i] = 0; // it is now up
		}
	}
	
	this.mTextInput = "";
}

// handle key down
InputManager.prototype.HandleKeyDown = function(e) {
	// if key was previously up
	if (this.mKeyStates[e.keyCode] == 0) {
		this.mKeyStates[e.keyCode] = 2; // key is now pressed (note: not down)
	}
	
	if (e.keyCode == 8) {
		e.preventDefault();
	}
}

InputManager.prototype.HandleKeyPress = function(e) {
	if ((e.which >= 32 && e.which <= 126) || (e.which == 163)  || (e.which == 172)) {
		if (e.ctrlKey == false && e.altKey == false) {
			this.mTextInput += String.fromCharCode(e.which);
		}
	}
}

// handle key up
InputManager.prototype.HandleKeyUp = function(e) {
	// if key was previously down
	if (this.mKeyStates[e.keyCode] == 1) {
		this.mKeyStates[e.keyCode] = 3; // key is now released (note: not up)
	}
}

// handle mouse movement
InputManager.prototype.HandleMouseMove = function(e) {
	{
		// get the local coordinates using the canvases position on the page
		this.mLocalMouseCoords.mX = e.pageX - nmain.game.mCanvasPos.mX;
		this.mLocalMouseCoords.mY = e.pageY - nmain.game.mCanvasPos.mY;
		
		// if mouse x is off the canvas then set it to the bounds
		if (this.mLocalMouseCoords.mX < 0) {
			this.mLocalMouseCoords.mX = 0;
		}
		else if (this.mLocalMouseCoords.mX > nmain.game.mCanvasSize.mX) {
			this.mLocalMouseCoords.mX = nmain.game.mCanvasSize.mX;
		}
		
		
		// if mouse y is off the canvas then set it to the bounds
		if (this.mLocalMouseCoords.mY < 0) {
			this.mLocalMouseCoords.mY = 0;
		}
		else if (this.mLocalMouseCoords.mY > nmain.game.mCanvasSize.mY) {
			this.mLocalMouseCoords.mY = nmain.game.mCanvasSize.mY;
		}
	}
	
	// set the global coordinates to mouses position on the page
	this.mGlobalMouseCoords.mX = e.pageX;
	this.mGlobalMouseCoords.mY = e.pageY;
}

// handle button down
InputManager.prototype.HandleMouseDown = function(e) {
	// if key was previously up
	if (this.mButtonStates[e.button] == 0) {
		this.mButtonStates[e.button] = 2; // key is now pressed (note: not down)
	}
}

// handle button up
InputManager.prototype.HandleMouseUp = function(e) {
	// if key was previously down
	if (this.mButtonStates[e.button] == 1) {
		this.mButtonStates[e.button] = 3; // key is now released (note: not up)
	}
}

// returns true if key is down (including pressed); if returning false then you can assume up or released (not down)
InputManager.prototype.GetKeyboardDown = function(key) {
	// if key is valid
	if (key >= 0 && key <= 255) {
		// if key state is down or pressed
		if (this.mKeyStates[key] == 1 || this.mKeyStates[key] == 2) {
			return true;
		}
	}
	
	return false;
}

// returns true if a key was pressed since last frame (for 1 frame only)
InputManager.prototype.GetKeyboardPressed = function(key) {
	// if key is valid
	if (key >= 0 && key <= 255) {
		// if key state is pressed
		if (this.mKeyStates[key] == 2) {
			return true;
		}
	}
	
	return false;
}

// returns true if a key was released since last frame (for 1 frame only)
InputManager.prototype.GetKeyboardReleased = function(key) {
	// if key is valid
	if (key >= 0 && key <= 255) {
		// if key state is released
		if (this.mKeyStates[key] == 3) {
			return true;
		}
	}
	
	return false;
}

// returns the coordinates of the mouse on the canvas
InputManager.prototype.GetLocalMouseCoords = function() {
	var ret = new IVec2();
	ret.Copy(this.mLocalMouseCoords); // get a copy of the local coordinates (copy constructor)
	return ret;
}

// returns the coordinates of the mouse on the page
InputManager.prototype.GetGlobalMouseCoords = function() {
	var ret = new IVec2();
	ret.Copy(this.mGlobalMouseCoords); // get a copy of the global coordinates (copy constructor)
	return ret;
}

// returns true if button is down (including pressed); if returning false then you can assume up or released (not down)
InputManager.prototype.GetMouseDown = function(button) {
	// if button is valid
	if (button >= 0 && button <= 2) {
		// if button state is down or pressed
		if (this.mButtonStates[button] == 1 || this.mButtonStates[button] == 2) {
			return true;
		}
	}
	
	return false;
}

// returns true if a button was pressed since last frame (for 1 frame only)
InputManager.prototype.GetMousePressed = function(button) {
	// if button is valid
	if (button >= 0 && button <= 2) {
		// if button state is pressed
		if (this.mButtonStates[button] == 2) {
			return true;
		}
	}
	
	return false;
}

// returns true if a button was released since last frame (for 1 frame only)
InputManager.prototype.GetMouseReleased = function(button) {
	// if button is valid
	if (button >= 0 && button <= 2) {
		// if button state is released
		if (this.mButtonStates[button] == 3) {
			return true;
		}
	}
	
	return false;
}
// ...End


// SceneManager Class...
// handles the creation and destruction of scenes, changing between scenes and storing and restoring persistent scenes
function SceneManager() {
	this.mCurrScene = null; // our current scene
	this.mSceneStore = new Array(); // all of our stored (persistent) scenes
	
	this.mReadyScene = null; // the scene we will switch to set in ReadyScene()
	this.mIsSetUp = false;
}

// initialises the scene manager
SceneManager.prototype.SetUp = function() {
	
}

// cleans up the scene manager and all scenes currently stored
SceneManager.prototype.TearDown = function() {
	// for all currently stored scenes
	for (var i = 0; i < this.mSceneStore.length; ++i) {
		this.mSceneStore[i].TearDown(); // clean up
	}
	
	this.mSceneStore.splice(0, this.mSceneStore.length); // remove all scenes
	this.mCurrScene = null; // set current scene to null
}

// switches between scenes, handling any persistence
SceneManager.prototype.ChangeScene = function(newScene) {
	var found = false; // indicates if we have found a previously stored scene
	
	// if we have a current scene (i.e., this is not our initial scene change on game start up)
	if (this.mCurrScene != null) {
		// if this scene is to be persistent
		if (this.mCurrScene.Persistent() == true) {
			this.mSceneStore.push(this.mCurrScene); // store this scene
		}
		else {
			this.mCurrScene.TearDown(); // otherwise clean up and destroy this scene
		}
	}
	
	// for all currently stored (persistent) scenes
	for (var i = 0; i < this.mSceneStore.length; ++i) {
		// if we find a match
		if (this.mSceneStore[i].Type() == newScene.Type()) {
			this.mCurrScene = this.mSceneStore[i]; // restore the stored scene as our current scene
			this.mSceneStore.splice(i, i + 1); // remove it from the store
			found = true; // indicate we have found a persistent scene to restore
			break;
		}
	}
	
	// if we didn't find a scene to restore
	if (found == false) {
		this.mCurrScene = newScene; // create a new scene
		this.mCurrScene.SetUp(); // initialise our new scene
	}
}

// returns the current scene
SceneManager.prototype.GetCurrentScene = function() {
	return this.mCurrScene;
}

// adds a new scene to the scene manager but doesn't yet switch which allows interaction betweens scenes
SceneManager.prototype.ReadyScene = function(newScene) {
	// this.mReadyScene = newScene;
	var found = false; // indicates if we have found a previously stored scene
	
	// for all currently stored (persistent) scenes
	for (var i = 0; i < this.mSceneStore.length; ++i) {
		// if we find a match
		if (this.mSceneStore[i].Type() == newScene.Type()) {
			this.mReadyScene = this.mSceneStore[i]; // restore the stored scene as our ready (next) scene
			this.mSceneStore.splice(i, i + 1); // remove it from the store
			this.mIsSetUp = true;
			found = true; // indicate we have found a persistent scene to restore
			break;
		}
	}
	
	// if we didn't find a scene to restore
	if (found == false) {
		this.mReadyScene = newScene; // create a new scene
		this.mIsSetUp = false;
	}
}

// 
SceneManager.prototype.SwitchScene = function() {
	if (this.mReadyScene != null) {
		// if we have a current scene (i.e., this is not our initial scene change on game start up)
		if (this.mCurrScene != null) {
			// if this scene is to be persistent
			if (this.mCurrScene.Persistent() == true) {
				this.mSceneStore.push(this.mCurrScene); // store this scene
			}
			else {
				this.mCurrScene.TearDown(); // otherwise clean up and destroy this scene
			}
		}
		
		this.mCurrScene = this.mReadyScene;
		
		if (this.mIsSetUp == false) {
			this.mCurrScene.SetUp();
		}
		
		this.mReadyScene = null;
	}
}
// ...End


// ResourceSort function
// sorts *Resource objects based on the resource name
function ResourceSort(first, second) {
	var result = 0;
	if (second.mResName < first.mResName) {
		result = 1;
	}
	else if (first.mResName < second.mResName) {
		result = -1;
	}
	
	return result;
};
// ...End

// Resource Class...
// holds a resource and an associated name
function Resource(resource, resourceName) {
	this.mRes = resource; // our resource data
	this.mResName = resourceName; // the id of our resource (string)
};
// ...End

// QueuedResource Class...
// holds a resource name and the location of the resource
function QueuedResource(resourceName, resourceLocation) {
	this.mResName = resourceName; // the id of our resource (string)
	this.mResLocation = resourceLocation; // the location of our resource on disk
};
// ...End


// ResourceStore Class...
// holds a specific type of resource and handles loading, retrieving and destruction
function ResourceStore() {
	this.mStore = new Array(); // our stored resources
};

// creates a resource and adds it to our store, returning a handle to it
ResourceStore.prototype.AddResource = function(resource, resourceName) {
	// replace with a binary search; queue already sorted, use more efficient insert
	
	// for all our stored resources
	for (var i = 0; i < this.mStore.length; ++i) {
		// if we find a match to the one we are trying to add then error
		if (this.mStore[i].mResName == resourceName) {
			throw Exception("Resource already exists.");
		}
	}
	
	this.mStore.push(new Resource(resource, resourceName)); // add to the store
	this.mStore.sort(ResourceSort); // sort the store
	
	return this.GetResource(resourceName); // return our new resource
};

// removes a resource from the store, cleaning up after it
ResourceStore.prototype.RemoveResource = function(resourceName) {
	// replace with a binary search
	
	// for all our stored resources
	for (var i = 0; i < this.mStore.length; ++i) {
		// if we find a match to the one we are trying to remove
		if (this.mStore[i].mResName == resourceName) {
			this.mStore[i].TearDown(); // perform cleanup
			this.mStore.splice(i, i + 1); // remove it from the store
		}
	}
	
	// otherwise error
	throw Exception("Resource doesn't exist.");
};

// returns a handle to a stored resource if found
ResourceStore.prototype.GetResource = function(resourceName) {
	// replace with a binary search
	
	// for all our stored resources
	for (var i = 0; i < this.mStore.length; ++i) {
		// if we find a match to the one we are trying to retrieve
		if (this.mStore[i].mResName == resourceName) {
			return this.mStore[i].mRes; // return it
		}
	}
	
	// otherwise error
	throw Exception("Resource not found.");
};
// ...End


// ResourceStore Class...
// handles the loading of a batch of asynchronous resources such as images or sounds
function ResourceLoader() {
	this.mTexQueue = new Array(); // the queue of unprocessed textures
	this.mFontQueue = new Array(); // the queue of unprocessed fonts
	
	this.mWorking = false; // indicates if our resourceloader is currently working
	this.mIntervalID = null; // the handle of the interval that is checking the state of the resources
};

// adds a texture to the queue for future processing
ResourceLoader.prototype.QueueTexture = function(texName, texLocation) {
	// replace with a binary search; queue already sorted, use more efficient insert
	
	// if we are currently processing resources then error
	if (this.mWorking == true) {
		throw Exception("Resource loader already working.");
	}
	
	// for all textures in the queue
	for (var i = 0; i < this.mTexQueue.length; ++i) {
		// if we find a match to the one we are trying to add then error
		if (this.mTexQueue[i].mResName == texName) {
			throw Exception("Resource already exists.");
		}
	}
	
	this.mTexQueue.push(new QueuedResource(texName, texLocation)); // add to the queue
	this.mTexQueue.sort(ResourceSort); // sort the queue
}

// adds a font to the queue for future processing
ResourceLoader.prototype.QueueFont = function(fontName, fontLocation) {
	// replace with a binary search; queue already sorted, use more efficient insert
	
	// if we are currently processing resources then error
	if (this.mWorking == true) {
		throw Exception("Resource loader already working.");
	}
	
	// for all textures in the queue
	for (var i = 0; i < this.mFontQueue.length; ++i) {
		// if we find a match to the one we are trying to add then error
		if (this.mFontQueue[i].mResName == fontName) {
			throw Exception("Resource already exists.");
		}
	}
	
	this.mFontQueue.push(new QueuedResource(fontName, fontLocation)); // add to the queue
	this.mFontQueue.sort(ResourceSort); // sort the queue
}

// processes all resources currently in the queue
ResourceLoader.prototype.AcquireResources = function() {
	this.mWorking = true; // indicate we are currently working
	
	// for all textures in the queue
	for (var i = 0; i < this.mTexQueue.length; ++i) {
		// add texture to resource manager and load the associated image
		var tex = nmgrs.resMan.mTexStore.AddResource(new Texture(), this.mTexQueue[i].mResName);
		tex.LoadFromFile(this.mTexQueue[i].mResLocation);
	}
	
	// for all fonts in the queue
	for (var i = 0; i < this.mFontQueue.length; ++i) {
		// add font to resource manager and load the associated font file
		var font = nmgrs.resMan.mFontStore.AddResource(new Font(), this.mFontQueue[i].mResName);
		font.LoadFromFile(this.mFontQueue[i].mResName, this.mFontQueue[i].mResLocation);
	}
}

// periodically checks the progress of our resource loader
ResourceLoader.prototype.ProgressCheck = function() {
	// if we are currently working (otherwise no progress will be made)
	if (this.mWorking == true) {
		// for all textures in the queue
		for (var i = 0; i < this.mTexQueue.length; ++i) {
			// check if the texture has finished loading, whether or not it was successful
			var tex = nmgrs.resMan.mTexStore.GetResource(this.mTexQueue[i].mResName);
			if (tex.mImg.mLoaded == "load" || tex.mImg.mLoaded == "abort" || tex.mImg.mLoaded == "error") {
				if (tex.mImg.mLoaded == "abort" || tex.mImg.mLoaded == "error") {
					alert("Texture failed to load: " + tex.mImg.mLoaded);
				}
				
				this.mTexQueue.splice(i, 1); // remove the texture from the unprocessed queue
			}
		}
		
		// for all fonts in the queue
		for (var i = 0; i < this.mFontQueue.length; ++i) {
			// check if the font has finished loading, whether or not it was successful
			var font = nmgrs.resMan.mFontStore.GetResource(this.mFontQueue[i].mResName);
			font.CheckLoadStatus();
			if (font.mLoaded == "load" || font.mLoaded == "abort" || font.mLoaded == "error") {
				if (font.mLoaded == "abort" || font.mLoaded == "error") {
					alert("Font failed to load: " + font.mLoaded);
				}
				
				this.mFontQueue.splice(i, 1); // remove the font from the unprocessed queue
			}
		}
		
		// if our unprocessed queue is now empty
		if (this.mTexQueue.length == 0 && this.mFontQueue.length == 0) {
			this.mWorking = false; // we are finished working
			clearInterval(this.mIntervalID); // stop checking for progress
			this.mIntervalID = null; // clear interval handle
		}
	}
	else {
		// if called by an interval
		if (this.mIntervalID != null) {
			clearInterval(this.mIntervalID); // function called in error, stop future calls
			this.mIntervalID = null; // clear interval handle
		}
	}
}
// ...End


// ResourceManager Class...
// holds the resource stores for each individual resource type
function ResourceManager() {
	this.mTexStore = new ResourceStore(); // storage for our textures
	this.mFontStore = new ResourceStore(); // storage for our fonts
};
// ...End


// Texture Class...
// a texture (wrapper for javascript Image)
function Texture() {
	this.mImg = new Image(); // the image associated with our texture
	this.mImg.mLoaded = ""; // the load status of our image
	
	// called when the image successfully loads
	this.mImg.onload = function() {
		this.mLoaded = "load";
	}
	
	// called when the image loading is cancelled
	this.mImg.onabort = function() {
		this.mLoaded = "abort";
	}
	
	// called when the image fails to load
	this.mImg.onerror = function() {
		this.mLoaded = "error";
	}
};

// returns the type of this object for validity checking
Texture.prototype.Type = function() {
	return "Texture";
};

// loads a texture from a file
Texture.prototype.LoadFromFile = function(source) {
	this.mImg.mLoaded = ""; // reset our loading status to blank
	this.mImg.src = source; // attempt to load our image
}
// ...End


// Font Class...
// 
function Font() {
	this.mFontName = "";
	this.mLoaded = ""; // the load status of our font
	this.mFailTimer = new Timer();
};

// returns the type of this object for validity checking
Font.prototype.Type = function() {
	return "Font";
};

Font.prototype.LoadFromFile = function(fontName, fontFile) {
	this.mLoaded = "";
	this.mFailTimer.Reset();
	
	this.mFontName = fontName;
	var rule = "@font-face { font-family: " + fontName + "; src: url('" + fontFile + ".ttf'), url('" + fontFile + ".eot'); }";
	
	if (nmain.game.mStyleSheet.styleSheet) {
		nmain.game.mStyleSheet.styleSheet.cssText += rule;
	}
	else {
		nmain.game.mStyleSheet.appendChild(document.createTextNode(rule));
	}
}

Font.prototype.CheckLoadStatus = function() {
	var str = "This is the Test String!";
	var old = nmain.game.mCurrContext.font;
	
	nmain.game.mCurrContext.font = "256px Impact";
	var widthControl = nmain.game.mCurrContext.measureText(str).width;
	
	nmain.game.mCurrContext.font = "256px " + this.mFontName + ", Impact";
	var widthTest = nmain.game.mCurrContext.measureText(str).width;
	
	if (widthControl != widthTest) {
		this.mLoaded = "load";
	}
	
	nmain.game.mCurrContext.font = old;
	
	// timeout after 10 seconds
	if (this.mFailTimer.GetElapsedTime() > 10000) {
		this.mLoaded = "error";
	}
}
// ...End


// Text Class...
// renderable text
function Text() {
	this.mFont = null;
	this.mFontSize = 12;
	this.mFontString = "12px Arial";
	
	this.mString = "";
	this.mColour = "#FFFFFF";
	this.mShadowColour = "#000000";
	this.mDepth = 0;
	
	this.mPos = new IVec2(0, 0);
	this.mOutline = false;
	this.mShadow = false;
	this.mRotation = 0;
	
	this.mAlign = "left";
	
	this.mAbsolute = false;
};

// returns the type of this object for validity checking
Text.prototype.Type = function() {
	return "Text";
}

// make a copy of another (other) text (copy constructor)
Text.prototype.Copy = function(other) {
	this.mFont = other.mFont;
	this.mFontSize = other.mFontSize;
	this.mFontString = other.mFontString;
	
	this.mString = other.mString;
	this.mColour = other.mColour;
	this.mShadowColour = other.mShadowColour;
	this.mDepth = other.mDepth;
	
	this.mPos.Copy(other.mPos);
	this.mOutline = other.mOutline;
	this.mShadow = other.mShadow;
	this.mRotation = other.mRotation;
	
	this.mAlign = other.mAlign;
	
	this.mAbsolute = other.mAbsolute;
}

// return the width of the text
Text.prototype.GetWidth = function() {
	var longest = 0;
	if (this.mString.length > 0) {
		var old = nmain.game.mCurrContext.font;
		nmain.game.mCurrContext.font = this.mFontString;
		
		var txtArr = this.mString.split("\n");
		for (var i = 0; i < txtArr.length; ++i) {
			var strLen = nmain.game.mCurrContext.measureText(txtArr[i]).width;
			if (strLen > longest) {
				longest = strLen;
			}
		}
		
		nmain.game.mCurrContext.font = old;
	}
	
	return longest;
}

// return the height of the text
Text.prototype.GetHeight = function() {
	var txtArr = this.mString.split("\n");
	return this.mFontSize * txtArr.length;
}

// 
Text.prototype.SetFont = function(font) {
	this.mFont = font;
	this.mFontString = String(this.mFontSize) + "px " + this.mFont.mFontName;
}

// 
Text.prototype.SetFontSize = function(size) {
	this.mFontSize = size;
	this.mFontString = String(this.mFontSize) + "px " + this.mFont.mFontName;
}
// ...End


// Shape Class...
//
function Shape() {
	this.mDepth = 0;
	
	this.mColour = "#FFFFFF";
	this.mAlpha = 1.0;
	
	this.mPos = new IVec2(0, 0);
	this.mSize = new IVec2(0, 0);
	this.mOutline = false;
	this.mOrigin = new IVec2(0, 0);
	
	this.mPoints = new Array();
	this.mBounds = new Array();
	this.mBounds[0] = 0;
	this.mBounds[1] = 0;
	this.mBounds[2] = 0;
	this.mBounds[3] = 0;
	
	this.mAbsolute = false;
};

// returns the type of this object for validity checking
Shape.prototype.Type = function() {
	return "Shape";
}

// make a copy of another (other) shape (copy constructor)
Shape.prototype.Copy = function(other) {
	this.mDepth = other.mDepth;
	
	this.mColour = other.mColour;
	this.mAlpha = other.mAlpha;
	
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	this.mOutline = other.mOutline;
	this.mOrigin.Copy(other.mOrigin);
	
	this.mPoints.splice(0, this.mPoints.length);
	this.mPoints = this.mPoints.concat(other.mPoints);
	this.mBounds.splice(0, this.mBounds.length);
	this.mBounds = this.mBounds.concat(other.mBounds);
	
	this.mAbsolute = other.mAbsolute;
}

// 
Shape.prototype.Clear = function() {
	this.mPoints.splice(0, this.mPoints.length);
	this.mSize.Set(0, 0);
	for (var i = 0; i < this.mBounds.length; ++i) {
		this.mBounds[i] = 0;
	}
}

// 
Shape.prototype.AddPoint = function(point) {
	var pt = new IVec2();
	pt.Copy(point);
	this.mPoints.push(pt);
	
	if (this.mPoints.length == 1) {
		this.mBounds[0] = pt.mX;
		this.mBounds[1] = pt.mY;
		this.mBounds[2] = pt.mX;
		this.mBounds[3] = pt.mY;
	}
	
	// check left bound
	if (pt.mX < this.mBounds[0]) {
		this.mBounds[0] = pt.mX;
	}
	else if (pt.mX > this.mBounds[2]) { // right
		this.mBounds[2] = pt.mX;
	}
	
	// check top bound
	if (pt.mY < this.mBounds[1]) {
		this.mBounds[1] = pt.mY;
	}
	else if (pt.mY > this.mBounds[3]) { // bottom
		this.mBounds[3] = pt.mY;
	}
	
	this.mSize.Set(this.mBounds[2] - this.mBounds[0], this.mBounds[3] - this.mBounds[1]);
}

// 
Shape.prototype.GetPosition = function() {
	var pos = new IVec2();
	pos.Set(this.mPos.mX - this.mOrigin.mX, this.mPos.mY - this.mOrigin.mY);
	return pos;
}

//
Shape.prototype.GetWidth = function() {
	return this.mSize.mX;
}

//
Shape.prototype.GetHeight = function() {
	return this.mSize.mY;
}

Shape.prototype.GetPolygon = function() {
	var poly = new Array();
	poly.push(this.mPos);
	
	for (var i = 0; i < this.mPoints.length; ++i) {
		var x = this.mPoints[i].mX + this.mPos.mX;
		var y = this.mPoints[i].mY + this.mPos.mY;
		poly.push(new IVec2(x, y));
	}
	
	return poly;
}
// ...End


// Sprite Class...
// a sprite (representation of an image)
function Sprite() {
	this.mTex = null;
	this.mDepth = 0;
	
	this.mAlpha = 1.0;
	
	this.mPos = new IVec2(0, 0);
	this.mClipPos = new IVec2(0, 0);
	this.mClipSize = new IVec2(0, 0);
	this.mScale = new FVec2(1.0, 1.0);
	this.mOrigin = new IVec2(0, 0);
	this.mRotation = 0;
	
	this.mNumFrames = 0;
	this.mFramesPerLine = 0;
	this.mCurrFrame = 0;
	this.mStartFrame = 0;
	this.mEndFrame = 0;
	this.mAnimSpeed = 0;
	this.mIsAnimated = false;
	this.mNumLoops = 0;
	
	// this.mAnimTimer = new Timer();
	// this.mAnimTimer.Reset();
	
	this.mAnimIter = 0;
	
	this.mAbsolute = false;
};

// returns the type of this object for validity checking
Sprite.prototype.Type = function() {
	return "Sprite";
}

// make a copy of another (other) sprite (copy constructor)
Sprite.prototype.Copy = function(other) {
	this.mTex = other.mTex ;
	this.mDepth = other.mDepth;
	
	this.mAlpha = other.mAlpha;
	
	this.mPos.Copy(other.mPos);
	this.mClipPos.Copy(other.mClipPos);
	this.mClipSize.Copy(other.mClipSize);
	this.mScale.Copy(other.mScale);
	this.mOrigin.Copy(other.mOrigin);
	this.mRotation = other.mRotation;
	
	this.mNumFrames = other.mNumFrames;
	this.mFramesPerLine = other.mFramesPerLine;
	this.mCurrFrame = other.mCurrFrame;
	this.mStartFrame = other.mStartFrame;
	this.mEndFrame = other.mEndFrame;
	this.mAnimSpeed = other.mAnimSpeed;
	this.mIsAnimated = other.mIsAnimated;
	this.mNumLoops = other.mNumLoops;
	
	// this.mAnimTimer.Copy(other.mAnimTimer);
	
	this.mAnimIter = other.mAnimIter;
	
	this.mAbsolute = other.mAbsolute;
}

// process the sprite (for animation)
Sprite.prototype.Process = function() {
	if (this.mIsAnimated) {
		if (this.mAnimSpeed >= 0) {
			// if (this.mAnimTimer.GetElapsedTime() > this.mAnimSpeed) {
			// 	this.mAnimTimer.Reset();
			if (this.mAnimIter > this.mAnimSpeed) {
				this.mAnimIter = 0;
				this.mCurrFrame = (this.mCurrFrame + 1) % (this.mEndFrame + 1);
				if (this.mCurrFrame < this.mStartFrame) {
					this.mCurrFrame = this.mStartFrame;
				}
				
				if (this.mCurrFrame == this.mStartFrame && this.mNumLoops > 0) {
					this.mNumLoops -= 1;
				}
				
				if (this.mNumLoops == 0) {
					this.mAnimSpeed = -1;
					this.mCurrFrame = this.mEndFrame;
				}
				
				var rectX = (this.mCurrFrame % this.mFramesPerLine) * this.mClipSize.mX;
				var rectY = (Math.floor(this.mCurrFrame / this.mFramesPerLine)) * this.mClipSize.mY;
				var rectW = this.mClipSize.mX;
				var rectH = this.mClipSize.mY;
				
				this.SetClipRect(new IVec2(rectX, rectY), new IVec2(rectW, rectH));
			}
			
			this.mAnimIter += (1 / nmain.game.mFrameLimit);
		}
	}
}

// set the static texture
Sprite.prototype.SetTexture = function(texture) {
	this.mTex = texture;
	
	this.SetClipRect(new IVec2(0, 0), new IVec2(this.mTex.mImg.width, this.mTex.mImg.height));
	
	this.mNumFrames = 1;
	this.mFramesPerLine = 0;
	this.mCurrFrame = 0;
	this.mStartFrame = 0;
	this.mEndFrame = 0;
	this.mAnimSpeed = 0;
	this.mIsAnimated = false;
	this.mNumLoops = -1;
	
	this.mScale.mX = 1.0;
	this.mScale.mY = 1.0;
	
	// this.mAnimTimer.Reset();
	
	this.mAnimIter = 0;
}

// set the animated texture
Sprite.prototype.SetAnimatedTexture = function(texture, numFrames, framesPerLine, animSpeed, loops) {
	this.mTex = texture;
	
	this.SetClipRect(new IVec2(0, 0), new IVec2(this.mTex.mImg.width / framesPerLine,
			this.mTex.mImg.height / (Math.ceil(numFrames / framesPerLine))));
	
	this.mNumFrames = numFrames;
	this.mFramesPerLine = framesPerLine;
	this.mCurrFrame = 0;
	this.mStartFrame = 0;
	this.mEndFrame = numFrames - 1;
	this.mAnimSpeed = animSpeed;
	this.mIsAnimated = true;
	this.mNumLoops = -1;
	
	if (loops) {
		this.mNumLoops = loops;
	}
	
	this.mScale.mX = 1.0;
	this.mScale.mY = 1.0;
	
	// this.mAnimTimer.Reset();
	
	this.mAnimIter = 0;
}

// set the animated texture segment (start and end frames capped)
Sprite.prototype.SetAnimatedTextureSegment = function(texture, numFrames, framesPerLine, animSpeed, startFrame, endFrame, loops) {
	this.mTex = texture;
	
	this.SetClipRect(new IVec2(0, 0), new IVec2(this.mTex.mImg.width / framesPerLine,
			this.mTex.mImg.height / (Math.ceil(numFrames / framesPerLine))));
	
	this.mNumFrames = numFrames;
	this.mFramesPerLine = framesPerLine;
	this.mCurrFrame = startFrame;
	this.mStartFrame = startFrame;
	this.mEndFrame = endFrame;
	this.mAnimSpeed = animSpeed;
	this.mIsAnimated = true;
	this.mNumLoops = -1;
	
	if (loops) {
		this.mNumLoops = loops;
	}
	
	this.mScale.mX = 1.0;
	this.mScale.mY = 1.0;
	
	// this.mAnimTimer.Reset();
	
	this.mAnimIter = 0;
	
	var rectX = (this.mCurrFrame % this.mFramesPerLine) * this.mClipSize.mX;
	var rectY = (Math.floor(this.mCurrFrame / this.mFramesPerLine)) * this.mClipSize.mY;
	var rectW = this.mClipSize.mX;
	var rectH = this.mClipSize.mY;
	
	this.SetClipRect(new IVec2(rectX, rectY), new IVec2(rectW, rectH));
}

// set the clipping rectangle
Sprite.prototype.SetClipRect = function(pos, size) {
	this.mClipPos.mX = pos.mX;
	this.mClipPos.mY = pos.mY;
	
	this.mClipSize.mX = size.mX;
	this.mClipSize.mY = size.mY;
}

// set the current frame
Sprite.prototype.SetCurrentFrame = function(frame) {
	if (this.mIsAnimated) {
		// this.mAnimTimer.Reset();
		this.mAnimIter = 0;
		
		this.mCurrFrame = frame % (this.mEndFrame + 1);
		if (this.mCurrFrame < this.mStartFrame) {
			this.mCurrFrame = this.mStartFrame;
		}
		
		var rectX = (this.mCurrFrame % this.mFramesPerLine) * this.mClipSize.mX;
		var rectY = (Math.floor(this.mCurrFrame / this.mFramesPerLine)) * this.mClipSize.mY;
		var rectW = this.mClipSize.mX;
		var rectH = this.mClipSize.mY;
		
		this.SetClipRect(new IVec2(rectX, rectY), new IVec2(rectW, rectH));
	}
}

// set the position of sprite
Sprite.prototype.GetPosition = function() {
	var iv = new IVec2(0, 0);
	iv.mX = this.mPos.mX - this.mOrigin.mX; iv.mY = this.mPos.mY - this.mOrigin.mY;
	
	return iv;
}

//
Sprite.prototype.GetWidth = function() {
	var w = this.mTex.mImg.width;
	
	if (this.mIsAnimated == true) {
		w = this.mClipSize.mX;
	}
	
	return w;
}

//
Sprite.prototype.GetHeight = function() {
	var h = this.mTex.mImg.height;
	
	if (this.mIsAnimated == true) {
		h = this.mClipSize.mY;
	}
	
	return h;
}
// ...End


// RenderData Class...
// 
function RenderData() {
	this.mImageData = null;
	
	this.mDepth = 0;
	
	this.mPos = new IVec2(0, 0);
	this.mSize = new IVec2(0, 0);
	this.mRotation = 0;
	
	this.mAbsolute = false;
};

// returns the type of this object for validity checking
RenderData.prototype.Type = function() {
	return "RenderData";
}

// make a copy of another (other) renderdata (copy constructor)
RenderData.prototype.Copy = function(other) {
	this.mImageData = other.mImageData;
	this.mDepth = other.mDepth;
	
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	this.mRotation = other.mRotation;
	
	this.mAbsolute = other.mAbsolute;
}

// return the width of the render data
RenderData.prototype.GetWidth = function() {
	return this.mSize.mX;
}

// return the height of the render data
RenderData.prototype.GetHeight = function() {
	return this.mSize.mY;
}

RenderData.prototype.CreateFromArray = function(size, data) {
	this.mSize.Copy(size);
	
	this.mImageData = nmain.game.mCurrContext.createImageData(this.GetWidth(), this.GetHeight());
	for (var i = 0; i < data.length; ++i) {
		this.mImageData.data[i] = data[i];
	}
}

RenderData.prototype.CreateFromScreen = function(screen, pos, size) {
	this.mSize.Copy(size);
	
	this.mImageData = screen.getImageData(pos.mX, pos.mX, this.mSize.mX, this.mSize.mY);
}
// ..End


// RenderCanvas Class...
// a renderable canvas (like an image)
function RenderCanvas() {
	this.mCanvas = document.createElement('canvas');
	this.mCanvas.width = 0; this.mCanvas.height = 0;
	this.mContext = this.mCanvas.getContext("2d");
	
	this.mDepth = 0;
	
	this.mAlpha = 1.0;
	
	this.mPos = new IVec2(0, 0);
	this.mSize = new IVec2(0, 0);
	this.mRotation = 0;
	
	this.mAbsolute = false;
};

// returns the type of this object for validity checking
RenderCanvas.prototype.Type = function() {
	return "RenderCanvas";
}

// make a copy of another (other) rendercanvas (copy constructor)
RenderCanvas.prototype.Copy = function(other) {
	this.Clear();
	this.SetDimensions(other.mSize);
	this.mContext.drawImage(other.mCanvas, 0, 0);
	
	this.mDepth = other.mDepth;
	
	this.mAlpha = other.mAlpha;
	
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	this.mRotation = other.mRotation;
	
	this.mAbsolute = other.mAbsolute;
}

RenderCanvas.prototype.RenderTo = function(renderable) {
	var batch = new RenderBatch();
	batch.Clear();
	
	batch.Add(renderable);
	
	batch.Render(null, this.mContext);
}

RenderCanvas.prototype.Clear = function() {
	this.mContext.setTransform(1, 0, 0, 1, 0, 0);
	this.mContext.clearRect(0, 0, this.mSize.mX, this.mSize.mY);
}

RenderCanvas.prototype.SetDimensions = function(size) {
	this.mSize.Copy(size);
	
	this.mCanvas.width = this.mSize.mX; this.mCanvas.height = this.mSize.mY;
}

RenderCanvas.prototype.GetWidth = function() {
	return this.mSize.mX;
}

RenderCanvas.prototype.GetHeight = function() {
	return this.mSize.mY;
}
// ...End


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
			
			if (intersect == true) {
				targ.font = txt.mFontString;
				targ.strokeStyle = txt.mColour;
				
				targ.translate(txt.mPos.mX, txt.mPos.mY + txt.mFontSize);
				targ.rotate(txt.mRotation * (Math.PI / 180));
				
				if (txt.mOutline == true) {
					for (var j = 0; j < txtArr.length; ++j) {
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
				else {
					for (var j = 0; j < txtArr.length; ++j) {
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
		else if (this.mRenderData[i].Type() == "Shape") {
			var shp = this.mRenderData[i];
			var pos = shp.GetPosition();
			
			var shpTL = new IVec2(shp.mPos.mX + shp.mBounds[0], shp.mPos.mY + shp.mBounds[1]);
			var shpBR = new IVec2(shp.mPos.mX + shp.mBounds[2], shp.mPos.mY + shp.mBounds[3]);
			
			var intersect = false;
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
			
			if (intersect == true) {
				targ.fillStyle = shp.mColour;
				targ.strokeStyle = shp.mColour;
				var oldAlpha = targ.globalAlpha;
				targ.globalAlpha = shp.mAlpha;
				
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
			}
		}
		else if (this.mRenderData[i].Type() == "RenderData") {
			var renData = this.mRenderData[i];
			
			var idTL = new IVec2(renData.mPos.mX, renData.mPos.mY);
			var idBR = new IVec2(renData.mPos.mX + renData.GetWidth(), renData.mPos.mY + renData.GetHeight());
			
			var intersect = false;
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

GUIButton.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	
	this.mStatus = other.mStatus
	this.mSpriteIdle.Copy(other.mSpriteIdle);
	this.mSpriteHover.Copy(other.mSpriteHover);
	this.mSpriteDown.Copy(other.mSpriteDown);
	this.mSpriteInactive.Copy(other.mSpriteInactive);
	
	this.mActive = other.mActive;
	this.mHover = other.mHover;
	this.mDown = other.mDown;
	this.mWasClicked = other.mWasClicked;
}

GUIButton.prototype.SetUp = function(pos, size, depth) {
	this.mPos.Copy(pos);
	this.mSize.Copy(size);
	
	this.mSpriteIdle.mPos.Copy(pos);
	this.mSpriteIdle.mDepth = depth;
	this.mSpriteIdle.mAbsolute = true;
	
	this.mSpriteHover.mPos.Copy(pos);
	this.mSpriteHover.mDepth = depth;
	this.mSpriteHover.mAbsolute = true;
	
	this.mSpriteDown.mPos.Copy(pos);
	this.mSpriteDown.mDepth = depth;
	this.mSpriteDown.mAbsolute = true;
	
	this.mSpriteInactive.mPos.Copy(pos);
	this.mSpriteInactive.mDepth = depth;
	this.mSpriteInactive.mAbsolute = true;
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
		tl.mX += 2; tl.mY +=  2;
		
		var br = new IVec2(0, 0); br.Copy(this.mPos);
		br.mX += this.mSize.mX + 3; br.mY += this.mSize.mY + 3;
		
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

GUIButton.prototype.OnClick = function() {
	if (this.mWasClicked == true) {
		this.mWasClicked = false;
		return true;
	}
	
	return false;
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


// GUIDropDown Class...
function GUIDropDown() {
	this.mPos = new IVec2(0, 0);
	this.mBase = new GUIButton();
	
	this.mItems = new Array();
	this.mItemsText = new Array();
	
	this.mExpanded = false;
	
	this.mHover = false;
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
	
	{
		this.mHover = false;
		
		if (this.mBase.mHover == true) {
			this.mHover = true;
		}
		else {
			if (this.mExpanded == true) {
				for (var i = 0; i < this.mItems.length; ++i) {
					if (this.mItems[i].mHover == true) {
						this.mHover = true;
						break;
					}
				}
			}
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
	var posDif = new IVec2(0, 0);
	posDif.Copy(this.mBase.GetSpritePositions());
	posDif.Set(pos.mX - posDif.mX, pos.mY - posDif.mY);
	
	this.mBase.SetSpritePositions(pos);
	
	for (var i = 0; i < this.mItems.length; ++i) {
		{
			var newPos = new IVec2(0, 0);
			newPos.Copy(this.mItems[i].GetSpritePositions());
			newPos.mX += posDif.mX; newPos.mY += posDif.mY;
			this.mItems[i].SetSpritePositions(newPos);
		}
		
		{
			var newPos = new IVec2(0, 0);
			newPos.Copy(this.mItemsText[i].mPos);
			newPos.mX += posDif.mX; newPos.mY += posDif.mY;
			this.mItemsText[i].mPos.Copy(newPos);
		}
	}
}

GUIDropDown.prototype.SetSpriteDepths = function(depth) {
	this.mBase.SetSpriteDepths(depth);
	
	for (var i = 0; i < this.mItems.length; ++i) {
		this.mItems[i].SetSpriteDepths(depth);
	}
}

GUIDropDown.prototype.AddItem = function(itemButton, text) {
	var but = new GUIButton();
	but.Copy(itemButton);
	
	var txt = new Text();
	txt.Copy(text);
	txt.mAbsolute = true;
	
	var newPos = new IVec2(0, 0);
	
	if (this.mItems.length == 0) {
		newPos.Copy(this.mBase.mSpriteIdle.mPos);
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


// GUIInputBox Class...
function GUIInputBoxCaret() {
	this.mShape = new Shape();
	
	this.mFlash = 0;
	this.mPlace = 0;
	this.mOldPlace = 0;
	
	this.mScroll = 0;
	this.mScrollTimer = 0;
	
	this.mLeftBound = 0;
	this.mRightBound = 0;
}

GUIInputBoxCaret.prototype.SetUp = function(pos, depth, leftBound, rightBound) {
	this.mShape.mPos.Copy(pos);
	this.mShape.mDepth = depth;
	this.mShape.mColour = "#000000";
	this.mShape.mAbsolute = true;
	
	this.mLeftBound = leftBound;
	this.mRightBound = rightBound;
}

GUIInputBoxCaret.prototype.Input = function(inputText) {
	if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.left)) {
		this.mPlace--;
		if (this.mPlace < 0) {
			this.mPlace = 0;
		}
		
		this.mScroll = -1;
		this.mScrollTimer = 0;
		this.mFlash = 0;
	}
	else if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.right)) {
		this.mPlace++;
		if (this.mPlace > inputText.mString.length) {
			this.mPlace = inputText.mString.length;
		}
		
		this.mScroll = 1;
		this.mScrollTimer = 0;
		this.mFlash = 0;
	}
	else if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.left) == false &&
			nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.right) == false) {
		
		if (this.mScroll != 0) {
			this.mScroll = 0;
			this.mFlash = 0;
		}
	}
}

GUIInputBoxCaret.prototype.Process = function(inputText, renderCanvas) {
	// if we are scorlling with the arrow keys
	if (this.mScroll != 0) {
		// if scroll timer has elapse
		if (this.mScrollTimer > 0.5) {
			this.mPlace += this.mScroll; // move the caret's place in the text
			
			// check boundaries
			if (this.mPlace < 0) {
				this.mPlace = 0;
			}
			else if (this.mPlace > inputText.mString.length) {
				this.mPlace = inputText.mString.length;
			}
			
			this.mScrollTimer = 0.48; // lower scroll timer (partially reset)
		}
		else {
			this.mScrollTimer += 1 / nmain.game.mFrameLimit; // increment the timer
		}
	}
	else {
		// process the caret flash timer (caret doesn't flash when moving)
		if (this.mFlash > 2) {
			this.mFlash = 0;
		}
		else {
			this.mFlash += 2 / nmain.game.mFrameLimit;
		}
	}
	
	// if caret's position in text has been moved
	if (this.mPlace != this.mOldPlace) {
		// create a new text object, copy our input text and then create a substring
		var txt = new Text();
		txt.Copy(inputText);
		txt.mString = inputText.mString.substr(0, this.mPlace);
		
		this.mShape.mPos.mX = inputText.mPos.mX + renderCanvas.mPos.mX + txt.GetWidth() - 1; // move the caret's position on canvas
		
		// if the caret is past the left bound
		if (this.mShape.mPos.mX > this.mRightBound) {
			var diff = this.mShape.mPos.mX - this.mRightBound; // find out how much past it is
			
			// move the text and caret's position on canvas
			inputText.mPos.mX -= diff;
			this.mShape.mPos.mX -= diff;
			
			// redraw the render canvase
			renderCanvas.Clear();
			renderCanvas.RenderTo(inputText);
		}
		else if (this.mShape.mPos.mX < this.mLeftBound - 1) { // otherwise if it is past the right bound
			var diff = (this.mLeftBound - 1) - this.mShape.mPos.mX;
			
			inputText.mPos.mX += diff;
			this.mShape.mPos.mX += diff;
			
			renderCanvas.Clear();
			renderCanvas.RenderTo(inputText);
		}
		
		this.mOldPlace = this.mPlace;
	}
}

GUIInputBoxCaret.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mFlash < 1) {
		arr.push(this.mShape);
	}
	
	return arr;
}

GUIInputBoxCaret.prototype.SetSize = function(size) {
	this.mShape.Clear();
	
	this.mShape.AddPoint(new IVec2(size.mX, 0));
	this.mShape.AddPoint(new IVec2(size.mX, size.mY));
	this.mShape.AddPoint(new IVec2(0, size.mY));
}
// ...End


// GUIInputBox Class...
function GUIInputBox() {
	this.mPos = new IVec2(0, 0);
	this.mSize = new IVec2(0, 0);
	this.mDepth = 0;
	
	this.mStatus = "idle";
	this.mSpriteIdle = new Sprite();
	this.mSpriteHover = new Sprite();
	this.mSpriteFocus = new Sprite();
	this.mSpriteInactive = new Sprite();
	
	this.mInputText = new Text();
	this.mBox = new GUIButton();
	this.mHasFocus = false;
	
	this.mCaret = new GUIInputBoxCaret();
	
	this.mBackspace = false;
	this.mBackspaceTimer = 0;
	
	this.mRenderCanvas = new RenderCanvas();
	this.mInputString = "";
	
	this.mActive = true;
	
	this.mMaxChars = -1;
	this.mValidInput = new Array();
	
	{
		this.mAlphaUpper = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
				"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ");
				
		this.mAlphaLower = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
				"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ");
				
		this.mNumbers = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
		
		this.mAlphaNumeric = new Array();
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mAlphaUpper);
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mAlphaLower);
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mNumbers);
		
		{
			var arr = new Array("¬", "!", '"', "£", "$", "%", "^", "&", "*", "(", ")", "_", "+",
					"`", "¦", "-", "=", "[", "{", "]", "}", ";", ":", "'", "@", "#", "~", "\\", "|",
					",", "<", ".", ">", "/", "?");
			
			this.mAlphaNumericPunctuation = new Array();
			this.mAlphaNumericPunctuation = this.mAlphaNumeric.concat(this.mAlphaNumeric);
			this.mAlphaNumericPunctuation = this.mAlphaNumeric.concat(arr);
		}
	}
};

GUIInputBox.prototype.SetUp = function(pos, size, depth, inputArr) {
	this.mPos.Copy(pos);
	this.mSize.Copy(size);
	this.mDepth = depth;
	
	this.mBox.SetUp(pos, size, depth);
	
	this.mRenderCanvas.mPos.mX += pos.mX;
	this.mRenderCanvas.mPos.mY += pos.mY;
	
	var dim = new IVec2(0, 0); dim.Copy(this.mRenderCanvas.mSize);
	dim.mY += size.mY;
	dim.mX += size.mX;
	this.mRenderCanvas.SetDimensions(dim);
	
	this.mRenderCanvas.mDepth = depth - 1;
	this.mRenderCanvas.mAbsolute = true;
	
	{
		this.mSpriteIdle.mPos.Copy(pos);
		this.mSpriteIdle.mDepth = depth;
		this.mSpriteIdle.mAbsolute = true;
		
		this.mSpriteHover.mPos.Copy(pos);
		this.mSpriteHover.mDepth = depth;
		this.mSpriteHover.mAbsolute = true;
		
		this.mSpriteFocus.mPos.Copy(pos);
		this.mSpriteFocus.mDepth = depth;
		this.mSpriteFocus.mAbsolute = true;
		
		this.mSpriteInactive.mPos.Copy(pos);
		this.mSpriteInactive.mDepth = depth;
		this.mSpriteInactive.mAbsolute = true;
	}
	
	{
		this.mCaret.SetUp(this.mRenderCanvas.mPos, depth - 2, this.mRenderCanvas.mPos.mX,
				this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX);
		this.mCaret.SetSize(new IVec2(1, size.mY - 10));
		this.mCaret.mShape.mColour = "#4A4A4A";
	}
	
	if (inputArr == null) {
		this.mValidInput = this.mValidInput.concat(this.mAlphaNumericPunctuation);
	}
	else {
		this.mValidInput = this.mValidInput.concat(inputArr);
	}
}

GUIInputBox.prototype.Input = function() {
	if (this.mHasFocus == true) {
		var inString = "";
		for (var i = 0; i < nmgrs.inputMan.mTextInput.length; ++i) {
			var charCheck = nmgrs.inputMan.mTextInput.charAt(i);
			for (var j = 0; j < this.mValidInput.length; ++j) {
				if (charCheck == this.mValidInput[j]) {
					inString += charCheck;
					break;
				}
			}
		}
		
		if (this.mMaxChars == -1 || (this.mInputText.mString.length + inString.length) <= this.mMaxChars) {
			this.mInputString += inString;
		}
		
		if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.backspace)) {
			this.mBackspace = true;
			this.mBackspaceTimer = 0;
			
			if (this.mInputText.mString.length > 0) {
				var newStr = this.mInputText.mString.substr(0, this.mCaret.mPlace - 1);
				newStr += this.mInputText.mString.substr(this.mCaret.mPlace,  this.mInputText.mString.length - this.mCaret.mPlace);
				
				this.mInputText.mString = newStr;
				this.mCaret.mPlace--;
				if (this.mCaret.mPlace < 0) {
					this.mCaret.mPlace = 0;
				}
				
				// if text is not currently filling the render canvas
				if ((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth() <
						this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) {
					
					// if text is wider and is able to fill the render canvas
					if (this.mInputText.GetWidth() >= this.mRenderCanvas.mSize.mX) {
						// move the text to ensure render canvas is filled
						var shift = (this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) -
								((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth());
						this.mInputText.mPos.mX += shift;
					}
				}
				
				this.mRenderCanvas.Clear();
				this.mRenderCanvas.RenderTo(this.mInputText);
			}
		}
		else if (nmgrs.inputMan.GetKeyboardReleased(nkeyboard.key.code.backspace)) {
			this.mBackspace = false;
		}
		
		this.mCaret.Input(this.mInputText);
	}
	
	this.mBox.Input();
	if (this.mHasFocus == true) {
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left)) {
			if (this.mBox.mHover == false) {
				this.mHasFocus = !this.mHasFocus;
			}
		}
	}
}

GUIInputBox.prototype.Process = function(point) {
	this.mBox.Process(point);
	
	if (this.mBox.OnClick() == true) {
		if (this.mHasFocus == false) {
			this.mHasFocus = true;
			this.mCaret.mFlash = 0;
		}
	}
	
	if (this.mBackspace == true) {
		if (this.mBackspaceTimer > 0.5) {
			var newStr = this.mInputText.mString.substr(0, this.mCaret.mPlace - 1);
			newStr += this.mInputText.mString.substr(this.mCaret.mPlace,  this.mInputText.mString.length - this.mCaret.mPlace);
			
			this.mInputText.mString = newStr;
			this.mCaret.mPlace--;
			if (this.mCaret.mPlace < 0) {
				this.mCaret.mPlace = 0;
			}
			
			this.mBackspaceTimer = 0.48;
			
			this.mRenderCanvas.Clear();
			this.mRenderCanvas.RenderTo(this.mInputText);
		}
		else {
			this.mBackspaceTimer += 1 / nmain.game.mFrameLimit;
		}
	}
	
	if (this.mInputString.length > 0) {
		var newStr = this.mInputText.mString.substr(0, this.mCaret.mPlace);
		newStr += this.mInputString;
		newStr += this.mInputText.mString.substr(this.mCaret.mPlace,  this.mInputText.mString.length - this.mCaret.mPlace);
		
		this.mInputText.mString = newStr;
		this.mCaret.mPlace += this.mInputString.length;
		this.mInputString = "";
		
		this.mRenderCanvas.Clear();
		this.mRenderCanvas.RenderTo(this.mInputText);
	}
	
	{
		this.mCaret.Process(this.mInputText, this.mRenderCanvas);
	}
	
	{
		if (this.mActive == true) {
			if (this.mHasFocus == false) {
				if (this.mBox.mHover == true) {
					this.mStatus = "hover";
				}
				else {
					this.mStatus = "idle";
				}
			}
			else {
				this.mStatus = "focus";
			}
		}
		
		if (this.mActive == true) {
			if (this.mStatus == "hover") {
				this.mSpriteHover.Process();
			}
			else if (this.mStatus == "focus") {
				this.mSpriteFocus.Process()
			}
			else {
				this.mSpriteIdle.Process()
			}
		}
		else {
			this.mSpriteInactive.Process()
		}
	}
}

GUIInputBox.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mRenderCanvas);
	
	if (this.mActive == true) {
		if (this.mStatus == "hover") {
			arr.push(this.mSpriteHover);
		}
		else if (this.mStatus == "focus") {
			arr.push(this.mSpriteFocus);
			
			arr = arr.concat(this.mCaret.GetRenderData());
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

GUIInputBox.prototype.GetSpritePositions = function() {
	return this.mSpriteIdle.mPos;
}

GUIInputBox.prototype.SetSpritePositions = function(pos) {
	var offset = new IVec2(0, 0);
	offset.mX = pos.mX - this.mSpriteIdle.mPos.mX;
	offset.mY = pos.mY - this.mSpriteIdle.mPos.mY;
	
	this.mSpriteIdle.mPos.Copy(pos);
	this.mSpriteHover.mPos.Copy(pos);
	this.mSpriteFocus.mPos.Copy(pos);
	this.mSpriteInactive.mPos.Copy(pos);
	
	this.mCaret.mShape.mPos.mX += offset.mX;
	this.mCaret.mShape.mPos.mY += offset.mY;
	this.mCaret.mLeftBound += offset.mX;
	this.mCaret.mRightBound += offset.mX;
	
	this.mRenderCanvas.mPos.mX += offset.mX;
	this.mRenderCanvas.mPos.mY += offset.mY;
}

GUIInputBox.prototype.SetSpriteDepths = function(depth) {
	this.mSpriteIdle.mDepth = depth;
	this.mSpriteHover.mDepth = depth;
	this.mSpriteFocus.mDepth = depth;
	this.mSpriteInactive.mDepth = depth;
	
	this.mCaret.mShape.mDepth = depth - 2;
	this.mRenderCanvas.mDepth = depth - 1;
}

GUIInputBox.prototype.SetText = function(string) {
	if (this.mInputText.mString.length > 0) {
		var len = string.length - this.mInputText.mString.length;
		
		this.mInputText.mString = string;
		this.mCaret.mPlace += len;
		if (this.mCaret.mPlace < 0) {
			this.mCaret.mPlace = 0;
		}
		
		// if text is not currently filling the render canvas
		if ((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth() <
				this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) {
			
			// if text is wider and is able to fill the render canvas
			if (this.mInputText.GetWidth() >= this.mRenderCanvas.mSize.mX) {
				// move the text to ensure render canvas is filled
				var shift = (this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) -
						((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth());
				this.mInputText.mPos.mX += shift;
			}
		}
		
		this.mRenderCanvas.Clear();
		this.mRenderCanvas.RenderTo(this.mInputText);
		
		this.mCaret.mOldPlace = this.mCaret.mPlace - 1; // force the caret to update it's position on the canvas
	}
}
// ...End


// RNG Class...
// a pseudo-random number generator
function RNG(seed) {
	this.mMers = new MersenneTwister(seed); // a reference to a mersenne twister (see mersenne-twister.js)
	this.mSeed = seed; // the current seed
};

// set the seed and seed the rng with it
RNG.prototype.SetSeed = function(seed) {
	this.mSeed = seed;
	this.mMers.init_genrand(seed);
};

// return the current seed
RNG.prototype.GetSeed = function() {
	return this.mSeed;
};

// get a random integer between lower and higher (inclusive)
RNG.prototype.GetRandInt = function(lower, higher) {
	return (this.mMers.genrand_int32() % ((higher + 1) - lower)) + lower;
};

// get a random float between lower and higher (inclusive) with precision (number of decimal places)
RNG.prototype.GetRandFloat = function(lower, higher, precision) {
	var l = lower * Math.pow(10, precision);
	var h = higher * Math.pow(10, precision);
	
	var f = this.GetRandInt(l, h);
	f /=  Math.pow(10.0, precision);
	return f;
};
// ...End


// Timer Class...
// a timer; keeps time
function Timer() {
	this.startTime = 0; // the time that this timer was started
	
	this.Reset(); // initially reset our timer
};

// resets the timer (sets it to the current time)
Timer.prototype.Reset = function() {
	var d = new Date();
	this.startTime = d.getTime(); // set the start time to the current time
};

// get the time that has passed since our last reset
Timer.prototype.GetElapsedTime = function() {
	var d = new Date();
	return d.getTime() - this.startTime; // return how much time has elapsed since last call to reset
};

// make a copy of another (other) timer (copy constructor)
Timer.prototype.Copy = function(other) {
	this.startTime = other.startTime;
}
// ...End


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


// InitScene Class...
// self contained parts of the game such as different screens, levels or game modes
function InitScene() {
	this.mPersist = false;
}

// returns the type of this object for validity checking
InitScene.prototype.Type = function() {
	return "InitScene";
};

// returns whether this scene is to persist or not (when changing to a new scene -- preserves state)
InitScene.prototype.Persistent = function() {
	return this.mPersist;
};

// initialises the scene object
InitScene.prototype.SetUp = function() {
	try {
		nmgrs.resLoad.QueueTexture("tileset_test", "./res/vis/tilesets/tileset_test.png");
		nmgrs.resLoad.QueueTexture("tileset_test2", "./res/vis/tilesets/tileset_test2.png");
		nmgrs.resLoad.QueueTexture("tileset_dirtwhole", "./res/vis/tilesets/tileset_dirtwhole.png");
		nmgrs.resLoad.QueueTexture("tileset_grasstop", "./res/vis/tilesets/tileset_grasstop.png");
		nmgrs.resLoad.QueueTexture("tileset_grasswhole", "./res/vis/tilesets/tileset_grasswhole.png");
		nmgrs.resLoad.QueueTexture("tileset_blue", "./res/vis/tilesets/tileset_blue.png");
		nmgrs.resLoad.QueueTexture("tileset_red", "./res/vis/tilesets/tileset_red.png");
		nmgrs.resLoad.QueueTexture("gridtile", "./res/vis/tilesets/gridtile.png");
		
		nmgrs.resLoad.QueueTexture("gui_map_compassmain", "./res/vis/gui/gui_map_compassmain.png");
		nmgrs.resLoad.QueueTexture("gui_map_compassextra", "./res/vis/gui/gui_map_compassextra.png");
		nmgrs.resLoad.QueueTexture("gui_map_zlevelmain", "./res/vis/gui/gui_map_zlevelmain.png");
		nmgrs.resLoad.QueueTexture("gui_map_zlevelextra", "./res/vis/gui/gui_map_zlevelextra.png");
		
		nmgrs.resLoad.QueueTexture("gui_creation_topbar", "./res/vis/gui/gui_creation_topbar.png");
		nmgrs.resLoad.QueueTexture("gui_creation_topmenunew", "./res/vis/gui/gui_creation_topmenunew.png");
		nmgrs.resLoad.QueueTexture("gui_creation_dropback", "./res/vis/gui/gui_creation_dropback.png");
		// nmgrs.resLoad.QueueTexture("gui_creation_inputbox", "./res/vis/gui/gui_creation_inputbox.png");
		nmgrs.resLoad.QueueTexture("gui_creation_arrows", "./res/vis/gui/gui_creation_arrows.png");
		nmgrs.resLoad.QueueTexture("gui_creation_texset", "./res/vis/gui/gui_creation_texset.png");
		nmgrs.resLoad.QueueTexture("gui_texselect", "./res/vis/gui/gui_texselect.png");
		
		{ // textures for creation "create new" dialogue box
			nmgrs.resLoad.QueueTexture("gui_creation_newdialogue_back", "./res/vis/gui/gui_creation_newdialogue_back.png");
			nmgrs.resLoad.QueueTexture("gui_creation_newdialogue_textinput", "./res/vis/gui/gui_creation_newdialogue_textinput.png");
			nmgrs.resLoad.QueueTexture("gui_creation_newdialogue_cancelbutton", "./res/vis/gui/gui_creation_newdialogue_cancelbutton.png");
			nmgrs.resLoad.QueueTexture("gui_creation_newdialogue_confirmbutton", "./res/vis/gui/gui_creation_newdialogue_confirmbutton.png");
		}
		
		nmgrs.resLoad.QueueTexture("menu_button", "./res/vis/gui/menu_button.png");
		
		{ // main game font
			nmgrs.resLoad.QueueFont("pixantiqua", "./res/sys/PixAntiqua");
		}
		
		nmgrs.resLoad.AcquireResources();
		nmgrs.resLoad.mIntervalID = setInterval(function() {nmgrs.resLoad.ProgressCheck();}, 0);
	} catch(e) {
		alert(e.What());
	}
}

// cleans up the scene object
InitScene.prototype.TearDown = function() {
	
}

// handles user input
InitScene.prototype.Input = function() {
	
}

// handles game logic
InitScene.prototype.Process = function() {
	if (nmgrs.resLoad.mWorking == false) {
		nmgrs.sceneMan.ChangeScene(new GFMenuScene());
	}
}

// handles all drawing tasks
InitScene.prototype.Render = function() {
	
}
// ...End


// window callbacks...
// register our call back to handle window resize
window.onresize = function(e) {
	nmain.game.HandleResize(e);
}
// ...End

// Game Class...
// a game object contains all the logic and data of our game
function Game() {
	this.mGameLoop = null; // handle to the setInterval that runs our loop code
	this.mFrameLimit = 60; // the maximum frames per second
	this.mAccum = 0.0; // the current frame time accumulator
	this.mTimer = new Timer(); // the timer that handles our main loop timing
	this.mClearColour = "#000000"; // the clear colour i.e., background colour of the canvas
	
	this.mDoubleBuffered = false;
	this.mCanvas = new Array(); // an array of our canvases 
	this.mContext = new Array(); // an array of contexts (buffers)
	this.mBufferIter = 0; // our current buffer (context)
	
	this.mCurrContext = null; // reference to current buffer (context)
	
	this.mCanvasPos = new IVec2(); // position of the canvas on the page
	this.mCanvasSize = new IVec2(); // dimensions of the canvas
	
	this.mFPSIter = 0;
	this.mFPSAccum = 0;
	this.mFPS = 0;
	
	this.mStyleSheet = document.createElement('style');
	this.mStyleSheet.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(this.mStyleSheet);
};

// initialises the game object
Game.prototype.SetUp = function() {
	// add front buffer context
	this.mCanvas.push(document.getElementById("frontbuffer"));
	this.mContext.push(this.mCanvas[0].getContext("2d"));
	
	// add back buffer context
	this.mCanvas.push(document.getElementById("backbuffer"));
	this.mContext.push(this.mCanvas[1].getContext("2d"));
	
	this.FindCanvasPosition();
	
	this.mCanvasSize.Set(this.mCanvas[0].width, this.mCanvas[0].height); // set dimensions of the canvas
	this.mCurrContext = this.mContext[this.mBufferIter]; // set reference to current buffer
	this.mCanvas[this.mBufferIter].style.visibility = 'visible'; // set current buffer to visible (display)
	
	nmgrs.sceneMan.ChangeScene(new InitScene()); // change to our initial scene
};

// cleans up the game object
Game.prototype.TearDown = function() {
	
};

// our main game loop
Game.prototype.Run = function() {
	var updateDisplay = false; // do we need to redisplay?
	
	this.Input(); // perform input handling
	nmgrs.inputMan.Process(); 
	
	var dt = (this.mTimer.GetElapsedTime() / 1000); // get the delta time (since last frame)
	this.mTimer.Reset(); // reset the timer to time next frame
	this.mAccum += dt; // add the delta time to our accumulated time
	this.mFPSAccum += dt;
	
	// while our accumulated time is greater than the frame limit
	while (this.mAccum > (1 / this.mFrameLimit)) {
		this.Process(); // process the game
		this.mAccum -= (1 / this.mFrameLimit); // decrease the accumulator
		
		// interpolate for smoother running, baby
		
		updateDisplay = true; // we need to redisplay
	}
	
	this.mFPSIter++;
	
	// if we need to redisplay
	if (updateDisplay == true) {
		this.Render(); // render the results
	}
	
	if (this.mFPSAccum > 1) {
		this.mFPS = this.mFPSIter / this.mFPSAccum;
		this.mFPSAccum = 0;
		this.mFPSIter = 0;
	}
}

// quits tha game (not strictly required, could be used to completely restart the game)
Game.prototype.Quit = function() {
	clearInterval(this.mGameLoop); // remove the interval running our game loop
	this.TearDown(); // clean up the game object
}

// handles user input
Game.prototype.Input = function() {
	nmgrs.sceneMan.GetCurrentScene().Input(); // perform input for the current scene
}

// handles game logic
Game.prototype.Process = function() {
	nmgrs.sceneMan.GetCurrentScene().Process(); // process the current scene
}

// handles all drawing tasks
Game.prototype.Render = function() {
	this.Clear(this.mClearColour); // clear the canvas
	
	nmgrs.sceneMan.GetCurrentScene().Render(); // render the current scene
	
	this.SwapBuffers(); // swap the buffers (display)
}

// clear the context
Game.prototype.Clear = function(colour) {
	this.mCurrContext.save(); // save current transform
	this.mCurrContext.setTransform(1, 0, 0, 1, 0, 0); // set to identity transform to make sure we clear entire context
	
	this.mCurrContext.fillStyle = colour; // set fill to clear colour
	
	// clear the canvas and then draw a filled rect
	this.mCurrContext.clearRect(0, 0, this.mCanvasSize.mX, this.mCanvasSize.mY);
	this.mCurrContext.fillRect(0, 0, this.mCanvasSize.mX, this.mCanvasSize.mY);
	
	this.mCurrContext.restore(); // restore previously save transform
}

// swap the buffers (contexts)
Game.prototype.SwapBuffers = function() {
	if (this.mDoubleBuffered == true) {
		this.mCanvas[this.mBufferIter].style.visibility = 'visible'; // set current buffer to visible (display)
		
		this.mBufferIter = (this.mBufferIter + 1) % 2; // increment the buffer iterator
		this.mCurrContext = this.mContext[this.mBufferIter]; // set the current buffer
		this.mCanvas[this.mBufferIter].style.visibility = 'hidden'; // hide the current buffer (we are now drawing to it)
	}
}

// set the current transform to the identity matrix
Game.prototype.SetIdentity = function() {
	this.mCurrContext.setTransform(1, 0, 0, 1, 0, 0); // identity matrix
}

Game.prototype.FindCanvasPosition = function() {
	{ // http://www.quirksmode.org/js/findpos.html
		var currObj = this.mCanvas[0];
		var currX = 0, currY = 0;
		if (currObj.offsetParent) {
			do {
				currX += currObj.offsetLeft;
				currY += currObj.offsetTop;
			} while (currObj = currObj.offsetParent);
			
			this.mCanvasPos.Set(currX, currY);
		}
	}
}

Game.prototype.HandleResize = function(e) {
	this.FindCanvasPosition();
}
// ...End


// main Namespace...
var nmain = new function() {
	this.game = new Game(); // our game object
}
// ...End


// managers Namespace...
var nmgrs = new function() {
	this.inputMan = new InputManager();
	this.sceneMan = new SceneManager();
	this.resMan = new ResourceManager();
	this.resLoad = new ResourceLoader();
};
// ...End


function main() {
	try {
		nmain.game.SetUp(); // initialise the game
		
		// run the game loop as fast as the browser will allow
		// note that timing is handled elsewhere (within the Game Run() function)
		nmain.game.mTimer.Reset();
		nmain.game.mGameLoop = setInterval(function() {nmain.game.Run();}, 0);
	} catch(e) {
		alert(e.What());
	}
};

// GFGUIMapControl Class...
// game file:
function GFGUIMapControl() {
	this.mCompassMain = new Array();
	this.mCompassMain[0] = new GUIButton(); // north
	this.mCompassMain[1] = new GUIButton(); // east
	this.mCompassMain[2] = new GUIButton(); // south
	this.mCompassMain[3] = new GUIButton(); // west
	
	this.mZLevelMain = new Array();
	this.mZLevelMain[0] = new GUIButton(); // up
	this.mZLevelMain[1] = new GUIButton(); // down
	
	this.mZLevelExtra = new Sprite();
	
	this.mKeyDown = new Array();
	this.mKeyDown[0] = false;
	this.mKeyDown[1] = false;
	this.mKeyDown[2] = false;
	this.mKeyDown[3] = false;
	
	this.mKeyDown[4] = false;
	this.mKeyDown[5] = false;
}

GFGUIMapControl.prototype.SetUp = function() {
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_compassmain");
		
		{
			this.mCompassMain[0].SetUp(new IVec2(530, 10), new IVec2(40, 22), -5000);
			this.mCompassMain[0].mPos.Set(530, 10);
			
			this.mCompassMain[0].mSpriteIdle.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mCompassMain[0].mSpriteHover.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[0].mSpriteHover.SetCurrentFrame(4);
			
			this.mCompassMain[0].mSpriteDown.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[0].mSpriteDown.SetCurrentFrame(8);
			
			this.mCompassMain[0].mSpriteInactive.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mCompassMain[1].SetUp(new IVec2(584, 10), new IVec2(40, 22), -5000);
			this.mCompassMain[1].mPos.Set(584, 10);
			
			this.mCompassMain[1].mSpriteIdle.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[1].mSpriteIdle.SetCurrentFrame(1);
			
			this.mCompassMain[1].mSpriteHover.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[1].mSpriteHover.SetCurrentFrame(5);
			
			this.mCompassMain[1].mSpriteDown.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[1].mSpriteDown.SetCurrentFrame(9);
			
			this.mCompassMain[1].mSpriteInactive.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[1].mSpriteInactive.SetCurrentFrame(1);
		}
		
		{
			this.mCompassMain[2].SetUp(new IVec2(584, 46), new IVec2(40, 22), -5000);
			this.mCompassMain[2].mPos.Set(584, 46);
			
			this.mCompassMain[2].mSpriteIdle.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[2].mSpriteIdle.SetCurrentFrame(2);
			
			this.mCompassMain[2].mSpriteHover.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[2].mSpriteHover.SetCurrentFrame(6);
			
			this.mCompassMain[2].mSpriteDown.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[2].mSpriteDown.SetCurrentFrame(10);
			
			this.mCompassMain[2].mSpriteInactive.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[2].mSpriteInactive.SetCurrentFrame(2);
		}
		
		{
			this.mCompassMain[3].SetUp(new IVec2(530, 46), new IVec2(40, 22), -5000);
			this.mCompassMain[3].mPos.Set(530, 46);
			
			this.mCompassMain[3].mSpriteIdle.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[3].mSpriteIdle.SetCurrentFrame(3);
			
			this.mCompassMain[3].mSpriteHover.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[3].mSpriteHover.SetCurrentFrame(7);
			
			this.mCompassMain[3].mSpriteDown.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[3].mSpriteDown.SetCurrentFrame(11);
			
			this.mCompassMain[3].mSpriteInactive.SetAnimatedTexture(tex, 12, 4, -1, -1);
			this.mCompassMain[3].mSpriteInactive.SetCurrentFrame(3);
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_zlevelmain");
		
		{
			this.mZLevelMain[0].SetUp(new IVec2(440, 10), new IVec2(38, 22), -5000);
			this.mZLevelMain[0].mPos.Set(440, 10);
			
			this.mZLevelMain[0].mSpriteIdle.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mZLevelMain[0].mSpriteHover.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[0].mSpriteHover.SetCurrentFrame(2);
			
			this.mZLevelMain[0].mSpriteDown.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[0].mSpriteDown.SetCurrentFrame(4);
			
			this.mZLevelMain[0].mSpriteInactive.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mZLevelMain[1].SetUp(new IVec2(440, 46), new IVec2(38, 22), -5000);
			this.mZLevelMain[1].mPos.Set(440, 46);
			
			this.mZLevelMain[1].mSpriteIdle.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[1].mSpriteIdle.SetCurrentFrame(1);
			
			this.mZLevelMain[1].mSpriteHover.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[1].mSpriteHover.SetCurrentFrame(3);
			
			this.mZLevelMain[1].mSpriteDown.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[1].mSpriteDown.SetCurrentFrame(5);
			
			this.mZLevelMain[1].mSpriteInactive.SetAnimatedTexture(tex, 6, 2, -1, -1);
			this.mZLevelMain[1].mSpriteInactive.SetCurrentFrame(1);
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_zlevelextra");
		
		this.mZLevelExtra.mPos.Set(486, 6);
		this.mZLevelExtra.mDepth = -5000;
		this.mZLevelExtra.SetAnimatedTexture(tex, 4, 4, -1, -1);
		this.mZLevelExtra.SetCurrentFrame(3);
		this.mZLevelExtra.mAbsolute = true;
	}
};

GFGUIMapControl.prototype.Input = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{ // map scrolling
		{ // keyboard input
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.up)) {
				this.mKeyDown[0] = true;
			}
			else {
				this.mKeyDown[0] = false;
			}
			
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.right)) {
				this.mKeyDown[1] = true;
			}
			else {
				this.mKeyDown[1] = false;
			}
			
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.down)) {
				this.mKeyDown[2] = true;
			}
			else {
				this.mKeyDown[2] = false;
			}
			
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.left)) {
				this.mKeyDown[3] = true;
			}
			else {
				this.mKeyDown[3] = false;
			}
		}
		
		// mouse input (gui button)
		for (var i = 0; i < this.mCompassMain.length; ++i) {
			this.mCompassMain[i].Input();
		}
	}
	
	{ // map z-level control
		{ // keyboard input
			if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.q)) {
				currScene.mMap.ChangeZLevel(1);
				this.mZLevelExtra.SetCurrentFrame(currScene.mMap.mCurrZLevel);
				
				this.mKeyDown[4] = true;
			}
			else if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.q) == false) {
				this.mKeyDown[4] = false;
			}
			
			if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.e)) {
				currScene.mMap.ChangeZLevel(-1);
				this.mZLevelExtra.SetCurrentFrame(currScene.mMap.mCurrZLevel);
				
				this.mKeyDown[5] = true;
			}
			else if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.e) == false) {
				this.mKeyDown[5] = false;
			}
		}
		
		// mouse input (gui button)
		for (var i = 0; i < this.mZLevelMain.length; ++i) {
			this.mZLevelMain[i].Input();
		}
	}
}

GFGUIMapControl.prototype.Process = function() {
	// reference to the current scene
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{ // process all gui button elements
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		for (var i = 0; i < this.mCompassMain.length; ++i) {
			this.mCompassMain[i].Process(pt);
		}
		
		for (var i = 0; i < this.mZLevelMain.length; ++i) {
			this.mZLevelMain[i].Process(pt);
		}
	}
	
	{ // handle main compass gui elements being held down
		if (this.mCompassMain[0].mDown == true || this.mKeyDown[0] == true) {
			var x = 0;
			if (currScene.mCam.mTranslate.mX + (nmain.game.mCanvasSize.mX / 2) - 2 > currScene.mMap.mBounds[0]) {
				x = -2;
			}
			
			var y = 0;
			if (currScene.mCam.mTranslate.mY  + (nmain.game.mCanvasSize.mY / 2) - 1 > currScene.mMap.mBounds[1]) {
				y = -1;
			}
			
			currScene.mCam.Translate(new IVec2(x, y));
		}
		
		if (this.mCompassMain[1].mDown == true || this.mKeyDown[1] == true) {
			var x = 0;
			if (currScene.mCam.mTranslate.mX + (nmain.game.mCanvasSize.mX / 2) + 2 < currScene.mMap.mBounds[2]) {
				x = 2;
			}
			
			var y = 0;
			if (currScene.mCam.mTranslate.mY  + (nmain.game.mCanvasSize.mY / 2) - 1 > currScene.mMap.mBounds[1]) {
				y = -1;
			}
			
			currScene.mCam.Translate(new IVec2(x, y));
		}
		
		if (this.mCompassMain[2].mDown == true || this.mKeyDown[2] == true) {
			var x = 0;
			if (currScene.mCam.mTranslate.mX + (nmain.game.mCanvasSize.mX / 2) + 2 < currScene.mMap.mBounds[2]) {
				x = 2;
			}
			
			var y = 0;
			if (currScene.mCam.mTranslate.mY  + (nmain.game.mCanvasSize.mY / 2) + 1 < currScene.mMap.mBounds[3]) {
				y = 1;
			}
			
			currScene.mCam.Translate(new IVec2(x, y));
		}
		
		if (this.mCompassMain[3].mDown == true || this.mKeyDown[3] == true) {
			var x = 0;
			if (currScene.mCam.mTranslate.mX + (nmain.game.mCanvasSize.mX / 2) - 2 > currScene.mMap.mBounds[0]) {
				x = -2;
			}
			
			var y = 0;
			if (currScene.mCam.mTranslate.mY  + (nmain.game.mCanvasSize.mY / 2) + 1 < currScene.mMap.mBounds[3]) {
				y = 1;
			}
			
			currScene.mCam.Translate(new IVec2(x, y));
		}
		
	}
	
	{ // handle main zlevel gui elements being pressed
		if (this.mZLevelMain[0].OnClick() == true) {
			currScene.mMap.ChangeZLevel(1);
			this.mZLevelExtra.SetCurrentFrame(currScene.mMap.mCurrZLevel);
		}
		else if (this.mZLevelMain[1].OnClick() == true) {
			currScene.mMap.ChangeZLevel(-1);
			this.mZLevelExtra.SetCurrentFrame(currScene.mMap.mCurrZLevel);
		}
	}
}

GFGUIMapControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	// for all main compass gui elements
	for (var i = 0; i < this.mCompassMain.length; ++i) {
		if (this.mKeyDown[i] == true) {
			arr.push(this.mCompassMain[i].mSpriteDown);
		}
		else {
			arr = arr.concat(this.mCompassMain[i].GetRenderData()); // add to render
		}
	}
	
	// for all main zlevel gui elements
	for (var i = 0; i < this.mZLevelMain.length; ++i) {
		if (this.mKeyDown[i + 4] == true) {
			arr.push(this.mZLevelMain[i].mSpriteDown);
		}
		else {
			arr = arr.concat(this.mZLevelMain[i].GetRenderData()); // add to render
		}
	}
	
	// add extra zlevel gui
	arr.push(this.mZLevelExtra);
	
	return arr;
}

GFGUIMapControl.prototype.Hovering = function() {
	for (var i = 0; i < this.mCompassMain.length; ++i) {
		if (this.mCompassMain[i].mHover == true) {
			return true;
		}
	}
	
	for (var i = 0; i < this.mZLevelMain.length; ++i) {
		if (this.mZLevelMain[i].mHover == true) {
			return true;
		}
	}
	
	return false;
}
// ...End


// GFMenuScene Class...
// game file:
function GFMenuScene() {
	this.mPersist = false;
	
	this.mBatch = new RenderBatch();
	
	this.mButtons = new Array();
	this.mButtons[0] = new GUIButton();
	this.mButtons[1] = new GUIButton();
	
	this.mButtonsText = new Array();
	this.mButtonsText[0] = new Text();
	this.mButtonsText[1] = new Text();
}

// returns the type of this object for validity checking
GFMenuScene.prototype.Type = function() {
	return "GFMenuScene";
};

// returns whether this scene is to persist or not (when changing to a new scene -- preserves state)
GFMenuScene.prototype.Persistent = function() {
	return this.mPersist;
};

// initialises the scene object
GFMenuScene.prototype.SetUp = function() {
	nmain.game.mClearColour = "#75632F";
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("menu_button");
		
		{
			this.mButtons[0].SetUp(new IVec2(192, 20), new IVec2(256, 64), -5000);
			this.mButtons[0].mPos.Set(192, 20);
			
			this.mButtons[0].mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mButtons[0].mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[0].mSpriteHover.SetCurrentFrame(1);
			
			this.mButtons[0].mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[0].mSpriteDown.SetCurrentFrame(2);
			
			this.mButtons[0].mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mButtons[1].SetUp(new IVec2(192, 100), new IVec2(256, 64), -5000);
			this.mButtons[1].mPos.Set(192, 100);
			
			this.mButtons[1].mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[1].mSpriteIdle.SetCurrentFrame(0);
			
			this.mButtons[1].mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[1].mSpriteHover.SetCurrentFrame(1);
			
			this.mButtons[1].mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[1].mSpriteDown.SetCurrentFrame(2);
			
			this.mButtons[1].mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mButtons[1].mSpriteInactive.SetCurrentFrame(0);
		}
	}
	
	{
		var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
		this.mButtonsText[0].SetFont(font);
		this.mButtonsText[0].SetFontSize(24);
		this.mButtonsText[0].mString = "To TestScene";
		this.mButtonsText[0].mAlign = "centre";
		this.mButtonsText[0].mPos.Set(320, 35);
		this.mButtonsText[0].mShadow = true;
		this.mButtonsText[0].mDepth = -5000;
		
		this.mButtonsText[1].SetFont(font);
		this.mButtonsText[1].SetFontSize(24);
		this.mButtonsText[1].mString = "To CreationScene";
		this.mButtonsText[1].mAlign = "centre";
		this.mButtonsText[1].mPos.Set(320, 115);
		this.mButtonsText[1].mShadow = true;
		this.mButtonsText[1].mDepth = -5000;
	}
}

// cleans up the scene object
GFMenuScene.prototype.TearDown = function() {
	
}

// handles user input
GFMenuScene.prototype.Input = function() {
	for (var i = 0; i < this.mButtons.length; ++i) {
		this.mButtons[i].Input();
	}
}

// handles game logic
GFMenuScene.prototype.Process = function() {
	{
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		for (var i = 0; i < this.mButtons.length; ++i) {
			this.mButtons[i].Process(pt);
		}
	}
	
	{
		if (this.mButtons[0].OnClick() == true) {
			nmgrs.sceneMan.ChangeScene(new GFTestScene());
		}
		else if (this.mButtons[1].OnClick() == true) {
			nmgrs.sceneMan.ChangeScene(new GFCreationScene());
		}
	}
}

// handles all drawing tasks
GFMenuScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	for (var i = 0; i < this.mButtons.length; ++i) {
		arr = arr.concat(this.mButtons[i].GetRenderData());
	}
	
	for (var i = 0; i < this.mButtonsText.length; ++i) {
		arr.push(this.mButtonsText[i]);
	}
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render();
}
// ...End


// GFTestScene Class...
// game file:
function GFTestScene() {
	this.mPersist = false;
	
	this.mRand = new RNG(0);
	
	this.mCam = new Camera();
	this.mBatch = new RenderBatch();
	this.mMap = new GFMap();
	
	this.mMapControl = new GFGUIMapControl();
}

// returns the type of this object for validity checking
GFTestScene.prototype.Type = function() {
	return "GFTestScene";
};

// returns whether this scene is to persist or not (when changing to a new scene -- preserves state)
GFTestScene.prototype.Persistent = function() {
	return this.mPersist;
};

// initialises the scene object
GFTestScene.prototype.SetUp = function() {
	{
		var d = new Date();
		this.mRand.SetSeed(d.getTime());
		var seed = this.mRand.GetRandInt(0, 99999999);
		this.mRand.SetSeed(seed);
	}
	
	nmain.game.mClearColour = "#75632F";
	
	{
		var bpc = new GFBluePrintCollection();
		
		{
			var arr = new Array();
			arr.push("a:tileset_blue;");
			arr.push("{");
			arr.push("20xa?"); arr.push("20oa!");
			arr.push("20oa?"); arr.push("20xa");
			arr.push("}");
			bpc.mInitStore.push(bpc.Convert(arr));
		}
		
		{
			var arr = new Array();
			arr.push("a:tileset_dirtwhole;");
			arr.push("b:tileset_grasstop;");
			arr.push("c:tileset_grasswhole;");
			arr.push("{");
			arr.push("20ob?"); arr.push("20xb?"); arr.push("20eb?"); arr.push("20ob!");
			arr.push("20ec?"); arr.push("20oa?"); arr.push("20ob?"); arr.push("20xb!");
			arr.push("20xc?"); arr.push("20ob?"); arr.push("20ob?"); arr.push("20ea!");
			arr.push("20oa?"); arr.push("20ec?"); arr.push("20xa?"); arr.push("20ob");
			arr.push("}");
			bpc.mRegStore.push(bpc.Convert(arr));
		}
		
		{
			var arr = new Array();
			arr.push("a:tileset_red;");
			arr.push("{");
			arr.push("20ea?"); arr.push("20oa?"); arr.push("20ea?"); arr.push("20oa?"); arr.push("20ea!");
			arr.push("20ea?"); arr.push("20oa?"); arr.push("20ea?"); arr.push("20oa?"); arr.push("20ea");
			arr.push("}");
			bpc.mFinStore.push(bpc.Convert(arr));
		}
		
		var mapGen = new GFMapGen();
		this.mMap.Copy(mapGen.GenerateMap(bpc, 16));
		
		// centres map
		// var trans = new IVec2(this.mMap.mBounds[0], this.mMap.mBounds[1]);
		// trans.mX += (this.mMap.mBounds[2] - this.mMap.mBounds[0]) / 2;
		// trans.mY += (this.mMap.mBounds[3] - this.mMap.mBounds[1]) / 2;
		// trans.mX = Math.round(trans.mX); trans.mY = Math.round(trans.mY);
		
		var trans = new IVec2(nmain.game.mCanvasSize.mX / 2, nmain.game.mCanvasSize.mY / 2);
		trans.mX = -(Math.round(trans.mX)); trans.mY = -(Math.round(trans.mY));
		
		this.mCam.mTranslate.Copy(trans);
		this.mCam.mViewUpdated = true;
	}
	
	this.mMapControl.SetUp();
}

// cleans up the scene object
GFTestScene.prototype.TearDown = function() {
	
}

// handles user input
GFTestScene.prototype.Input = function() {
	this.mMapControl.Input();
}

// handles game logic
GFTestScene.prototype.Process = function() {
	this.mMapControl.Process();
	if (this.mMapControl.Hovering() == false) {
		this.mMap.Process();
	}
	else {
		this.mMap.UnselectTile();
	}
	
	this.mCam.Process();
}

// handles all drawing tasks
GFTestScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	
	this.mBatch.Clear();
	
	var arr = new Array();
	arr = arr.concat(this.mMap.GetRenderData());
	arr = arr.concat(this.mMapControl.GetRenderData());
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(this.mCam);
}
// ...End


// GFGridTile Class...
// game file: 
function GFGridTile() {
	this.mTile = new Sprite();
	this.mID = -1;
};
// ...End


// GFSpecialTile Class...
// game file: 
function GFSpecialTile() {
	this.mText = new Text();
	this.mID = -1;
};
// ...End


// GFCreationMap Class...
// game file: 
function GFCreationMap() {
	this.mSize = new IVec2(0, 0);
	
	this.mSegment = new GFMapSegment();
	this.mCurrZLevel = 3;
	
	this.mCurrentTile = -1;
	
	this.mBounds = new Array();
	this.mBounds[0] = 0;
	this.mBounds[1] = 0;
	this.mBounds[2] = 0;
	this.mBounds[3] = 0;
	
	this.mGrid = new Array();
	
	{
		this.mGridBase = new Shape();
		this.mGridBase.mPos.Set(           8,  42);
		this.mGridBase.AddPoint(new IVec2(20, -10));
		this.mGridBase.AddPoint(new IVec2(23, -10));
		this.mGridBase.AddPoint(new IVec2(43,   0));
		this.mGridBase.AddPoint(new IVec2(43,   3));
		this.mGridBase.AddPoint(new IVec2(23,  13));
		this.mGridBase.AddPoint(new IVec2(20,  13));
		this.mGridBase.AddPoint(new IVec2( 0,   3));
		
		this.mGridBase.mOutline = true;
	}
	
	this.mSpecial = new Array();
};

GFCreationMap.prototype.Copy = function(other) {
	this.mSize.Copy(other.mSize);
	
	this.mSegment.Copy(other.mSegment);
	this.mCurrZLevel = other.mCurrZLevel;
	
	this.mCurrentTile = other.mCurrentTile;
	
	this.mBounds.splice(0, this.mBounds.length);
	this.mBounds = this.mBounds.concat(other.mBounds);
	
	this.mGrid.splice(0, this.mGrid.length);
	this.mGrid = this.mGrid.concat(other.mGrid);
}

GFCreationMap.prototype.SetUp = function() {
	this.mGrid.splice(0, this.mGrid.length);
	
	for (var i = 0; i < this.mSegment.mTiles.length; ++i) {
		if (this.mSegment.mTiles[i].mBlank == true) {
			var tex = nmgrs.resMan.mTexStore.GetResource("gridtile");
			
			var grid = new Sprite();
			grid.SetTexture(tex);
			grid.mPos.Copy(this.mSegment.mTiles[i].mSprite.mPos);
			grid.mDepth = this.mSegment.mTiles[i].mSprite.mDepth;
			
			var gridTile = new GFGridTile();
			gridTile.mTile = grid; gridTile.mID = i;
			this.mGrid.push(gridTile);
			
			this.mSegment.mTiles[i].SetBounds(this.mGridBase);
		}
	}
}

GFCreationMap.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	var pt = new IVec2(0, 0);
	pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
	pt.mX += currScene.mCam.mTranslate.mX; pt.mY += currScene.mCam.mTranslate.mY;
	
	var hoveringTile = false;
	
	if (util.PointInConvex(pt, this.mSegment.mBoundsPoly) == true) {
		for (var i = 0; i < this.mSegment.mTiles.length; ++i) {
			if (util.PointInConvex(pt, this.mSegment.mTiles[i].mBoundsPoly) == true) {
				var result = this.HighlightTile(i);
				if (result == true) {
					hoveringTile = true;
				}
			}
		}
	}
	
	if (hoveringTile == false) {
		if (this.mCurrentTile != -1) {
			this.mSegment.mTiles[this.mCurrentTile].mShowBounds = false;
			this.mCurrentTile = -1;
		}
	}
}

GFCreationMap.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr = arr.concat(this.mSegment.GetRenderData());
	
	for (var i = 0; i < this.mGrid.length; ++i) {
		arr.push(this.mGrid[i].mTile);
	}
	
	for (var i = 0; i < this.mSpecial.length; ++i) {
		arr.push(this.mSpecial[i].mText);
	}
	
	return arr;
}

GFCreationMap.prototype.ChangeZLevel = function(newLevel) {
	if (this.mCurrZLevel + newLevel <= 3 && this.mCurrZLevel + newLevel >= 0) {
		this.mCurrZLevel += newLevel;
		
		this.mSegment.ChangeZLevel(newLevel);
	}
}

GFCreationMap.prototype.UnselectTile = function() {
	if (this.mCurrentTile != -1) {
		this.mSegment.mTiles[this.mCurrentTile].mShowBounds = false;
		this.mCurrentTile = -1;
	}
}

GFCreationMap.prototype.HighlightTile = function(id) {
	if (this.mCurrentTile != -1) {
		var tileCurr = new IVec2(0, 0);
		tileCurr.Copy(this.mSegment.mTiles[this.mCurrentTile].mGlobalPos);
		
		var tileCheck = new IVec2(0, 0);
		tileCheck.Copy(this.mSegment.mTiles[id].mGlobalPos);
		
		if (tileCurr.mY < tileCheck.mY) {
			this.mSegment.mTiles[this.mCurrentTile].mShowBounds = false;
			
			this.mSegment.mTiles[id].mShowBounds = true;
			this.mCurrentTile = id;
			return true;
		}
		else if (tileCurr.mY == tileCheck.mY) {
			if (tileCurr.mX > tileCheck.mX) {
				this.mSegment.mTiles[this.mCurrentTile].mShowBounds = false;
				
				this.mSegment.mTiles[id].mShowBounds = true;
				this.mCurrentTile = id;
				return true;
			}
			else if (tileCurr.mX == tileCheck.mX) {
				return true;
			}
		}
	}
	else {
		this.mSegment.mTiles[id].mShowBounds = true;
		this.mCurrentTile = id;
		return true;
	}
	
	return false
}

GFCreationMap.prototype.SetTileBounds = function(id) {
	var currFrame = this.mSegment.mTiles[id].mSprite.mCurrFrame;
	
	if (typeof(this.mSegment.mTileBounds.mBounds[currFrame]) != "undefined") { 
		var bounds = new Shape(); bounds.Copy(this.mSegment.mTileBounds.mBounds[currFrame]);
		this.mSegment.mTiles[id].SetBounds(bounds);
		
		var foundID = -1;
		for (var i = 0; i < this.mGrid.length; ++i) {
			if (this.mGrid[i].mID == id) {
				foundID = i;
				break;
			}
		}
		
		if (this.mSegment.mTiles[id].mBlank == true) {
			if (foundID < 0) {
				var tex = nmgrs.resMan.mTexStore.GetResource("gridtile");
				
				var grid = new Sprite();
				grid.SetTexture(tex);
				grid.mPos.Copy(this.mSegment.mTiles[id].mSprite.mPos);
				grid.mDepth = this.mSegment.mTiles[id].mSprite.mDepth;
				
				var gridTile = new GFGridTile();
				gridTile.mTile = grid; gridTile.mID = id;
				this.mGrid.push(gridTile);
			}
			
			this.mSegment.mTiles[id].SetBounds(this.mGridBase);
		}
		else {
			if (foundID >= 0) {
				this.mGrid.splice(foundID, 1);
			}
		}
	}
}

GFCreationMap.prototype.SetTileSpecial = function(id) {
	for (var i = 0; i < this.mSpecial.length; ++i) {
		if (this.mSpecial[i].mID == id) {
			this.mSpecial.splice(i, 1);
			break;
		}
	}
	
	if (this.mSegment.mTiles[id].mBlank == false) {
		if (this.mSegment.mTiles[id].mSpecial != 'o') {
			var special = new Text();
			
			var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
			special.SetFont(font);
			special.SetFontSize(12);
			special.mAlign = "centre";
			special.mDepth = 0;
			special.mShadow = true;
			
			special.mPos.Copy(this.mSegment.mTiles[id].mSprite.mPos);
			special.mPos.mX += 30; special.mPos.mY += 8 + (8 * (3 - Math.floor(this.mSegment.mTiles[id].mZ / 2)));
			
			if (this.mSegment.mTiles[id].mZ % 2 != 0) {
				special.mPos.mY -= 4;
			}
			
			switch (this.mSegment.mTiles[id].mSpecial) {
				case 'e' :
					special.mString = "Ent";
					break;
				case 'x' :
					special.mString = "Ext";
					break;
				case 'b' :
					special.mString = "Bth";
					break;
			}
			
			var specialTile = new GFSpecialTile();
			specialTile.mText = special; specialTile.mID = id;
			this.mSpecial.push(specialTile);
		}
	}
}
// ...End


// GFCreationScene Class...
// game file:
function GFCreationScene() {
	this.mPersist = false;
	
	this.mCam = new Camera();
	this.mBatch = new RenderBatch();
	this.mMap = new GFMapSegment();
	
	this.mMapControl = new GFGUIMapControl();
	this.mCreationControl = new GFGUICreationControl();
	
	this.mMap = new GFCreationMap();
	
	this.mHoveringUI = false;
}

// returns the type of this object for validity checking
GFCreationScene.prototype.Type = function() {
	return "GFCreationScene";
};

// returns whether this scene is to persist or not (when changing to a new scene -- preserves state)
GFCreationScene.prototype.Persistent = function() {
	return this.mPersist;
};

// initialises the scene object
GFCreationScene.prototype.SetUp = function() {
	nmain.game.mClearColour = "#75632F";
	
	this.mMapControl.SetUp();
	this.mCreationControl.SetUp("tileset_test");
	
	{
		var bp = new GFBluePrint();
		bp.SetUp("a:tileset_test;{70oa?70oa?70oa?70oa?70oa!70oa?70oa?70oa?70oa?70oa!" +
				"70oa?70oa?70oa?70oa?70oa!70oa?70oa?70oa?70oa?70oa!70oa?70oa?70oa?70oa?70oa}");
		
		var seg = new GFMapSegment();
		seg.mPos.Set(0, 0); seg.SetUp(bp);
		
		this.mMap.mSegment.Copy(seg);
		this.mMap.mBounds[0] = this.mMap.mSegment.mBounds.mBounds[0];
		this.mMap.mBounds[1] = this.mMap.mSegment.mBounds.mBounds[1];
		this.mMap.mBounds[2] = this.mMap.mSegment.mBounds.mBounds[2];
		this.mMap.mBounds[3] = this.mMap.mSegment.mBounds.mBounds[3];
		
		this.mMap.SetUp();
	}
	
	var trans = new IVec2(nmain.game.mCanvasSize.mX / 2, nmain.game.mCanvasSize.mY / 2);
	trans.mX -= this.mMap.mSegment.mBounds.GetWidth() / 2; trans.mY -= 30;
	trans.mX = -(Math.round(trans.mX)); trans.mY = -(Math.round(trans.mY));
	this.mCam.Translate(trans);
}

// cleans up the scene object
GFCreationScene.prototype.TearDown = function() {
	
}

// handles user input
GFCreationScene.prototype.Input = function() {
	if (this.mCreationControl.mDialogueOpen == false) {
		this.mMapControl.Input();
	}
	
	this.mCreationControl.Input();
}

// handles game logic
GFCreationScene.prototype.Process = function() {
	{
		if (this.mCreationControl.mDialogueOpen == false) {
			this.mMapControl.Process();
			
			if (this.mHoveringUI == false) {
				this.mMap.Process();
			}
			else {
				this.mMap.UnselectTile();
			}
		}
		else {
			this.mMap.UnselectTile();
		}
		
		this.mCreationControl.Process();
		
		this.mHoveringUI = this.mMapControl.Hovering();
		if (this.mHoveringUI == false) {
			this.mHoveringUI = this.mCreationControl.Hovering();
		}
	}
	
	this.mCam.Process();
}

// handles all drawing tasks
GFCreationScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	
	this.mBatch.Clear();
	
	var arr = new Array();
	arr = arr.concat(this.mMapControl.GetRenderData());
	arr = arr.concat(this.mCreationControl.GetRenderData());
	arr = arr.concat(this.mMap.GetRenderData());
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(this.mCam);
}
// ...End


// GFGUICreationBar Class...
// game file:
function GFGUICreationBar() {
	this.mSprite = new Sprite();
	
	this.mMenus = new Array();
	this.mMenus[0] = new GUIDropDown();
}

GFGUICreationBar.prototype.SetUp = function() {
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_topbar");
		
		this.mSprite.mPos.Set(8, 10);
		this.mSprite.mDepth = -5000;
		this.mSprite.SetTexture(tex);
		this.mSprite.mAbsolute = true;
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_topmenunew");
		var baseBut = new GUIButton();
		
		baseBut.SetUp(new IVec2(12, 36), new IVec2(38, 18), -5000);
		baseBut.mPos.Set(12, 36);
		
		baseBut.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
		baseBut.mSpriteIdle.SetCurrentFrame(0);
		
		baseBut.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
		baseBut.mSpriteHover.SetCurrentFrame(1);
		
		baseBut.mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
		baseBut.mSpriteDown.SetCurrentFrame(2);
		
		baseBut.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
		baseBut.mSpriteInactive.SetCurrentFrame(0);
		
		this.mMenus[0].SetUp(baseBut);
		this.AddItem(this.mMenus[0], "new", false);
		var newPos = new IVec2(0, 0); newPos.Copy(this.mMenus[0].mItems[0].mPos); newPos.mY += 2;
		this.mMenus[0].mItems[0].mPos.Copy(newPos);
		this.mMenus[0].mItems[0].SetSpritePositions(newPos);
		
		this.AddItem(this.mMenus[0], "save", true);
		this.AddItem(this.mMenus[0], "load", false);
		this.AddItem(this.mMenus[0], "import", true);
		this.AddItem(this.mMenus[0], "export", false);
	}
}

GFGUICreationBar.prototype.Input = function() {
	for (var i = 0; i < this.mMenus.length; ++i) {
		this.mMenus[i].Input();
	}
}

GFGUICreationBar.prototype.Process = function(point) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	for (var i = 0; i < this.mMenus.length; ++i) {
		this.mMenus[i].Process(point);
	}
	
	{
		if (this.mMenus[0].OnClick(0) == true) {
			currScene.mCreationControl.mDialogueOpen = true;
		}
		else if (this.mMenus[0].OnClick(1) == true) {
			
		}
		else if (this.mMenus[0].OnClick(2) == true) {
			
		}
		else if (this.mMenus[0].OnClick(3) == true) {
			
		}
		else if (this.mMenus[0].OnClick(4) == true) {
			
		}
	}
}

GFGUICreationBar.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	
	for (var i = 0; i < this.mMenus.length; ++i) {
		arr = arr.concat(this.mMenus[i].GetRenderData());
	}
	
	return arr;
}

GFGUICreationBar.prototype.AddItem = function(menu, text, alt) {
	var baseFrame = 0;
	if (alt == true) {
		baseFrame = 3;
	}
	
	var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_dropback");
	var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
	
	{
		var itemBut = new GUIButton();
		itemBut.SetUp(new IVec2(0, 0), new IVec2(176, 16), -5000);
		
		itemBut.mSpriteIdle.SetAnimatedTexture(tex, 6, 1, -1, -1);
		itemBut.mSpriteIdle.SetCurrentFrame(baseFrame);
		
		itemBut.mSpriteHover.SetAnimatedTexture(tex, 6, 1, -1, -1);
		itemBut.mSpriteHover.SetCurrentFrame(baseFrame + 1);
		
		itemBut.mSpriteDown.SetAnimatedTexture(tex, 6, 1, -1, -1);
		itemBut.mSpriteDown.SetCurrentFrame(baseFrame + 2);
		
		itemBut.mSpriteInactive.SetAnimatedTexture(tex, 6, 1, -1, -1);
		itemBut.mSpriteInactive.SetCurrentFrame(baseFrame);
		
		var itemTxt = new Text();
		itemTxt.mDepth = -5001;
		itemTxt.SetFont(font);
		itemTxt.SetFontSize(12);
		itemTxt.mString = text;
		itemTxt.mAlign = "left";
		itemTxt.mPos.Set(26, 0);
		itemTxt.mColour = "#4A4A66";
			
		menu.AddItem(itemBut, itemTxt);
	}
}

GFGUICreationBar.prototype.Hovering = function() {
	{
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		var tl = new IVec2(10, 12);
		var br = new IVec2(11, 13);
		br.mX += this.mSprite.GetWidth(); br.mY += this.mSprite.GetHeight();
		
		if (util.PointInRectangle(pt, tl, br)) {
			return true;
		}
	}
	
	for (var i = 0; i < this.mMenus.length; ++i) {
		if (this.mMenus[i].mHover == true) {
			return true;
		}
	}
	
	return false;
}
// ...End


// GFGUICreationControl Class...
// game file:
function GFGUICreationControl() {
	this.mTopBar = new GFGUICreationBar();
	this.mTileControl = new GFGUICreationTileControl();
	this.mNewDialogue = new GFGUICreationNewDialogue();
	
	this.mDialogueOpen = false;
	this.mBlackout = new Shape();
}

GFGUICreationControl.prototype.SetUp = function(initTex) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	this.mTopBar.SetUp();
	this.mTileControl.SetUp(initTex);
	this.mNewDialogue.SetUp();
	
	{
		this.mBlackout.mPos.Set(0, 0);
		this.mBlackout.mDepth = -5005;
		this.mBlackout.mColour = "#000000";
		this.mBlackout.mAlpha = 0.75;
		this.mBlackout.mAbsolute = true;
		
		this.mBlackout.AddPoint(new IVec2(nmain.game.mCanvasSize.mX, 0));
		this.mBlackout.AddPoint(new IVec2(nmain.game.mCanvasSize.mX, nmain.game.mCanvasSize.mY));
		this.mBlackout.AddPoint(new IVec2(0, nmain.game.mCanvasSize.mY));
	}
};

GFGUICreationControl.prototype.Input = function() {
	if (this.mDialogueOpen == false) {
		this.mTopBar.Input();
		this.mTileControl.Input();
	}
	else {
		this.mNewDialogue.Input();
	}
}

GFGUICreationControl.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		if (this.mDialogueOpen == false) {
			this.mTopBar.Process(pt);
			this.mTileControl.Process(pt);
		}
		else {
			this.mNewDialogue.Process(pt);
		}
	}
}

GFGUICreationControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr = arr.concat(this.mTopBar.GetRenderData());
	arr = arr.concat(this.mTileControl.GetRenderData());
	
	if (this.mDialogueOpen == true) {
		arr.push(this.mBlackout);
		arr = arr.concat(this.mNewDialogue.GetRenderData());
	}
	
	return arr;
}

GFGUICreationControl.prototype.Hovering = function() {
	if (this.mTopBar.Hovering() == true) {
		return true;
	}
	
	if (this.mTileControl.Hovering() == true) {
		return true;
	}
	
	return false;
}
// ...End


// GFGUICreationNewDialogue Class...
// game file:
function GFGUICreationNewDialogue() {
	this.mSprite = new Sprite();
	
	this.mInputBoxes = new Array();
	this.mInputBoxes[0] = new GUIInputBox();
	this.mInputBoxes[1] = new GUIInputBox();
	
	this.mButtons = new Array();
	this.mButtons[0] = new GUIButton();
	this.mButtons[1] = new GUIButton();
	
	this.mExtraText = new Text();
}

GFGUICreationNewDialogue.prototype.SetUp = function() {
	var pos = new IVec2(nmain.game.mCanvasSize.mX / 2, nmain.game.mCanvasSize.mY / 2);
	pos.mX -= 68; pos.mY -= 48;
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_back");
		
		this.mSprite.mPos.Set(pos.mX, pos.mY);
		this.mSprite.mDepth = -5100;
		this.mSprite.SetTexture(tex);
		this.mSprite.mAbsolute = true;
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_textinput");
		var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
		
		{
			this.mInputBoxes[0].mInputText.SetFont(font);
			this.mInputBoxes[0].mInputText.SetFontSize(12);
			this.mInputBoxes[0].mInputText.mColour = "#000000";
			
			this.mInputBoxes[0].mRenderCanvas.mPos.Set(4, 2);
			this.mInputBoxes[0].mRenderCanvas.mSize.Set(-4, -2);
			
			this.mInputBoxes[0].SetUp(new IVec2(pos.mX + 18, pos.mY + 28), new IVec2(30, 22), -5101, this.mInputBoxes[0].mNumbers);
			this.mInputBoxes[0].mMaxChars = 2;
			this.mInputBoxes[0].mCaret.mShape.mPos.mY += 2;
			
			{
				this.mInputBoxes[0].mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[0].mSpriteIdle.SetCurrentFrame(0);
				
				this.mInputBoxes[0].mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[0].mSpriteHover.SetCurrentFrame(1);
				
				this.mInputBoxes[0].mSpriteFocus.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[0].mSpriteFocus.SetCurrentFrame(2);
				
				this.mInputBoxes[0].mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[0].mSpriteInactive.SetCurrentFrame(0);
			}
		}
		
		{
			this.mInputBoxes[1].mInputText.SetFont(font);
			this.mInputBoxes[1].mInputText.SetFontSize(12);
			this.mInputBoxes[1].mInputText.mColour = "#000000";
			
			this.mInputBoxes[1].mRenderCanvas.mPos.Set(4, 2);
			this.mInputBoxes[1].mRenderCanvas.mSize.Set(-4, -2);
			
			this.mInputBoxes[1].SetUp(new IVec2(pos.mX + 82, pos.mY + 28), new IVec2(30, 22), -5101, this.mInputBoxes[1].mNumbers);
			this.mInputBoxes[1].mMaxChars = 2;
			this.mInputBoxes[1].mCaret.mShape.mPos.mY += 2;
			
			{
				this.mInputBoxes[1].mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[1].mSpriteIdle.SetCurrentFrame(0);
				
				this.mInputBoxes[1].mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[1].mSpriteHover.SetCurrentFrame(1);
				
				this.mInputBoxes[1].mSpriteFocus.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[1].mSpriteFocus.SetCurrentFrame(2);
				
				this.mInputBoxes[1].mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
				this.mInputBoxes[1].mSpriteInactive.SetCurrentFrame(0);
			}
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_confirmbutton");
		
		this.mButtons[0].SetUp(new IVec2(pos.mX + 36, pos.mY + 64), new IVec2(60, 26), -5101);
		// this.mButtons[0].mPos.Set(pos.mX + 36, pos.mY + 64);
		
		this.mButtons[0].mSpriteIdle.SetAnimatedTexture(tex, 4, 1, -1, -1);
		this.mButtons[0].mSpriteIdle.SetCurrentFrame(0);
		
		this.mButtons[0].mSpriteHover.SetAnimatedTexture(tex, 4, 1, -1, -1);
		this.mButtons[0].mSpriteHover.SetCurrentFrame(1);
		
		this.mButtons[0].mSpriteDown.SetAnimatedTexture(tex, 4, 1, -1, -1);
		this.mButtons[0].mSpriteDown.SetCurrentFrame(2);
		
		this.mButtons[0].mSpriteInactive.SetAnimatedTexture(tex, 4, 1, -1, -1);
		this.mButtons[0].mSpriteInactive.SetCurrentFrame(3);
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_newdialogue_cancelbutton");
		
		this.mButtons[1].SetUp(new IVec2(pos.mX + 112, pos.mY + 72), new IVec2(18, 18), -5101);
		// this.mButtons[1].mPos.Set(pos.mX + 112, pos.mY + 72);
		
		this.mButtons[1].mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButtons[1].mSpriteIdle.SetCurrentFrame(0);
		
		this.mButtons[1].mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButtons[1].mSpriteHover.SetCurrentFrame(1);
		
		this.mButtons[1].mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButtons[1].mSpriteDown.SetCurrentFrame(2);
		
		this.mButtons[1].mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButtons[1].mSpriteInactive.SetCurrentFrame(0);
	}
	
	{
		var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
		
		this.mExtraText
		
		this.mExtraText.SetFont(font);
		this.mExtraText.SetFontSize(12);
		this.mExtraText.mAlign = "centre";
		this.mExtraText.mAbsolute = true;
		this.mExtraText.mDepth = -5100;
		this.mExtraText.mPos.Set(nmain.game.mCanvasSize.mX / 2, (nmain.game.mCanvasSize.mY / 2) + 52);
		this.mExtraText.mString = "Minimum Size: (1, 1)\nMaximum Size: (20, 20)";
		this.mExtraText.mShadow = true;
	}
}

GFGUICreationNewDialogue.prototype.Input = function() {
	for (var i = 0; i < this.mInputBoxes.length; ++i) {
		this.mInputBoxes[i].Input();
	}
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		this.mButtons[i].Input();
	}
}

GFGUICreationNewDialogue.prototype.Process = function(point) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{
		for (var i = 0; i < this.mInputBoxes.length; ++i) {
			this.mInputBoxes[i].Process(point);
			
			{
				if (this.mInputBoxes[i].mInputText.mString.length > 0) {
					var x = Number(this.mInputBoxes[i].mInputText.mString);
					if (x == 0) {
						this.mInputBoxes[i].SetText("");
					}
					else if (this.mInputBoxes[i].mInputText.mString.charAt(0) == "0") {
						this.mInputBoxes[i].SetText(this.mInputBoxes[i].mInputText.mString.charAt(1));
					}
					else if (x > 20) {
						this.mInputBoxes[i].SetText("20");
					}
				}
			}
		}
		
		for (var i = 0; i < this.mButtons.length; ++i) {
			this.mButtons[i].Process(point);
		}
	}
	
	{
		if (this.mInputBoxes[0].mInputText.mString == "" || this.mInputBoxes[1].mInputText.mString == "") {
			this.mButtons[0].mActive = false;
		}
		else {
			this.mButtons[0].mActive = true;
		}
	}
	
	{
		if (this.mButtons[0].OnClick() == true) {
			var x = Number(this.mInputBoxes[0].mInputText.mString);
			var y = Number(this.mInputBoxes[1].mInputText.mString);
			
			if ((x >= 1 && x <= 20) && (y >= 1 && y <= 20)) {
				{
					var str = "a:tileset_test;{";
					for (var i = 0; i < y; ++i) {
						for (var j = 0; j < x; ++j) {
							str += "70oa";
							
							if (j < x - 1) {
								str += "?";
							}
						}
						
						if (i < y - 1) {
							str += "!";
						}
					}
					
					str += "}";
					
					var bp = new GFBluePrint();
					bp.SetUp(str);
					
					var seg = new GFMapSegment();
					seg.mPos.Set(0, 0); seg.SetUp(bp);
					
					var map = new GFCreationMap(); currScene.mMap.Copy(map);
					currScene.mMap.mSegment.Copy(seg);
					currScene.mMap.mBounds[0] = currScene.mMap.mSegment.mBounds.mBounds[0];
					currScene.mMap.mBounds[1] = currScene.mMap.mSegment.mBounds.mBounds[1];
					currScene.mMap.mBounds[2] = currScene.mMap.mSegment.mBounds.mBounds[2];
					currScene.mMap.mBounds[3] = currScene.mMap.mSegment.mBounds.mBounds[3];
					
					currScene.mMap.SetUp();
				}
				
				{
					currScene.mCam.Translate(new IVec2(-currScene.mCam.mTranslate.mX, -currScene.mCam.mTranslate.mY));
					
					var trans = new IVec2(nmain.game.mCanvasSize.mX / 2, nmain.game.mCanvasSize.mY / 2);
					trans.mX -= currScene.mMap.mSegment.mBounds.GetWidth() / 2; trans.mY -= 30;
					trans.mX = -(Math.round(trans.mX)); trans.mY = -(Math.round(trans.mY));
					currScene.mCam.Translate(trans);
				}
				
				currScene.mCreationControl.mDialogueOpen = false;
				
				for (var i = 0; i < this.mInputBoxes.length; ++i) {
					this.mInputBoxes[i].SetText("");
				}
			}
		}
		else if (this.mButtons[1].OnClick() == true) {
			currScene.mCreationControl.mDialogueOpen = false;
			
			for (var i = 0; i < this.mInputBoxes.length; ++i) {
				this.mInputBoxes[i].SetText("");
			}
		}
	}
}

GFGUICreationNewDialogue.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mSprite);
	
	for (var i = 0; i < this.mInputBoxes.length; ++i) {
		arr = arr.concat(this.mInputBoxes[i].GetRenderData());
	}
	
	for (var i = 0; i < this.mButtons.length; ++i) {
		arr = arr.concat(this.mButtons[i].GetRenderData());
	}
	
	arr.push(this.mExtraText);
	
	return arr;
}
// ...End


// GFGUICreationTileControl Class...
// game file:
function GFGUICreationTileControl() {
	this.mCurrTile = new GFMapTile();
	
	{
		this.mCurrTileText = new Array();
		this.mCurrTileText[0] = new Text();
		this.mCurrTileText[1] = new Text();
		this.mCurrTileText[2] = new Text();
		this.mCurrTileText[3] = new Text();
		this.mCurrTileText[4] = new Text();
		this.mCurrTileText[5] = new Text();
		
		this.mCurrTileText[6] = new Text();
		this.mCurrTileText[7] = new Text();
		
		this.mCurrTileText[8] = new Text();
	}
	
	{
		this.mOptionsArrows = new Array();
		this.mOptionsArrows[0] = new GUIButton();
		this.mOptionsArrows[1] = new GUIButton();
		this.mOptionsArrows[2] = new GUIButton();
		this.mOptionsArrows[3] = new GUIButton();
		this.mOptionsArrows[4] = new GUIButton();
		this.mOptionsArrows[5] = new GUIButton();
		
		this.mSetTexture = new GUIButton();
	}
	
	this.mCurrentType = 0;
	this.mCurrentTexture = "";
	
	{
		this.mZLevels = new Array();
		this.mZLevels[0] = "1";
		this.mZLevels[1] = "1.5";
		this.mZLevels[2] = "2";
		this.mZLevels[3] = "2.5";
		this.mZLevels[4] = "3";
		this.mZLevels[5] = "3.5";
		this.mZLevels[6] = "4";
		this.mZLevels[7] = "-";
		
		this.mSlopeDirections = new Array();
		this.mSlopeDirections[0] = "North";
		this.mSlopeDirections[1] = "East";
		this.mSlopeDirections[2] = "South";
		this.mSlopeDirections[3] = "West";
		
		this.mTypesTile = new Array();
		this.mTypesTile[0] = "o";
		this.mTypesTile[1] = "e";
		this.mTypesTile[2] = "x";
		this.mTypesTile[3] = "b";
		
		this.mTypes = new Array();
		this.mTypes[0] = "None";
		this.mTypes[1] = "Entrance\nOnly";
		this.mTypes[2] = "Exit\nOnly";
		this.mTypes[3] = "Entrance\n& Exit";
	}
}

GFGUICreationTileControl.prototype.SetUp = function(initTex) {
	this.mCurrentTexture = initTex;
	
	{ // set up the example tile
		var tex = nmgrs.resMan.mTexStore.GetResource(this.mCurrentTexture);
		
		var tile = new GFMapTile();
		tile.mZ = 0;
		tile.mSlopeDirection = 0;
		tile.mSpecial = "o";
		tile.SetUp(tex);
		this.mCurrTile = tile;
		
		this.mCurrTile.mSprite.mPos.Set(540 - 30, 80);
		this.mCurrTile.mSprite.mDepth = -5000;
		this.mCurrTile.mSprite.mAbsolute = true;
	}
	
	this.SetUpText(); // set up the gui text
	this.SetUpButtons(); // set up the gui buttons
};

GFGUICreationTileControl.prototype.Input = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	for (var i = 0; i < this.mOptionsArrows.length; ++i) {
		this.mOptionsArrows[i].Input();
	}
	
	this.mSetTexture.Input();
	
	if (nmgrs.inputMan.GetMouseDown(nmouse.button.code.left)) {
		var tile = currScene.mMap.mCurrentTile;
		if (tile != -1) {
			var tex = nmgrs.resMan.mTexStore.GetResource(this.mCurrentTexture);
			
			currScene.mMap.mSegment.mTiles[tile].mBlank = false;
			currScene.mMap.mSegment.mTiles[tile].mZ = this.mCurrTile.mZ;
			currScene.mMap.mSegment.mTiles[tile].mSlopeDirection = this.mCurrTile.mSlopeDirection;
			currScene.mMap.mSegment.mTiles[tile].mSpecial = this.mCurrTile.mSpecial;
			
			currScene.mMap.mSegment.mTiles[tile].SetUp(tex);
			currScene.mMap.mSegment.mTiles[tile].ChangeZLevel(currScene.mMap.mSegment.mCurrZLevel);
			
			currScene.mMap.SetTileBounds(tile);
			currScene.mMap.SetTileSpecial(tile);
		}
	}
}

GFGUICreationTileControl.prototype.Process = function(point) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	{
		for (var i = 0; i < this.mOptionsArrows.length; ++i) {
			this.mOptionsArrows[i].Process(point);
		}
		
		this.mSetTexture.Process(point);
	}
	
	{
		if (this.mOptionsArrows[0].OnClick() == true) {
			this.mCurrTile.mZ--;
			if (this.mCurrTile.mZ < 0) {
				this.mCurrTile.mZ = 7;
			}
			
			this.UpdateTileSprite();
			this.mCurrTileText[3].mString = this.mZLevels[this.mCurrTile.mZ];
			
			{
				this.mCurrTileText[8].mPos.Copy(this.mCurrTile.mSprite.mPos);
				this.mCurrTileText[8].mPos.mX += 30;
				this.mCurrTileText[8].mPos.mY += 8 + (8 * (3 - Math.floor(this.mCurrTile.mZ / 2)));
				
				if (this.mCurrTile.mZ % 2 != 0) {
					this.mCurrTileText[8].mPos.mY -= 4;
				}
			}
		}
		else if (this.mOptionsArrows[1].OnClick() == true) {
			this.mCurrTile.mZ = (this.mCurrTile.mZ + 1) % 8;
			
			this.UpdateTileSprite();
			this.mCurrTileText[3].mString = this.mZLevels[this.mCurrTile.mZ];
			
			{
				this.mCurrTileText[8].mPos.Copy(this.mCurrTile.mSprite.mPos);
				this.mCurrTileText[8].mPos.mX += 30;
				this.mCurrTileText[8].mPos.mY += 8 + (8 * (3 - Math.floor(this.mCurrTile.mZ / 2)));
				
				if (this.mCurrTile.mZ % 2 != 0) {
					this.mCurrTileText[8].mPos.mY -= 4;
				}
			}
		}
		else if (this.mOptionsArrows[2].OnClick() == true) {
			this.mCurrTile.mSlopeDirection--;
			if (this.mCurrTile.mSlopeDirection < 0) {
				this.mCurrTile.mSlopeDirection = 3;
			}
			
			this.UpdateTileSprite();
			this.mCurrTileText[4].mString = this.mSlopeDirections[this.mCurrTile.mSlopeDirection];
		}
		else if (this.mOptionsArrows[3].OnClick() == true) {
			this.mCurrTile.mSlopeDirection = (this.mCurrTile.mSlopeDirection + 1) % 4;
			
			this.UpdateTileSprite();
			this.mCurrTileText[4].mString = this.mSlopeDirections[this.mCurrTile.mSlopeDirection];
		}
		else if (this.mOptionsArrows[4].OnClick() == true) {
			this.mCurrentType--;
			if (this.mCurrentType < 0) {
				this.mCurrentType = 3;
			}
			
			this.mCurrTile.mSpecial = this.mTypesTile[this.mCurrentType];
			this.mCurrTileText[5].mString = this.mTypes[this.mCurrentType];
			
			{
				switch (this.mCurrTile.mSpecial) {
					case 'e' :
						this.mCurrTileText[8].mString = "Ent";
						break;
					case 'x' :
						this.mCurrTileText[8].mString = "Ext";
						break;
					case 'b' :
						this.mCurrTileText[8].mString = "Bth";
						break;
					case 'o' :
						this.mCurrTileText[8].mString = "";
						break;
				}
			}
		}
		else if (this.mOptionsArrows[5].OnClick() == true) {
			this.mCurrentType = (this.mCurrentType + 1) % 4;
			
			this.mCurrTile.mSpecial = this.mTypesTile[this.mCurrentType];
			this.mCurrTileText[5].mString = this.mTypes[this.mCurrentType];
			
			{
				switch (this.mCurrTile.mSpecial) {
					case 'e' :
						this.mCurrTileText[8].mString = "Ent";
						break;
					case 'x' :
						this.mCurrTileText[8].mString = "Ext";
						break;
					case 'b' :
						this.mCurrTileText[8].mString = "Bth";
						break;
					case 'o' :
						this.mCurrTileText[8].mString = "";
						break;
				}
			}
		}
		else if (this.mSetTexture.OnClick() == true) {
			currScene.mPersist = true;
			nmgrs.sceneMan.ReadyScene(new GFTexSelScene());
			nmgrs.sceneMan.SwitchScene();
		}
	}
}

GFGUICreationTileControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	for (var i = 0; i < this.mCurrTileText.length - 1; ++i) {
		arr.push(this.mCurrTileText[i]);
	}
	
	if (this.mCurrTile.mBlank == false) {
		arr.push(this.mCurrTileText[8]);
	}
	
	arr = arr.concat(this.mCurrTile.GetRenderData());
	
	for (var i = 0; i < this.mOptionsArrows.length; ++i) {
		arr = arr.concat(this.mOptionsArrows[i].GetRenderData());
	}
	
	arr = arr.concat(this.mSetTexture.GetRenderData());
	
	return arr;
}

GFGUICreationTileControl.prototype.SetUpText = function() {
	var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
	
	{	
		for (var i = 0; i < this.mCurrTileText.length; ++i) {
			this.mCurrTileText[i].SetFont(font);
			this.mCurrTileText[i].SetFontSize(24);
			this.mCurrTileText[i].mAlign = "centre";
			this.mCurrTileText[i].mAbsolute = true;
		}
		
		this.mCurrTileText[0].SetFontSize(12);
		this.mCurrTileText[0].mString = "Z - Level";
		this.mCurrTileText[0].mPos.Set(540, 150);
		this.mCurrTileText[0].mColour = "#000000";
		
		this.mCurrTileText[1].SetFontSize(12);
		this.mCurrTileText[1].mString = "Slope Direction";
		this.mCurrTileText[1].mPos.Set(540, 200);
		this.mCurrTileText[1].mColour = "#000000";
		
		this.mCurrTileText[2].SetFontSize(12);
		this.mCurrTileText[2].mString = "Type";
		this.mCurrTileText[2].mPos.Set(540, 250);
		this.mCurrTileText[2].mColour = "#000000";
		
		this.mCurrTileText[6].mString = "Set Texture";
		this.mCurrTileText[6].mPos.Set(540, 323);
		this.mCurrTileText[6].mShadow = true;
	}
	
	{
		this.mCurrTileText[3].mString = "1";
		this.mCurrTileText[3].mPos.Set(540, 160);
		this.mCurrTileText[3].mShadow = true;
		
		this.mCurrTileText[4].mString = "North";
		this.mCurrTileText[4].mPos.Set(540, 210);
		this.mCurrTileText[4].mShadow = true;
		
		this.mCurrTileText[5].mString = "None";
		this.mCurrTileText[5].mPos.Set(540, 260);
		this.mCurrTileText[5].mShadow = true;
		
		this.mCurrTileText[7].SetFontSize(12);
		this.mCurrTileText[7].mString = this.mCurrentTexture;
		this.mCurrTileText[7].mPos.Set(540, 360);
		this.mCurrTileText[7].mColour = "#000000";
	}
	
	{
		this.mCurrTileText[8].SetFontSize(12);
		this.mCurrTileText[8].mString = "";
		this.mCurrTileText[8].mShadow = true;
		this.mCurrTileText[8].mDepth = this.mCurrTile.mSprite.mDepth - 1;
		
		this.mCurrTileText[8].mPos.Copy(this.mCurrTile.mSprite.mPos);
		this.mCurrTileText[8].mPos.mX += 30;
		this.mCurrTileText[8].mPos.mY += 8 + (8 * (3 - Math.floor(this.mCurrTile.mZ / 2)));
		
		if (this.mCurrTile.mZ % 2 != 0) {
			this.mCurrTileText[8].mPos.mY -= 4;
		}
	}
}

GFGUICreationTileControl.prototype.SetUpButtons = function() {
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_arrows");
		
		{
			this.mOptionsArrows[0].SetUp(new IVec2(460, 150), new IVec2(22, 38), -5000);
			this.mOptionsArrows[0].mPos.Set(460, 150);
			
			this.mOptionsArrows[0].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mOptionsArrows[0].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[0].mSpriteHover.SetCurrentFrame(1);
			
			this.mOptionsArrows[0].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[0].mSpriteDown.SetCurrentFrame(2);
			
			this.mOptionsArrows[0].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mOptionsArrows[1].SetUp(new IVec2(600, 150), new IVec2(22, 38), -5000);
			this.mOptionsArrows[1].mPos.Set(600, 150);
			
			this.mOptionsArrows[1].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[1].mSpriteIdle.SetCurrentFrame(3);
			
			this.mOptionsArrows[1].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[1].mSpriteHover.SetCurrentFrame(4);
			
			this.mOptionsArrows[1].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[1].mSpriteDown.SetCurrentFrame(5);
			
			this.mOptionsArrows[1].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[1].mSpriteInactive.SetCurrentFrame(3);
		}
		
		{
			this.mOptionsArrows[2].SetUp(new IVec2(460, 200), new IVec2(22, 38), -5000);
			this.mOptionsArrows[2].mPos.Set(460, 200);
			
			this.mOptionsArrows[2].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[2].mSpriteIdle.SetCurrentFrame(0);
			
			this.mOptionsArrows[2].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[2].mSpriteHover.SetCurrentFrame(1);
			
			this.mOptionsArrows[2].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[2].mSpriteDown.SetCurrentFrame(2);
			
			this.mOptionsArrows[2].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[2].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mOptionsArrows[3].SetUp(new IVec2(600, 200), new IVec2(22, 38), -5000);
			this.mOptionsArrows[3].mPos.Set(600, 200);
			
			this.mOptionsArrows[3].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[3].mSpriteIdle.SetCurrentFrame(3);
			
			this.mOptionsArrows[3].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[3].mSpriteHover.SetCurrentFrame(4);
			
			this.mOptionsArrows[3].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[3].mSpriteDown.SetCurrentFrame(5);
			
			this.mOptionsArrows[3].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[3].mSpriteInactive.SetCurrentFrame(3);
		}
		
		{
			this.mOptionsArrows[4].SetUp(new IVec2(460, 250), new IVec2(22, 38), -5000);
			this.mOptionsArrows[4].mPos.Set(460, 250);
			
			this.mOptionsArrows[4].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[4].mSpriteIdle.SetCurrentFrame(0);
			
			this.mOptionsArrows[4].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[4].mSpriteHover.SetCurrentFrame(1);
			
			this.mOptionsArrows[4].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[4].mSpriteDown.SetCurrentFrame(2);
			
			this.mOptionsArrows[4].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[4].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mOptionsArrows[5].SetUp(new IVec2(600, 250), new IVec2(22, 38), -5000);
			this.mOptionsArrows[5].mPos.Set(600, 250);
			
			this.mOptionsArrows[5].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[5].mSpriteIdle.SetCurrentFrame(3);
			
			this.mOptionsArrows[5].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[5].mSpriteHover.SetCurrentFrame(4);
			
			this.mOptionsArrows[5].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[5].mSpriteDown.SetCurrentFrame(5);
			
			this.mOptionsArrows[5].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mOptionsArrows[5].mSpriteInactive.SetCurrentFrame(3);
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_texset");
		
		this.mSetTexture.SetUp(new IVec2(460, 320), new IVec2(162, 38), -5000);
		this.mSetTexture.mPos.Set(460, 320);
		
		this.mSetTexture.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mSetTexture.mSpriteIdle.SetCurrentFrame(0);
		
		this.mSetTexture.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mSetTexture.mSpriteHover.SetCurrentFrame(1);
		
		this.mSetTexture.mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mSetTexture.mSpriteDown.SetCurrentFrame(2);
		
		this.mSetTexture.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mSetTexture.mSpriteInactive.SetCurrentFrame(0);
	}
}

GFGUICreationTileControl.prototype.UpdateTileSprite = function() {
	this.mCurrTileText[7].mString = this.mCurrentTexture;
	
	var tex = nmgrs.resMan.mTexStore.GetResource(this.mCurrentTexture);
	this.mCurrTile.mSprite.SetAnimatedTexture(tex, 35, 7, -1, -1);
	
	this.mCurrTile.mTileFrame = this.mCurrTile.mZ;
	this.mCurrTile.mBlank = false;
	
	if (this.mCurrTile.mTileFrame != 7) {
		if (this.mCurrTile.mZ % 2 != 0) {
			this.mCurrTile.mTileFrame = this.mCurrTile.mZ + (this.mCurrTile.mSprite.mFramesPerLine * this.mCurrTile.mSlopeDirection);
		}
	}
	else {
		this.mCurrTile.mBlank = true;
	}
	
	this.mCurrTile.mSprite.SetCurrentFrame(this.mCurrTile.mTileFrame);
}

GFGUICreationTileControl.prototype.Hovering = function() {
	{
		var currScene = nmgrs.sceneMan.mCurrScene;
		
		var pt = new IVec2(0, 0); pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		pt.mX += currScene.mCam.mTranslate.mX; pt.mY += currScene.mCam.mTranslate.mY;
		
		var tl = new IVec2(0, 0); tl.Copy(this.mCurrTile.mSprite.mPos);
		tl.mX += 2; tl.mY += 2;
		
		var br = new IVec2(0, 0); br.Copy(this.mCurrTile.mSprite.mPos);
		br.mX += this.mCurrTile.mSprite.GetWidth() + 3; br.mY += this.mCurrTile.mSprite.GetHeight() + 3;
		
		if (util.PointInRectangle(pt, tl, br)) {
			return true;
		}
	}
	
	for (var i = 0; i < this.mOptionsArrows.length; ++i) {
		if (this.mOptionsArrows[i].mHover == true) {
			return true;
		}
	}
	
	if (this.mSetTexture.mHover == true) {
		return true;
	}
	
	return false;
}
// ...End


// GFTexSelection Class...
// game file:
function GFTexSelection() {
	this.mPos = new IVec2(0, 0);
	
	this.mTextureStr = "";
	
	this.mSegment = new GFMapSegment();
	this.mTexDisp = new Text();
	this.mButton = new GUIButton();
}

GFTexSelection.prototype.SetUp = function(pos, texStr) {
	this.mPos.Copy(pos);
	this.mTextureStr = texStr;
	
	{
		var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
		this.mTexDisp.SetFont(font);
		this.mTexDisp.SetFontSize(12);
		this.mTexDisp.mString = texStr;
		this.mTexDisp.mAlign = "centre";
		this.mTexDisp.mPos.Set(this.mPos.mX + 86, this.mPos.mY + 118);
		this.mTexDisp.mShadow = true;
	}
	
	{
		var bp = new GFBluePrint();
		bp.SetUp("a:" + texStr + ";{60oa?53oa?40oa!60oa?70oa?30oa!00oa?11oa?20oa}");
		
		var seg = new GFMapSegment();
		seg.mPos.Set(0, 0); seg.SetUp(bp);
		
		this.mSegment.Copy(seg);
		
		
		this.mSegment.mTiles[3].ChangeZLevel(0);
		this.mSegment.mTiles[3].SetBounds(this.mSegment.mTileBounds.mBounds[this.mSegment.mTiles[3].mSprite.mCurrFrame]);
		for (var i = 0; i < this.mSegment.mTiles.length; ++i) {
			this.mSegment.mTiles[i].mSprite.mPos.mX += this.mPos.mX;
			this.mSegment.mTiles[i].mSprite.mPos.mY += this.mPos.mY + 20;
			
			this.mSegment.mTiles[i].mBounds.mPos.mX += this.mPos.mX;
			this.mSegment.mTiles[i].mBounds.mPos.mY += this.mPos.mY + 20;
		}
		
		this.mSegment.mBounds.mPos.mX += this.mPos.mX;
		this.mSegment.mBounds.mPos.mY += this.mPos.mY + 20;
		this.mSegment.mBoundsPoly.splice(0, this.mSegment.mBoundsPoly.length);
		this.mSegment.mBoundsPoly = this.mSegment.mBoundsPoly.concat(this.mSegment.mBounds.GetPolygon());
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_texselect");
		
		this.mButton.SetUp(new IVec2(this.mPos.mX - 9, this.mPos.mY - 9), new IVec2(190, 152), -5000);
		
		this.mButton.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButton.mSpriteIdle.SetCurrentFrame(0);
		
		this.mButton.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButton.mSpriteHover.SetCurrentFrame(1);
		
		this.mButton.mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButton.mSpriteDown.SetCurrentFrame(2);
		
		this.mButton.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
		this.mButton.mSpriteInactive.SetCurrentFrame(0);
	}
}

GFTexSelection.prototype.Input = function() {
	this.mButton.Input();
}

GFTexSelection.prototype.Process = function(point) {
	this.mButton.Process(point);
}

GFTexSelection.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr = arr.concat(this.mSegment.GetRenderData());
	arr.push(this.mTexDisp);
	arr = arr.concat(this.mButton.GetRenderData());
	
	return arr;
}

GFTexSelection.prototype.OnClick = function() {
	return this.mButton.OnClick();
}
// ...End


// GFTexSelScene Class...
// game file:
function GFTexSelScene() {
	this.mPersist = false;
	
	this.mBatch = new RenderBatch();
	
	this.mTexSelections = new Array();
	this.mCurrPage = 0;
	this.mMaxPage = 0;
	
	this.mPagePos = new Array();
	this.mPagePos[0] = new IVec2(20, 22);
	this.mPagePos[1] = new IVec2(233, 22);
	this.mPagePos[2] = new IVec2(447, 22);
	this.mPagePos[3] = new IVec2(20, 262);
	this.mPagePos[4] = new IVec2(233, 262);
	this.mPagePos[5] = new IVec2(447, 262);
	
	this.mArrows = new Array();
	this.mArrows[0] = new GUIButton();
	this.mArrows[1] = new GUIButton();
	
	this.mCancel = new GUIButton();
	this.mCancelText = new Text();
}

// returns the type of this object for validity checking
GFTexSelScene.prototype.Type = function() {
	return "GFTexSelScene";
};

// returns whether this scene is to persist or not (when changing to a new scene -- preserves state)
GFTexSelScene.prototype.Persistent = function() {
	return this.mPersist;
};

// initialises the scene object
GFTexSelScene.prototype.SetUp = function() {
	for (var i = 0; i < nmgrs.resMan.mTexStore.mStore.length; ++i) {
		var str = nmgrs.resMan.mTexStore.mStore[i].mResName;
		if (str.length >= 7) {
			if (str.substr(0, 7) == "tileset") {
				var id = this.mTexSelections.length % 6;
				var texSel = new GFTexSelection();
				texSel.SetUp(this.mPagePos[id], str);
				
				this.mTexSelections.push(texSel);
			}
		}
	}
	
	this.mMaxPage = Math.floor(this.mTexSelections.length / 7);
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_arrows");
		
		{
			this.mArrows[0].SetUp(new IVec2(8, 434), new IVec2(22, 38), -5000);
			
			this.mArrows[0].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mArrows[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mArrows[0].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mArrows[0].mSpriteHover.SetCurrentFrame(1);
			
			this.mArrows[0].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mArrows[0].mSpriteDown.SetCurrentFrame(2);
			
			this.mArrows[0].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mArrows[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mArrows[1].SetUp(new IVec2(610, 434), new IVec2(22, 38), -5000);
			
			this.mArrows[1].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mArrows[1].mSpriteIdle.SetCurrentFrame(3);
			
			this.mArrows[1].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mArrows[1].mSpriteHover.SetCurrentFrame(4);
			
			this.mArrows[1].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mArrows[1].mSpriteDown.SetCurrentFrame(5);
			
			this.mArrows[1].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mArrows[1].mSpriteInactive.SetCurrentFrame(3);
		}
	}
	
	{
		{
			var tex = nmgrs.resMan.mTexStore.GetResource("gui_creation_texset");
			
			this.mCancel.SetUp(new IVec2(239, 434), new IVec2(162, 38), -5000);
			
			this.mCancel.mSpriteIdle.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mCancel.mSpriteIdle.SetCurrentFrame(0);
			
			this.mCancel.mSpriteHover.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mCancel.mSpriteHover.SetCurrentFrame(1);
			
			this.mCancel.mSpriteDown.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mCancel.mSpriteDown.SetCurrentFrame(2);
			
			this.mCancel.mSpriteInactive.SetAnimatedTexture(tex, 3, 1, -1, -1);
			this.mCancel.mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			var font = nmgrs.resMan.mFontStore.GetResource("pixantiqua");
			this.mCancelText.SetFont(font);
			this.mCancelText.SetFontSize(24);
			this.mCancelText.mString = "Cancel";
			this.mCancelText.mAlign = "centre";
			this.mCancelText.mPos.Set(320, 437);
			this.mCancelText.mShadow = true;
		}
	}
}

// cleans up the scene object
GFTexSelScene.prototype.TearDown = function() {
	
}

// handles user input
GFTexSelScene.prototype.Input = function() {
	for (var i = 0; i < this.mArrows.length; ++i) {
		this.mArrows[i].Input();
	}
	
	this.mCancel.Input();
	
	var max = ((this.mCurrPage + 1) * 6);
	if (max > this.mTexSelections.length) {
		max = this.mTexSelections.length;
	}
	
	for (var i = this.mCurrPage * 6; i < max; ++i) {
		this.mTexSelections[i].Input();
	}
}

// handles game logic
GFTexSelScene.prototype.Process = function() {
	{
		var pt = new IVec2(0, 0);
		pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		for (var i = 0; i < this.mArrows.length; ++i) {
			this.mArrows[i].Process(pt);
		}
		
		this.mCancel.Process(pt);
		
		for (var i = 0; i < this.mTexSelections.length; ++i) {
			this.mTexSelections[i].Process(pt);
		}
	}
	
	{
		if (this.mArrows[0].OnClick() == true) {
			this.mCurrPage--;
			if (this.mCurrPage < 0) {
				this.mCurrPage = 0;
			}
		}
		else if (this.mArrows[1].OnClick() == true) {
			this.mCurrPage++;
			if (this.mCurrPage > this.mMaxPage) {
				this.mCurrPage = this.mMaxPage;
			}
		}
		else if (this.mCancel.OnClick() == true) {
			nmgrs.sceneMan.ChangeScene(new GFCreationScene());
		}
		else {
			for (var i = 0; i < this.mTexSelections.length; ++i) {
				if (this.mTexSelections[i].OnClick() == true) {
					this.mPersist = true;
					nmgrs.sceneMan.ReadyScene(new GFCreationScene());
					nmgrs.sceneMan.mReadyScene.mCreationControl.mTileControl.mCurrentTexture = this.mTexSelections[i].mTextureStr;
					nmgrs.sceneMan.mReadyScene.mCreationControl.mTileControl.UpdateTileSprite();
					nmgrs.sceneMan.SwitchScene();
					break;
				}
			}
		}
	}
}

// handles all drawing tasks
GFTexSelScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	var max = ((this.mCurrPage + 1) * 6);
	if (max > this.mTexSelections.length) {
		max = this.mTexSelections.length;
	}
	
	for (var i = this.mCurrPage * 6; i < max; ++i) {
		arr = arr.concat(this.mTexSelections[i].GetRenderData());
	}
	
	{
		if (this.mCurrPage != 0) {
			arr = arr.concat(this.mArrows[0].GetRenderData());
		}
		
		if (this.mCurrPage != this.mMaxPage) {
			arr = arr.concat(this.mArrows[1].GetRenderData());
		}
	}
	
	arr = arr.concat(this.mCancel.GetRenderData());
	arr.push(this.mCancelText);
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render();
}
// ...End


// GFBluePrintTile Class...
// game file: 
function GFBluePrintTile() {
	this.mPos = new IVec2(0, 0);
	
	this.mZ = 0;
	this.mSpecial = "o";
	this.mSlopeDirection = 0;
	
	this.mTex = "";
};
// ...End


// GFBluePrint Class...
// game file: 
function GFBluePrint() {
	this.mSize = new IVec2(0, 0);
	this.mTiles = new Array();
};

GFBluePrint.prototype.Copy = function(other) {
	this.mSize.Copy(other.mSize);
	
	this.mTiles.splice(0, this.mTiles.length);
	this.mTiles = this.mTiles.concat(other.mTiles);
}

GFBluePrint.prototype.SetUp = function(bpstring) {
	var ind = bpstring.indexOf('{');
	var texStr = bpstring.substr(0, ind);
	var texArr = texStr.split(';'); texArr.pop();
	var textures = new Array();
	
	for (var i = 0; i < texArr.length; ++i) {
		var texInd = texArr[i].substr(0, 1);
		textures[texInd] = texArr[i].substr(2, texArr[i].length - 2);
	}
	
	var tileStr = bpstring.substr(ind + 1, (bpstring.length - ind) - 2);
	var rows = tileStr.split('!');
	var tiles = new Array();
	
	if (rows.length > 0) {
		{
			var cols = rows[0].split('?');
			this.mSize.Set(cols.length, rows.length);
		}
		
		for (var i = 0; i < rows.length; ++i) {
			var split = rows[i].split('?');
			tiles = tiles.concat(split);
		}
		
		var id = 0;
		for (var y = 0; y < this.mSize.mY; ++y) {
			for (var x = 0; x < this.mSize.mX; ++x) {
				var bpTile = new GFBluePrintTile();
				bpTile.mPos.Set(x, y);
				bpTile.mZ = Number(tiles[id].charAt(0));
				bpTile.mSlopeDirection = Number(tiles[id].charAt(1));
				bpTile.mSpecial = tiles[id].charAt(2);
				
				bpTile.mTex = textures[tiles[id].charAt(3)];
				
				this.mTiles.push(bpTile);
				id++;
			}
		}
	}
}
// ...End


// GFBluePrintCollection Class...
// game file: 
function GFBluePrintCollection() {
	this.mInitStore = new Array();
	this.mRegStore = new Array();
	this.mFinStore = new Array();
}

GFBluePrintCollection.prototype.Copy = function(other) {
	this.mInitStore.splice(0, this.mInitStore.length);
	this.mInitStore = this.mInitStore.concat(other.mInitStore);
	
	this.mRegStore.splice(0, this.mRegStore.length);
	this.mRegStore = this.mRegStore.concat(other.mRegStore);
	
	this.mFinStore.splice(0, this.mFinStore.length);
	this.mFinStore = this.mFinStore.concat(other.mFinStore);
}

GFBluePrintCollection.prototype.Convert = function(bparr) {
	var str = "";
	for (var i = 0; i < bparr.length; ++i) {
		str += bparr[i];
	}
	
	return str;
}
// ...End


// GFMapSegmentContainer Class...
// game file: 
function GFMapSegmentContainer() {
	this.mMapSegment = new GFMapSegment();
	this.mRangeStart = new IVec2(0, 0);
	this.mRangeEnd = new IVec2(0, 0);
}
// ...End


// GFMap Class...
// game file: 
function GFMap() {
	this.mSize = new IVec2(0, 0);
	
	this.mSegments = new Array();
	this.mCurrZLevel = 3;
	
	this.mCurrentTile = new IVec2(-1, -1);
	
	this.mBounds = new Array();
	this.mBounds[0] = 0;
	this.mBounds[1] = 0;
	this.mBounds[2] = 0;
	this.mBounds[3] = 0;
};

GFMap.prototype.Copy = function(other) {
	this.mSize.Copy(other.mSize);
	
	this.mSegments.splice(0, this.mSegments.length);
	this.mSegments = this.mSegments.concat(other.mSegments);
	this.mCurrZLevel = other.mCurrZLevel;
	
	this.mCurrentTile.Copy(other.mCurrentTile);
	
	this.mBounds.splice(0, this.mBounds.length);
	this.mBounds = this.mBounds.concat(other.mBounds);
}

GFMap.prototype.AddSegment = function(segment) {
	var segCont = new GFMapSegmentContainer();
	segCont.mMapSegment.Copy(segment);
	segCont.mRangeStart.Copy(segment.mPos);
	segCont.mRangeEnd.Copy(segment.mPos);
	segCont.mRangeEnd.mX += segment.mSize.mX; segCont.mRangeEnd.mY += segment.mSize.mY;
	
	this.mSegments.push(segCont);
	
	if (this.mSegments.length == 1) {
		this.mBounds[0] = segment.mBounds.mBounds[0] + segment.mBounds.mPos.mX;
		this.mBounds[1] = segment.mBounds.mBounds[1] + segment.mBounds.mPos.mY;
		this.mBounds[2] = segment.mBounds.mBounds[2] + segment.mBounds.mPos.mX;
		this.mBounds[3] = segment.mBounds.mBounds[3] + segment.mBounds.mPos.mY;
	}
	else {
		if (segment.mBounds.mBounds[0] + segment.mBounds.mPos.mX < this.mBounds[0]) {
			this.mBounds[0] = segment.mBounds.mBounds[0] + segment.mBounds.mPos.mX;
		}
		
		if (segment.mBounds.mBounds[1] + segment.mBounds.mPos.mY < this.mBounds[1]) {
			this.mBounds[1] = segment.mBounds.mBounds[1] + segment.mBounds.mPos.mY;
		}
		
		if (segment.mBounds.mBounds[2] + segment.mBounds.mPos.mX > this.mBounds[2]) {
			this.mBounds[2] = segment.mBounds.mBounds[2] + segment.mBounds.mPos.mX;
		}
		
		if (segment.mBounds.mBounds[3] + segment.mBounds.mPos.mY > this.mBounds[3]) {
			this.mBounds[3] = segment.mBounds.mBounds[3] + segment.mBounds.mPos.mY;
		}
	}
}

GFMap.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	var pt = new IVec2(0, 0);
	pt.Copy(nmgrs.inputMan.GetLocalMouseCoords());
	pt.mX += currScene.mCam.mTranslate.mX; pt.mY += currScene.mCam.mTranslate.mY;
	
	var hoveringTile = false;
	for (var i = 0; i < this.mSegments.length; ++i) {
		if (util.PointInConvex(pt, this.mSegments[i].mMapSegment.mBoundsPoly) == true) {
			for (var j = 0; j < this.mSegments[i].mMapSegment.mTiles.length; ++j) {
				if (this.mSegments[i].mMapSegment.mTiles[j].mBlank == false) {
					if (util.PointInConvex(pt, this.mSegments[i].mMapSegment.mTiles[j].mBoundsPoly) == true) {
						if (this.mCurrentTile.mX != -1 && this.mCurrentTile.mY != -1) {
							var tileCurr = new IVec2(0, 0);
							tileCurr.Copy(this.mSegments[this.mCurrentTile.mX].mMapSegment.mTiles[this.mCurrentTile.mY].mGlobalPos);
							
							var tileCheck = new IVec2(0, 0);
							tileCheck.Copy(this.mSegments[i].mMapSegment.mTiles[j].mGlobalPos);
							
							if (tileCurr.mY < tileCheck.mY) {
								this.mSegments[this.mCurrentTile.mX].mMapSegment.mTiles[this.mCurrentTile.mY].mShowBounds = false;
								
								this.mSegments[i].mMapSegment.mTiles[j].mShowBounds = true;
								this.mCurrentTile.mX = i; this.mCurrentTile.mY = j;
								hoveringTile = true;
							}
							else if (tileCurr.mY == tileCheck.mY) {
								if (tileCurr.mX > tileCheck.mX) {
									this.mSegments[this.mCurrentTile.mX].mMapSegment.mTiles[this.mCurrentTile.mY].mShowBounds = false;
									
									this.mSegments[i].mMapSegment.mTiles[j].mShowBounds = true;
									this.mCurrentTile.mX = i; this.mCurrentTile.mY = j;
									hoveringTile = true;
								}
								else if (tileCurr.mX == tileCheck.mX) {
									hoveringTile = true;
								}
							}
						}
						else {
							this.mSegments[i].mMapSegment.mTiles[j].mShowBounds = true;
							this.mCurrentTile.mX = i; this.mCurrentTile.mY = j;
							hoveringTile = true;
						}
					}
				}
			}
		}
	}
	
	if (hoveringTile == false) {
		if (this.mCurrentTile.mX != -1 && this.mCurrentTile.mY != -1) {
			this.mSegments[this.mCurrentTile.mX].mMapSegment.mTiles[this.mCurrentTile.mY].mShowBounds = false;
			this.mCurrentTile.mX = -1; this.mCurrentTile.mY = -1;
		}
	}
}

GFMap.prototype.GetRenderData = function() {
	var arr = new Array();
	
	for (var i = 0; i < this.mSegments.length; ++i) {
		arr = arr.concat(this.mSegments[i].mMapSegment.GetRenderData());
	}
	
	return arr;
}

GFMap.prototype.ChangeZLevel = function(newLevel) {
	if (this.mCurrZLevel + newLevel <= 3 && this.mCurrZLevel + newLevel >= 0) {
		this.mCurrZLevel += newLevel;
		
		for (var i = 0; i < this.mSegments.length; ++i) {
			this.mSegments[i].mMapSegment.ChangeZLevel(newLevel);
		}
	}
}

GFMap.prototype.UnselectTile = function() {
	if (this.mCurrentTile.mX != -1 && this.mCurrentTile.mY != -1) {
		this.mSegments[this.mCurrentTile.mX].mMapSegment.mTiles[this.mCurrentTile.mY].mShowBounds = false;
		this.mCurrentTile.mX = -1; this.mCurrentTile.mY = -1;
	}
}
// ...End


// GFMapGen Class...
// game file: 
function GFMapGen() {
	
};

GFMapGen.prototype.GenerateMap = function(bpCollection, numParts) {
	var currScene = nmgrs.sceneMan.mCurrScene;
	var bpc = new GFBluePrintCollection();
	bpc.Copy(bpCollection);
	
	var map = new GFMap();
	
	{
		var bpid = currScene.mRand.GetRandInt(0, bpc.mInitStore.length - 1);
		var bp = new GFBluePrint();
		bp.SetUp(bpc.mInitStore[bpid]);
		
		var seg = new GFMapSegment();
		seg.mPos.Set(0, 0); seg.SetUp(bp);
		map.AddSegment(seg);
	}
	
	var bpIter = 0;
	for (var i = 0; i < numParts - 1; ++i) {
		var bpArr = new Array();
		
		if (i < numParts - 2) {
			bpArr = bpArr.concat(util.ShuffleArray(currScene.mRand, bpc.mRegStore));
		}
		else {
			bpArr = bpArr.concat(util.ShuffleArray(currScene.mRand, bpc.mFinStore));
		}
		
		// continue looping until allDone
		var allDone = false;
		var success = false;
		while (allDone == false) {
			// create a blueprint using the current id
			var bp = new GFBluePrint();
			bp.SetUp(bpArr[bpIter]);
			
			// create a temporary segment with our chosen blueprint
			var segTemp = new GFMapSegment();
			segTemp.mPos.Set(0, 0); segTemp.SetUp(bp);
			
			// check entrances against previous segments exits
			var segLast = map.mSegments.length - 1; // get the id of the previous segment in the map array
			
			{
				// shuffle entrance array
				var entArr = new Array();
				entArr = entArr.concat(util.ShuffleArray(currScene.mRand, segTemp.mEntrances));
				
				// shuffle exit array
				var exArr = new Array();
				exArr = exArr.concat(util.ShuffleArray(currScene.mRand, map.mSegments[segLast].mMapSegment.mExits));
				
				// loop our temporary segment's entrance
				for (var j = 0; j < entArr.length; ++j) {
					var entrance = entArr[j]; // store a reference to the current entrance
					
					// loop our previous segment's exits
					for (var k = 0; k < exArr.length; ++k) {
						var exit = exArr[k];
						var compatArr = new Array();
						compatArr = compatArr.concat(entrance.GetCompatible(exit));
						
						var idArr = new Array();
						
						{
							var idArrTemp = new Array();
							idArrTemp[0] = 0; idArrTemp[1] = 1; idArrTemp[2] = 2; idArrTemp[3] = 3;
							idArr = idArr.concat(util.ShuffleArray(currScene.mRand, idArrTemp));
						}
						
						for (var l = 0; l < idArr.length; ++l) {
							if (compatArr[idArr[l]] == true) {
								var seg = new GFMapSegment();
								var x = exit.mGlobalPos.mX - entrance.mGlobalPos.mX; var y = exit.mGlobalPos.mY - entrance.mGlobalPos.mY;
								
								if (idArr[l] == 0) {
									y += 1;
								}
								else if (idArr[l] == 1) {
									x -= 1;
								}
								else if (idArr[l] == 2) {
									y -= 1;
								}
								else if (idArr[l] == 3) {
									x += 1;
								}
								
								seg.mPos.Set(x, y);
								
								seg.SetUp(bp);
								
								var cont = true; // whether we should continue after out final checks
								
								// these checks are seperated from mapsegment compatibility checks as we need both
								// segment's positions first
								if (entrance.mZ % 2 != 0 && (entrance.mZ == exit.mZ - 2 || entrance.mZ == exit.mZ + 2)) {
									// entrance and exit positions and slope directions
									var entPos = new IVec2(0, 0); var exitPos = new IVec2(0, 0);
									var entSlope = 0; var exitSlope = 0;
									
									if (entrance.mZ == exit.mZ - 2) { // other is smaller
										entPos.Copy(entrance.mGlobalPos);
										entPos.mX += x; entPos.mY += y;
										
										exitPos.Copy(exit.mGlobalPos);
										
										entSlope = entrance.mSlopeDirection;
										exitSlope = exit.mSlopeDirection;
									}
									else if (entrance.mZ == exit.mZ + 2) { // other is bigger
										// reverse entrance and exit
										exitPos.Copy(entrance.mGlobalPos);
										exitPos.mX += x; exitPos.mY += y;
										
										entPos.Copy(exit.mGlobalPos);
										
										exitSlope = entrance.mSlopeDirection;
										entSlope = exit.mSlopeDirection;
									}
									
									// store the offset for the front and east tile depending on slope direction
									var front = new IVec2(0, 0); var east = new IVec2(0, 0);
									switch (exitSlope) {
										case 0 :
											front = new IVec2(0, -1);
											east = new IVec2(1, 0);
											break;
										case 1 :
											front = new IVec2(1, 0);
											east = new IVec2(0, 1);
											break;
										case 2 :
											front = new IVec2(0, 1);
											east = new IVec2(-1, 0);
											break;
										case 3 :
											front = new IVec2(-1, 0);
											east = new IVec2(0, -1);
											break;
									}
									
									// if other tile is in front
									if (exitPos.mX == entPos.mX - front.mX && exitPos.mY == entPos.mY - front.mY) {
										cont = false;
									}
									else if (exitPos.mX == entPos.mX + front.mX && exitPos.mY == entPos.mY + front.mY) { // otherwise if other tile is behind
										// if slopes directions are opposite
										if (exitSlope == (entSlope + 2) % 4) {
											cont = false;
										}
									}
									else { // other tile is to the side
										// if slope directions match
										if (exitSlope == entSlope) {
											cont = false;
										}
										else {
											// if we are to the east
											if (exitPos.mX == entPos.mX - east.mX && exitPos.mY == entPos.mY - east.mY) {
												if ((exitSlope + 1) % 4 == entSlope) { // slope is facing away
													cont = false;
												}
											}
											else { // to the west
												if ((exitSlope + 3) % 4 == entSlope) {
													cont = false;
												}
											}
										}
									}
								}
								
								if (cont == true) {
									var collision = false;
									for (var m = 0; m < map.mSegments.length; ++m) {
										if (util.RectangleCollision(map.mSegments[m].mMapSegment.mPos, 
												map.mSegments[m].mMapSegment.mSize, seg.mPos, seg.mSize, false) == true) { // no collisions
											
											collision = true;
											break;
										}
									}
									
									if (collision == false) {
										map.AddSegment(seg);
										allDone = true;
										success = true;
										break;
									}
								}
							}
						}
						
						if (allDone == true) {
							break;
						}
					}
					
					if (allDone == true) {
						break;
					}
				}
			}
			
			if (allDone == false) {
				bpIter++; // if we reach here, prvious segment was not valid so try next in list
				
				// if we've already tried the whole list then there was no possible solution
				if (bpIter == bpArr.length) {
					allDone = true;
					success = false;
				}
			}
		}
		
		if (success == false) {
			break;
		}
	}
	
	return map;
}
// ...End


// GFMapConnectivity Class...
// game file: 
function GFMapConnectivity() {
	this.mNorth = false;
	this.mEast = false;
	this.mSouth = false;
	this.mWest = false;
	
	this.mGlobalPos = new IVec2(0, 0);
	
	this.mZ = 0;
	this.mSlopeDirection = 0;
};

GFMapConnectivity.prototype.GetCompatible = function(other) {
	var resultArr = new Array();
	resultArr[0] = false; resultArr[1] = false;
	resultArr[2] = false; resultArr[3] = false;
	
	var excludeArr = new Array();
	excludeArr[0] = false; excludeArr[1] = false;
	excludeArr[2] = false; excludeArr[3] = false;
	
	if ((this.mZ == other.mZ - 1 || this.mZ == other.mZ || this.mZ == other.mZ + 1) ||
			(this.mZ % 2 != 0 && (this.mZ == other.mZ - 2 || this.mZ == other.mZ + 2))) {
		
		if (this.mZ % 2 == 0) { // this is flat
			if (other.mZ % 2 != 0) { // other is a slope
				if (this.mZ == other.mZ - 1) { // we're lower than other
					// exclude opposite of other.SlopeDirection
					excludeArr[(other.mSlopeDirection + 2) % 4] = true;
				}
				else if (this.mZ == other.mZ + 1) { // we're higher than other
					// exclude other.SlopeDirection
					excludeArr[other.mSlopeDirection] = true;
				}
			}
		}
		else { // this is a slope
			if (other.mZ % 2 == 0) { // other is flat
				if (this.mZ == other.mZ - 1) { // we're lower than other
					// exclude opposite of this.SlopeDirection
					excludeArr[(this.mSlopeDirection + 2) % 4] = true;
					
				}
				else if (this.mZ == other.mZ + 1) { // we're higher than other
					// exclude this.SlopeDirection
					excludeArr[this.mSlopeDirection] = true;
				}
			}
			else if (this.mZ == other.mZ) { // other is a slope
				if (this.mSlopeDirection == other.mSlopeDirection) { // if slopes are same direction
					excludeArr[(this.mSlopeDirection + 2) % 4] = true;
					excludeArr[this.mSlopeDirection] = true;
				}
			}
		}
		
		{
			if (this.mNorth == true && other.mSouth == true) {
				if (excludeArr[0] == false) {
					resultArr[0] = true;
				}
			}
			
			if (this.mEast == true && other.mWest == true) {
				if (excludeArr[1] == false) {
					resultArr[1] = true;
				}
			}
			
			if (this.mSouth == true && other.mNorth == true) {
				if (excludeArr[2] == false) {
					resultArr[2] = true;
				}
			}
			
			if (this.mWest == true && other.mEast == true) {
				if (excludeArr[3] == false) {
					resultArr[3] = true;
				}
			}
		}
	}
	
	return resultArr;
}
// ...End


// GFMapSegment Class...
// game file: a segment (or piece) of a map
function GFMapSegment() {
	this.mPos = new IVec2(0, 0); // the position (offset) of this map segment with the entire map
	this.mSize = new IVec2(0, 0); // the dimensions of this map segment (in terms of tile numbers, not pixels)
	this.mTiles = new Array(); // an array of the tile objects that make up this map segment
	
	this.mCurrZLevel = 3;
	
	this.mExits = new Array();
	this.mEntrances = new Array();
	
	this.mTileBounds = new GFMapTileBounds();
	
	this.mShowBounds = false;
	this.mBounds = new Shape();
	this.mBoundsPoly = new Array();
};

GFMapSegment.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	
	this.mTiles.splice(0, this.mTiles.length);
	this.mTiles = this.mTiles.concat(other.mTiles);
	
	this.mCurrZLevel = other.mCurrZLevel;
	
	this.mExits.splice(0, this.mExits.length);
	this.mExits = this.mExits.concat(other.mExits);
	
	this.mEntrances.splice(0, this.mEntrances.length);
	this.mEntrances = this.mEntrances.concat(other.mEntrances);
	
	this.mShowBounds = other.mShowBounds;
	this.mBounds.Copy(other.mBounds);
	
	this.mBoundsPoly.splice(0, this.mBoundsPoly.length);
	this.mBoundsPoly = this.mBoundsPoly.concat(other.mBoundsPoly);
}

GFMapSegment.prototype.SetUp = function(blueprint) {
	this.mSize.Copy(blueprint.mSize);
	
	{
		var x = (this.mPos.mX * 28) + (this.mPos.mY * 28);
		var y = (this.mPos.mX * -14) + (this.mPos.mY * 14);
		this.mBounds.mPos.Set(x, y + 14);
		
		this.mBounds.mOutline = true;
		this.mBounds.mDepth = 0;
		
		this.mBounds.AddPoint(new IVec2(28 * this.mSize.mX, -14 * this.mSize.mX));
		this.mBounds.AddPoint(new IVec2(28 * this.mSize.mX + 3, -14 * this.mSize.mX));
		this.mBounds.AddPoint(new IVec2((28 * this.mSize.mX) + (28 * this.mSize.mY) + 3, (-14 * this.mSize.mX) + (14 * this.mSize.mY)));
		this.mBounds.AddPoint(new IVec2((28 * this.mSize.mX) + (28 * this.mSize.mY) + 3, (-14 * this.mSize.mX) + (14 * this.mSize.mY) + 31));
		this.mBounds.AddPoint(new IVec2((28 * this.mSize.mY) + 3, (14 * this.mSize.mY) + 31));
		this.mBounds.AddPoint(new IVec2(28 * this.mSize.mY, (14 * this.mSize.mY) + 31));
		this.mBounds.AddPoint(new IVec2(0, 31));
		
		this.mBoundsPoly = this.mBoundsPoly.concat(this.mBounds.GetPolygon());
	}
	
	for (var i = 0; i < blueprint.mTiles.length; ++i) {
		var tex = nmgrs.resMan.mTexStore.GetResource(blueprint.mTiles[i].mTex);
		
		var tile = new GFMapTile();
		tile.mLocalPos.Copy(blueprint.mTiles[i].mPos);
		tile.mGlobalPos.Set(tile.mLocalPos.mX + this.mPos.mX, tile.mLocalPos.mY + this.mPos.mY);
		tile.mZ = blueprint.mTiles[i].mZ;
		tile.mSlopeDirection = blueprint.mTiles[i].mSlopeDirection;
		tile.mSpecial = blueprint.mTiles[i].mSpecial;
		
		tile.SetUp(tex);
		
		if (typeof(this.mTileBounds.mBounds[tile.mSprite.mCurrFrame]) != "undefined") { 
			tile.SetBounds(this.mTileBounds.mBounds[tile.mSprite.mCurrFrame]);
		}
		else {
			tile.SetBounds(this.mTileBounds.mBounds[7]);
		}
		
		this.mTiles.push(tile);
		
		if (tile.mSpecial != "o") {
			var mc = new GFMapConnectivity();
			if (tile.mLocalPos.mY == 0) {
				mc.mNorth = true;
			}
			
			if (tile.mLocalPos.mX == this.mSize.mX - 1) {
				mc.mEast = true;
			}
			
			if (tile.mLocalPos.mY == this.mSize.mY - 1) {
				mc.mSouth = true;
			}
			
			if (tile.mLocalPos.mX == 0) {
				mc.mWest = true;
			}
			
			mc.mGlobalPos.Copy(tile.mGlobalPos);
			mc.mZ = tile.mZ;
			mc.mSlopeDirection = tile.mSlopeDirection;
				
			if (tile.mSpecial == "x" || tile.mSpecial == "b") {
				this.mExits.push(mc);
			}
			
			if (tile.mSpecial == "e" || tile.mSpecial == "b") {
				this.mEntrances.push(mc);
			}
		}
	}
}

// returns the appropiate render data
GFMapSegment.prototype.GetRenderData = function() {
	var arr = new Array(); // an array to store our render data
	
	// for our entire map segment array
	for (var i = 0; i < this.mTiles.length; ++i) {
		arr = arr.concat(this.mTiles[i].GetRenderData()); // get and add the render data returned by the tile
	}
	
	if (this.mShowBounds == true) {
		arr.push(this.mBounds);
	}
	
	return arr; // return the retrieved render data
}


GFMapSegment.prototype.ChangeZLevel = function(newLevel) {
	if (this.mCurrZLevel + newLevel <= 3 && this.mCurrZLevel + newLevel >= 0) {
		this.mCurrZLevel += newLevel;
		// for our entire map segment array
		for (var i = 0; i < this.mTiles.length; ++i) {
			if (this.mTiles[i].mBlank == false) {
				this.mTiles[i].ChangeZLevel(this.mCurrZLevel);
				this.mTiles[i].SetBounds(this.mTileBounds.mBounds[this.mTiles[i].mSprite.mCurrFrame]);
			}
		}
	}
}
// ...End


// GFMapTile Class...
// game file: 
function GFMapTile() {
	this.mLocalPos = new IVec2(0, 0); // the position of this tile in the map segment
	this.mGlobalPos = new IVec2(0, 0); // the position of this tile in the entire map
	
	this.mZ = 0;
	this.mSlopeDirection = 0;
	this.mSpecial = "o";
	
	this.mSprite = new Sprite();
	this.mTileFrame = 0;
	this.mBlank = false;
	
	this.mShowBounds = false;
	this.mBounds = new Shape();
	this.mBoundsPoly = new Array();
};

GFMapTile.prototype.SetUp = function(tex) {
	var x = (this.mGlobalPos.mX * 28) + (this.mGlobalPos.mY * 28);
	var y = (this.mGlobalPos.mX * -14) + (this.mGlobalPos.mY * 14);
	
	this.mSprite.SetAnimatedTexture(tex, 35, 7, -1, -1);
	this.mSprite.mPos.Set(x, y);
	this.mSprite.mDepth = 2500 - (this.mGlobalPos.mY * 10) + (this.mGlobalPos.mX * 10);
	
	this.mTileFrame = this.mZ;
	
	if (this.mTileFrame != 7) {
		if (this.mZ % 2 != 0) {
			this.mTileFrame = this.mZ + (this.mSprite.mFramesPerLine * this.mSlopeDirection);
		}
	}
	else {
		this.mBlank = true;
	}
	
	this.mSprite.SetCurrentFrame(this.mTileFrame);
}

GFMapTile.prototype.GetRenderData = function() {
	var arr = new Array(); // an array to store our render data
	
	arr.push(this.mSprite);
	if (this.mShowBounds == true) {
		arr.push(this.mBounds);
	}
	
	return arr;
}

GFMapTile.prototype.ChangeZLevel = function(newLevel) {
	if (this.mBlank == false) {
		if ((newLevel * 2) < this.mZ) {
			var newFrame = 34 - newLevel;
			if (this.mSprite.mCurrFrame != newFrame) {
				this.mSprite.SetCurrentFrame(newFrame);
			}
		}
		else {
			if (this.mSprite.mCurrFrame != this.mTileFrame) {
				this.mSprite.SetCurrentFrame(this.mTileFrame);
			}
		}
	}
}

GFMapTile.prototype.SetBounds = function(bounds) {
	if (bounds != null) {
		this.mBounds.Copy(bounds);
	}
	
	this.mBounds.mOutline = true;
	this.mBounds.mPos.mX += this.mSprite.mPos.mX; this.mBounds.mPos.mY += this.mSprite.mPos.mY;
	this.mBounds.mDepth = 0;
	
	this.mBoundsPoly.splice(0, this.mBoundsPoly.length);
	this.mBoundsPoly = this.mBoundsPoly.concat(this.mBounds.GetPolygon());
}
// ...End

// GFMapTileBounds Class...
// game file: 
function GFMapTileBounds() {
	this.mBounds = new Array();
	
	{
		this.mBounds[0] = new Shape();
		this.mBounds[0].mPos.Set(			0,  38);
		this.mBounds[0].AddPoint(new IVec2(28, -14));
		this.mBounds[0].AddPoint(new IVec2(31, -14));
		this.mBounds[0].AddPoint(new IVec2(59,   0));
		this.mBounds[0].AddPoint(new IVec2(59,   7));
		this.mBounds[0].AddPoint(new IVec2(31,  21));
		this.mBounds[0].AddPoint(new IVec2(28,  21));
		this.mBounds[0].AddPoint(new IVec2( 0,  7));
	}
	
	{
		this.mBounds[1] = new Shape();
		this.mBounds[1].mPos.Set(			0,  30);
		this.mBounds[1].AddPoint(new IVec2(28, -14));
		this.mBounds[1].AddPoint(new IVec2(31, -14));
		this.mBounds[1].AddPoint(new IVec2(35, -12));
		this.mBounds[1].AddPoint(new IVec2(53,   6));
		this.mBounds[1].AddPoint(new IVec2(55,   6));
		this.mBounds[1].AddPoint(new IVec2(59,   8));
		this.mBounds[1].AddPoint(new IVec2(59,  15));
		this.mBounds[1].AddPoint(new IVec2(31,  29));
		this.mBounds[1].AddPoint(new IVec2(28,  29));
		this.mBounds[1].AddPoint(new IVec2( 0,  15));
	}
	
	{
		this.mBounds[2] = new Shape();
		this.mBounds[2].mPos.Set(			0,  30);
		this.mBounds[2].AddPoint(new IVec2(28, -14));
		this.mBounds[2].AddPoint(new IVec2(31, -14));
		this.mBounds[2].AddPoint(new IVec2(59,   0));
		this.mBounds[2].AddPoint(new IVec2(59,  15));
		this.mBounds[2].AddPoint(new IVec2(31,  29));
		this.mBounds[2].AddPoint(new IVec2(28,  29));
		this.mBounds[2].AddPoint(new IVec2( 0,  15));
	}
	
	{
		this.mBounds[3] = new Shape();
		this.mBounds[3].mPos.Set(			0,  22);
		this.mBounds[3].AddPoint(new IVec2(28, -14));
		this.mBounds[3].AddPoint(new IVec2(31, -14));
		this.mBounds[3].AddPoint(new IVec2(35, -12));
		this.mBounds[3].AddPoint(new IVec2(53,   6));
		this.mBounds[3].AddPoint(new IVec2(55,   6));
		this.mBounds[3].AddPoint(new IVec2(59,   8));
		this.mBounds[3].AddPoint(new IVec2(59,  23));
		this.mBounds[3].AddPoint(new IVec2(31,  37));
		this.mBounds[3].AddPoint(new IVec2(28,  37));
		this.mBounds[3].AddPoint(new IVec2( 0,  23));
	}
	
	{
		this.mBounds[4] = new Shape();
		this.mBounds[4].mPos.Set(			0,  22);
		this.mBounds[4].AddPoint(new IVec2(28, -14));
		this.mBounds[4].AddPoint(new IVec2(31, -14));
		this.mBounds[4].AddPoint(new IVec2(59,   0));
		this.mBounds[4].AddPoint(new IVec2(59,  23));
		this.mBounds[4].AddPoint(new IVec2(31,  37));
		this.mBounds[4].AddPoint(new IVec2(28,  37));
		this.mBounds[4].AddPoint(new IVec2( 0,  23));
	}
	
	{
		this.mBounds[5] = new Shape();
		this.mBounds[5].mPos.Set(			0,  14);
		this.mBounds[5].AddPoint(new IVec2(28, -14));
		this.mBounds[5].AddPoint(new IVec2(31, -14));
		this.mBounds[5].AddPoint(new IVec2(35, -12));
		this.mBounds[5].AddPoint(new IVec2(53,   6));
		this.mBounds[5].AddPoint(new IVec2(55,   6));
		this.mBounds[5].AddPoint(new IVec2(59,   8));
		this.mBounds[5].AddPoint(new IVec2(59,  31));
		this.mBounds[5].AddPoint(new IVec2(31,  45));
		this.mBounds[5].AddPoint(new IVec2(28,  45));
		this.mBounds[5].AddPoint(new IVec2( 0,  31));
	}
	
	{
		this.mBounds[6] = new Shape();
		this.mBounds[6].mPos.Set(			0,  14);
		this.mBounds[6].AddPoint(new IVec2(28, -14));
		this.mBounds[6].AddPoint(new IVec2(31, -14));
		this.mBounds[6].AddPoint(new IVec2(59,   0));
		this.mBounds[6].AddPoint(new IVec2(59,  31));
		this.mBounds[6].AddPoint(new IVec2(31,  45));
		this.mBounds[6].AddPoint(new IVec2(28,  45));
		this.mBounds[6].AddPoint(new IVec2( 0,  31));
	}
	
	{
		this.mBounds[7] = new Shape();
		this.mBounds[7].mPos.Set(0, 0);
	}
	
	{
		this.mBounds[8] = new Shape();
		this.mBounds[8].mPos.Set(			0,  38);
		this.mBounds[8].AddPoint(new IVec2( 6,  -2));
		this.mBounds[8].AddPoint(new IVec2(24, -20));
		this.mBounds[8].AddPoint(new IVec2(28, -22));
		this.mBounds[8].AddPoint(new IVec2(31, -22));
		this.mBounds[8].AddPoint(new IVec2(59,  -8));
		this.mBounds[8].AddPoint(new IVec2(59,   7));
		this.mBounds[8].AddPoint(new IVec2(31,  21));
		this.mBounds[8].AddPoint(new IVec2(28,  21));
		this.mBounds[8].AddPoint(new IVec2( 0,   7));
	}
	
	{
		this.mBounds[10] = new Shape();
		this.mBounds[10].mPos.Set(			 0,  30);
		this.mBounds[10].AddPoint(new IVec2( 6,  -2));
		this.mBounds[10].AddPoint(new IVec2(24, -20));
		this.mBounds[10].AddPoint(new IVec2(28, -22));
		this.mBounds[10].AddPoint(new IVec2(31, -22));
		this.mBounds[10].AddPoint(new IVec2(59,  -8));
		this.mBounds[10].AddPoint(new IVec2(59,  15));
		this.mBounds[10].AddPoint(new IVec2(31,  29));
		this.mBounds[10].AddPoint(new IVec2(28,  29));
		this.mBounds[10].AddPoint(new IVec2( 0,  15));
	}
	
	{
		this.mBounds[12] = new Shape();
		this.mBounds[12].mPos.Set(			 0,  22);
		this.mBounds[12].AddPoint(new IVec2( 6,  -2));
		this.mBounds[12].AddPoint(new IVec2(24, -20));
		this.mBounds[12].AddPoint(new IVec2(28, -22));
		this.mBounds[12].AddPoint(new IVec2(31, -22));
		this.mBounds[12].AddPoint(new IVec2(59,  -8));
		this.mBounds[12].AddPoint(new IVec2(59,  23));
		this.mBounds[12].AddPoint(new IVec2(31,  37));
		this.mBounds[12].AddPoint(new IVec2(28,  37));
		this.mBounds[12].AddPoint(new IVec2( 0,  23));
	}
	
	{
		this.mBounds[15] = new Shape();
		this.mBounds[15].mPos.Set(			 0,  38);
		this.mBounds[15].AddPoint(new IVec2(28, -14));
		this.mBounds[15].AddPoint(new IVec2(31, -14));
		this.mBounds[15].AddPoint(new IVec2(39, -10));
		this.mBounds[15].AddPoint(new IVec2(55, -10));
		this.mBounds[15].AddPoint(new IVec2(59,  -8));
		this.mBounds[15].AddPoint(new IVec2(59,   7));
		this.mBounds[15].AddPoint(new IVec2(31,  21));
		this.mBounds[15].AddPoint(new IVec2(28,  21));
		this.mBounds[15].AddPoint(new IVec2( 0,   7));
	}
	
	{
		this.mBounds[17] = new Shape();
		this.mBounds[17].mPos.Set(			 0,  30);
		this.mBounds[17].AddPoint(new IVec2(28, -14));
		this.mBounds[17].AddPoint(new IVec2(31, -14));
		this.mBounds[17].AddPoint(new IVec2(39, -10));
		this.mBounds[17].AddPoint(new IVec2(55, -10));
		this.mBounds[17].AddPoint(new IVec2(59,  -8));
		this.mBounds[17].AddPoint(new IVec2(59,  15));
		this.mBounds[17].AddPoint(new IVec2(31,  29));
		this.mBounds[17].AddPoint(new IVec2(28,  29));
		this.mBounds[17].AddPoint(new IVec2( 0,  15));
	}
	
	{
		this.mBounds[19] = new Shape();
		this.mBounds[19].mPos.Set(			 0,  22);
		this.mBounds[19].AddPoint(new IVec2(28, -14));
		this.mBounds[19].AddPoint(new IVec2(31, -14));
		this.mBounds[19].AddPoint(new IVec2(39, -10));
		this.mBounds[19].AddPoint(new IVec2(55, -10));
		this.mBounds[19].AddPoint(new IVec2(59,  -8));
		this.mBounds[19].AddPoint(new IVec2(59,  23));
		this.mBounds[19].AddPoint(new IVec2(31,  37));
		this.mBounds[19].AddPoint(new IVec2(28,  37));
		this.mBounds[19].AddPoint(new IVec2( 0,  23));
	}
	
	{
		this.mBounds[22] = new Shape();
		this.mBounds[22].mPos.Set(			 0,  30);
		this.mBounds[22].AddPoint(new IVec2( 4,  -2));
		this.mBounds[22].AddPoint(new IVec2(20,  -2));
		this.mBounds[22].AddPoint(new IVec2(28,  -6));
		this.mBounds[22].AddPoint(new IVec2(31,  -6));
		this.mBounds[22].AddPoint(new IVec2(59,   8));
		this.mBounds[22].AddPoint(new IVec2(59,  15));
		this.mBounds[22].AddPoint(new IVec2(31,  29));
		this.mBounds[22].AddPoint(new IVec2(28,  29));
		this.mBounds[22].AddPoint(new IVec2( 0,  15));
	}
	
	{
		this.mBounds[24] = new Shape();
		this.mBounds[24].mPos.Set(			 0,  22);
		this.mBounds[24].AddPoint(new IVec2( 4,  -2));
		this.mBounds[24].AddPoint(new IVec2(20,  -2));
		this.mBounds[24].AddPoint(new IVec2(28,  -6));
		this.mBounds[24].AddPoint(new IVec2(31,  -6));
		this.mBounds[24].AddPoint(new IVec2(59,   8));
		this.mBounds[24].AddPoint(new IVec2(59,  23));
		this.mBounds[24].AddPoint(new IVec2(31,  37));
		this.mBounds[24].AddPoint(new IVec2(28,  37));
		this.mBounds[24].AddPoint(new IVec2( 0,  23));
	}
	
	{
		this.mBounds[26] = new Shape();
		this.mBounds[26] = new Shape();
		this.mBounds[26].mPos.Set(			 0,  14);
		this.mBounds[26].AddPoint(new IVec2( 4,  -2));
		this.mBounds[26].AddPoint(new IVec2(20,  -2));
		this.mBounds[26].AddPoint(new IVec2(28,  -6));
		this.mBounds[26].AddPoint(new IVec2(31,  -6));
		this.mBounds[26].AddPoint(new IVec2(59,   8));
		this.mBounds[26].AddPoint(new IVec2(59,  31));
		this.mBounds[26].AddPoint(new IVec2(31,  45));
		this.mBounds[26].AddPoint(new IVec2(28,  45));
		this.mBounds[26].AddPoint(new IVec2( 0,  31));
	}
	
	{
		this.mBounds[32] = new Shape();
		this.mBounds[32].mPos.Set(			0,  22);
		this.mBounds[32].AddPoint(new IVec2(28, -14));
		this.mBounds[32].AddPoint(new IVec2(31, -14));
		this.mBounds[32].AddPoint(new IVec2(59,   0));
		this.mBounds[32].AddPoint(new IVec2(59,  23));
		this.mBounds[32].AddPoint(new IVec2(31,  37));
		this.mBounds[32].AddPoint(new IVec2(28,  37));
		this.mBounds[32].AddPoint(new IVec2( 0,  23));
	}
	
	{
		this.mBounds[33] = new Shape();
		this.mBounds[33].mPos.Set(			0,  30);
		this.mBounds[33].AddPoint(new IVec2(28, -14));
		this.mBounds[33].AddPoint(new IVec2(31, -14));
		this.mBounds[33].AddPoint(new IVec2(59,   0));
		this.mBounds[33].AddPoint(new IVec2(59,  15));
		this.mBounds[33].AddPoint(new IVec2(31,  29));
		this.mBounds[33].AddPoint(new IVec2(28,  29));
		this.mBounds[33].AddPoint(new IVec2( 0,  15));
	}
	
	{
		this.mBounds[34] = new Shape();
		this.mBounds[34].mPos.Set(			0,  38);
		this.mBounds[34].AddPoint(new IVec2(28, -14));
		this.mBounds[34].AddPoint(new IVec2(31, -14));
		this.mBounds[34].AddPoint(new IVec2(59,   0));
		this.mBounds[34].AddPoint(new IVec2(59,   7));
		this.mBounds[34].AddPoint(new IVec2(31,  21));
		this.mBounds[34].AddPoint(new IVec2(28,  21));
		this.mBounds[34].AddPoint(new IVec2( 0,  7));
	}
};
// ...End


