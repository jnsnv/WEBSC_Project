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
// Settings:
var restServer = "http://localhost:80/WS2021/ueX/WEBSC_Project/WEBSC_Project/Backend/serviceHandler.php";
$.getJSON(restServer, {
    method: "getAppointments"
}, function (data) {
    $.each(data, function (key, value) {
        var newItemBox = document.createElement("div");
        newItemBox.setAttribute("class", "item");
        newItemBox.setAttribute("id", key.toString());
        $(".wrapper-main").append(newItemBox);
        var newTitle = document.createElement("p");
        var newDate = document.createElement("p");
        var newUser = document.createElement("p");
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
});
var form = document.getElementById("myform");
form.style.display = "none";
document.getElementById("mimg").style.display = "none";

function getBigger() {
    $("#newappointment").animate({
        height: "330px",
        width: "600px"
    }, 500, function () {
        console.log("animation complete");
        $("#newappointment").css("height", "100%");
    });
    var app = document.getElementById("newappointment");
    app.style.backgroundColor = "white";
    var pimg = document.getElementById("pimg");
    pimg.style.display = "none";
    var mimg = document.getElementById("mimg");
    mimg.style.display = "block";
    app.style.borderRadius = "3px";
    form.style.display = "block";
    var title = document.getElementById("title");
    title.style.borderRadius = "5px";
    title.style.border = "1px solid #ccc";
    title.style.borderColor = "black";
    var location = document.getElementById("location");
    location.style.borderRadius = "5px";
    location.style.border = "1px solid #ccc";
    location.style.borderColor = "black";
    var date = document.getElementById("start");
    date.style.borderRadius = "5px";
    date.style.border = "1px solid #ccc";
    date.style.borderColor = "black";
    var exp = document.getElementById("exp");
    exp.style.borderRadius = "5px";
    exp.style.border = "1px solid #ccc";
    exp.style.borderColor = "black";
    app.style.padding = "8px";
    app.style.marginTop = "8px";
    app.style.marginBottom = "8px";
    var button = document.getElementById("submit");
    button.style.marginLeft = "15px";
    //document.getElementById("myform");
}
// close form animation
$("#mimg").on("click", function () {
    $("#newappointment").animate({
        height: "-330",
        width: "-600"
    }, 500, function () {
        var newA = document.getElementById("newappointment");
        newA.style.display = "none";
        var pimg = document.getElementById("pimg");
        pimg.style.display = "block";
    });
});
//open form animation
$("#pimg").on("click", function () {
    var newA = document.getElementById("newappointment");
    getBigger();
    newA.style.display = "block";
});
//add more dates
$("#dateplus").on("click", function () {
    var newDate = document.createElement("input");
    var date = document.querySelector(".datebox");
    newDate.type = "datetime-local";
    newDate.id = "start";
    newDate.style.borderRadius = "5px";
    newDate.style.border = "1px solid #ccc";
    newDate.style.borderColor = "black";
    date === null || date === void 0 ? void 0 : date.append(newDate);
});
