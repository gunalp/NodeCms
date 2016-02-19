/**
 * Created by alpuysal on 19/02/16.
 */
function Register(main){
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

	var generatePage = function (){
		var register = document.createElement('div');
		register.setAttribute('class','login-page');
		that.dom = register;

		var divForm = document.createElement('div');
		divForm.setAttribute('class','form');
		login.appendChild(divForm);


		var form = document.createElement('form');
		form.setAttribute('class','register-form');
		divForm.appendChild(form);


		var formInputUname = document.createElement('input');
		formInputUname.setAttribute('type','text');
		formInputUname.setAttribute('placeholder','username');
		form.appendChild(formInputUname);


		var formInputPwd = document.createElement('input');
		formInputPwd.setAttribute('type','password');
		formInputPwd.setAttribute('placeholder','password');
		form.appendChild(formInputPwd);

		var formInputRePwd = document.createElement('input');
		formInputRePwd.setAttribute('type','password');
		formInputRePwd.setAttribute('placeholder','password');
		form.appendChild(formInputRePwd);

		var formButtonLogin = document.createElement('button');
		form.appendChild(formButtonLogin);
		formButtonLogin.innerHTML = "Create";

		var formPRegister = document.createElement('p');
		formPRegister.setAttribute('class','message');
		form.appendChild(formPRegister);
		formPRegister.innerHTML = "Already registered?";

		var formARegister = document.createElement('a');
		formARegister.setAttribute('id','login-button');
		formARegister.setAttribute('href','');
		formPRegister.appendChild(formARegister);
		formARegister.innerHTML = "Sign In";


		main.appendChild(login);

	};

	var init = function () {
		console.log("[REGISTER] : init");

		generatePage();
	};

	init();
}