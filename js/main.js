(function(){

/* 	----------
	DOM Events	
	---------- */

	function getElement(query) {
		return document.querySelector(query)
	}

	function getAllElements(query) {
		return document.querySelectorAll(query)
	}

	function attachEventToNode(node, eventName, callback) {
		node.addEventListener(eventName, callback)
	}

	function toggleClass(node, className) {
		node.classList.toggle(className)
	}

	function changeElementText(node, text) {
		node.innerText = text
	}

	function changeElementHTML(node, html) {
		node.innerHTML = html
	}

	function getElementText(node) {
		return node.innerText
	}

	function getElementHTML(node) {
		return node.innerHTML
	}

	function changeCSSValue(node, property, value) {
		node.style[property] = value
	}

	function getCSSValue(node, property) {
		return window.getComputedStyle(node)[property]
	}

	// Night-Mode
	attachEventToNode(getElement('#night'), 'click', activateNightMode)

	// Font Menu
	attachEventToNode(getElement('#fontsize'), 'click', function(){
		toggleClass(getElement('#minus'), "show")
		toggleClass(getElement('#minus'), "hide")
		toggleClass(getElement('#plus'), "show")
		toggleClass(getElement('#plus'), "hide")
	})

	attachEventToNode(getElement('#minus'), 'click', function(){
		var article = getElement('article')
		var currCssValue = getCSSValue(article, 'font-size')
		var newValue = (parseInt(currCssValue) - 1) + "px"
		changeCSSValue(article, 'font-size', newValue)

		localStorage.setItem('fontSize', newValue);
	});

	attachEventToNode(getElement('#plus'), 'click', function(){
		var article = getElement('article')
		var currCssValue = getCSSValue(article, 'font-size')
		var newValue = (parseInt(currCssValue) + 1) + "px"
		changeCSSValue(article, 'font-size', newValue)

		localStorage.setItem('fontSize', newValue);
	});

	/* 	----------
	Auto-Saving	
	---------- */

	var newTitle, // Used for getting the title from the page
		newBody, // Used for getting the body of the article
		oldTitle = null, // Used to keep track of the old title
		oldBody = null; // Used to keep track of the old article body

	var timer = 5000; // Timer for auto-saving in millisec

/* 	----------
	Loading from localStorage (if any)	
	---------- */

	if(localStorage.getItem('notetitle') !== null)
	{
		changeElementText(getElement('header'), localStorage.getItem('notetitle'))
		changeElementHTML(getElement('article'), localStorage.getItem('notebody'))
		changeCSSValue(getElement('article'), 'font-size', localStorage.getItem('fontSize') || 26)
	}

	window.setInterval(function(){
		newTitle = getElementText(getElement('header'))
		newBody = getElementHTML(getElement('article'))
		// Save only if the title and/or the body is edited
		if(newTitle != oldTitle)
		{
			localStorage.setItem('notetitle', newTitle);
			oldTitle = newTitle;
		}

		if(newBody != oldBody)
		{
			localStorage.setItem('notebody', newBody);
			oldBody = newBody;
		}

	}, timer);

/* 	----------
	Functions	
	---------- */

	function activateNightMode(){
		toggleClass(getElement('body'), 'night-mode')
		var icons = getAllElements('.icon')
		for (var i = icons.length - 1; i >= 0; i--) {
			toggleClass(icons[i], "invert")
		}
	};
})();
