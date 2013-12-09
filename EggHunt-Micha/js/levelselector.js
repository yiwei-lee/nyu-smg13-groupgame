$( document ).delegate("#levelselectorpage", "pageshow", function() {	
	localStorage.currentLevel = "1";
});

function goToLevel() {
	$.mobile.changePage(
		"level.html",
	    {
	      transition       	: 'pop'
	    }
	);
}




