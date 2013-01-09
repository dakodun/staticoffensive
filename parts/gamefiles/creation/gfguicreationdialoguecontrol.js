// GFGUICreationDialogueControl Class...
// game file:
function GFGUICreationDialogueControl() {
	this.mDialogues = new Array();
	this.mDialogues["new"] = new GFGUICreationNewDialogue();
	this.mDialogues["save"] = new GFGUICreationSaveDialogue();
	this.mDialogues["load"] = new GFGUICreationLoadDialogue();
	this.mDialogues["import"] = new GFGUICreationImportDialogue();
	this.mDialogues["export"] = new GFGUICreationExportDialogue();
}

GFGUICreationDialogueControl.prototype.SetUp = function() {
	this.mDialogues["new"].SetUp();
	this.mDialogues["save"].SetUp();
	this.mDialogues["load"].SetUp();
	this.mDialogues["import"].SetUp();
	this.mDialogues["export"].SetUp();
};

GFGUICreationDialogueControl.prototype.Input = function(dialogue) {
	if (this.mDialogues[dialogue] != null) {
		this.mDialogues[dialogue].Input();
	}
}

GFGUICreationDialogueControl.prototype.Process = function(dialogue, point) {
	if (this.mDialogues[dialogue] != null) {
		this.mDialogues[dialogue].Process(point);
	}
}

GFGUICreationDialogueControl.prototype.GetRenderData = function(dialogue) {
	var arr = new Array();
	
	if (this.mDialogues[dialogue] != null) {
		arr = arr.concat(this.mDialogues[dialogue].GetRenderData());
	}
	
	return arr;
}
// ...End

