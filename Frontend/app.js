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
$.getJSON(restServer, { 'method': 'getAppointments' }, function (data) {
    $.each(data, function (key, value) {
        var form = document.getElementById("myform");
        form.style.display = "none";
        $("#newappointment").on("click", function () {
            $(this).animate({
                height: "+230.15",
                width: "+400"
            }, 500, function () {
                console.log("animation complete");
            });
            var app = document.getElementById("newappointment");
            app.style.backgroundColor = "white";
            document.getElementById("pimg").style.display = "none";
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
            var notice = document.getElementById("notice");
            notice.style.borderRadius = "5px";
            notice.style.border = "1px solid #ccc";
            notice.style.borderColor = "black";
            app.style.padding = "8px";
            app.style.marginTop = "8px";
            app.style.marginBottom = "8px";
            var button = document.getElementById("submit");
            button.style.marginLeft = "15px";
            //document.getElementById("myform");
        });
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
    console.log(data[1].title);
});
