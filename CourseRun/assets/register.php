<?php

//require 'database.php';

if(!empty($_POST['email']) && !empty($_POST['password'])):

  //Enter the new user in the database
  $sql = "INSERT INTO users (email, password) VALUES (:email, :password)";
  $stmt = $conn->prepare($sql);

  $stmt->bindParam(':email', $_POST['email']);
  $stmt->bindParam(':password', password_hash($_Post['password'], PASSWORD_BCRYPT));

  if( $stmt->execute() ):
    die('Success');
  else:
    die('Fail');

  endif;

endif;

?>

<!DOCTYPE <!DOCTYPE html>
<html lang="en">
  <head>
    <title>Register Below</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link href="https://fonts.googleapis.com/css?family=Tinos" rel="stylesheet">
  </head>
  <body>

    <div class="header">
        <a href="/"> CourseRun</a>
    </div>

      <h1>Login</h1>
      <span>or <a href="register.php">register here</a></space>



      <form action="login.php" method="POST">
        <input type="text" placeholder="Enter your email" name="email">
        <input type="text" placeholder="First Name" name="firstname">
        <input type="text" placeholder="Last Name" name="lastname">
        <input type="password" placeholder="Password" name="password">
        <input type="submit">

      </form>



    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  </body>
</html>
