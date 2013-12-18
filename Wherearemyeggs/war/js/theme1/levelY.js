function level1() {		
	var levelNumber = 1;
	
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
	
	//Basket
	bodyDef.userData = 'basket';
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(2, 0.25);
	bodyDef.position.Set(14, 1.5);
	var body1 = world.CreateBody(bodyDef);
	body1.CreateFixture(fixDef); 
	var center = new b2Vec2(-2.2,-0.5);
	var angle = 0.75 * b2Settings.b2_pi;
	fixDef.shape.SetAsOrientedBox(0.25, 0.5, center, angle);
	body1.CreateFixture(fixDef);
    
	//Circle
    bodyDef.userData = 'circle';
    fixDef.filter.groupIndex = 1;
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2CircleShape(0.5);//radius
	bodyDef.position.Set(3.5, 1.5);
	var circleBody0 = world.CreateBody(bodyDef);
	circleBody0.CreateFixture(fixDef);
	 
	// Ground
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;
	bodyDef.position.Set(8,8.5);
	bodyDef.userData = 'ground';
	
	var fd = new b2FixtureDef;
	fd.shape = new b2PolygonShape;
	fd.shape.SetAsBox(8,0.5);  // 20 units x 1 unit = 600px x 30px with 30 being the scale factor
	   
	var ground = world.CreateBody(bodyDef);
	ground.CreateFixture(fd);

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
	    // if(selectedBody == circleBody0 || selectedBody == circleBody1 || selectedBody == circleBody2)
	    // 	return null;
	    // else
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
	var collectedCandy = new Array("0","0","0");
	
	colListener.BeginContact = function(contact) {
		 var fxA=contact.GetFixtureA();
		 var fxB=contact.GetFixtureB();
		 sA=fxA.IsSensor();
		 sB=fxB.IsSensor();
		 if((sA && !sB) || (sB && !sA))	{
			 if(sA)	{

				 destroy_list.push(contact.GetFixtureA().GetBody());

				 // make collected candy colorful
				 colorCandy(contact.GetFixtureA().GetBody().GetUserData(), collectedCandy);
				 
			 }
			 else	{

				 destroy_list.push(contact.GetFixtureB().GetBody());

				 // make collected candy colorful
				 colorCandy(contact.GetFixtureB().GetBody().GetUserData(), collectedCandy);
			 }
		 }
	 }	
	world.SetContactListener(colListener);
	
	
	//update	
	var basketAABB = new b2AABB;
	basketAABB.lowerBound = new b2Vec2(15.5, 7.5);
	basketAABB.upperBound = new b2Vec2(16, 9);
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
		world.ClearForces();
		
		$("#canvas").clearCanvas();
		world.DrawDebugData();
		for (b = world.GetBodyList() ; b; b = b.GetNext())
		{
	      var angle = b.GetAngle()*(180/Math.PI);
	      var pos = b.GetPosition();
	      
	      // Using Images to display bodies
	      if (b.GetUserData() == 'basket'){ 
	          $("#canvas")
	          .rotateCanvas({
	              x: pos.x * SCALE, y: pos.y * SCALE,
	              rotate: angle
	          })
	          .drawImage({
	              source: 'img/theme1/basketx.png',
	              x: pos.x * SCALE-20, y: pos.y * SCALE-20,
	              fromCenter: true
	          })
	          .restoreCanvas();
	      }
	      else if(b.GetUserData() == 'circle') {
	    	  $("#canvas")
	          .rotateCanvas({
	              x: pos.x * SCALE, y: pos.y * SCALE,
	              rotate: angle
	          })
	          .drawImage({
	              source: 'img/theme1/egg1.png',
	              x: pos.x * SCALE, y: pos.y * SCALE,
	              width: 50,
	              height: 50,
	              fromCenter: true
	          })
	          .restoreCanvas();
	       }        
	       else if(b.GetUserData() == 'ground') {
		       // Using CSS to draw ground
	           $("#canvas").drawRect({
	              fillStyle: "#8cc924",
	              x: pos.x * SCALE, y: pos.y * SCALE,
	              width: 20 * SCALE,   // 600px
	              height: 1 * SCALE,   // 30px
	              cornerRadius: 0
	          })
	       }                
		}
 
    };

    function testIfEggsAreInBasket(fixture) {
    	
		if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
			
			if(fixture.GetBody() == circleBody0 || fixture.GetBody() == circleBody1 || fixture.GetBody() == circleBody2) {
				if(bodies.indexOf(fixture.GetBody()) <= -1)
					bodies.push(fixture.GetBody());
				
				if(bodies.length >= 3 && !gameOver) {
					levelFinished();
					saveCollectedCandy();
					
					gameOver = true;
				}
				return true;
			}
		}
		return true;
	}
   
	function saveCollectedCandy() {
		var collectedCandyString = localStorage.collectedCandy;
		if(collectedCandyString != null) {
			var collectedCandyAllLevels = JSON.parse(collectedCandyString);
		}
		else {
			var collectedCandyAllLevels = new Array();
		}
		collectedCandyAllLevels[levelNumber-1] = JSON.stringify(collectedCandy);
		localStorage.collectedCandy = JSON.stringify(collectedCandyAllLevels);
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