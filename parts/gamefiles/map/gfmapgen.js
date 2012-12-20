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

