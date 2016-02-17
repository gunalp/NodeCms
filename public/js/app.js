/**
 * Created by alpuysal on 17/02/16.
 */
run(function(){
	var main = document.getElementById("main");


	var xhr = new XMLHttpRequest();
	xhr.onload = function(){

	};
	xhr.open("POST","/api/v1/", true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.send();
});