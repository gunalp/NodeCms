/**
 * Created by alpuysal on 17/02/16.
 */
r(function(){
	var main = document.getElementById("main");
	var login;
	var register;
	var welcome;

	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		var response = JSON.parse(xhr.responseText);
		if(response.err){
			login = new Login(main);
			//login.addEventListener("loginSuccess", loginSuccess);
			//login.addEventListener("clickRegister", showRegister);
		}else{
			username = response.username;
			welcome = new Welcome(main, username);
		}
	};
	xhr.open("POST","/api/v1/", true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.send();
});