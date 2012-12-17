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

