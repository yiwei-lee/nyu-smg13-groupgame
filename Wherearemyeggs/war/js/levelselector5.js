$( document ).delegate("#levelselectorpage", "pageshow", function() {	
	colorCollectedDecoration();
});

function colorCollectedDecoration() {
	var collectedDecorationString = localStorage.collectedDecoration;
	if(collectedDecorationString != null) {
		var collectedDecoration = JSON.parse(collectedDecorationString);
		var levelDecoration;
		//alert(collectedCandy.length);
		for (var i = 0; i < collectedDecoration.length; i++) {
			if(collectedDecoration[i] == null) 
				continue;
			levelDecoration = JSON.parse(collectedDecoration[i]);
			//alert(levelCandy[0] + ", " +levelCandy[1] + ", " +levelCandy[2] );
			//alert(levelCandy[0] == "1");
			for(var j = 0; j < 3; j++) {
				if(levelDecoration[j] == "1") {
					switch(j)
					{
					  case 0:
						$("#candy"+(i+1)+"1").attr("src", "img/theme5/collectible1.png");
					    break;
					  case 1:
						$("#candy"+(i+1)+"2").attr("src", "img/theme5/collectible2.png");
					    break;
					  case 2:
						$("#candy"+(i+1)+"3").attr("src", "img/theme5/collectible3.png");
					    break;
					  default:
					    alert("Error could not load candy" + j);
					}
				}
				else {
					switch(j)
					{
					  case 0:
						$("#candy"+(i+1)+"1").attr("src", "img/theme5/collectible1_bw.png");
					    break;
					  case 1:
						$("#candy"+(i+1)+"2").attr("src", "img/theme5/collectible1_bw.png");
					    break;
					  case 2:
						$("#candy"+(i+1)+"3").attr("src", "img/theme5/collectible1_bw.png");
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
	localStorage.currentTheme = ""+5;
	$.mobile.changePage(
			"level.html",
		    {
		      transition: 'pop'
		    }
	);
}





