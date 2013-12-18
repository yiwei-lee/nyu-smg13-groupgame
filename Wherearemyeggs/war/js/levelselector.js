$( document ).delegate("#levelselectorpage", "pageshow", function() {	
	localStorage.currentTheme = ""+5; //will be set in themeselector
	var currentTheme = parseInt(localStorage.currentTheme); 
	colorCollectedCandy(currentTheme);
});

function colorCollectedCandy( theme ) {
	var collectedString;
	switch(theme)
	{
	  case 1:
		collectedString = localStorage.collectedCandy;
	    break;
	  case 2:
		collectedString = "";
	    break;
	  case 3:
		collectedString = "";
	    break;
	  case 4:
		collectedString = localStorage.daniel_collectedCandy;
	    break;
	  case 5:
		collectedString = localStorage.collectedDecoration;
		break;
	  case 6:
		collectedString = "";
	    break;
	  default:
	    alert("Error could not load candy" + theme);
	}
	
	if(collectedString != null && collectedString != "") {
		var collectedCandy = JSON.parse(collectedString);
		var levelCandy;
		 
		for (var i = 0; i < collectedCandy.length; i++) {
			if(collectedCandy[i] == null) 
				continue;
			levelCandy = JSON.parse(collectedCandy[i]);
			//alert(levelCandy[0] + ", " +levelCandy[1] + ", " +levelCandy[2] );
			//alert(levelCandy[0] == "1");
			for(var j = 0; j < 3; j++) {
				if(levelCandy[j] == "1") {
					switch(j)
					{
					  case 0:
						$("#candy"+(i+1)+"1").attr("src", "img/theme" + theme + "/collectible1.png");
					    break;
					  case 1:
						$("#candy"+(i+1)+"2").attr("src", "img/theme" + theme + "/collectible2.png");
					    break;
					  case 2:
						$("#candy"+(i+1)+"3").attr("src", "img/theme" + theme + "/collectible3.png");
					    break;
					  default:
					    alert("Error could not load candy" + j);
					}
				}
				else {
					switch(j)
					{
					  case 0:
						$("#candy"+(i+1)+"1").attr("src", "img/theme" + theme + "/collectible1_bw.png");
					    break;
					  case 1:
						$("#candy"+(i+1)+"2").attr("src", "img/theme" + theme + "/collectible2_bw.png");
					    break;
					  case 2:
						$("#candy"+(i+1)+"3").attr("src", "img/theme" + theme + "/collectible3_bw.png");
					    break;
					  default:
					    alert("Error could not load candy" + j);
					}
				}
			}
		}
	
	}
	
	
}

$(".levelimg").each(function() {
	$(this).click(function() {
		var levelid = $(this).attr('id').slice(-1); //levelid is last char of id name
		goToLevel(levelid);
	});   
});

function goToLevel(i) {
	localStorage.currentLevel = ""+i;
	var currentTheme = parseInt(localStorage.currentTheme); 
	$.mobile.changePage(
			"theme" + currentTheme + "level.html",
		    {
		      transition: 'pop'
		    }
	);
}





