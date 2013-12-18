function level4(){
	var image = new Image();
    image.src = "img/theme6/basket.jpeg";
	canvas = document.getElementById("canvas");
	context = canvas.getContext( '2d' );
	var image = new Image();
    image.src = "img/theme6/basket.jpeg";
    
    var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
   
    document.addEventListener("mousedown", function(e) {
      isMouseDown = true;
      handleMouseMove(e);
      document.addEventListener("mousemove", handleMouseMove, true);
    }, true);
   
    document.addEventListener("mouseup", function() {
      document.removeEventListener("mousemove", handleMouseMove, true);
      isMouseDown = false;
      mouseX = undefined;
      mouseY = undefined;
    }, true);
   
    //touch

    document.addEventListener('touchstart', function(event) {
           isMouseDown = true;
           var touch = event.changedTouches[0];
           mouseX = touch.pageX / 30;
           mouseY = (400 - touch.pageY) / 30;
           }, false);

    document.addEventListener('touchend', function(event) {
           isMouseDown = false;
           mouseX = undefined;
           mouseY = undefined;
           }, false);


    document.addEventListener('touchmove', function(event) {
           event.preventDefault();
           var touch = event.changedTouches[0];
           mouseX = (touch.pageX) / 30;
           mouseY = (400 - touch.pageY) / 30;
           }, false);
    
    
    function handleMouseMove(e) {
      mouseX = (e.clientX)/30; // - canvasPosition.x) / 30;
      mouseY = (400 - e.clientY)/30; // - 400)/30; // - canvasPosition.y) / 30;
//      console.log(mouseX, mouseY);
    };
   
    function getBodyCB(fixture) {
        if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
           if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
              selectedBody = fixture.GetBody();
              return false;
           }
        }
        return true;
      }
    
    function getBodyAtMouse() {
      mousePVec = new b2Vec2(mouseX, mouseY);
      var aabb = new b2AABB();
      aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
      aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
      
      // Query the world for overlapping shapes.

      selectedBody = null;
      world.QueryAABB(getBodyCB, aabb);
      
      console.log(selectedBody.name);
      if(selectedBody.name == "body7"){
      	return null;
      }
      
      return selectedBody;
    }


	world = new b2World(
		       new b2Vec2(0, -10)    //gravity
		    ,  true                 //allow sleep
			);
	

//	var debugDraw = new b2DebugDraw();
	myDebugDraw = new b2DebugDraw();
	myDebugDraw.SetSprite(context);
	myDebugDraw.SetDrawScale(30.0);
	myDebugDraw.SetFillAlpha(0.8); //(0.5);
	myDebugDraw.SetLineThickness(0); // (1.0);
	myDebugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(myDebugDraw);
	if(loadSceneFromRUBE(level4scene)){
		console.log("Scene loaded");
	}
	else{
		console.log("Failed to load scene");
	}
	
	level4Timer = window.setInterval(update, 1000 / 60);
	
	var basket = new b2AABB;
	basket.lowerBound = new b2Vec2(360/30, 0/30);
	basket.upperBound = new b2Vec2(420/30, 40/30);
	var goalReached = false;
	
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
//	     world.DrawDebugData();
	     draw();
