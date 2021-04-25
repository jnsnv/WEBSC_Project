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
var restServer = "http://localhost:80/WS2021/ueX/WEBSC_Project/WEBSC_Project/Backend/serviceHandler.php";
//document get ready
document.addEventListener("DOMContentLoaded", function (event) {
    loaddata();
    var form = document.getElementById("myform");
    form.style.display = "none";
    document.getElementById("mimg").style.display = "none";
});
// onload after everything has loaded
window.onload = function () {
    $(".accordion").on("click", function () {
        $(this).toggleClass("active");
        var $panel = $(this).next(".panel");
        $panel.slideToggle();
    });
};
$("#submit").on("click", function () {
    // --- TITLE LOC EXP ---
    var title = $("#title").val();
    var location = $("#location").val();
    var exp = $("#exp").val();
    //validation
    if (title !== "" && location !== "" && exp !== "") {
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
                console.log("Data inserted.");
                console.log(response);
                getSmaller();
                setInterval('location.reload()', 400); // Using .reload() method.
            }
        });
    }
    else {
        console.log("empty fields.");
    }
    // --- TITLE LOC EXP END ---
    // --- POSSIBLE DATES ---
    $(".datebox").children(".form-control dates").each(function () {
        var date = $(".form-control dates").val();
        if (date !== "") {
            $.ajax({
                type: "POST",
                url: restServer,
                data: {
                    method: "insertDates",
                    param: date
                },
                success: function (response) {
                    console.log("Data inserted.");
                    console.log(response);
                    getSmaller();
                    setInterval('location.reload()', 400); // Using .reload() method.
                }
            });
        }
        else {
            console.log("empty datefield");
        }
    });
    // --- POSSIBLE DATES END ---
});
// ---Settings: GET JSON DATA FROM DATABASE---
function loaddata() {
    $.ajax({
        type: "GET",
        url: restServer,
        cache: false,
        data: { method: "getAppointments" },
        dataType: "json",
        async: true,
        success: function (data) {
            console.log(data);
            $.each(data, function (key, value) {
                var newItemBox = document.createElement("button");
                newItemBox.setAttribute("class", "accordion");
                newItemBox.innerHTML = value.title;
                $(".wrapper-main").append(newItemBox);
                var newDiv = document.createElement("div");
                newDiv.setAttribute("class", "panel");
                $(".wrapper-main").append(newDiv);
                var newLocation = document.createElement("h2");
                var newExpiryDate = document.createElement("h2");
                newLocation.setAttribute("class", "location");
                newExpiryDate.setAttribute("class", "exp_date");
                newLocation.innerHTML = "Location: " + value.location;
                newExpiryDate.innerHTML = "Expiry Date: " + value.expiry_date;
                newDiv.append(newLocation);
                newDiv.append(newExpiryDate);
            });
        }
    });
}
//---GET JSON DATA END---
//---ANIMATION SECTION---
function getBigger() {
    $("#newappointment").animate({
        height: "330px",
        width: "35rem"
    }, 500, function () {
        console.log("animation complete");
        $("#newappointment").css("height", "100%");
    });
    var app = document.getElementById("newappointment");
    var pimg = document.getElementById("pimg");
    var mimg = document.getElementById("mimg");
    var button = document.getElementById("submit");
    var form = document.getElementById("myform");
    pimg.style.display = "none";
    mimg.style.display = "block";
    form.style.display = "block";
    app.style.borderRadius = "3px";
    app.style.padding = "8px";
    app.style.marginTop = "8px";
    app.style.marginBottom = "8px";
    app.style.backgroundColor = "white";
    app.style.display = "block";
    button.style.marginLeft = "15px";
    //document.getElementById("myform");
}
// close form animation
function getSmaller() {
    $("#newappointment").animate({
        height: "-330",
        width: "-600"
    }, 500, function () {
        var newA = document.getElementById("newappointment");
        var pimg = document.getElementById("pimg");
        newA.style.display = "none";
        pimg.style.display = "block";
    });
}
$("#mimg").on("click", function () {
    getSmaller();
});
//open form animation
$("#pimg").on("click", function () {
    getBigger();
});
$("#dateplus").on("click", function () {
    var newDate = document.createElement("input");
    var date = document.querySelector(".datebox");
    newDate.type = "datetime-local";
    newDate === null || newDate === void 0 ? void 0 : newDate.setAttribute("class", "form-control dates");
    newDate.id = "start";
    newDate.required = true;
    date.append(newDate);
});
//---ANIMATION SECTION END---
