function Animator () {
  function AnimObject ( dom, key, newValue, startTime, endTime ) {
    this.dom = dom;
    this.key = key;
    this.newValue = newValue;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  var anims = [];
  var onEnd;

  var animateWith = function ( obj, isLastObject ) {
    var a = function () {
      var diff = Math.abs( obj.endTime - obj.startTime ) / 1000;
      obj.dom.style.transition = "all " + diff + "s";

      if (!!obj.dom.style.webkitTransition)
        obj.dom.style.webkitTransition = "all " + diff + "s";

      if (!!obj.dom.style.msTransition)
        obj.dom.style.msTransition = "all " + diff + "s";

      if (!!obj.dom.style.oTransition)
        obj.dom.style.oTransition = "all " + diff + "s";

      if (!!obj.dom.style.mozTransition)
        obj.dom.style.mozTransition = "all " + diff + "s";

      obj.dom.style[obj.key] = obj.newValue;

      if (isLastObject) {
        setTimeout( function () {
          if (!!onEnd) onEnd();
        }, diff * 1000 );
      }
    };
    setTimeout( a, obj.startTime );
  };

  this.addNewAnimation = function ( dom, key, newValue, startTime, endTime ) {
    var a = new AnimObject( dom, key, newValue, startTime, endTime );
    anims.push( a );
  };

  this.setOnEnd = function ( f ) {
    onEnd = f;
  };

  this.startAnimations = function () {
    for (var i = anims.length - 1; i >= 0; i--) {
      var obj = anims[i];
      var lastObject = i == (anims.length - 1);
      animateWith( obj, lastObject );
    }
  };
}