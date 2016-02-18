/**
 * Created by alpuysal on 18/02/16.
 */
function Login(main) {

	var events = {};

	this.addEventListener = function (eventName, eventFunction) {
		events[eventName] = eventFunction;
	};

	this.getEvent = function (eventName) {
		return events.hasOwnProperty(eventName) ? events[eventName] : undefined;
	};

	var domObjects = {};

	var that = this;

	this.dom = "";

	var sendLogin = function () {

		var post = {
			username: domObjects.usernameInput.value,
			password: domObjects.passwordInput.value
		};

		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			var json = JSON.parse(xhr.responseText);
			console.log("response: ", json);
			if (!json.err) {

				that.destroy();

				setTimeout(function () {
					console.log(json.username);
					var onLoginSuccess = that.getEvent("loginSuccess");
					if (!!onLoginSuccess) onLoginSuccess(json.username);

				}, 10);
			} else {
				console.log("error: ", json);
				setTimeout(function () {
					domObjects.usernameInput.style.borderColor = "red";
					domObjects.passwordInput.style.borderColor = "red";
				}, 10);
			}
		};
		xhr.open("POST", "/api/v1/auth/login", true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(JSON.stringify(post));

	};

	var initEvents = function () {

	};

	var generatePage = function (){
		var login = document.createElement('div');
		login.setAttribute('class','login-page');
		that.dom = login;

		main.appendChild(login);

	};

	this.show = function () {
		that.dom.style.display = "block";

	};
	this.hide = function () {
		that.dom.style.display = "none";
	};
	this.destroy = function () {
		that.dom.style.display = "none";
		that.dom.removeFromParent();
	};

	var init = function () {
		console.log("[LOGIN] : init");
		generatePage();
		initEvents();
	};

	init();
}