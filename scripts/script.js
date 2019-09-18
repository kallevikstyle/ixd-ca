function filterSearch(shoes) {
	// Assign variables to search filters
	const filterCategory = document.querySelector('#filter-category'),
		filterSize = document.querySelector('#filter-size'),
		filterColor = document.querySelector('#filter-color'),
		filterSort = document.querySelector('#filter-sort');
	let checkBoxes = document.getElementsByClassName('filter'),
		activeFilterValues = [],
		activeFilterNames = [];
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

	// Update activeFilters arrays with all filters currently selected
	for (let i = 0; i < checkBoxes.length; i++) {
		checkBoxes[i].addEventListener('change', function() {
			if (!checkBoxes[i].checked) {
				// Remove unselected items from array
				activeFilterNames.splice(activeFilterValues.indexOf(checkBoxes[i].value), 1);
				activeFilterValues.splice(activeFilterValues.indexOf(checkBoxes[i].value), 1);
			} else {
				// Add selected values and filter names to arrays
				activeFilterNames.push(checkBoxes[i].name);
				activeFilterValues.push(checkBoxes[i].value);
				
			}
			showSearchResults(shoes, activeFilterNames, activeFilterValues);
			console.log(activeFilterNames);
			console.log(activeFilterValues);
		});
	}



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

function showSearchResults(shoes, activeFilterNames, activeFilterValues) {
	const searchResultsContainer = document.querySelector('#search-results');


	// Empty search results displayed on page
	searchResultsContainer.innerHTML = "";

	// Iterate through all items in shoes.json
	for (let i = 0; i < shoes.length; i++) {
		// Iterate through all search filter values
		for (let f = 0; f < activeFilterValues.length; f++) {
			// console.log(activeFilterValues[f] === shoes[i].activeFilterNames[f]);
			let filterName = activeFilterNames[f];
			console.log(activeFilterValues[f]);
			console.log(activeFilterNames[f]);
			console.log(shoes[i].activeFilterNames[f]); // DETTE GÅR IKKE
		}
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