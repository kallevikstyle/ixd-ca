function filterSearch(shoes) {
	// Assign variables to search filters
	const filterCategory = document.querySelector('#filter-category'),
		filterSize = document.querySelector('#filter-size'),
		filterColor = document.querySelector('#filter-color'),
		filterSort = document.querySelector('#filter-sort');
	let checkBoxes = document.getElementsByClassName('filter');
	// Event listeners to show filter-box on hover
	filterCategory.addEventListener('mouseover', function() {
		hideFieldSets(document.getElementsByTagName('fieldset'));
		showFilterBox(getElementLeftPosition(filterCategory));
		document.querySelector('#category').style.display = 'block';
	});
	filterSize.addEventListener('mouseover', function() {
		hideFieldSets(document.getElementsByTagName('fieldset'));
		showFilterBox(getElementLeftPosition(filterSize));
		document.querySelector('#size').style.display = 'block';	
	});
	filterColor.addEventListener('mouseover', function() {
		hideFieldSets(document.getElementsByTagName('fieldset'));
		showFilterBox(getElementLeftPosition(filterColor));
		document.querySelector('#color').style.display = 'block';
	});

	console.log(shoes);

	// Update activeFilters array
	updateActiveFilters(checkBoxes);


	
}

// Show and hide filter search box
function showFilterBox(leftPos) {
	let filterBox = document.querySelector('#filter-box');

	filterBox.style.display = 'block';
	filterBox.style.left = leftPos + 'px';
	// Make filter-box disappear when mouse leaves
	filterBox.addEventListener('mouseleave', function() {
		filterBox.style.display = 'none';
	});
}
// This function hides all fieldsets
function hideFieldSets(fieldSets) {
	for (let i = 0; i < fieldSets.length; i++) {
		fieldSets[i].style.display = 'none';
	}
}

function getElementLeftPosition(element) {
	// Return the left position of element
	return element.getBoundingClientRect().left;
}
// Update activeFilters array with all search filters currently selected
function updateActiveFilters(searchFilters) {
	let activeFilters = [];
	for (let i = 0; i < searchFilters.length; i++) {
		searchFilters[i].addEventListener('change', function() {
			if (!searchFilters[i].checked) {
				// Remove unselected items from array
				activeFilters.splice(activeFilters.indexOf(searchFilters[i].value), 1);
			} else {
				// Add selected values to array
				activeFilters.push(searchFilters[i].value);
			}
		});
	}
}

// Get product data from JSON
(function() {
	fetch('http://kallevikstyle.no/ixd-ca/json/shoes.json')
	.then(result => result.json())
	.then((shoes) => {
		filterSearch(shoes);
	})
	.catch(err => console.log(err));
})();