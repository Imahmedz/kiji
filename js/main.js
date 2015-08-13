(function(){

/* 	----------
	DOM Events	
	---------- */

	$('#night').on('click',function(){
		activateNightMode();
	});

	$('#fullscreen').on('click', function(){
		toggleFullScreen();
	});

/* 	----------
	Auto-Saving	
	---------- */

	var newTitle, // Used for getting the title from the page
		newBody, // Used for getting the body of the article
		oldTitle=null, // Used to keep track of the old title
		oldBody=null; // Used to keep track of the old article body

	var timer = 5000; // Timer for auto-saving in millisec

/* 	----------
	Loading from localStorage (if any)	
	---------- */

	if( localStorage.getItem('notetitle') !== null)
	{
		$('header').text(localStorage.getItem('notetitle'));
		$('article').html(localStorage.getItem('notebody'));
	}

	window.setInterval(function(){

		newTitle = $('header').html();
		newBody = $('article').html();

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

	function toggleFullScreen() {
	  if (  (document.fullScreenElement && document.fullScreenElement !== null) ||    
	   (!document.mozFullScreen && !document.webkitIsFullScreen)  )
	  {
	    if (document.documentElement.requestFullScreen) {  
	      document.documentElement.requestFullScreen();  
	    } else if (document.documentElement.mozRequestFullScreen) {  
	      document.documentElement.mozRequestFullScreen();  
	    } else if (document.documentElement.webkitRequestFullScreen) {  
	      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
	    }
	  } else {  
	    if (document.cancelFullScreen) {  
	      document.cancelFullScreen();  
	    } else if (document.mozCancelFullScreen) {  
	      document.mozCancelFullScreen();  
	    } else if (document.webkitCancelFullScreen) {  
	      document.webkitCancelFullScreen();  
	    }
	  }  
	};

	function activateNightMode(){
		$('body').toggleClass('night-mode');
		$('.icon').each(function(){
			$(this).toggleClass($(this).attr('id') + '-icon-white');
		});
	};

})();
