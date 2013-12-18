function colorCandy(candyType, collectedCandy) {
	if(candyType == "bonbon") {
		 $(".collectable1").each(function() {
			  $( this ).attr("src", "img/theme1/collectible1.png");
			  collectedCandy[0] = "1";
		 });
	 } else if(candyType == "lolly") {
		 $(".collectable2").each(function() {
			  $( this ).attr("src", "img/theme1/collectible2.png");
			  collectedCandy[1] = "1";
		 });
	 } else if(candyType == "drop") {
			 $(".collectable3").each(function() {
				  $( this ).attr("src", "img/theme1/collectible3.png");
				  collectedCandy[2] = "1";
			 });
	 } 
}

/*
draw() {
	var pos = this.body.GetPosition(),
	var angle = this.body.GetAngle();

	context.save();
	context.translate(pos.x,pos.y);
	context.rotate(angle);

	if(this.details.color) {
		context.fillStyle = this.details.color;
	if(!this.destroyed){
		switch(this.details.shape) {
			case "circle":
			  context.beginPath();
			  context.arc(0,0,this.details.radius,0,Math.PI*2);
			  context.fill();
			  break;
			case "polygon":
			  var points = this.details.points;
			  context.beginPath();
			  context.moveTo(points[0].x,points[0].y);
			  for(var i=1;i<points.length;i++) {
			    context.lineTo(points[i].x,points[i].y);
			  }
			  context.fill();
			  break;
			case "block":
			  context.fillRect(-this.details.width/2,
			                   -this.details.height/2,
			                   this.details.width,
			                   this.details.height);
			default:
			  break;
			}
		}
	}

	if(this.details.image) {
		context.drawImage(this.details.image, -this.details.width/2, -this.details.height/2, 
											   this.details.width, this.details.height);
	}

	context.restore();
}
*/