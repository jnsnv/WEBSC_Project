<?php
include("./models/appointment.php");
class DataHandler
{
    private $serverName;
    private $serverUser;
    private $serverPsw;
    private $dbName;

    private function connect()
    {
        $this->serverName = "localhost";
        $this->serverUser = "bif2webscriptinguser";
        $this->serverPsw = "bif2021";
        $this->dbName = "calendarproject";

        //Connection
        $connection = new mysqli($this->serverName, $this->serverUser, $this->serverPsw, $this->dbName);
        //Connection failed
        if(!$connection){
            die("Connection failed: " . mysqli_connect_error());
        }
        return $connection;
    }

    public function getAppointments(){
        $sql = "SELECT * FROM appointments;";
        $connection = $this->connect();
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $row = $stmt->get_result();
        $data = array();
        
        while ($result = $row->fetch_assoc()){
            $data[] = $result;
        }

        if(!empty($data)){
            return $data;
        }

        $stmt->close();
    }
/*
    public function queryPersons()
    {
        $res =  $this->getDemoData();
        return $res;
    }


    public function queryPersonById($id)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->id == $id) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    public function queryPersonByName($name)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->name == $name) {
                array_push($result, $val);
            }
        }
        return $result;
    }



   private static function getDemoData()
    {
        $demodata=[
            [new Person(1, "Jane", "Doe", "jane.doe@fhtw.at", 1234567, "Central IT")],
            [new Person(2, "John", "Doe", "john.doe@fhtw.at", 34345654, "Help Desk")],
            [new Person(3, "baby", "Doe", "baby.doe@fhtw.at", 54545455, "Management")],
            [new Person(4, "Mike", "Smith", "mike.smith@fhtw.at", 343477778, "Faculty")],
        ];

        return $demodata;
        
        
    }
    */
}
