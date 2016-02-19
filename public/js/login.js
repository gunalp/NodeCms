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

		var divLogo = document.createElement('div');
		divLogo.setAttribute('class','app-logo');
		login.appendChild(divLogo);


		var divLogoImage = document.createElement('img');
		divLogoImage.setAttribute('src','images/logo2.png');
		divLogo.appendChild(divLogoImage);

		var divForm = document.createElement('div');
		divForm.setAttribute('class','form');
		login.appendChild(divForm);


		var form = document.createElement('form');
		form.setAttribute('class','login-form');
		divForm.appendChild(form);


		var formInputUname = document.createElement('input');
		formInputUname.setAttribute('type','text');
		formInputUname.setAttribute('placeholder','username');
		form.appendChild(formInputUname);


		var formInputPwd = document.createElement('input');
		formInputPwd.setAttribute('type','password');
		formInputPwd.setAttribute('placeholder','password');
		form.appendChild(formInputPwd);

		var formButtonLogin = document.createElement('button');
		form.appendChild(formButtonLogin);
		formButtonLogin.innerHTML = "Login";

		var formPRegister = document.createElement('p');
		formPRegister.setAttribute('class','message');
		form.appendChild(formPRegister);
		formPRegister.innerHTML = "Not registered?";

		var formARegister = document.createElement('a');
		formARegister.setAttribute('id','register-button');
		formPRegister.appendChild(formARegister);
		formARegister.innerHTML = "Create an account";


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
	};
	init();
}