// ResourceSort function
// sorts *Resource objects based on the resource name
function ResourceSort(first, second) {
	var result = 0;
	if (second.mResName < first.mResName) {
		result = 1;
	}
	else if (first.mResName < second.mResName) {
		result = -1;
	}
	
	return result;
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

