// when the page gets shown the current level is loaded from local storage
$( document ).delegate("#levelpage", "pageshow", function() {
	var currentLevel = parseInt(localStorage.currentLevel);
	loadLevel(currentLevel);
});

// intervalID holds a reference to the update interval (box2Dweb)
// intervalID is set in the levelX.js files
var intervalID;
function stopUpdateFunction() {
	if(!(intervalID == null)) {
		window.clearInterval(intervalID); //intervalID is set in levelX.js where X is a number
		intervalID = null;
	}
}

//reloads the page
function reloadPage() {
	stopUpdateFunction();
	
	location.reload();
}

//reset the canvas to show other stuff
function resetCanvas() {
	stopUpdateFunction();
	
	var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//this gets called from the levelX.js files
function levelFinished() {
	//todo: save data
	$( "#popup" ).popup( "open" );
}

//open the next level and save new level index
function next() {
	$( "#popup" ).popup( "close" );
	var currentLevel = parseInt(localStorage.currentLevel);
	localStorage.currentLevel = "" + ++currentLevel;
	
	reloadPage();
	
	/*
	url = location.protocol + '//' + location.host + location.pathname;
	$.mobile.changePage(
		"#",
	    {
	      allowSamePageTransition : true,
	      transition              : 'slide',
	      showLoadMsg             : false,
	      reloadPage              : true
	    }
	); */ 
}

//open the menu
function menu() {
	stopUpdateFunction();
	
	$.mobile.changePage(
		"levelselector.html",
	    {
	      transition       	: 'pop',
	      reverse			: true
	    }
	);
}

//load the javascript file and the description of the level and execute the javascript file
function loadLevel ( level ) {
	resetCanvas();
	//level = 8; //for debugging
	var url = "js/level" + level + ".js";
	
	switch(level)
	{
	  case 1:
		  $.getScript( url, function() {
			  level1();
			  $('#leveltxt').text("LEVEL 1");
			  $('#leveldescription').text("Let the Eggs fall and collect Candy!");			  
		  });
	    break;
	  case 2:
		  $.getScript( url, function() {
			  level2();
			  $('#leveltxt').text("LEVEL 2");
			  $('#leveldescription').text("Bring the balls to the right side!");	
		  });
	    break;
	  case 3:
		  $.getScript( url, function() {
			  level3();
			  $('#leveltxt').text("LEVEL 3");
			  $('#leveldescription').text("You can manipulate the Egg itselve here - guide its way through the maze!");	
		  });
	    break;
	  case 4:
		  $.getScript( url, function() {
			  level4();
			  $('#leveltxt').text("LEVEL 4");
			  $('#leveldescription').text("This one is not easy - So it's enough to throw two Eggs into the Basket on the top right!");	
		  });
	    break;
	  case 5:
		  $.getScript( url, function() {
			  level5();
			  $('#leveltxt').text("LEVEL 5");
			  $('#leveldescription').text("Use the outer Box to free the Eggs!");	
		  });
	    break;
	  case 6:
		  $.getScript( url, function() {
			  level6();
			  $('#leveltxt').text("LEVEL 6");
			  $('#leveldescription').text("You can neither use the Wagon nor the balls themeselves. Bring the Eggs to the hole on the bottom right!!");	
		  });
	    break;
	  case 7:
		  $.getScript( url, function() {
			  level7();
			  $('#leveltxt').text("LEVEL 7");
			  $('#leveldescription').text("You have to get the Eggs in the Pit in the middle!");	
		  });
	    break;
	  case 8:
		  $.getScript( url, function() {
			  level8();
			  $('#leveltxt').text("LEVEL 8");
			  $('#leveldescription').text("Bring the Eggs to the Baskets of your choosing!");	
		  });
	    break;
	  case 9:
		  $.getScript( url, function() {
			  level9();
			  $('#leveltxt').text("LEVEL 9");
			  $('#leveldescription').text("You can only use the Companion Cube to get the Eggs across the two holes!");	
		  });
	    break;
	  case 10:
		  $.getScript( url, function() {
			  level10();
			  $('#leveltxt').text("LEVEL 10");
			  $('#leveldescription').text("You can only use one thing here: The Box inside the Bridge. Bring the Eggs to the right side!");	
		  });
	    break;
	  default:
	    alert("Error could not load level" + level);
	   
	} 	 
}

