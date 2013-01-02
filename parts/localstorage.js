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
	try {
		if (localStorage.getItem(key) == null || overwrite == true) {
			localStorage.setItem(key, data);
		}
	} catch (e) {
		return false;
	}
	
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
}

LocalStorage.prototype.Clear = function() {
	localStorage.clear();
}
// ...End

