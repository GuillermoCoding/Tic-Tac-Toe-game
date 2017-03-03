<?php
	
	$host_name  = "db670263929.db.1and1.com";
	$database   = "db670263929";
	$user_name  = "dbo670263929";
	$password   = "Teggy300$";
	$type = $_POST['type'];

	if($type=='create'){
	$postUserName = $_POST['userName'];
	$postPassword = $_POST['password'];
	$postEmail = $_POST['email'];
    $con = mysqli_connect('db670263929.db.1and1.com','dbo670263929','Teggy300$');

    if(!$con){
    	echo 'not connecting to server';
    }
    if(!mysqli_select_db($con,'db670263929')){
    	echo 'not connecting to db';
    }
    $sql = "INSERT INTO users (name,password,email) VALUES ('$postUserName','$postPassword','$postEmail')";


    if(!mysqli_query($con,$sql)){
    	echo 'not inserted';
    }
    else{
    	echo 'inserted';
    }

    mysql_close($con);
	}
	else if($type=='validate'){
		$postUserName = $_POST['userName'];
		$postPassword = $_POST['password'];
		$con2 = mysqli_connect('db670263929.db.1and1.com','dbo670263929','Teggy300$');
		if(!mysqli_select_db($con2,'db670263929')){
    			echo 'not connecting to db';
    	}
		  $result = mysqli_query($con2,"SELECT name,wins,losses FROM users WHERE name='$postUserName' and password='$postPassword' LIMIT 1");
		 $row = mysqli_fetch_assoc($result); 
		 if ($result->num_rows) {
		 	echo json_encode($row); 
		 }
		 else{
		 	echo 'invalid'; 
		 }

		 mysql_close($con2);
		

	}
	else if($type=='update'){
		$winnerUserName = $_POST['winner'];
		$loserUserName = $_POST['loser'];
		$con3 = mysqli_connect('db670263929.db.1and1.com','dbo670263929','Teggy300$');
		if(!mysqli_select_db($con3,'db670263929')){
    			echo 'not connecting to db';
    	}
    	mysqli_query($con3,"UPDATE users SET wins= wins+1 WHERE name='$winnerUserName'");
    	mysqli_query($con3,"UPDATE users SET losses=losses+1 WHERE name='$loserUserName'");
    	mysql_close($con3);
	}

	
?>