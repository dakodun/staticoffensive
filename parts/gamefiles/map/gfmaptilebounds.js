// GFMapTileBounds Class...
// game file: 
function GFMapTileBounds() {
	this.mBounds = new Array();
	
	{
		this.mBounds[0] = new Shape();
		this.mBounds[0].mPos.Set(			0,  39);
		this.mBounds[0].AddPoint(new IVec2(31, -15));
		this.mBounds[0].AddPoint(new IVec2(61,   0));
		this.mBounds[0].AddPoint(new IVec2(61,   6));
		this.mBounds[0].AddPoint(new IVec2(30,  21));
		this.mBounds[0].AddPoint(new IVec2( 0,   6));
	}
	
	{
		this.mBounds[1] = new Shape();
		this.mBounds[1].mPos.Set(			0,  31);
		this.mBounds[1].AddPoint(new IVec2(31, -15));
		this.mBounds[1].AddPoint(new IVec2(61,   8));
		this.mBounds[1].AddPoint(new IVec2(61,  14));
		this.mBounds[1].AddPoint(new IVec2(30,  29));
		this.mBounds[1].AddPoint(new IVec2( 0,  14));
	}
		
	{
		this.mBounds[2] = new Shape();
		this.mBounds[2].mPos.Set(			0,  31);
		this.mBounds[2].AddPoint(new IVec2(31, -15));
		this.mBounds[2].AddPoint(new IVec2(61,   0));
		this.mBounds[2].AddPoint(new IVec2(61,  14));
		this.mBounds[2].AddPoint(new IVec2(30,  29));
		this.mBounds[2].AddPoint(new IVec2( 0,  14));
	}
	
	{
		this.mBounds[3] = new Shape();
		this.mBounds[3].mPos.Set(			0,  23);
		this.mBounds[3].AddPoint(new IVec2(31, -15));
		this.mBounds[3].AddPoint(new IVec2(61,  8));
		this.mBounds[3].AddPoint(new IVec2(61,  22));
		this.mBounds[3].AddPoint(new IVec2(30,  37));
		this.mBounds[3].AddPoint(new IVec2( 0,  22));
	}
	
	{
		this.mBounds[4] = new Shape();
		this.mBounds[4].mPos.Set(			0,  23);
		this.mBounds[4].AddPoint(new IVec2(31, -15));
		this.mBounds[4].AddPoint(new IVec2(61,   0));
		this.mBounds[4].AddPoint(new IVec2(61,  22));
		this.mBounds[4].AddPoint(new IVec2(30,  37));
		this.mBounds[4].AddPoint(new IVec2( 0,  22));
	}
	
	{
		this.mBounds[5] = new Shape();
		this.mBounds[5].mPos.Set(			0,  15);
		this.mBounds[5].AddPoint(new IVec2(31, -15));
		this.mBounds[5].AddPoint(new IVec2(61,  8));
		this.mBounds[5].AddPoint(new IVec2(61,  30));
		this.mBounds[5].AddPoint(new IVec2(30,  45));
		this.mBounds[5].AddPoint(new IVec2( 0,  30));
	}
	
	{
		this.mBounds[6] = new Shape();
		this.mBounds[6].mPos.Set(			0,  15);
		this.mBounds[6].AddPoint(new IVec2(31, -15));
		this.mBounds[6].AddPoint(new IVec2(61,   0));
		this.mBounds[6].AddPoint(new IVec2(61,  30));
		this.mBounds[6].AddPoint(new IVec2(30,  45));
		this.mBounds[6].AddPoint(new IVec2( 0,  30));
	}
	
	{
		this.mBounds[7] = new Shape();
		this.mBounds[7].mPos.Set(0, 0);
	}
	
	{
		this.mBounds[8] = new Shape();
		this.mBounds[8].mPos.Set(			0,  39);
		this.mBounds[8].AddPoint(new IVec2(31, -23));
		this.mBounds[8].AddPoint(new IVec2(61,  -8));
		this.mBounds[8].AddPoint(new IVec2(61,   6));
		this.mBounds[8].AddPoint(new IVec2(30,  21));
		this.mBounds[8].AddPoint(new IVec2( 0,   6));
	}
	
	{
		this.mBounds[10] = new Shape();
		this.mBounds[10].mPos.Set(			0,   31);
		this.mBounds[10].AddPoint(new IVec2(31, -23));
		this.mBounds[10].AddPoint(new IVec2(61,  -8));
		this.mBounds[10].AddPoint(new IVec2(61,  14));
		this.mBounds[10].AddPoint(new IVec2(30,  29));
		this.mBounds[10].AddPoint(new IVec2( 0,  14));
	}
	
	{
		this.mBounds[12] = new Shape();
		this.mBounds[12].mPos.Set(			0,   23);
		this.mBounds[12].AddPoint(new IVec2(31, -23));
		this.mBounds[12].AddPoint(new IVec2(61,  -8));
		this.mBounds[12].AddPoint(new IVec2(61,  22));
		this.mBounds[12].AddPoint(new IVec2(30,  37));
		this.mBounds[12].AddPoint(new IVec2( 0,  22));
	}
	
	{
		this.mBounds[15] = new Shape();
		this.mBounds[15].mPos.Set(			0,  39);
		this.mBounds[15].AddPoint(new IVec2(31, -15));
		this.mBounds[15].AddPoint(new IVec2(61,  -8));
		this.mBounds[15].AddPoint(new IVec2(61,   6));
		this.mBounds[15].AddPoint(new IVec2(30,  21));
		this.mBounds[15].AddPoint(new IVec2( 0,   6));
	}
	
	{
		this.mBounds[17] = new Shape();
		this.mBounds[17].mPos.Set(			0,  31);
		this.mBounds[17].AddPoint(new IVec2(31, -15));
		this.mBounds[17].AddPoint(new IVec2(61,  -8));
		this.mBounds[17].AddPoint(new IVec2(61,  14));
		this.mBounds[17].AddPoint(new IVec2(30,  29));
		this.mBounds[17].AddPoint(new IVec2( 0,  14));
	}
	
	{
		this.mBounds[19] = new Shape();
		this.mBounds[19].mPos.Set(			0,  23);
		this.mBounds[19].AddPoint(new IVec2(31, -15));
		this.mBounds[19].AddPoint(new IVec2(61,  -8));
		this.mBounds[19].AddPoint(new IVec2(61,  22));
		this.mBounds[19].AddPoint(new IVec2(30,  37));
		this.mBounds[19].AddPoint(new IVec2( 0,  22));
	}
	
	{
		this.mBounds[22] = new Shape();
		this.mBounds[22].mPos.Set(			0,  31);
		this.mBounds[22].AddPoint(new IVec2(31,  -7));
		this.mBounds[22].AddPoint(new IVec2(61,   8));
		this.mBounds[22].AddPoint(new IVec2(61,  14));
		this.mBounds[22].AddPoint(new IVec2(30,  29));
		this.mBounds[22].AddPoint(new IVec2( 0,  14));
	}
	
	{
		this.mBounds[24] = new Shape();
		this.mBounds[24].mPos.Set(			0,  23);
		this.mBounds[24].AddPoint(new IVec2(31,  -7));
		this.mBounds[24].AddPoint(new IVec2(61,   8));
		this.mBounds[24].AddPoint(new IVec2(61,  22));
		this.mBounds[24].AddPoint(new IVec2(30,  37));
		this.mBounds[24].AddPoint(new IVec2( 0,  22));
	}
	
	{
		this.mBounds[26] = new Shape();
		this.mBounds[26].mPos.Set(			0,  15);
		this.mBounds[26].AddPoint(new IVec2(31,  -7));
		this.mBounds[26].AddPoint(new IVec2(61,   8));
		this.mBounds[26].AddPoint(new IVec2(61,  30));
		this.mBounds[26].AddPoint(new IVec2(30,  45));
		this.mBounds[26].AddPoint(new IVec2( 0,  30));
	}
	
	{
		this.mBounds[32] = new Shape();
		this.mBounds[32].mPos.Set(			0,  23);
		this.mBounds[32].AddPoint(new IVec2(31, -15));
		this.mBounds[32].AddPoint(new IVec2(61,   0));
		this.mBounds[32].AddPoint(new IVec2(61,  22));
		this.mBounds[32].AddPoint(new IVec2(30,  37));
		this.mBounds[32].AddPoint(new IVec2( 0,  22));
	}
	
	{
		this.mBounds[33] = new Shape();
		this.mBounds[33].mPos.Set(			0,  31);
		this.mBounds[33].AddPoint(new IVec2(31, -15));
		this.mBounds[33].AddPoint(new IVec2(61,   0));
		this.mBounds[33].AddPoint(new IVec2(61,  14));
		this.mBounds[33].AddPoint(new IVec2(30,  29));
		this.mBounds[33].AddPoint(new IVec2( 0,  14));
	}
	
	{
		this.mBounds[34] = new Shape();
		this.mBounds[34].mPos.Set(			0,  39);
		this.mBounds[34].AddPoint(new IVec2(31, -15));
		this.mBounds[34].AddPoint(new IVec2(61,   0));
		this.mBounds[34].AddPoint(new IVec2(61,   6));
		this.mBounds[34].AddPoint(new IVec2(30,  21));
		this.mBounds[34].AddPoint(new IVec2( 0,   6));
	}
};
// ...End

