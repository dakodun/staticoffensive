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
			down 	: 40
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
}

// handle key down
InputManager.prototype.HandleKeyDown = function(e) {
	// if key was previously up
	if (this.mKeyStates[e.keyCode] == 0) {
		this.mKeyStates[e.keyCode] = 2; // key is now pressed (note: not down)
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
	return second.mResName < first.mResName;
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
	this.mTexQueue = new Array(); // the queue of unprocessed resources
	
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

// processes all resources currently in the queue
ResourceLoader.prototype.AcquireResources = function() {
	this.mWorking = true; // indicate we are currently working
	
	// for all textures in the queue
	for (var i = 0; i < this.mTexQueue.length; ++i) {
		// add texture to resource manager and load the associated image
		var tex = nmgrs.resMan.mTexStore.AddResource(new Texture(), this.mTexQueue[i].mResName);
		tex.LoadFromFile(this.mTexQueue[i].mResLocation);
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
		
		// if our unprocessed queue is now empty
		if (this.mTexQueue.length == 0) {
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


// Text Class...
// renderable text
function Text() {
	this.mFont = "12px Arial";
	this.mFontSize = "12";
	this.mFontName = "Arial";
	
	this.mString = "";
	this.mColour = "#FFFFFF";
	this.mShadowColour = "#000000";
	this.mDepth = 0;
	
	this.mPos = new IVec2(0, 12);
	this.mOutline = false;
	this.mShadow = false;
	this.mRotation = 0;
	this.mHeight = 12;
}

// returns the type of this object for validity checking
Text.prototype.Type = function() {
	return "Text";
}

// make a copy of another (other) text (copy constructor)
Text.prototype.Copy = function(other) {
	this.mFont = other.mFont;
	this.mFontSize = other.mFontSize;
	this.mFontName = other.mFontName;
	
	this.mString = other.mString;
	this.mColour = other.mColour;
	this.mShadowColour = other.mShadowColour;
	this.mDepth = other.mDepth;
	
	this.mPos.Copy(other.mPos);
	this.mOutline = other.mOutline;
	this.mShadow = other.mShadow;
	this.mRotation = other.mRotation;
	this.mHeight = other.mHeight;
}

// return the width of the text
Text.prototype.GetWidth = function() {
	nmain.game.mCurrContext.font = this.mFont;
	
	var txtArr = this.mString.split("\n");
	var longest = 0;
	for (var i = 0; i < txtArr.length; ++i) {
		var strLen = nmain.game.mCurrContext.measureText(txtArr[i]).width;
		if (strLen > longest) {
			longest = strLen;
		}
	}
	
	return strLen;
}

// return the height of the text
Text.prototype.GetHeight = function() {
	var txtArr = this.mString.split("\n");
	return this.mHeight * txtArr.length;
}

// 
Text.prototype.SetFontSize = function(size) {
	this.mFontSize = size.toString();
	this.mFont = this.mFontSize + "px " + this.mFontName;
	this.mHeight = size;
}

// 
Text.prototype.SetFontName = function(name) {
	this.mFontName = name;
	this.mFont = this.mFontSize + " " + this.mFontName;
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
	
	this.mPoints = other.mPoints;
}

// 
Shape.prototype.Reset = function() {
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
};

// returns the type of this object for validity checking
Sprite.prototype.Type = function() {
	return "Sprite";
}

// make a copy of another (other) sprite (copy constructor)
Sprite.prototype.Copy = function(other) {
	this.mTex = other.mTex ;
	this.mDepth = other.mDepth;
	
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


// DepthSort function
// sorts renderable resources based on depth
function DepthSort(first, second) {
	var result = second.mDepth - first.mDepth;
	
	return result;
};
// ...End

// RenderBatch Class...
// a render batch handles all drawing operations and draws according to depth (z) values
function RenderBatch() {
	this.mRenderData = new Array();
	
	this.mNeedSort = false;
}

// initialise the render batch
RenderBatch.prototype.SetUp = function() {
	
}

// clean up the render batch
RenderBatch.prototype.TearDown = function() {
	
}

RenderBatch.prototype.Add = function(object) {
	if (object.Type() == "Sprite") {
		this.AddSprite(object);
	}
	else if (object.Type() == "Text") {
		this.AddText(object);
	}
	else if (object.Type() == "Shape") {
		this.AddShape(object);
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

// clear the render batch
RenderBatch.prototype.Clear = function() {
	this.mRenderData.splice(0, this.mRenderData.length);
}

// render the render batch to the context
RenderBatch.prototype.Render = function(camera) {
	var cam = new Camera();
	if (camera) {
		cam.Copy(camera);
	}
	
	if (this.mNeedSort == true) {
		this.mRenderData.sort(DepthSort); // sort the queue
		this.mNeedSort = false;
	}
	
	var scrTL = new IVec2(0 + cam.mTranslate.mX, 0 + cam.mTranslate.mY);
	var scrBR = new IVec2(nmain.game.mCanvasSize.mX + cam.mTranslate.mX, nmain.game.mCanvasSize.mY + cam.mTranslate.mY);
	
	for (var i = 0; i < this.mRenderData.length; ++i) {
		nmain.game.mCurrContext.save();
		
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
				var oldAlpha = nmain.game.mCurrContext.globalAlpha;
				nmain.game.mCurrContext.globalAlpha = spr.mAlpha;
				
				nmain.game.mCurrContext.translate(spr.GetPosition().mX, spr.GetPosition().mY);
				nmain.game.mCurrContext.rotate(spr.mRotation * (Math.PI / 180));
				
				nmain.game.mCurrContext.drawImage(spr.mTex.mImg, spr.mClipPos.mX, spr.mClipPos.mY,
						spr.mClipSize.mX, spr.mClipSize.mY, 0, 0,
						spr.GetWidth() * spr.mScale.mX, spr.GetHeight() * spr.mScale.mY);
				
				nmain.game.mCurrContext.globalAlpha = oldAlpha;
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
				nmain.game.mCurrContext.font = txt.mFont;
				nmain.game.mCurrContext.strokeStyle = txt.mColour;
				
				nmain.game.mCurrContext.translate(txt.mPos.mX, txt.mPos.mY + txt.mHeight);
				nmain.game.mCurrContext.rotate(txt.mRotation * (Math.PI / 180));
				
				if (txt.mOutline == true) {
					for (var j = 0; j < txtArr.length; ++j) {
						nmain.game.mCurrContext.strokeText(txtArr[j], 0, txt.mHeight * j);
					}
				}
				else {
					for (var j = 0; j < txtArr.length; ++j) {
						if (txt.mShadow == true) {
							nmain.game.mCurrContext.fillStyle = txt.mShadowColour;
							nmain.game.mCurrContext.fillText(txtArr[j], 2, (txt.mHeight * j) + 2);
						}
						
						nmain.game.mCurrContext.fillStyle = txt.mColour;
						nmain.game.mCurrContext.fillText(txtArr[j], 0, txt.mHeight * j);
					}
				}
			}
		}
		else if (this.mRenderData[i].Type() == "Shape") {
			var shp = this.mRenderData[i];
			var pos = shp.GetPosition();
			
			var shpTL = new IVec2(shp.mPos.mX, shp.mPos.mY);
			var shpBR = new IVec2(shp.mPos.mX + shp.GetWidth(), shp.mPos.mY + shp.GetHeight());
			
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
				nmain.game.mCurrContext.fillStyle = shp.mColour;
				nmain.game.mCurrContext.strokeStyle = shp.mColour;
				var oldAlpha = nmain.game.mCurrContext.globalAlpha;
				nmain.game.mCurrContext.globalAlpha = shp.mAlpha;
				
				nmain.game.mCurrContext.beginPath();
				nmain.game.mCurrContext.moveTo(pos.mX, pos.mY);
				
				for (var j = 0; j < shp.mPoints.length; ++j) {
					var pt = new IVec2();
					pt.Copy(shp.mPoints[j]);
					nmain.game.mCurrContext.lineTo(pos.mX + pt.mX, pos.mY + pt.mY);
				}
				
				nmain.game.mCurrContext.closePath();
				
				if (shp.mOutline == false) {
					nmain.game.mCurrContext.fill();
				}
				else {
					nmain.game.mCurrContext.stroke();
				}
				
				nmain.game.mCurrContext.globalAlpha = oldAlpha;
			}
		}
		
		nmain.game.mCurrContext.restore();
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
	this.mTranslate.Set(this.mTranslate.mX - trans.mX, this.mTranslate.mY - trans.mY);
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
		nmgrs.resLoad.QueueTexture("tileset_test", "./res/vis/tileset_test.png");
		
		nmgrs.resLoad.QueueTexture("gui_map_compassmain", "./res/vis/gui_map_compassmain.png");
		nmgrs.resLoad.QueueTexture("gui_map_compassextra", "./res/vis/gui_map_compassextra.png");
		nmgrs.resLoad.QueueTexture("gui_map_zlevelmain", "./res/vis/gui_map_zlevelmain.png");
		nmgrs.resLoad.QueueTexture("gui_map_zlevelextra", "./res/vis/gui_map_zlevelextra.png");
		
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
		nmgrs.sceneMan.ChangeScene(new GFTestScene());
	}
}

// handles all drawing tasks
InitScene.prototype.Render = function() {
	
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
};

// initialises the game object
Game.prototype.SetUp = function() {
	// add front buffer context
	this.mCanvas.push(document.getElementById("frontbuffer"));
	this.mContext.push(this.mCanvas[0].getContext("2d"));
	
	// add back buffer context
	this.mCanvas.push(document.getElementById("backbuffer"));
	this.mContext.push(this.mCanvas[1].getContext("2d"));
	
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

// GFBluePrintTile Class...
// game file: 
function GFBluePrintTile() {
	this.mPos = new IVec2(0, 0);
	
	this.mZ = 0;
	this.mSpecial = 0;
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
	var rows = bpstring.split('r');
	var tiles = new Array();
	
	if (rows.length > 0) {
		{
			var cols = rows[0].split('c');
			this.mSize.Set(cols.length, rows.length);
		}
		
		for (var i = 0; i < rows.length; ++i) {
			var split = rows[i].split('c');
			tiles = tiles.concat(split);
		}
		
		var id = 0;
		for (var y = 0; y < this.mSize.mY; ++y) {
			for (var x = 0; x < this.mSize.mX; ++x) {
				var bpTile = new GFBluePrintTile();
				bpTile.mPos.Set(x, y);
				bpTile.mZ = Number(tiles[id].charAt(0));
				bpTile.mSpecial = Number(tiles[id].charAt(1));
				this.mTiles.push(bpTile);
				id++;
			}
		}
	}
}
// ...End


// GFBluePrintContainer Class...
// game file: 
function GFBluePrintContainer() {
	this.mInitialBluePrints = new Array();
	this.mRegularBluePrints = new Array();
	this.mFinalBluePrints = new Array();
};

GFBluePrintContainer.prototype.SetUp = function() {
	var initArr = new Array();
	initArr.push("00c02c00r02c00c02r00c02c00");
	for (var i = 0; i < initArr.length; ++i) {
		var bp = new GFBluePrint();
		bp.SetUp(initArr[i]);
		this.mInitialBluePrints.push(bp);
	}
	
	var regArr = new Array();
	regArr.push("01c02c01r02c00c02r01c02c01");
	for (var i = 0; i < regArr.length; ++i) {
		var bp = new GFBluePrint();
		bp.SetUp(regArr[i]);
		this.mRegularBluePrints.push(bp);
	}
	
	var finArr = new Array();
	finArr.push("01c01r01c01");
	for (var i = 0; i < finArr.length; ++i) {
		var bp = new GFBluePrint();
		bp.SetUp(finArr[i]);
		this.mFinalBluePrints.push(bp);
	}
}
// ...End


// GFMap Class...
// game file: 
function GFMap() {
	
};

GFMap.prototype.SetUp = function() {
	// takes array of segments which already have offsets and everything set
	// adds them all to a global array or something farts
}
// ...End


// GFMapSegment Class...
// game file: a segment (or piece) of a map
function GFMapSegment() {
	this.mPos = new IVec2(0, 0); // the position (offset) of this map segment with the entire map
	this.mSize = new IVec2(0, 0); // the dimensions of this map segment (in terms of tile numbers, not pixels)
	this.mTiles = new Array(); // an array of the tile objects that make up this map segment
	
	this.mCurrZLevel = 3;
};

GFMapSegment.prototype.SetUp = function(blueprint) {
	var tex = nmgrs.resMan.mTexStore.GetResource("tileset_test");
	this.mSize.Copy(blueprint.mSize);
	
	for (var i = 0; i < blueprint.mTiles.length; ++i) {
		var tile = new GFMapTile();
		tile.mLocalPos.Copy(blueprint.mTiles[i].mPos);
		tile.mGlobalPos.Set(tile.mLocalPos.mX + this.mPos.mX, tile.mLocalPos.mY + this.mPos.mY);
		tile.mZ = blueprint.mTiles[i].mZ;
		tile.mSpecial = blueprint.mTiles[i].mSpecial;
		
		tile.SetUp(tex);
		
		this.mTiles.push(tile);
	}
}

// returns the appropiate render data
GFMapSegment.prototype.GetRenderData = function(renderLevel) {
	var arr = new Array(); // an array to store our render data
	
	// for our entire map segment array
	for (var i = 0; i < this.mTiles.length; ++i) {
		arr = arr.concat(this.mTiles[i].GetRenderData(renderLevel)); // get and add the render data returned by the tile
	}
	
	return arr; // return the retrieved render data
}


GFMapSegment.prototype.ChangeZLevel = function(newLevel) {
	if (this.mCurrZLevel + newLevel <= 3 && this.mCurrZLevel + newLevel >= 0) {
		this.mCurrZLevel += newLevel;
		// for our entire map segment array
		for (var i = 0; i < this.mTiles.length; ++i) {
			this.mTiles[i].ChangeZLevel(this.mCurrZLevel);
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
	this.mSpecial = 0;
	this.mSlopeDirection = 0;
	
	this.mSprite = new Sprite();
	this.mTileFrame = 0;
};

GFMapTile.prototype.SetUp = function(tex) {
	var x = (this.mGlobalPos.mX * 28) + (this.mGlobalPos.mY * 28);
	var y = (this.mGlobalPos.mX * -14) + (this.mGlobalPos.mY * 14);
	
	this.mSprite.SetAnimatedTexture(tex, 35, 7, -1, -1);
	this.mSprite.mPos.Set(x, y);
	this.mSprite.mDepth = 2500 - (this.mGlobalPos.mY * 2) + this.mGlobalPos.mX;
	this.mTileFrame = this.mZ;
	
	if (this.mZ % 2 != 0) {
		this.mTileFrame = this.mZ + (this.mSprite.mFramesPerLine * this.mSlopeDirection);
	}
	
	this.mSprite.SetCurrentFrame(this.mTileFrame);
}

GFMapTile.prototype.GetRenderData = function(renderLevel) {
	var arr = new Array(); // an array to store our render data
	
	arr.push(this.mSprite);
	
	return arr;
}

GFMapTile.prototype.ChangeZLevel = function(newLevel) {
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
// ...End

// GFTestScene Class...
// game file:
function GFTestScene() {
	this.mPersist = false;
	
	this.mRand = new RNG(0);
	
	this.mCam = new Camera();
	this.mBatch = new RenderBatch();
	this.mMapSegment = new GFMapSegment();
	
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
	this.mCam.Translate(new IVec2(60, 100));
	nmain.game.mClearColour = "#75632F";
	
	var bp = new GFBluePrint(); bp.SetUp("20c40c60r10c00c00r00c00c00");
	this.mMapSegment.mPos.Set(0, 6); this.mMapSegment.SetUp(bp);
	
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
	
	this.mCam.Process();
}

// handles all drawing tasks
GFTestScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mCam.Apply();
	
	this.mBatch.Clear();
	
	var arr = new Array();
	arr = arr.concat(this.mMapSegment.GetRenderData(0));
	arr = arr.concat(this.mMapControl.GetRenderData());
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(this.mCam);
}
// ...End


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
	
	this.mCompassExtra = new Sprite();
	this.mZLevelExtra = new Sprite();
	
	this.mTranslate = new IVec2(0, 0);
}

GFGUIMapControl.prototype.SetUp = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	var initOffset = new IVec2();
	initOffset.Copy(currScene.mCam.mTranslate);
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_compassmain");
		
		{
			this.mCompassMain[0].SetUp(new IVec2(512 + initOffset.mX, 10 + initOffset.mY), new IVec2(40, 22), -5000);
			this.mCompassMain[0].mPos.Set(512, 10);
			
			this.mCompassMain[0].mSpriteIdle.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mCompassMain[0].mSpriteHover.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[0].mSpriteHover.SetCurrentFrame(1);
			
			this.mCompassMain[0].mSpriteDown.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[0].mSpriteDown.SetCurrentFrame(2);
			
			this.mCompassMain[0].mSpriteInactive.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mCompassMain[1].SetUp(new IVec2(584 + initOffset.mX, 10 + initOffset.mY), new IVec2(40, 22), -5000);
			this.mCompassMain[1].mPos.Set(584, 10);
			
			this.mCompassMain[1].mSpriteIdle.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[1].mSpriteIdle.SetCurrentFrame(3);
			
			this.mCompassMain[1].mSpriteHover.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[1].mSpriteHover.SetCurrentFrame(4);
			
			this.mCompassMain[1].mSpriteDown.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[1].mSpriteDown.SetCurrentFrame(5);
			
			this.mCompassMain[1].mSpriteInactive.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[1].mSpriteInactive.SetCurrentFrame(3);
		}
		
		{
			this.mCompassMain[2].SetUp(new IVec2(512 + initOffset.mX, 46 + initOffset.mY), new IVec2(40, 22), -5000);
			this.mCompassMain[2].mPos.Set(512, 46);
			
			this.mCompassMain[2].mSpriteIdle.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[2].mSpriteIdle.SetCurrentFrame(6);
			
			this.mCompassMain[2].mSpriteHover.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[2].mSpriteHover.SetCurrentFrame(7);
			
			this.mCompassMain[2].mSpriteDown.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[2].mSpriteDown.SetCurrentFrame(8);
			
			this.mCompassMain[2].mSpriteInactive.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[2].mSpriteInactive.SetCurrentFrame(6);
		}
		
		{
			this.mCompassMain[3].SetUp(new IVec2(584 + initOffset.mX, 46 + initOffset.mY), new IVec2(40, 22), -5000);
			this.mCompassMain[3].mPos.Set(584, 46);
			
			this.mCompassMain[3].mSpriteIdle.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[3].mSpriteIdle.SetCurrentFrame(9);
			
			this.mCompassMain[3].mSpriteHover.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[3].mSpriteHover.SetCurrentFrame(10);
			
			this.mCompassMain[3].mSpriteDown.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[3].mSpriteDown.SetCurrentFrame(11);
			
			this.mCompassMain[3].mSpriteInactive.SetAnimatedTexture(tex, 12, 3, -1, -1);
			this.mCompassMain[3].mSpriteInactive.SetCurrentFrame(9);
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_zlevelmain");
		
		{
			this.mZLevelMain[0].SetUp(new IVec2(422 + initOffset.mX, 10 + initOffset.mY), new IVec2(38, 22), -5000);
			this.mZLevelMain[0].mPos.Set(422, 10);
			
			this.mZLevelMain[0].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[0].mSpriteIdle.SetCurrentFrame(0);
			
			this.mZLevelMain[0].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[0].mSpriteHover.SetCurrentFrame(1);
			
			this.mZLevelMain[0].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[0].mSpriteDown.SetCurrentFrame(2);
			
			this.mZLevelMain[0].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[0].mSpriteInactive.SetCurrentFrame(0);
		}
		
		{
			this.mZLevelMain[1].SetUp(new IVec2(422 + initOffset.mX, 46 + initOffset.mY), new IVec2(38, 22), -5000);
			this.mZLevelMain[1].mPos.Set(422, 46);
			
			this.mZLevelMain[1].mSpriteIdle.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[1].mSpriteIdle.SetCurrentFrame(3);
			
			this.mZLevelMain[1].mSpriteHover.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[1].mSpriteHover.SetCurrentFrame(4);
			
			this.mZLevelMain[1].mSpriteDown.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[1].mSpriteDown.SetCurrentFrame(5);
			
			this.mZLevelMain[1].mSpriteInactive.SetAnimatedTexture(tex, 6, 3, -1, -1);
			this.mZLevelMain[1].mSpriteInactive.SetCurrentFrame(3);
		}
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_compassextra");
		
		this.mCompassExtra.mPos.Set(554 + initOffset.mX, 32 + initOffset.mY);
		this.mCompassExtra.mDepth = -5000;
		this.mCompassExtra.SetTexture(tex);
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gui_map_zlevelextra");
		
		this.mZLevelExtra.mPos.Set(468 + initOffset.mX, 6 + initOffset.mY);
		this.mZLevelExtra.mDepth = -5000;
		this.mZLevelExtra.SetAnimatedTexture(tex, 4, 4, -1, -1);
		this.mZLevelExtra.SetCurrentFrame(3);
	}
};

GFGUIMapControl.prototype.Input = function() {
	{ // map scrolling
		{ // keyboard input
			var trans = new IVec2(0, 0);
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.up)) {
				trans.mX += -2; trans.mY += -1;
			}
			
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.right)) {
				trans.mX += 2; trans.mY += -1;
			}
			
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.down)) {
				trans.mX += 2; trans.mY += 1;
			}
			
			if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.left)) {
				trans.mX += -2; trans.mY += 1;
			}
			
			this.mTranslate.Copy(trans);
		}
		
		// mouse input (gui button)
		for (var i = 0; i < this.mCompassMain.length; ++i) {
			this.mCompassMain[i].Input();
		}
	}
	
	{ // map z-level control
		var currScene = nmgrs.sceneMan.mCurrScene;
		{ // keyboard input
			if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.q)) {
				currScene.mMapSegment.ChangeZLevel(-1);
				this.mZLevelExtra.SetCurrentFrame(currScene.mMapSegment.mCurrZLevel);
			}
			
			if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.e)) {
				currScene.mMapSegment.ChangeZLevel(1);
				this.mZLevelExtra.SetCurrentFrame(currScene.mMapSegment.mCurrZLevel);
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
	
	// process any neccesary keyboard translation
	if (this.mTranslate.mX != 0 || this.mTranslate.mY != 0) {
		currScene.mCam.Translate(this.mTranslate);
	}
	
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
		if (this.mCompassMain[0].mDown == true) {
			currScene.mCam.Translate(new IVec2(-2, -1));
			this.mTranslate.mX -= 2; this.mTranslate.mY -= 1;
		}
		else if (this.mCompassMain[1].mDown == true) {
			currScene.mCam.Translate(new IVec2(2, -1));
			this.mTranslate.mX += 2; this.mTranslate.mY -= 1;
		}
		else if (this.mCompassMain[2].mDown == true) {
			currScene.mCam.Translate(new IVec2(-2, 1));
			this.mTranslate.mX -= 2; this.mTranslate.mY += 1;
		}
		else if (this.mCompassMain[3].mDown == true) {
			currScene.mCam.Translate(new IVec2(2, 1));
			this.mTranslate.mX += 2; this.mTranslate.mY += 1;
		}
	}
	
	{ // handle main zlevel gui elements being pressed
		if (this.mZLevelMain[0].OnClick() == true) {
			currScene.mMapSegment.ChangeZLevel(1);
			this.mZLevelExtra.SetCurrentFrame(currScene.mMapSegment.mCurrZLevel);
		}
		else if (this.mZLevelMain[1].OnClick() == true) {
			currScene.mMapSegment.ChangeZLevel(-1);
			this.mZLevelExtra.SetCurrentFrame(currScene.mMapSegment.mCurrZLevel);
		}
	}
	
	// if the camera view has changed
	if (currScene.mCam.mViewUpdated == true) {
		// for all main compass gui elements
		for (var i = 0; i < this.mCompassMain.length; ++i) {
			// find new position using translation offset and update gui to remain at same point on screen
			var newPos = new IVec2(0, 0); newPos.Copy(this.mCompassMain[i].GetSpritePositions());
			newPos.mX -= this.mTranslate.mX; newPos.mY -= this.mTranslate.mY;
			this.mCompassMain[i].SetSpritePositions(newPos);
		}
		
		// for all main zlevel gui elements
		for (var i = 0; i < this.mZLevelMain.length; ++i) {
			// find new position using translation offset and update gui to remain at same point on screen
			var newPos = new IVec2(0, 0); newPos.Copy(this.mZLevelMain[i].GetSpritePositions());
			newPos.mX -= this.mTranslate.mX; newPos.mY -= this.mTranslate.mY;
			this.mZLevelMain[i].SetSpritePositions(newPos);
		}
		
		{
			this.mCompassExtra.mPos.Set(554 + currScene.mCam.mTranslate.mX, 32 + currScene.mCam.mTranslate.mY);
			this.mZLevelExtra.mPos.Set(468 + currScene.mCam.mTranslate.mX, 6 + currScene.mCam.mTranslate.mY);
		}
	}
}

GFGUIMapControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	// for all main compass gui elements
	for (var i = 0; i < this.mCompassMain.length; ++i) {
		arr = arr.concat(this.mCompassMain[i].GetRenderData()); // add to render
	}
	
	// for all main zlevel gui elements
	for (var i = 0; i < this.mZLevelMain.length; ++i) {
		arr = arr.concat(this.mZLevelMain[i].GetRenderData()); // add to render
	}
	
	// add extra compass gui
	arr.push(this.mCompassExtra);
	
	// add extra zlevel gui
	arr.push(this.mZLevelExtra);
	
	return arr;
}
// ...End

