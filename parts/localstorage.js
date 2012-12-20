// LocalStorage Class...
// 
function LocalStorage() {
	
};

LocalStorage.prototype.IsSupported = function() {
	if (typeof(Storage) !== "undefined") {
		return true;
	}
	
	return false;
}

LocalStorage.prototype.Save = function(key, data, overwrite) {
	if (localStorage[key] == null || overwrite == true) {
		localStorage[key] = data;
	}
}

LocalStorage.prototype.Load = function(key) {
	return localStorage[key];
}

LocalStorage.prototype.Exists = function(key) {
	if (localStorage[key] != null) {
		return true;
	}
	
	return false;
}
// ...End

