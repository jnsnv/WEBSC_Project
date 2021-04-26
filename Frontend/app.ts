/*
   Achtung - wichtige Hinweise: 
   -----------------------------------------------------------------------------
   1) Sollte VSC jQuery nicht kennen, dann müssen die Typen erst importiert werden
      Führen Sie dazu Folgendes im Terminal von VSC aus:
         npm install --save @types/jquery
   2) Fehlermeldung beim Ausführen von Ajax-Requests: 
      "Quellübergreifende (Cross-Origin) Anfrage blockiert: Die Gleiche-Quelle-Regel verbietet das Lesen der externen Ressource ..."
      --> das passiert wenn Client und Server von unterschiedlichen Quellen kommen
          (z.B. Client: http://localhost:3000/...
                Server: http://localhost:80/... )
      --> dann muss für den Server angegeben werden, dass er das Ergebnis ausliefern darf
      --> Erstellen einer .htaccess - Datei im Verzeichnis der anzusprechenden PHP-Datei mit folgendem Inhalt:
             Header set Access-Control-Allow-Origin "*"
*/


interface Data {
  title: string;
  user: string;
  location: string;
  date: string;
  time: string;
  expiry_date: string;
}
let restServer: string = "http://localhost:80/WS2021/ueX/WEBSC_Project/WEBSC_Project/Backend/serviceHandler.php";

//document get ready
document.addEventListener("DOMContentLoaded", function(event) { 
  loaddata();
  loadDates();
  let form = document.getElementById("myform");
  form!.style.display = "none";
  document.getElementById("mimg")!.style.display = "none";
});
// onload after everything has loaded
window.onload = function () {
  $(".accordion").on("click", function(){
    $(this).toggleClass("active");
    var $panel = $(this).next(".panel");
    $panel.slideToggle();
  });
 
}


  $("#submit").on("click", function(){
    // --- TITLE LOC EXP ---
    let title = $("#title").val(); 
    let location = $("#location").val(); 
    let exp = $("#exp").val();
    //validation
    if(title !== "" && location !== "" && exp !== "")
    {
      $.ajax({
        type: "POST",
        url: restServer,
        data: {
            method: "insertAppointment",
            param1: title,
            param2: location,
            param3: exp
        },
        success: function (response) {
            sendDates();
            console.log("Data inserted.");
            getSmaller();
        }
        
    });
    }
    else
    {
      console.log("empty fields.");
    }
    // --- TITLE LOC EXP END ---
 
  });
  // --- POSSIBLE DATES ---
  function sendDates() {
    $(".datebox").children(".form-control.dates").each(function(index){
      let date = $(this).val();
      let title = $("#title").val(); 
      if(date !== "" && title !== "")
      {
        $.ajax({
          type: "POST",
          url: restServer,
          data: {
              method: "insertDates",
              param1: date,
              param2: title,
          },
          success: function (response) {
              console.log("Data inserted.");
              getSmaller();
          }
      });
      }
      else
      {
        console.log("empty datefield");
      }
    });
  }
  // --- POSSIBLE DATES END ---

// ---Settings: GET JSON DATA FROM DATABASE---
function loaddata(){
  $.ajax({
    type: "GET",
    url: restServer,
    cache: false,
    data: {method: "getAppointments"},
    dataType: "json",
    success: function (data){
      console.log(data);
      $.each(data, function (key, value) {
        let newItemBox = document.createElement("button");
        newItemBox.setAttribute("class", "accordion");
        newItemBox.innerHTML = value.title;
        $(".wrapper-main").append(newItemBox);

        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "panel");
        $(".wrapper-main").append(newDiv);
  
        let newLocation = document.createElement("h2");
        let newExpiryDate = document.createElement("h2");
  

        newLocation.setAttribute("class", "location");
        newExpiryDate.setAttribute("class", "exp_date");

        newLocation.innerHTML = "Location: " + value.location;
        newExpiryDate.innerHTML = "Expiry Date: " + value.expiry_date;
  
        newDiv.append(newLocation);
        newDiv.append(newExpiryDate);

        let votingArea = document.createElement("div");
        votingArea.setAttribute("id", value.title);

        newDiv.append(votingArea);

      });
    }
  })
}
//dates loaded in
function loadDates(){
  $.ajax({
    type: "GET",
    url: restServer,
    cache: false,
    data: {method: "getAvailableAppointments"},
    dataType: "json",
    success: function (data){
      console.log(data);
      $.each(data, function (key, value) {
        let dateOption = document.createElement("input");
        dateOption.type = "checkbox";
        dateOption.value = value.date;
        dateOption.id = value.date;

        let labelNode = document.createElement("label");
        labelNode.htmlFor = value.date;
        labelNode.innerHTML = value.date;

        let fieldToAppend = document.getElementById(value.appointment);

        fieldToAppend?.append(dateOption);
        fieldToAppend?.append(labelNode);

      });
    }
  })
};
//---GET JSON DATA END---

//---ANIMATION SECTION---
function getBigger(){
  $("#newappointment").animate(
    {
      height: "330px",
      width: "35rem",
    },
    500,
    function () {
      console.log("animation complete");
      $("#newappointment").css("height", "100%");
    }
  );

  let app = document.getElementById("newappointment");
  let pimg = document.getElementById("pimg");
  let mimg = document.getElementById("mimg");
  let button = document.getElementById("submit");
  let form = document.getElementById("myform");

 
  pimg!.style.display = "none";
  mimg!.style.display = "block";
  
  form!.style.display = "block";
  app!.style.borderRadius = "3px";
  app!.style.padding = "8px";
  app!.style.marginTop = "8px";
  app!.style.marginBottom = "8px";
  app!.style.backgroundColor = "white";
  app!.style.display = "block";

  button!.style.marginLeft = "15px";
  //document.getElementById("myform");
}

// close form animation
function getSmaller(){
  $("#newappointment").animate(
    {
      height: "-330",
      width: "-600",
    },
    500,
    function () {
        let newA = document.getElementById("newappointment");
        let pimg = document.getElementById("pimg");
        newA!.style.display ="none";
        pimg!.style.display ="block";
    }
  );
}

  $("#mimg").on("click", function () {
    getSmaller();
  })
//open form animation
  $("#pimg").on("click", function () {
    getBigger();
  });

  $("#dateplus").on("click", function () {
    let newDate = document.createElement("input");
    let date = document.querySelector(".datebox");

    newDate.type = "datetime-local";
    newDate?.setAttribute("class", "form-control dates");
    newDate.id = "start";

    newDate!.required = true;
    date!.append(newDate);

  });


  
//---ANIMATION SECTION END---
