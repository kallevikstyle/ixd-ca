function filterSearch() {
	// Assign variables to search filters
	const filterCategory = document.querySelector('#filter-category'),
		filterSize = document.querySelector('#filter-size'),
		filterColor = document.querySelector('#filter-color'),
		filterSort = document.querySelector('#filter-sort');
	// Event listeners for search filters
	filterCategory.addEventListener('mouseover', function() {
		showFilterBox(getElementLeftPosition(filterCategory));	
	});
	filterSize.addEventListener('mouseover', function() {
		showFilterBox(getElementLeftPosition(filterSize));	
	});
	filterColor.addEventListener('mouseover', function() {
		showFilterBox(getElementLeftPosition(filterColor));	
	});
	filterSort.addEventListener('mouseover', function() {
		showFilterBox(getElementLeftPosition(filterSort));	
	});
}

function showFilterBox(leftPos) {
	let filterBox = document.querySelector('#filter-box');

	filterBox.style.display = 'block';
	filterBox.style.left = leftPos + 'px';
	// Make filter-box disappear when mouse leaves
	filterBox.addEventListener('mouseleave', function() {
		filterBox.style.display = 'none';
	});
}

function getElementLeftPosition(element) {
	// Return the left position of element
	return element.getBoundingClientRect().left;
}

filterSearch();