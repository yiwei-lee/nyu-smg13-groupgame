function level1() {		
		var   b2Vec2 = Box2D.Common.Math.b2Vec2,  	
		b2AABB = Box2D.Collision.b2AABB,	
		b2BodyDef = Box2D.Dynamics.b2BodyDef,	
		b2Body = Box2D.Dynamics.b2Body,	
		b2FixtureDef = Box2D.Dynamics.b2FixtureDef,	
		b2Fixture = Box2D.Dynamics.b2Fixture,	
		b2World = Box2D.Dynamics.b2World,	
		b2MassData = Box2D.Collision.Shapes.b2MassData,	
		b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,	
		b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,	
		b2DebugDraw = Box2D.Dynamics.b2DebugDraw,  	
		b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef,
		b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
		b2Settings = Box2D.Common.b2Settings
		;

		var world = new b2World(
	       	new b2Vec2(0, 10),    //gravity
	      	true                  //allow sleep
	    );

		var fixDef = new b2FixtureDef;
		fixDef.density = 1.0;
		fixDef.friction = 0.5;
		fixDef.restitution = 0.2;

		var bodyDef = new b2BodyDef;

		var width = 800;
		var height = 450;
		var SCALE = 50.0;
		

		// create floor ceiling and walls
		bodyDef.type = b2Body.b2_staticBody;
		fixDef.shape = new b2PolygonShape;

		fixDef.shape.SetAsBox(8, 1);
		bodyDef.position.Set(8, height / SCALE + 1);
		world.CreateBody(bodyDef).CreateFixture(fixDef);

		bodyDef.position.Set(width / SCALE / 2, -1);
		world.CreateBody(bodyDef).CreateFixture(fixDef);

		fixDef.shape.SetAsBox(1, height / SCALE / 2);
		bodyDef.position.Set(-1, height / SCALE / 2);
		world.CreateBody(bodyDef).CreateFixture(fixDef);

		bodyDef.position.Set(width / SCALE + 1, height / SCALE / 2);
		world.CreateBody(bodyDef).CreateFixture(fixDef);

		
		//slot1
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(0, 0));
		vertices.push(new b2Vec2(1.5, 0));
		vertices.push(new b2Vec2(1.5, 9));
		vertices.push(new b2Vec2(0, 16));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(2.5, 0));
		vertices.push(new b2Vec2(2.74, 0));
		vertices.push(new b2Vec2(2.74, 2.74));
		vertices.push(new b2Vec2(2.5, 2.74));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(2.5, 3.26));
		vertices.push(new b2Vec2(2.74, 3.26));
		vertices.push(new b2Vec2(2.74, 9));
		vertices.push(new b2Vec2(2.5, 9));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(2.5, 0));
		vertices.push(new b2Vec2(4.5, 0));
		vertices.push(new b2Vec2(4.5, 2.49));
		vertices.push(new b2Vec2(2.5, 2.49));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(2.5, 3.51));
		vertices.push(new b2Vec2(4.5, 3.51));
		vertices.push(new b2Vec2(4.5, 9));
		vertices.push(new b2Vec2(2.5, 9));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(4, 0));
		vertices.push(new b2Vec2(4.5, 0));
		vertices.push(new b2Vec2(4.5, 9));
		vertices.push(new b2Vec2(4, 9));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		//slot 2 
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(5.5, 0));
		vertices.push(new b2Vec2(5.74, 0));
		vertices.push(new b2Vec2(5.74, 2.74));
		vertices.push(new b2Vec2(5.5, 2.74));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(5.5, 3.26));
		vertices.push(new b2Vec2(5.74, 3.26));
		vertices.push(new b2Vec2(5.74, 9));
		vertices.push(new b2Vec2(5.5, 9));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(5.5, 0));
		vertices.push(new b2Vec2(7.5, 0));
		vertices.push(new b2Vec2(7.5, 2.49));
		vertices.push(new b2Vec2(5.5, 2.49));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(5.5, 3.51));
		vertices.push(new b2Vec2(7.5, 3.51));
		vertices.push(new b2Vec2(7.5, 9));
		vertices.push(new b2Vec2(5.5, 9));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(7, 0));
		vertices.push(new b2Vec2(7.5, 0));
		vertices.push(new b2Vec2(7.5, 9));
		vertices.push(new b2Vec2(7, 9));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		
		//slot 3
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(13.5, 0));
		vertices.push(new b2Vec2(13.74, 0));
		vertices.push(new b2Vec2(13.74, 2.74));
		vertices.push(new b2Vec2(13.5, 2.74));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(13.5, 3.26));
		vertices.push(new b2Vec2(13.74, 3.26));
		vertices.push(new b2Vec2(13.74, 9));
		vertices.push(new b2Vec2(13.5, 9));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(13.5, 0));
		vertices.push(new b2Vec2(16, 0));
		vertices.push(new b2Vec2(16, 2.49));
		vertices.push(new b2Vec2(13.5, 2.49));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(13.5, 3.51));
		vertices.push(new b2Vec2(16, 3.51));
		vertices.push(new b2Vec2(16, 9));
		vertices.push(new b2Vec2(13.5, 9));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(15, 0));
		vertices.push(new b2Vec2(16, 0));
		vertices.push(new b2Vec2(16, 9));
		vertices.push(new b2Vec2(15, 9));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(7, 0));
		vertices.push(new b2Vec2(12.5, 0));
		vertices.push(new b2Vec2(12.5, 2.5));
		vertices.push(new b2Vec2(7, 4.8));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(10.2, 4.5));
		vertices.push(new b2Vec2(12.5, 3.5));
		vertices.push(new b2Vec2(12.5, 9));
		vertices.push(new b2Vec2(10.2, 9));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		var vertices = [];
		vertices.push(new b2Vec2(7, 0));
		vertices.push(new b2Vec2(9.2, 0));
		vertices.push(new b2Vec2(9.2, 9));
		vertices.push(new b2Vec2(7, 9));
		fixDef.shape.SetAsVector(vertices, vertices.count);
		bodyDef.position.Set(0,0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		// create the bolts
		bodyDef.type = b2Body.b2_dynamicBody;
		fixDef.shape = new b2PolygonShape;
		fixDef.shape.SetAsBox(0.5, 0.25);
		bodyDef.position.Set(2.35,3);
		var body1 = world.CreateBody(bodyDef);
		body1.CreateFixture(fixDef); 
		var center = new b2Vec2(0.7,0);
		var angle = 0; //0.5 * b2Settings.b2_pi;
		fixDef.shape.SetAsOrientedBox(0.25, 0.5, center, angle);
		body1.CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		fixDef.shape.SetAsBox(0.5, 0.25);
		bodyDef.position.Set(5.35,3);
		var body1 = world.CreateBody(bodyDef);
		body1.CreateFixture(fixDef); 
		var center = new b2Vec2(0.7,0);
		var angle = 0; //0.5 * b2Settings.b2_pi;
		fixDef.shape.SetAsOrientedBox(0.25, 0.5, center, angle);
		body1.CreateFixture(fixDef);
		
		fixDef.shape = new b2PolygonShape;
		fixDef.shape.SetAsBox(0.5, 0.25);
		bodyDef.position.Set(13.35,3);
		var body1 = world.CreateBody(bodyDef);
		body1.CreateFixture(fixDef); 
		var center = new b2Vec2(0.7,0);
		var angle = 0; //0.5 * b2Settings.b2_pi;
		fixDef.shape.SetAsOrientedBox(0.25, 0.5, center, angle);
		body1.CreateFixture(fixDef);
		
		// create the circles
		fixDef.filter.groupIndex = 1;
		bodyDef.type = b2Body.b2_dynamicBody;
		fixDef.shape = new b2CircleShape(0.45);//radius
		bodyDef.position.Set(2, 1.5);
		var circleBody0 = world.CreateBody(bodyDef);
		circleBody0.CreateFixture(fixDef);

		bodyDef.position.Set(5, 1.5);
		var circleBody1 = world.CreateBody(bodyDef);
		circleBody1.CreateFixture(fixDef);

		bodyDef.position.Set(13, 1.5);
		var circleBody2 = world.CreateBody(bodyDef);
		circleBody2.CreateFixture(fixDef);
		
		//create the candy
		fixDef.isSensor = true;
		//bonbon
		bodyDef.userData = 'bonbon';	
		bodyDef.type = b2Body.b2_staticBody;
		fixDef.shape = new b2PolygonShape;
		fixDef.shape.SetAsBox(0.3, 0.2);
		bodyDef.position.Set(10, 4);
		var bonbon = world.CreateBody(bodyDef);
		bonbon.CreateFixture(fixDef); 
		var vertices = [];
		vertices.push(new b2Vec2(0.6, -0.2));
		vertices.push(new b2Vec2(0.25, 0));
		vertices.push(new b2Vec2(0.6, 0.2));
		fixDef.shape.SetAsVector(vertices, vertices.count);	
		bonbon.CreateFixture(fixDef); 
		var vertices = [];
		vertices.push(new b2Vec2(-0.6, -0.2));
		vertices.push(new b2Vec2(-0.25, 0));
		vertices.push(new b2Vec2(-0.6, 0.2));
		fixDef.shape.SetAsVector(vertices, vertices.count);	
		bonbon.CreateFixture(fixDef); 
		
		//lolly
		bodyDef.userData = 'lolly';	
		fixDef.shape = new b2CircleShape(0.25);
		bodyDef.position.Set(2,7);
		var lolly = world.CreateBody(bodyDef);
		lolly.CreateFixture(fixDef);
		fixDef.shape = new b2PolygonShape;
		var center = new b2Vec2(-0.2,0.3);
		var angle = 0.17 * b2Settings.b2_pi;
		fixDef.shape.SetAsOrientedBox(0.025, 0.25, center, angle);
		lolly.CreateFixture(fixDef);
		
		//drop
		bodyDef.userData = 'drop';	
		fixDef.shape = new b2CircleShape(0.3);
		bodyDef.position.Set(5, 7);
		var drop = world.CreateBody(bodyDef);
		drop.CreateFixture(fixDef);
		fixDef.isSensor = false;

		//setup debug draw
		var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
		debugDraw.SetDrawScale(SCALE);
		debugDraw.SetFillAlpha(1);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		world.SetDebugDraw(debugDraw);

		intervalID = window.setInterval(update, 1000 / 60); //intervalID should be defined in js file that calls this levelX.js


		//mouse

		var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
		var canvasPosition = getElementPosition(document.getElementById("canvas"));

		document.addEventListener("mousedown", function(e) {
			isMouseDown = true;
			handleMouseMove(e);
			document.addEventListener("mousemove", handleMouseMove, true);
			//$("#debug").append("<br/>vertices.push(new b2Vec2(" + mouseX + ", " + mouseY + "));");
		}, true);

		document.addEventListener("mouseup", function() {
			document.removeEventListener("mousemove", handleMouseMove, true);
			isMouseDown = false;
			mouseX = undefined;
			mouseY = undefined;
		}, true);

		function handleMouseMove(e) {
			mouseX = (e.clientX - canvasPosition.x) / SCALE;
			mouseY = (e.clientY - canvasPosition.y) / SCALE;
		};

		function getBodyAtMouse() {
			mousePVec = new b2Vec2(mouseX, mouseY);
			var aabb = new b2AABB();
			aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
			aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);

		    // Query the world for overlapping shapes.

		    selectedBody = null;
		    world.QueryAABB(getBodyCB, aabb);
		    if(selectedBody == circleBody0 || selectedBody == circleBody1 || selectedBody == circleBody2)
		    	return null;
		    else
		    	return selectedBody;
		}

		function getBodyCB(fixture) {
			if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
				if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
					selectedBody = fixture.GetBody();
					return false;
				}
			}
			return true;
		}

		//touch
		canvas = document.getElementById('canvas');
		
		canvas.addEventListener('touchstart', function(event) {
			isMouseDown = true;
			var touch = event.changedTouches[0];
			mouseX = (touch.pageX - canvasPosition.x) / SCALE;
			mouseY = (touch.pageY - canvasPosition.y) / SCALE;
				//alert("Touch x:" + touch.pageX + ", y:" + touch.pageY + ',len='+event.touches.length);
			}, false);

		canvas.addEventListener('touchend', function(event) {
			isMouseDown = false;
			mouseX = undefined;
			mouseY = undefined;
				//alert('Tend' + event.touches.length);			
			}, false);


		canvas.addEventListener('touchmove', function(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			mouseX = (touch.pageX - canvasPosition.x) / SCALE;
			mouseY = (touch.pageY - canvasPosition.y) / SCALE;
				//alert("MOve - Touch x:" + touch.pageX + ", y:" + touch.pageY);
			}, false);

		// collision detection
		var destroy_list = [];
		var colListener = new Box2D.Dynamics.b2ContactListener();
		
		colListener.BeginContact = function(contact) {
			 var fxA=contact.GetFixtureA();
			 var fxB=contact.GetFixtureB();
			 sA=fxA.IsSensor();
			 sB=fxB.IsSensor();
			 if((sA && !sB) || (sB && !sA))	{
				 if(sA)	{
					 // $("#debug").append(contact.GetFixtureA().GetBody().GetUserData());
					 destroy_list.push(contact.GetFixtureA().GetBody());
					 // make collected candy colorfull
					 var candyType = contact.GetFixtureA().GetBody().GetUserData();
					 if(candyType == "bonbon") {
						 $(".collectable1").each(function() {
							  $( this ).attr("src", "img/bonbon.png");
						 });
					 } else if(candyType == "lolly") {
						 $(".collectable2").each(function() {
							  $( this ).attr("src", "img/lolly.png");
						 });
					 } else if(candyType == "drop") {
							 $(".collectable3").each(function() {
								  $( this ).attr("src", "img/drop.png");
							 });
					 } 
					 
				 }
				 else	{
					 // $("#debug").append(contact.GetFixtureB().GetBody().GetUserData());
					 destroy_list.push(contact.GetFixtureB().GetBody());
					// make collected candy colorfull
					 var candyType = contact.GetFixtureB().GetBody().GetUserData();
					 if(candyType == "bonbon") {
						 $(".collectable1").each(function() {
							  $( this ).attr("src", "img/bonbon.png");
						 });
					 } else if(candyType == "lolly") {
						 $(".collectable2").each(function() {
							  $( this ).attr("src", "img/lolly.png");
						 });
					 } else if(candyType == "drop") {
							 $(".collectable3").each(function() {
								  $( this ).attr("src", "img/drop.png");
							 });
						 } else {
					 }
				 }
			 }
		 }	
		world.SetContactListener(colListener);
		
		
		//update
		var basketAABB = new b2AABB;
		basketAABB.lowerBound = new b2Vec2(1.5, 8);
		basketAABB.upperBound = new b2Vec2(13.5, 9);
		var bodies = [];
		var gameOver = false;
		
		function update() {

			if(isMouseDown && (!mouseJoint)) {
				var body = getBodyAtMouse();
				if(body) {
					var md = new b2MouseJointDef();
					md.bodyA = world.GetGroundBody();
					md.bodyB = body;
					md.target.Set(mouseX, mouseY);
					md.collideConnected = true;
					md.maxForce = 300.0 * body.GetMass();
					mouseJoint = world.CreateJoint(md);
					body.SetAwake(true);
				}
			}

			if(mouseJoint) {
				if(isMouseDown) {
					mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
				} else {
					world.DestroyJoint(mouseJoint);
					mouseJoint = null;
				}
			}

			world.Step(1 / 60, 10, 10);
			world.DrawDebugData();
			world.ClearForces();

			world.QueryAABB(testIfEggsAreInBasket, basketAABB);
			
			// Destroy all bodies in destroy_list
			for (var i in destroy_list) {
				world.DestroyBody(destroy_list[i]);
			}
			// Reset the array
			destroy_list.length = 0;
	 
	    };

	    function testIfEggsAreInBasket(fixture) {
	    	
			if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
				
				if(fixture.GetBody() == circleBody0 || fixture.GetBody() == circleBody1 || fixture.GetBody() == circleBody2) {
					if(bodies.indexOf(fixture.GetBody()) <= -1)
						bodies.push(fixture.GetBody());
					
					if(bodies.length >= 3 && !gameOver) {
						levelFinished();
						gameOver = true;
					}
					return true;
				}
			}
			return true;
		}

		//helpers

		//http://js-tut.aardon.de/js-tut/tutorial/position.html
		function getElementPosition(element) {
			var elem=element, tagname="", x=0, y=0;

			while((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
				y += elem.offsetTop;
				x += elem.offsetLeft;
				tagname = elem.tagName.toUpperCase();

				if(tagname == "BODY")
					elem=0;

				if(typeof(elem) == "object") {
					if(typeof(elem.offsetParent) == "object")
						elem = elem.offsetParent;
				}
			}

			return {x: x, y: y};
		}


	}



