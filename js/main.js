(function(){

/* 	----------
	DOM Events	
	---------- */

	// Full-Screen
	$('#fullscreen').on('click', function(){
		toggleFullScreen();
	});

	// Night-Mode
	$('#night').on('click',function(){
		activateNightMode();
	});

	// Font Menu
	$('.font-icon').hide();
	
	$('#fontsize').on('click', function(){
		$('#minus').toggle("slow");
		$('#plus').toggle("slow");
		pagex = event.pageX;
		$(document).mousemove(function(e){
			if( Math.abs(e.pageX - pagex) > 200){
				// User is probably leaving the box
				$('#plus').hide(500);
				$('#minus').hide(500);
			}
  		});
	});

	$('#minus').on('click', function(){
		$('article').css('font-size', parseInt($('article').css('font-size'))-1);
		localStorage.setItem('fontSize', $('article').css('font-size'));
	});

	$('#plus').on('click', function(){
		$('article').css('font-size', parseInt($('article').css('font-size'))+1);
		localStorage.setItem('fontSize', $('article').css('font-size'));
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
		$('article').css('font-size', localStorage.getItem('fontSize') || 26);
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
			$(this).toggleClass('invert');
		});
	};

})();
