function TinyNotifier(msg){

  var defaults = {
    timeOut : 1000,
    successColor : '#0fdd80',
    errorColor : '#dd1614',
    infoColor : '#06b4e6',
    autoClose : true
  };

  if (arguments[1] && typeof arguments[1] === "object") {
    this.options = extendDefaults(defaults,arguments[1]);
  }
}

Notifier.prototype.extendDefaults = function (source, properties) {
  function extendDefaults(source,properties){
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }
};

Notifier.prototype.transitionSelect = function () {
  var el = document.createElement("div");
  if (el.style.WebkitTransition) return "webkitTransition";
  if (el.style.OTransition) return "oTransition";
  return 'transition';
};


new Notifier('notify me', {
  timeOut : 2000
});