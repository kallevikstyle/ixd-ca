


(function() {
	const regExName =/[a-z]/i,
		regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		regExMessage =/\S/,
		messageButton = document.querySelector('#message-button'),
		subscribeButton = document.querySelector('#subscribe-button'),
		nameField = document.querySelector('#name'),
		mailField = document.querySelector('#email'),
		messageField = document.querySelector('#message'),
		subscribeMailField = document.querySelector('#subscribe-email');

	nameField.addEventListener('input', function() {
		if (!regExName.test(nameField.value)) {
			nameField.className = "invalid-field";
			document.querySelector('#invalid-name').style.display = "block";
		} else {
			nameField.className = "";
			document.querySelector('#invalid-name').style.display = "none";
		}
	});
	mailField.addEventListener('input', function() {
		if (!regExName.test(mailField.value)) {
			mailField.className = "invalid-field";
			document.querySelector('#invalid-email').style.display = "block";
		} else {
			mailField.className = "";
			document.querySelector('#invalid-email').style.display = "none";
		}
	});
	messageField.addEventListener('input', function() {
		if (!regExName.test(messageField.value)) {
			messageField.className = "invalid-field";
			document.querySelector('#invalid-message').style.display = "block";
		} else {
			messageField.className = "";
			document.querySelector('#invalid-message').style.display = "none";
		}
	});
	subscribeMailField.addEventListener('input', function() {
		if (!regExName.test(subscribeMailField.value)) {
			subscribeMailField.className = "invalid-field";
			document.querySelector('#invalid-subscription-email').style.display = "block";
		} else {
			subscribeMailField.className = "";
			document.querySelector('#invalid-subscription-email').style.display = "none";
		}
	});
})();