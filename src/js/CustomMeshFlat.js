
var CustomMesh = {
  
  ////////////////////////////////////////////////////////////////////////////////////
  // RANDOM SHAPE
  ////////////////////////////////////////////////////////////////////////////////////


  matShininess : 0,
  matSpecular : 0x000000,

  flatshadeGeometry : function(geom){
    geom.computeFaceNormals();
    for ( var i = 0; i < geom.faces.length; i ++ ) {
      geom.faces[ i ].vertexNormals = [];
    }
    geom = new THREE.BufferGeometry().fromGeometry( geom );
  },

  RandomClosedMesh : function(pointsCount, minRay, maxRay, d, color){
    var shape = new THREE.Shape();
    var angleStep = (Math.PI*2/pointsCount);
    var startPoint={};
    for (var i=0;i<pointsCount;i++){
      var a =  (angleStep*i)+ Math.random()*.1
      var r = minRay + Math.random()*(maxRay-minRay);
          
      var tx = Math.cos(a)*r;
      var tz = Math.sin(a)*r;
      if (i==0){
        startPoint = {x:tx, z:tz};
        shape.moveTo(tx, tz);  
      }else{
        shape.lineTo(tx, tz);
      }
    }
    shape.lineTo(startPoint.x, startPoint.z); 

    var extrudeSettings = { amount: d, bevelEnabled: false };
    var shapeGeom = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    CustomMesh.flatshadeGeometry(shapeGeom);
    mesh = new THREE.Mesh(shapeGeom, new THREE.MeshLambertMaterial({ 
      color: color
    }));
    return mesh;

  },

  ////////////////////////////////////////////////////////////////////////////////////
  //                                                                      ISO TRIANGLE
  ////////////////////////////////////////////////////////////////////////////////////

  TriMesh : function(w,h,d,color, direction){
    var shape = new THREE.Shape();
    shape.moveTo(-w/2,0);
    shape.lineTo(0,h);
    shape.lineTo(w/2,0);
    shape.lineTo(-w/2,0);

    var mat = new THREE.MeshLambertMaterial({ 
        color: color
      })

    var geom;
    
    if (d===0){
      geom = new THREE.ShapeGeometry(shape);
      mat.side = THREE.DoubleSide;
    }else{
      var extrudeSettings = { amount: d, bevelEnabled: false };
      geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    } 
    if (direction == "down"){
      geom.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI));
      geom.applyMatrix(new THREE.Matrix4().makeTranslation(0,h,0));
    }
    CustomMesh.flatshadeGeometry(geom);
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
  },

  ////////////////////////////////////////////////////////////////////////////////////
  //                                                                             PLANE
  ////////////////////////////////////////////////////////////////////////////////////

  PlaneMesh : function(w,d,s,color){
     var mat = new THREE.MeshLambertMaterial({ 
        color: color
      });  

    var geom = new THREE.PlaneGeometry( w, d, s, s );
    CustomMesh.flatshadeGeometry(geom);
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
  },

  ////////////////////////////////////////////////////////////////////////////////////
  //                                                                           DIAMOND 
  ////////////////////////////////////////////////////////////////////////////////////


  DiamondMesh : function(w,h,pM,d,color){
    var shape = new THREE.Shape();
    var mh = h*pM; // middle height = height * percentageMiddle
    shape.moveTo(0,0);
    shape.lineTo(-w/2,mh);
    shape.lineTo(0,h);
    shape.lineTo(w/2,mh);
    shape.lineTo(0,0);

    var mat = new THREE.MeshLambertMaterial({ 
        color: color
      })

    var geom;
    
    if (d===0){
      geom = new THREE.ShapeGeometry(shape);
      mat.side = THREE.DoubleSide;

    }else{
      var extrudeSettings = { amount: d, bevelEnabled: false };
      geom = new THREE.ExtrudeGeometry( shape, extrudeSettings ); 
    } 

    CustomMesh.flatshadeGeometry(geom);
    
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
  },

  

  ////////////////////////////////////////////////////////////////////////////////////
  //                                                                    REGULAR PLYGON 
  ////////////////////////////////////////////////////////////////////////////////////

  RegPolyMesh : function(ray,seg,d,color, center){

    var shape = new THREE.Shape();
    var angleStep = (Math.PI*2/seg);
    var startPoint={};

    for (var i=0;i<seg;i++){
      var a =  (angleStep*i);
      var tx = Math.cos(a)*ray;
      var ty = Math.sin(a)*ray;
      if (i==0){
        startPoint = {x:tx, y:ty};
        shape.moveTo(tx, ty);  
      }else{
        shape.lineTo(tx, ty);
      }
    }
    shape.lineTo(startPoint.x, startPoint.y); 

    var mat = new THREE.MeshLambertMaterial({ 
      color: color,
    })

    var geom;
    
    if (d===0){
      geom = new THREE.ShapeGeometry(shape);
      mat.side = THREE.DoubleSide;
    }else{
      var extrudeSettings = { amount: d, bevelEnabled: false };
      geom = new THREE.ExtrudeGeometry( shape, extrudeSettings ); 
    } 

    geom.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/2));
    
    if (!center){
      geom.applyMatrix(new THREE.Matrix4().makeTranslation(0,ray,0));
    }
    CustomMesh.flatshadeGeometry(geom);
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
  },

  //

  ////////////////////////////////////////////////////////////////////////////////////
  //                                                                         RECTANGLE 
  ////////////////////////////////////////////////////////////////////////////////////

  RectMesh : function(w,h,d,color){
    var shape = new THREE.Shape();
    shape.moveTo(-w/2,0);
    shape.lineTo(-w/2,h);
    shape.lineTo(w/2,h);
    shape.lineTo(w/2,0);
    shape.lineTo(-w/2,0);

    var mat = new THREE.MeshLambertMaterial({ 
        color: color
      })

    var geom;
    
    if (d===0){
      geom = new THREE.ShapeGeometry(shape);
      mat.side = THREE.DoubleSide;

    }else{
      var extrudeSettings = { amount: d, bevelEnabled: false };
      geom = new THREE.ExtrudeGeometry( shape, extrudeSettings ); 
    } 
    CustomMesh.flatshadeGeometry(geom);
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
  },

  ////////////////////////////////////////////////////////////////////////////////////
  //                                                                            SPHERE 
  ////////////////////////////////////////////////////////////////////////////////////

  SphereMesh : function(ray,sw,sh,color, center){
    var geom = new THREE.SphereGeometry( ray, sw, sh);
    var mat = new THREE.MeshLambertMaterial({ 
      color: color,
    });
    if (!center){
      geom.applyMatrix(new THREE.Matrix4().makeTranslation(0,ray,0));
    }
    CustomMesh.flatshadeGeometry(geom);
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
  },

  ////////////////////////////////////////////////////////////////////////////////////
  //                                                                              CUBE 
  ////////////////////////////////////////////////////////////////////////////////////

  CubeMesh : function(w,h,d,color, center, onTip){
    var geom = new THREE.CubeGeometry( w, h, d, 1, 1, 1);
    var mat = new THREE.MeshLambertMaterial({ 
      color: color
    });
    var d;
    if (onTip){
      var vertPos = new THREE.Vector3( w/2, 0, d/2 );
      d = vertPos.length();
      geom.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI/4));
      geom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/4));
    }else{
      d = h/2;
    }
    if (!center){
      geom.applyMatrix(new THREE.Matrix4().makeTranslation(0,d,0));
    }
    CustomMesh.flatshadeGeometry(geom);
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
  },

  ////////////////////////////////////////////////////////////////////////////////////
  //                                                                          CYLINDER
  ////////////////////////////////////////////////////////////////////////////////////

  CylinderMesh : function(rayTop,rayBotton,h,segR, segH, color, center){
    var geom = new THREE.CylinderGeometry( rayTop, rayBotton, h, segR, segH);
    var mat = new THREE.MeshLambertMaterial({ 
      color: color,
    });
    if (!center) geom.applyMatrix(new THREE.Matrix4().makeTranslation(0,h/2,0));  
    CustomMesh.flatshadeGeometry(geom);
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
  },

  ////////////////////////////////////////////////////////////////////////////////////
  //                                                                            TORUS
  ////////////////////////////////////////////////////////////////////////////////////

  QuarterTorusMesh : function(radius,radiusTube,radialSegments,tubularSegments, arc, color){
    
    var points = [];
    var curves = [];

    var i, a;
    var angleStep = arc / radialSegments;

    
    //points.push(new THREE.Vector3( radius, -.1, 0 ));

    for (i = 0 ; i<radialSegments+1; i++){
      var vx = Math.cos((-Math.PI/2) - (i*angleStep)) * radius;
      var vy = Math.sin((-Math.PI/2) - (i*angleStep)) * radius;
      points.push(new THREE.Vector3( vx, vy, 0 ));
    }

    //points.push(new THREE.Vector3( -.1, radius, 0 ));


    var shape = new THREE.Shape();
    angleStep = (Math.PI*2/tubularSegments);
    var startPoint={};

    for (i=0;i<tubularSegments;i++){
      a =  (angleStep*i);
      var vertX = Math.cos(a)*radiusTube;
      var vertY = Math.sin(a)*radiusTube;
      if (i==0){
        startPoint = {x:vertX, y:vertY};
        shape.moveTo(vertX, vertY);  
      }else{
        shape.lineTo(vertX, vertY);
      }
    }
    shape.lineTo(startPoint.x, startPoint.y); 

    //var spline =  new THREE.CurvePath( points );
    var spline = new THREE.CatmullRomCurve3(points);

    var extrudeSettings = {
      steps     : radialSegments,
      bevelEnabled  : false,
      extrudePath   : spline
    };

    var geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );

    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, radius,0));
    
    var mat = new THREE.MeshLambertMaterial({ 
      color: color,
    });
    CustomMesh.flatshadeGeometry(geom);
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
  },

  ////////////////////////////////////////////////////////////////////////////////////
  //                                                                            LATHE
  ////////////////////////////////////////////////////////////////////////////////////

  Lathe : function(points,segments, color){
    // change the axis from z to y;
    var rotPoints = [];
    var i, tx,ty,tz;
    for (i=0; i<points.length; i++){
      tx = points[i].x;
      ty = points[i].z;
      tz = points[i].y;
      rotPoints.push( new THREE.Vector3( tx, ty, tz ) );
    }
    var geom = new THREE.LatheGeometry( rotPoints, segments );
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

    var mat = new THREE.MeshLambertMaterial({ 
      color: color
    });
    CustomMesh.flatshadeGeometry(geom);
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
  },

  ////////////////////////////////////////////////////////////////////////////////////
  //                                                                            LINE
  ////////////////////////////////////////////////////////////////////////////////////


  Line : function(points,thickness, color, curved){
    
    var curved = curved;
    var geom = new THREE.Geometry();

    if (curved){
      var curve = new THREE.SplineCurve3( points );
      geom.vertices = curve.getPoints( 20 );
    }else{
      for (var i=0; i<points.length; i++){
        var v = points[i];
        geom.vertices.push(v);
      }
    }
    
    var mat = new THREE.LineBasicMaterial({
        color: color,
        linewidth : thickness,
        //fog:true,
    });

    var line = new THREE.Line(geom, mat);
    return line;
  },

  ////////////////////////////////////////////////////////////////////////////////////
  //                                                                       CURVED PATH
  ////////////////////////////////////////////////////////////////////////////////////


  CurvedPath : function(points,thickness, color){
    
    var geom = new THREE.Geometry();

    var curve = new THREE.CatmullRomCurve3( points );
    
    var mat = new THREE.LineBasicMaterial({
        color: color,
        linewidth : thickness,
        //fog:true,
    });

    var i, a;
    var radialSegments = 5;
    var angleStep = Math.PI*2 / radialSegments;
    var shape = new THREE.Shape(); 
    var startPoint={};

    for (i=0;i<radialSegments;i++){
      a =  (angleStep*i);
      var vertX = Math.cos(a)*thickness;
      var vertY = Math.sin(a)*thickness;
      if (i==0){
        startPoint = {x:vertX, y:vertY};
        shape.moveTo(vertX, vertY);  
      }else{
        shape.lineTo(vertX, vertY);
      }
    }
    shape.lineTo(startPoint.x, startPoint.y); 

    var extrudeSettings = {
      steps     : 3,
      bevelEnabled  : false,
      extrudePath   : curve
    };

    var geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );

    var mat = new THREE.MeshLambertMaterial({ 
      color: color,
    });
    CustomMesh.flatshadeGeometry(geom);
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
  },
}


