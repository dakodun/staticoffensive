var nweb = new function() {
	this.lightTog = new LightToggle();
};

function LightToggle() {
	this.mLightsOn = true;
};

LightToggle.prototype.Toggle = function() {
	this.mLightsOn = !this.mLightsOn;
	
	if (this.mLightsOn == true) {
		document.body.style.backgroundColor = "#A3B2C2";
		document.body.style.backgroundImage = "url('web/backgroundtile.png')";
		document.getElementById("decobottom").src = "web/decobottom.png";
		document.getElementById("frontbuffer").style.borderColor = "#77A03B";
		document.getElementById("backbuffer").style.borderColor = "#77A03B";
		document.getElementById("lighttoggle").style.color = "#77A03B";
	}
	else {
		document.body.style.backgroundColor = "#060606";
		document.body.style.backgroundImage = "url('web/backgroundtiledark.png')";
		document.getElementById("decobottom").src = "web/decobottomdark.png";
		document.getElementById("frontbuffer").style.borderColor = "#273414";
		document.getElementById("backbuffer").style.borderColor = "#273414";
		document.getElementById("lighttoggle").style.color = "#273414";
	}
};
// ...End

