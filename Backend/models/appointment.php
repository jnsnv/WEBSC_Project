<?php
class Appointment {
    public $title;
    public $location;
    public $date;
    public $time;
    public $expiry_date;
    public $id;

    function __construct($title, $location, $date, $time, $expiry_date, $id) {
        
        $this->title = $title;
        $this->location = $location;
        $this->date = $date;
        $this->time = $time;
        $this->expiry_date = $expiry_date;
        $this->id = $id;

      }
}
