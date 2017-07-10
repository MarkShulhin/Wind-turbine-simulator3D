var GeometryHelpers = {

  getCenterTriangle : function ( vectorA, vectorB, vectorC ) {
    var vec = new THREE.Vector3();
    vec = vectorA.clone().add(vectorB.clone().add(vectorC.clone()));
    vec.multiplyScalar(1/3);
    return vec;
  },

  getRandomPointInTriangle : function( vectorA, vectorB, vectorC ) {
    var vector = new THREE.Vector3();
    var point = new THREE.Vector3();

    var a = THREE.Math.random16();
    var b = THREE.Math.random16();

    if ( ( a + b ) > 1 ) {

      a = 1 - a;
      b = 1 - b;

    }

    var c = 1 - a - b;

    point.copy( vectorA );
    point.multiplyScalar( a );
    vector.copy( vectorB );
    vector.multiplyScalar( b );
    point.add( vector );
    vector.copy( vectorC );
    vector.multiplyScalar( c );
    point.add( vector );
    return point;
  },

  makeNoise : function(geom, val){
    var l = geom.vertices.length;
    for (var i=0; i<l; i++){
      var v = geom.vertices[i];
      v.x += Math2.rangeRandom(-val, val);
      v.y += Math2.rangeRandom(-val, val);
      v.z += Math2.rangeRandom(-val, val);
    }
    geom.computeVertexNormals();
    geom.verticesNeedUpdate = true;
  },

  compareHeight : function(a,b){
    if (a.y < b.y)
      return -1;
    if (a.y > b.y)
      return 1;
    return 0;
  },

  getVertsAtHeight : function(geom, minh, maxh){
    var arr = [];
    var l = geom.vertices.length;
    for (var i=0;i<l;i++){
      var v = geom.vertices[i];
      if (v.y >= minh && v.y <= maxh){
        arr.push({vertex:v, index:i});
      }
    }
    return arr; //[{vertex:v, index:i},{vertex:v, index:i}]
  },
  
  getAttachs : function(geom, defs){
    
    var allverts = [];
    var nontestedverts = [];
    var attachs = [];
    var l = geom.vertices.length;
    var i, j, v;

    for (i=0;i<l; i++){
      v = geom.vertices[i];
      allverts.push({vertex:v, index:i, type:""});
    }

    for (i=0; i<defs.length; i++){
      
      var def = defs[i];
      var minH = def.minH;
      var maxH = def.maxH;
      var maxAngle = def.maxAngle;
      var minAngle = def.minAngle;
      var type = def.type;
      var count = def.count;
      
      nontestedverts = allverts.slice();
      l = nontestedverts.length;

      for (j=0; j<count && l>0 && nontestedverts.length; j++){
        
        
        var indx = Math2.rangeRandomInt(0, l-1);
        
        var targetDef = nontestedverts.splice(indx,1)[0];
        var targetIndex = targetDef.index;
        var v = targetDef.vertex;
        var angle = Math.atan2(v.z, v.x).toFixed(2);
        

        var condHeight = (v.y >= minH && v.y<=maxH);
        var condAngle;
        if (minAngle==0 && maxAngle==0){
          condAngle = true;
        } else{
          condAngle = (angle<=def.maxAngle && angle>=def.minAngle);
        }

        l--;
        if (condHeight && condAngle){
          var allVertsIndex = GeometryHelpers.getElementBy(allverts, "index", targetIndex).order;
          var currentTestedDef = allverts.splice(allVertsIndex,1)[0];
          currentTestedDef.type=type;
          attachs.push(currentTestedDef);
        }else{
          j--;
        }

      }
    }
    return  attachs; //[{vertex:v, index:i, type:"leaf"}];
  },

  getElementBy : function(arr, prop, propValue){
    for (var i=0; i<arr.length; i++){
      if (arr[i][prop] == propValue){
        return {order : i, object : arr[i]};
      }
    }
  },

  getVerticesNormals : function(geom){
    var normals = [];
    var i;
    for (i=0, fl=geom.faces.length; i<fl; i++ ){
      var f = geom.faces[i];
      var vaIndx = f.a;
      var vbIndx = f.b;
      var vcIndx = f.c;
      
      var va = f.vertexNormals[0];
      var vb = f.vertexNormals[1];
      var vc = f.vertexNormals[2];

      if (normals[vaIndx] == undefined) normals[vaIndx] = f.vertexNormals[0];
      if (normals[vbIndx] == undefined) normals[vbIndx] = f.vertexNormals[1];
      if (normals[vcIndx] == undefined) normals[vcIndx] = f.vertexNormals[2];
    }
    return normals;
  },
};




