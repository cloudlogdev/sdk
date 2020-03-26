const cloudlog = require("./index");

var script =
  document.currentScript ||
  /*Polyfill*/ Array.prototype.slice
    .call(document.getElementsByTagName("script"))
    .pop();

var user = script.getAttribute("data-user");
var project = script.getAttribute("data-project");

cloudlog.initialize(user, project);