//	 	 context.drawImage(image, 45, 0, 180, 200, 360, 330, 80, 80);
	 	 context.drawImage(image, 360, 330);

	     if(goalReached){
	     	context.fillStyle = '#ffffff';
	     	context.font = '70px verdana';
	     	context.fillText("Great Job", 115, 120);
	     	context.font = '60px verdana';
	     	context.fillText("Try the next level!", 15, 200);
	     }
	     world.ClearForces();
	     
	     world.QueryAABB(checkBasket, basket);
	}
	
	function checkBasket(fixture){
		  if(fixture.GetBody().name == "body7"){
			  goalReached = true;
		  }
	}
	
	var PTM = 1;
	var e_shapeBit = 0x0001;
	var e_jointBit = 0x0002;
	var e_aabbBit = 0x0004;
	var e_pairBit = 0x0008;
	var e_centerOfMassBit = 0x0010;
    var originTransform = new b2Transform();
    var viewCenterPixel = {
    	    x:300,
    	    y:200
    	};
    var canvasOffset = {
    	    x: 0,
    	    y: 400
    	}; 
    var viewAABB = new b2AABB();
    
    function setColorFromBodyType(color, b) {
        if (b.IsActive() == false) 
            color.Set(0.5, 0.5, 0.3);
         else if (b.GetType() == b2_staticBody) 
            color.Set(0.5, 0.9, 0.5);
         else if (b.GetType() == b2_kinematicBody) 
            color.Set(0.5, 0.5, 0.9);
         else if (b.IsAwake() == false) 
            color.Set(0.6, 0.6, 0.6);                
         else 
            color.Set(0.9, 0.7, 0.7);
    }

	function draw() {
	    
	    //black background
	    context.fillStyle = 'rgb(0,0,0)';
	    context.fillRect( 0, 0, canvas.width, canvas.height );
	    
	    context.save();   
	        context.translate(canvasOffset.x, canvasOffset.y);
	        context.scale(1,-1);
	        context.scale(PTM,PTM);
	        context.lineWidth /= PTM;
	        
	        //draw images
	        context.save();
	            context.scale(1,-1);
	            if ( world.images ) {
	                for (var i = 0; i < world.images.length; i++) {
	                    var imageObj = world.images[i].imageObj;
	                    context.save();
	                        if ( world.images[i].body ) {
	                            //body position in world
	                            var bodyPos = world.images[i].body.GetPosition();
	                            context.translate(bodyPos.x, -bodyPos.y);
	                            context.rotate(-world.images[i].body.GetAngle());
	                            
	                            //image position in body
	                            var imageLocalCenter = world.images[i].center;
	                            context.translate(imageLocalCenter.x, -imageLocalCenter.y);
	                            context.rotate(-world.images[i].angle);
	                        }
	                        var ratio = 1 / imageObj.height;
	                        ratio *= world.images[i].scale;
	                        context.scale(ratio, ratio);
	                        context.translate(-imageObj.width / 2, -imageObj.height / 2);
	                        context.drawImage(imageObj, 0, 0);
	                    context.restore();
	                }
	            }
	        context.restore();
	        
	        myDebugDraw.DrawTransform(originTransform);
	        
	        var flags = myDebugDraw.GetFlags();
	        myDebugDraw.SetFlags(flags & ~e_shapeBit);
	        world.DrawDebugData();
	        myDebugDraw.SetFlags(flags);
	                
	        if (( flags & e_shapeBit ) != 0) {
	            //query the world for visible fixtures
	            var currentViewCenterWorld = getWorldPointFromPixelPoint( viewCenterPixel );
	            var viewHalfwidth = 0.5 * canvas.width / PTM;
	            var viewHalfheight = 0.5 * canvas.height / PTM;
	            viewAABB.lowerBound.Set(currentViewCenterWorld.x - viewHalfwidth, currentViewCenterWorld.y - viewHalfheight);
	            viewAABB.upperBound.Set(currentViewCenterWorld.x + viewHalfwidth, currentViewCenterWorld.y + viewHalfheight);
	            //visibleFixturesQueryCallback.m_fixtures = [];
	            m_fixtures = []; // JP
	            world.QueryAABB(visibleFixturesQueryCallback, viewAABB);
	            var f, b, xf, s;
	            var color = new b2Color(0, 0, 0);            
	            var circleFixtures = [];
	            var polygonFixtures = [];
	            var staticPolygonFixtures = [];
	            var kinematicPolygonFixtures = [];
	            var dynamicPolygonFixtures = [];
//	            console.log(m_fixtures.length);
	            for (var i = 0; i < m_fixtures.length; i++) {
	                f = m_fixtures[i];
	                s = f.GetShape();
	                if ( s.GetType() == b2Shape.e_circleShape ) {
	                    circleFixtures.push(f);
	                }
	                else if ( s.GetType() == b2Shape.e_polygonShape ) {
	                    polygonFixtures.push(f);
	                }
	            }
	            for (var i = 0; i < circleFixtures.length; i++) {
	                f = circleFixtures[i];
	                s = f.GetShape();
	                b = f.GetBody();
	                xf = b.GetTransform();
	                setColorFromBodyType(color, b);
	                world.DrawShape(s, xf, color);
	            }
	            for (var i = 0; i < polygonFixtures.length; i++) {
	                f = polygonFixtures[i];
	                b = f.GetBody();
	                if (b.GetType() == b2_staticBody) 
	                    staticPolygonFixtures.push(f);
	                else if (b.GetType() == b2_kinematicBody) 
	                    kinematicPolygonFixtures.push(f);
	                else 
	                    dynamicPolygonFixtures.push(f);
	            }
	            context.strokeStyle = "rgb(128,230,128)";
	            context.beginPath();//draw all static polygons as one path
	            for (var i = 0; i < staticPolygonFixtures.length; i++) {
	                f = staticPolygonFixtures[i];
	                s = f.GetShape();
	                b = f.GetBody();
	                xf = b.GetTransform();
	                //world.DrawShape(s, xf, color);
	                drawLinePolygon(s, xf);
	            }
	            context.closePath();
	            context.stroke();
	            
	            context.strokeStyle = "rgb(128,128,230)";
	            context.beginPath();//draw all kinematic polygons as one path
	            for (var i = 0; i < kinematicPolygonFixtures.length; i++) {
	                f = kinematicPolygonFixtures[i];
	                s = f.GetShape();
	                b = f.GetBody();
	                xf = b.GetTransform();
	                //world.DrawShape(s, xf, color);
	                drawLinePolygon(s, xf);
	            }
	            context.closePath();
	            context.stroke();
	            
	            context.strokeStyle = "rgb(230,178,178)";
	            context.beginPath();//draw all dynamic polygons as one path
	            for (var i = 0; i < dynamicPolygonFixtures.length; i++) {
	                f = dynamicPolygonFixtures[i];
	                s = f.GetShape();
	                b = f.GetBody();
	                xf = b.GetTransform();
	                //world.DrawShape(s, xf, color);
	                drawLinePolygon(s, xf);
	            }
	            context.closePath();
	            context.stroke();
	        }
	        
//	        if ( mouseJoint != null ) {
//	            //mouse joint is not drawn with regular joints in debug draw
//	            var p1 = mouseJoint.GetAnchorB();
//	            var p2 = mouseJoint.GetTarget();
//	            context.strokeStyle = 'rgb(204,204,204)';
//	            context.beginPath();
//	            context.moveTo(p1.x,p1.y);
//	            context.lineTo(p2.x,p2.y);
//	            context.stroke();
//	        }
	        
	    context.restore();
	}
	//for drawing polygons as one path
	function drawLinePolygon(poly, xf) {
	    var vertexCount = parseInt(poly.GetVertexCount());
	    var localVertices = poly.GetVertices();
	    var vertices = new Vector(vertexCount);
	    for (var i = 0; i < vertexCount; ++i) {
	        vertices[i] = b2Math.MulX(xf, localVertices[i]);
	    }
	    var drawScale = myDebugDraw.m_drawScale;
	    context.moveTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
	    for (var i = 1; i < vertexCount; i++) {
	        context.lineTo(vertices[i].x * drawScale, vertices[i].y * drawScale);
	    }
	    context.lineTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
	}
	function getWorldPointFromPixelPoint(pixelPoint) {
	    return {                
	        x: (pixelPoint.x - canvasOffset.x)/PTM,
	        y: (pixelPoint.y - (canvas.height - canvasOffset.y))/PTM
	    };
	}
};