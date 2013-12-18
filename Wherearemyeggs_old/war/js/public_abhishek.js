function colorDecoration(candyType) {
	if(candyType == "redDecor") {
		 $(".collectable1").each(function() {
			  $( this ).attr("src", "img/theme5/collectible1.png");
			  collectedDecoration[0] = "1";
		 });
	 } else if(candyType == "blueDecor") {
		 $(".collectable2").each(function() {
			  $( this ).attr("src", "img/theme5/collectible2.png");
			  collectedDecoration[1] = "1";
		 });
	 } else if(candyType == "treeDecor") {
			 $(".collectable3").each(function() {
				  $( this ).attr("src", "img/theme5/collectible3.png");
				  collectedDecoration[2] = "1";
			 });
	 } 
}

