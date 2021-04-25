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
//document get ready

interface Data {
  title: string;
  user: string;
  location: string;
  date: string;
  time: string;
  expiry_date: string;
}

$(() => {
  let form = document.getElementById("myform");
  form!.style.display = "none";
  document.getElementById("mimg")!.style.display = "none";
});



  $("#submit").on("click", function(){
    let title = $("#title").val(); 
    let location = $("#location").val(); 
    let exp = $("#exp").val();

    $.ajax({
      type: "POST",
      url: restServer,
      data: {
          method: "insertAppointment",
          title: title,
          location: location,
          exp: exp
      },
      success: function (response) {
          console.log("Data inserted.");
          console.log(response)
          getSmaller();
      }
      
  });
  })

// ---Settings: GET JSON DATA FROM DATABASE---
let restServer: string = "http://localhost:80/WS2021/ueX/WEBSC_Project/WEBSC_Project/Backend/serviceHandler.php";
$.getJSON(
  restServer,
  { method: "getAppointments" },
  function (data: Array<Data>) {
    $.each(data, function (key, value) {
      let newItemBox = document.createElement("div");
      newItemBox.setAttribute("class", "item");
      newItemBox.setAttribute("id", key.toString());
      $(".wrapper-main").append(newItemBox);

      let newTitle = document.createElement("p");
      let newLocation = document.createElement("p");
      let newExpiryDate = document.createElement("p");

      newTitle.setAttribute("class", "title");
      newLocation.setAttribute("class", "location");
      newExpiryDate.setAttribute("class", "exp_date");
      newTitle.innerHTML = value.title;
      newLocation.innerHTML = value.location;
      newExpiryDate.innerHTML = value.expiry_date;

      $("#" + key.toString()).append(newTitle);
      $("#" + key.toString()).append(newLocation);
      $("#" + key.toString()).append(newExpiryDate);
    });
    console.log(data);
  }
);
//---GET JSON DATA END---

//---ANIMATION SECTION---
function getBigger(){
  $("#newappointment").animate(
    {
      height: "330px",
      width: "600px",
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
    newDate.id = "start";

    newDate?.setAttribute("class", "form-control");
    newDate!.required = true;
    date!.append(newDate);
  });
//---ANIMATION SECTION END---

