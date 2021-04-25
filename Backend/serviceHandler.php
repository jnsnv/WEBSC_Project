<?php
include("businesslogic/simpleLogic.php");

$method = "";
$param1 = "";
$param2 = "";
$param3 = "";

isset($_GET["method"]) ? $method = $_GET["method"] : false;
isset($_GET["param1"]) ? $param1 = $_GET["param1"] : false;

isset($_POST["method"]) ? $method = $_POST["method"] : false;
isset($_POST["param1"]) ? $param1 = $_POST["param1"] : false;
isset($_POST["param2"]) ? $param2 = $_POST["param2"] : false;
isset($_POST["param3"]) ? $param3 = $_POST["param3"] : false;


$logic = new SimpleLogic();

if($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $result = $logic->handleRequest($method, $param1, $param2, $param3);
    if ($result == null) {
        response("GET", 400, null);
    } else {
        response("GET", 200, $result);
    }
}
else if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $logic->handleRequest($method, $param1, $param2, $param3);
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
