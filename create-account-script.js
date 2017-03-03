const createAccountButton = document.getElementById('create-account-button');
createAccountButton.addEventListener('click',function(){
	const div = document.getElementById('create-account-input');
	const userName = document.getElementById('userName');
	const password = document.getElementById('password');
	const confirmedPassword = document.getElementById('confirmedPassword');
	const email = document.getElementById('email');
	let loginSuccess = true;
		if(password.value!=confirmedPassword.value){
			if(div.querySelector('#passwordError')==null){
				loginSuccess = false;
				const passwordError = document.createElement('h4');
				passwordError.id = 'passwordError';
				passwordError.style.color='red';
				passwordError.textContent = 'passwords do not match';
				div.appendChild(passwordError);
		}

		}
		else{
			if(div.querySelector('#passwordError')!=null){
				div.removeChild(document.getElementById('passwordError'));
			}
		}
		if(!email.value.includes('@')){
			if(div.querySelector('#emailError')==null){
				loginSuccess = false;
				const emailError = document.createElement('h4');
				emailError.textContent = 'invalid email';
				emailError.style.color = 'red';
				emailError.id = 'emailError';
				div.appendChild(emailError);
			}	
		}
		else{
			if(div.querySelector('#emailError')!=null){
				div.removeChild(document.getElementById('emailError'));
			}
		}
		if(userName.value.length <=5){
			if(div.querySelector('#userNameError')==null){
				loginSuccess = false;
				const userNameError = document.createElement('h4');
				userNameError.textContent = 'user name must be greater than 5 charaters';
				userNameError.style.color = 'red';
				userNameError.id = 'userNameError';
				div.appendChild(userNameError);
			}
		}
		else{
			if(div.querySelector('#userNameError')!=null){
				div.removeChild(document.getElementById('userNameError'));
			}
		}
		if(loginSuccess){
			 alert(userName.value+" "+password.value);
			$.ajax({
				method : 'post',
				url : 'database.php?',
				data: {type: 'create' ,userName : userName.value, password : password.value, email : email.value},
				success: function(data){
						alert(data);
				}
			});
		}

});











