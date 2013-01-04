// LocalStorage Class...
// 
function LocalStorage() {
	this.mLength = localStorage.length;
};

LocalStorage.prototype.IsSupported = function() {
	if (typeof(Storage) !== "undefined") {
		return true;
	}
	
	return false;
}

LocalStorage.prototype.Save = function(key, data, overwrite) {
	try {
		if (localStorage.getItem(key) == null || overwrite == true) {
			localStorage.setItem(key, data);
		}
	} catch (e) {
		return false;
	}
	
	this.mLength = localStorage.length;
	return true;
}

LocalStorage.prototype.Load = function(key) {
	return localStorage.getItem(key);
}

LocalStorage.prototype.Exists = function(key) {
	if (localStorage.getItem(key) != null) {
		return true;
	}
	
	return false;
}

LocalStorage.prototype.Delete = function(key) {
	localStorage.removeItem(key);
	this.mLength = localStorage.length;
}

LocalStorage.prototype.Clear = function() {
	localStorage.clear();
	this.mLength = localStorage.length;
}

LocalStorage.prototype.Key = function(id) {
	return localStorage.key(id);
}
// ...End

