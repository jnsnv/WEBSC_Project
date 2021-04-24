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

// Settings:
let restServer: string =
  "http://localhost:80/WS2021/ueX/WEBSC_Project/WEBSC_Project/Backend/serviceHandler.php";
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
      let newDate = document.createElement("p");
      let newUser = document.createElement("p");

      newTitle.setAttribute("class", "title");
      newDate.setAttribute("class", "date");
      newUser.setAttribute("class", "participant");
      newTitle.innerHTML = value.title;
      newDate.innerHTML = value.date;
      newUser.innerHTML = value.user;

      $("#" + key.toString()).append(newTitle);
      $("#" + key.toString()).append(newDate);
      $("#" + key.toString()).append(newUser);
    });
  }
);
getBigger();

let form = document.getElementById("myform");
form!.style.display = "none";
document.getElementById("mimg")!.style.display = "none";
function getBigger(){
$("#pimg").on("click", function() {
  $("#newappointment").animate(
    {
      height: "+310",
      width: "+600",
    },
    500,
    function () {
      console.log("animation complete");
    }
  );

  let app = document.getElementById("newappointment");
  app!.style.backgroundColor = "white";
  let pimg = document.getElementById("pimg");
  pimg!.style.display = "none";
  let mimg = document.getElementById("mimg");
  mimg!.style.display = "block";

  app!.style.borderRadius = "3px";
  form!.style.display = "block";

  let title = document.getElementById("title");
  title!.style.borderRadius = "5px";
  title!.style.border = "1px solid #ccc";
  title!.style.borderColor = "black";

  let location = document.getElementById("location");
  location!.style.borderRadius = "5px";
  location!.style.border = "1px solid #ccc";
  location!.style.borderColor = "black";

  let notice = document.getElementById("notice");
  notice!.style.borderRadius = "5px";
  notice!.style.border = "1px solid #ccc";
  notice!.style.borderColor = "black";

  let date = document.getElementById("start");
  date!.style.borderRadius = "5px";
  date!.style.border = "1px solid #ccc";
  date!.style.borderColor = "black";

  app!.style.padding = "8px";

  app!.style.marginTop = "8px";
  app!.style.marginBottom = "8px";
  let button = document.getElementById("submit");
  button!.style.marginLeft = "15px";
  //document.getElementById("myform");



});
}

$("#mimg").on("click", function () {
  $("#newappointment").animate(
    {
      height: "-310",
      width: "-600",
    },
    500,
    function () {
        let newA = document.getElementById("newappointment");
        newA!.style.display ="none";
      
    }
    
  );
  let pimg = document.getElementById("pimg");
  pimg!.style.display ="block";
  $("#pimg").on("click", function () {
    let newA = document.getElementById("newappointment");
    getBigger();
    newA!.style.display ="block";
  })
})