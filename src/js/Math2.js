var Math2 = {

  rangeRandom : function (v1, v2){
    var max = Math.max(v1,v2);
    var min = (max==v1)?v2 : v1;
    return min + Math.random()*(max-min);
  },

  rangeRandomInt : function (v1,v2){
    var max = Math.max(v1,v2);
    var min = (max==v1)?v2 : v1;
    var rnd = min + Math.random()*(max-min);
    return Math.round(rnd);
  },

}