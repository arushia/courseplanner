<?php
$server = 'localhost';
$username = 'root';
$password = 'root';
$database = 'auth';

try{
  $conn = new PDO("mysql:host=$server;=$port;dbname=$database;", $username, $password);
//if you can't connect to the server.
} catch(PDOException $e){
  die( "Connection failed: " . $e->getMessage());
}

?>
