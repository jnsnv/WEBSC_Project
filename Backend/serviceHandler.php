<?php
include("businesslogic/simpleLogic.php");

$param = "";
$method = "";



isset($_GET["method"]) ? $method = $_GET["method"] : false;
isset($_GET["param"]) ? $param = $_GET["param"] : false;

$title = "";
$location = "";
$exp = "";

isset($_POST["title"]) ? $title = $_POST["title"] : false;
isset($_POST["location"]) ? $location = $_POST["location"] : false;
isset($_POST["exp"]) ? $exp = $_POST["exp"] : false;




$logic = new SimpleLogic();

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $result = $logic->handleRequest($method, $param);
    if ($result == null) {
        response("GET", 400, null);
    } else {
        response("GET", 200, $result);
    }
}
   
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $result;
}

function response($method, $httpStatus, $data)
{
    header('Content-Type: application/json');
    switch ($method) {
        case "GET":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        default:
            http_response_code(405);
            echo ("Method not supported yet!");
    }
}
