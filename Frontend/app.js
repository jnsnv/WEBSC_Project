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
$(function () {
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
$(".vote").on("click", function () {
    $(".votingArea")
        .children(".dateCheck")
        .each(function (index) {
        var date;
        if ($(this).prop("checked") == false) {
            date = $(this).val();
        }
        var username = $(".uid").val();
        var comment = $(".comment").val();
        if (username !== "" && date !== "" && comment !== "") {
            $.ajax({
                type: "POST",
                url: restServer,
                data: {
                    method: "insertAvailCB",
                    param1: username,
                    param2: date,
                    param3: comment
                },
                success: function (response) {
                    console.log("it worked");
                }
            });
        }
        else {
            console.log("empty datefield");
        }
    });
});
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
                sendDates();
                getSmaller();
                console.log("Data inserted.");
            }
        });
    }
    else {
        console.log("empty fields!!.");
    }
    // --- TITLE LOC EXP END ---
});
//insert checkboxes
// --- POSSIBLE DATES ---
function sendDates() {
    $(".datebox")
        .children(".form-control.dates")
        .each(function (index) {
        var date = $(this).val();
        var title = $("#title").val();
        if (date !== "" && title !== "") {
            $.ajax({
                type: "POST",
                url: restServer,
                data: {
                    method: "insertDates",
                    param1: date,
                    param2: title
                },
                success: function (response) {
                    console.log("Data inserted.");
                    getSmaller();
                    setTimeout(function () {
                        location.reload();
                    }, 800);
                }
            });
        }
        else {
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
            //  console.log(this);
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
            //console.log(data);
            $.each(data, function (key, value) {
                //html nodes
                var newItemBox = document.createElement("button");
                var newDiv = document.createElement("div");
                var newLocation = document.createElement("h2");
                var newExpiryDate = document.createElement("h2");
                var availableDates = document.createElement("h4");
                var votingArea = document.createElement("div");
                //accordion
                newItemBox.setAttribute("class", "accordion");
                newItemBox.setAttribute("id", value.expiry_date);
                newItemBox.setAttribute("onclick", value.expiry_date);
                newItemBox.innerHTML = value.title;
                $(".wrapper-main").append(newItemBox);
                //panels in accordion
                newDiv.setAttribute("class", "panel");
                $(".wrapper-main").append(newDiv);
                //set attributes on exp loc and available dates
                newLocation.setAttribute("class", "location");
                newExpiryDate.setAttribute("class", "exp_date");
                newLocation.innerHTML = "Location: " + value.location;
                newExpiryDate.innerHTML = "Expiry Date: " + value.expiry_date;
                availableDates.innerHTML = "Available Dates: ";
                //append new nodes
                newDiv.append(newLocation);
                newDiv.append(newExpiryDate);
                newDiv.append(availableDates);
                //
                //
                //set voting area attributes
                votingArea.setAttribute("id", value.title);
                votingArea.setAttribute("class", "votingArea");
                //append voting area div
                newDiv.append(votingArea);
                //append form to panel
                var form = document.createElement("form");
                var username = document.createElement("input");
                var uid = document.createElement("label");
                var kommentar = document.createElement("input");
                var kommi = document.createElement("label");
                var button = document.createElement("button");
                var br = document.createElement("br");
                username.setAttribute("type", "text");
                username.setAttribute("class", "form-control uid");
                uid.innerHTML = "Username:";
                kommentar.setAttribute("type", "text-field");
                kommentar.setAttribute("class", "form-control comment");
                kommi.innerHTML = "Kommentar:";
                button.setAttribute("type", "submit");
                button.setAttribute("class", "btn btn-success vote");
                button.innerHTML = "Send";
                //check if date is expired
                if (Date.parse(value.expiry_date) - Date.parse(new Date().toString()) <
                    0) {
                    newItemBox.style.backgroundColor = "grey";
                    // $("#"+ value.expiry_date).prop("onclick", null).off("click");
                    button.disabled = true;
                    button.setAttribute("class", "btn btn-danger");
                    button.innerHTML = "Disabled";
                }
                newDiv.append(form);
                form.append(uid);
                form.append(username);
                form.append(kommi);
                form.append(kommentar);
                form.append(br);
                form.append(button);
            });
            //loadDates function gets called after loaddata is done
            //nested ajax call
            loadDates();
        }
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
            //console.log(data);
            $.each(data, function (key, value) {
                var dateOption = document.createElement("input");
                var labelNode = document.createElement("label");
                var br = document.createElement("br");
                var fieldToAppend = document.getElementById(value.appointment);
                dateOption.type = "checkbox";
                dateOption.value = value.date;
                dateOption.id = value.date;
                dateOption.setAttribute("class", "dateCheck");
                labelNode.htmlFor = value.date;
                labelNode.innerHTML = value.date;
                fieldToAppend.append(dateOption);
                fieldToAppend.append(labelNode);
                fieldToAppend.append(br);
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
        //console.log("animation complete");
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
//add new dates to form
$("#dateplus").on("click", function () {
    var newDate = document.createElement("input");
    var date = document.querySelector(".datebox");
    newDate.type = "datetime-local";
    newDate.setAttribute("class", "form-control dates");
    newDate.id = "start";
    newDate.required = true;
    date.append(newDate);
});
//---ANIMATION SECTION END---
