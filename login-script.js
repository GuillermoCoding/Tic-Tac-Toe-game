
const loginButtonOne = document.getElementById('login-button1');
var user1;
var user2;
loginButtonOne.addEventListener('click',function(event){
		let userName = document.getElementById('userName-1').value;
		let password = document.getElementById('password-1').value;
		if(userName.length > 0 && password.length > 0){
			validateUser("one",userName,password);

		}
		else{
			alert('username and password required');
		}
	
});
const loginButtonTwo = document.getElementById('login-button2');
loginButtonTwo.addEventListener('click',function(){
		let userName = document.getElementById('userName-2').value;
		let password = document.getElementById('password-2').value;
		if(userName.length > 0 && password.length > 0){
			validateUser('two',userName,password);
		}
		else{
			alert('username and password required');
		}
});

function validateUser(player,userName,password){
	$.ajax({
		method : 'post',
		url : 'database.php?',
		data : {type : 'validate', userName : userName, password : password},
		success: function(data){
			if(data=='invalid'){
				alert("invalid login credentials");
			}
			else{
				
				if(player=='one'){
					user1 = JSON.parse(data);
					const playerOneHeading = document.getElementById('player-one-heading');
					playerOneHeading.textContent = user1['name']+" ready to play...";
					loginButtonOne.style.pointerEvents = 'none';
					if(user1&&user2){
						sessionStorage.setItem("user1",JSON.stringify(user1));
						sessionStorage.setItem("user2",JSON.stringify(user2));
						window.location.replace("http://guillermosd.com/play-board.html");
					}
				}
				else if(player=='two'){
					user2 = JSON.parse(data);
					const playerTwoHeading = document.getElementById('player-two-heading');
					playerTwoHeading.textContent = user2['name']+" ready to play...";
					loginButtonTwo.style.pointerEvents = 'none';
					if(user1&&user2){
						sessionStorage.setItem("user1",JSON.stringify(user1));
						sessionStorage.setItem("user2",JSON.stringify(user2));
						window.location.replace("http://guillermosd.com/play-board.html");
					}
				}

			}		
		}
	});
}