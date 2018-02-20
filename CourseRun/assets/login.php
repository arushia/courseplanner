<?php

if(!empty($_POST['email']) && !empty($_POST['password'])):
 

endif;

?>


<!DOCTYPE <!DOCTYPE html>
<html lang="en">
  <head>
    <title>Login Below</title>
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
        <input type="password" placeholder="Password" name="password">
        <input type="submit">

      </form>



    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  </body>
</html>
