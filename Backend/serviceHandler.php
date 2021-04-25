<?php
include("businesslogic/simpleLogic.php");

$method = "";
$param = "";
$param2 = "";
$param3 = "";


isset($_GET["method"]) ? $method = $_GET["method"] : false;
isset($_GET["param"]) ? $param = $_GET["param"] : false;

$title = "";
$location = "";
$exp = "";

isset($_POST["method"]) ? $method = $_POST["method"] : false;
isset($_POST["title"]) ? $title = $_POST["title"] : false;
isset($_POST["location"]) ? $location = $_POST["location"] : false;
isset($_POST["exp"]) ? $exp = $_POST["exp"] : false;




$logic = new SimpleLogic();

if($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $result = $logic->handleRequest($method, $param, $param2, $param3);
    if ($result == null) {
        response("GET", 400, null);
    } else {
        response("GET", 200, $result);
    }
}
else if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $logic->handleRequest($method, $title, $location, $exp);
}
function response($method, $httpStatus, $data)
{
    header('Content-Type: application/json');
    switch ($method) {
        case "GET":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        case "POST":
            http_response_code($httpStatus);
            break;
        default:
            http_response_code(405);
            echo ("Method not supported yet!");
    }
}
