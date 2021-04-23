
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
   title: string,
   user: string,
   location: string,
   date: string,
   time: string,
   expiry_date: string
}

// Settings:
let restServer: string = "http://localhost:80/WS2021/ueX/WEBSC_Project/WEBSC_Project/Backend/serviceHandler.php";
 $.getJSON(restServer,
         {'method':'getAppointments'},
          function(data: Array<Data>) {
               $.each(data,  function(key, value){

                  $("#newappointment").on("click", function(){
                     $(this).animate({
                        height:"+150",
                        width:"+150",
                        backgroundColor:'#4E1402'
                     }, 500, function(){
                        console.log("animation complete");
                     })
                  })

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
               console.log(data[0].title);
     });

   


