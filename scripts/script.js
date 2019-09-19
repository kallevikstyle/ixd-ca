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

	// Update activeFilters arrays with all filters currently selected
	// - Giving Name and Values arrays the same index
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
			findSearchResults(shoes, activeFilterNames, activeFilterValues);
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

function findSearchResults(shoes, activeFilterNames, activeFilterValues) {
	const searchResultsContainer = document.querySelector('#search-results');
	let shoesResult = new Set();

	// Iterate through all items in shoes.json to search for matches
	for (let i = 0; i < shoes.length; i++) {
		// Iterate through all search filter values
		for (let f = 0; f < activeFilterValues.length; f++) {
			let match = matchFiltersWithProducts(activeFilterNames[f], activeFilterValues[f], shoes[i]);
			// Push the match, if any, to resulting arrray
			if (match) {
				shoesResult.add(match);
			}
		}
	}
	// Convert SET to ARRAY
	shoesResult = Array.from(shoesResult);
	
	// Display products on page
	searchResultsContainer.innerHTML = "";
	for (let item = 0; item < shoesResult.length; item++) {
		displayProducts(searchResultsContainer, shoesResult[item]);
	}
}
// Search for match by filters in shoes.json
function matchFiltersWithProducts(filterName, filterValue, product) {
	// Check which type of filter is used, and match values with shoe properties
	switch (filterName) {
		case "category":
			if (filterValue === product.category) {
				return product;
			} else {
				return;
			}
			break;
		case "size":
			if (product.size.includes(filterValue)) {
				return product;
			}
			break;
		case "color":
			if (filterValue === product.color) {
				return product;
			}
			break;
	}
}
function displayProducts(parentContainer, product) {
	const itemContainer = document.createElement('div'),
		productImage = document.createElement('div'),
		productTeaser = document.createElement('div'),
		productTitle = document.createElement('div'),
		productDetails = document.createElement('div')
		productStars = document.createElement('div'),
		productPrice = document.createElement('div');



	// Assign classes to div elements
	itemContainer.className = "item-container";
	productImage.className = "product-thumbnail";
	productTeaser.className = "product-teaser flex";
	productTitle.className = "product-title";
	productDetails.className = "product-details";
	productStars.className = "product-stars";
	productPrice.className = "product-price";

	// Construct the element hierarchy
	productImage.innerHTML = `
	<img src="${product.imageUrl}" alt="${product.name}">
	`
	productTitle.innerHTML = `
	<h3>${product.name}</h3>
	<p>${product.shortdescription}</p>
	`
	productStars.innerHTML = `
	<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
	`
	productPrice.innerHTML = `
	199
	`
	productDetails.appendChild(productStars);
	productDetails.appendChild(productPrice);
	productTeaser.appendChild(productTitle);
	productTeaser.appendChild(productDetails);
	itemContainer.appendChild(productImage);
	itemContainer.appendChild(productTeaser);
	parentContainer.appendChild(itemContainer);


	// console.log(products);

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