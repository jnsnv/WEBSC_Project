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
let restServer: string =
  "http://localhost:80/WS2021/ueX/WEBSC_Project/WEBSC_Project/Backend/serviceHandler.php";

//document get ready
document.addEventListener("DOMContentLoaded", function (event) {
  loaddata();
  loadDates();
  let form = document.getElementById("myform")!;
  form!.style.display = "none";
  document.getElementById("mimg")!.style.display = "none";
});
// onload after everything has loaded
window.onload = function () {
  $(".accordion").on("click", function () {
    $(this).toggleClass("active");
    var $panel = $(this).next(".panel");
    $panel.slideToggle();
  });

  console.log($(".votingArea").children(".dateCheck"));
};

$("#submit").on("click", function () {
  // --- TITLE LOC EXP ---
  let title = $("#title").val();
  let location = $("#location").val();
  let exp = $("#exp").val();
  //validation
  if (title !== "" && location !== "" && exp !== "") {
    $.ajax({
      type: "POST",
      url: restServer,
      data: {
        method: "insertAppointment",
        param1: title,
        param2: location,
        param3: exp,
      },
      success: function (response) {
        sendDates();
        getSmaller();
        console.log("Data inserted.");
      },
    });
  } else {
    console.log("empty fields.");
  }
  // --- TITLE LOC EXP END ---
});
// --- POSSIBLE DATES ---
function sendDates() {
  $(".datebox")
    .children(".form-control.dates")
    .each(function (index) {
      let date = $(this).val();
      let title = $("#title").val();
      if (date !== "" && title !== "") {
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
            setTimeout(function () {
              location.reload();
            }, 800);
          },
        });
      } else {
        console.log("empty datefield");
      }
    });
}
// --- POSSIBLE DATES END ---

function voteChecks() {
  $(".votingArea")
    .children(".dateCheck")
    .each(function () {
      if ($(this).prop("checked") == false) {
        console.log(this);
      }
    });
}
// co;nsole.log( $(".votingArea").children(".dateCheck"))
// ---Settings: GET JSON DATA FROM DATABASE---
function loaddata() {
  $.ajax({
    type: "GET",
    url: restServer,
    cache: false,
    data: { method: "getAppointments" },
    dataType: "json",
    success: function (data) {
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
        let availableDates = document.createElement("h4");

        newLocation.setAttribute("class", "location");
        newExpiryDate.setAttribute("class", "exp_date");

        newLocation.innerHTML = "Location: " + value.location;
        newExpiryDate.innerHTML = "Expiry Date: " + value.expiry_date;
        availableDates.innerHTML = "Available Dates: ";

        newDiv.append(newLocation);
        newDiv.append(newExpiryDate);
        newDiv.append(availableDates);

        let votingArea = document.createElement("div");
        votingArea.setAttribute("id", value.title);
        votingArea.setAttribute("class", "votingArea");

        newDiv.append(votingArea);

        //append form to panel

        let form = document.createElement("form");
        let username = document.createElement("input");
        let uid = document.createElement("label");
        let kommentar = document.createElement("input");
        let kommi = document.createElement("label");
        let button = document.createElement("button");
        let br = document.createElement("br");

        username.setAttribute("type", "text");
        username.setAttribute("class", "form-control");

        uid.innerHTML = "Username:";

        kommentar!.setAttribute("type", "text-field");
        kommentar!.setAttribute("class", "form-control");

        kommi.innerHTML = "Kommentar:";

        button.setAttribute("type", "button");
        button.setAttribute("class", "btn btn-success vote");
        button.innerHTML = "Button";

        newDiv!.append(form);
        form!.append(uid);
        form!.append(username);
        form!.append(kommi);
        form!.append(kommentar);
        form!.append(br);
        form!.append(button);
      });
    },
  });
}

//dates loaded in
function loadDates() {
  $.ajax({
    type: "GET",
    url: restServer,
    cache: false,
    data: { method: "getAvailableAppointments" },
    dataType: "json",
    success: function (data) {
      console.log(data);
      $.each(data, function (key, value) {
        let dateOption = document.createElement("input");
        let labelNode = document.createElement("label");
        let br = document.createElement("br");
        let fieldToAppend = document.getElementById(value.appointment)!;

        dateOption.type = "checkbox";
        dateOption.value = value.date;
        dateOption.id = value.date;
        dateOption.setAttribute("class", "dateCheck");

        labelNode.htmlFor = value.date;
        labelNode.innerHTML = value.date;

        fieldToAppend!.append(dateOption);
        fieldToAppend!.append(labelNode);
        fieldToAppend!.append(br);
      });
    },
  });
}
//---GET JSON DATA END---

//---ANIMATION SECTION---
function getBigger() {
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

  let app = document.getElementById("newappointment")!;
  let pimg = document.getElementById("pimg")!;
  let mimg = document.getElementById("mimg")!;
  let button = document.getElementById("submit")!;
  let form = document.getElementById("myform")!;

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
function getSmaller() {
  $("#newappointment").animate(
    {
      height: "-330",
      width: "-600",
    },
    500,
    function () {
      let newA = document.getElementById("newappointment")!;
      let pimg = document.getElementById("pimg")!;
      newA!.style.display = "none";
      pimg!.style.display = "block";
    }
  );
}

$("#mimg").on("click", function () {
  getSmaller();
});
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
