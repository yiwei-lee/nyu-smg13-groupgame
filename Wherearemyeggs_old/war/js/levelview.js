// when the page gets shown the current level is loaded from local storage
$( document ).delegate("#levelpage", "pageshow", function() {
	var currentLevel = parseInt(localStorage.currentLevel);
	var currentTheme = parseInt(localStorage.currentTheme); 
	loadLevel(currentLevel, currentTheme);
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

//this gets called from the level9.js files... this gets called from level9.js
function themeFinished(){
	$( "#popupThemeComplete" ).popup( "open" );
	completedTheme();
}

//this gets called from the levelx.js files...
function eggDestroyed(){
	$( "#popupGameOver" ).popup( "open" );
}

//saves completed theme to local storage
function completedTheme() {
	var completedThemeString = localStorage.completedThemes;
	if(completedThemeString != null) {
		var completedThemes = JSON.parse(completedThemeString);
	}
	else {
		var completedThemes = new Array();
	}
	var currentTheme = parseInt(localStorage.currentTheme);
	completedThemes[currentTheme-1] = 1;
	localStorage.completedThemes = JSON.stringify(completedThemes);
}

//navigate to theme selector
function themeSelector() {
	stopUpdateFunction();
	$.mobile.changePage(
		"themeselector.html",
	    {
	      transition       	: 'pop',
	      reverse			: true
	    }
	);
	resetCanvas();
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
	var currentTheme = parseInt(localStorage.currentTheme);
	$.mobile.changePage(
		"theme" + currentTheme + "levelselector.html",
	    {
	      transition       	: 'pop',
	      reverse			: true
	    }
	);
	resetCanvas();
}

//load the javascript file and the description of the level and execute the javascript file
function loadLevel ( level, theme ) {
	resetCanvas();
	//level = 10; //for debugging
	var url = "js/theme" + theme + "/level" + level + ".js";
	
	$.getScript( url, function() {
		var description = levelInfo[theme-1][level-1][0];
		var width = levelInfo[theme-1][level-1][1];
		var height = levelInfo[theme-1][level-1][2];
		
		var context = canvas.getContext('2d');
		context.canvas.width = width;
		context.canvas.height = height;
		
		window["level" + level](); //calls the function levelY();
		$('#leveltxt').text("LEVEL " + level);
		$('#leveldescription').text(description);			  
	});
}

