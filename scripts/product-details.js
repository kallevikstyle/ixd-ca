function searchProductId(shoes) {
	let id = 0,
		foundProduct = false;
	if (!window.location.search) {
		//Error message
	} else {
		// Get id from location.search
		id = Number(window.location.search.slice(4));
	}
	// Find product with the correct id
	for (let i = 0; i < shoes.length; i++) {
		if (id === shoes[i].id) {
			foundProduct = true;
			showProductDetails(shoes[i]);
		}
	}
	// If product is not found
	if (!foundProduct) {
		invalidId();
	}
}

function showProductDetails(product) {
	console.log(product);
	const parentContainer = document.querySelector('#product-description'),
		productImage = document.querySelector('#product-image'),
		productHeader = document.createElement('header'),
		productText = document.createElement('section'),
		productSizesSection = document.createElement('section'),
		cartButton = document.createElement('div');
	let shoeSizes = "";


	// Assign IDs to elements
	productText.id = "product-text";
	productSizesSection.id = "sizes";
	cartButton.className = "cta-button";

	// Set up element hierarchy
	productHeader.innerHTML = `
		<h2 id="product-name">${product.name}</h2>
		<div id="product-stars"></div>
	`;
	productText.innerHTML = `
		<p>${product.description}</p>
		<h3>Materials</h3>
		<ul id="materials">
			<li>Lorem</li>
			<li>Ipsum</li>
		</ul>
	`;
	// Loop through all available sizes for product
	for (let s = 0; s < product.size.length; s++) {
		shoeSizes += `<option value="${product.size[s]}">${product.size[s]}</option>`;
	}
	productSizesSection.innerHTML = `
		<h3>Select your size</h3>
			<form>
				<select name="sizes">
				${shoeSizes};
				</select>
			</form>
	`;
	
	cartButton.innerHTML = `
		ADD TO CART <i class="fas fa-shopping-cart"></i>
	`;
	productImage.innerHTML = `
		<img src="${product.imageUrl}" alt="${product.name} from Letha">
	`;
	parentContainer.appendChild(productHeader);
	parentContainer.appendChild(productText);
	parentContainer.appendChild(productSizesSection);
	parentContainer.appendChild(cartButton);

}

function invalidId() {
	console.log("ID is invalid");
}

// Get product data from JSON
(function() {
	fetch('http://kallevikstyle.no/ixd-ca/json/shoes.json')
	.then(result => result.json())
	.then((shoes) => {
		searchProductId(shoes);
	})
	.catch(err => console.log(err));
})();