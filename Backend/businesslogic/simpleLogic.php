<?php
include("db/dataHandler.php");

class SimpleLogic
{

    private $dh;

    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param1, $param2, $param3)
    {
        switch ($method) {

            case "getAppointments":
                $res = $this->dh->getAppointments();
                break;
            case "insertAppointment":
                $res = $this->dh->insertAppointment($param1, $param2, $param3);
                break;
            case "insertDates":
                $res = $this->dh->insertDates($param1, $param2);
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
