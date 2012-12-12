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
								
								var collision = false;
								for (var m = 0; m < map.mSegments.length; ++m) {
									/* alert(map.mSegments[m].mMapSegment.mPos.Output() + " " + map.mSegments[m].mMapSegment.mSize.Output() + " " +
											seg.mPos.Output()  + " " + seg.mSize.Output()); */
									
									if (util.RectangleCollision(map.mSegments[m].mMapSegment.mPos, 
											map.mSegments[m].mMapSegment.mSize, seg.mPos, seg.mSize, false) == true) { // no collisions
										
										collision = true
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

