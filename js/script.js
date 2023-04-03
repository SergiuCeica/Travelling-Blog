function afiseazaData(){
    var currentdate = new Date(); 
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    document.getElementById("data").innerHTML='<i class="material-icons">date_range</i>'+currentdate;
    document.getElementById("url").innerHTML='<i class="material-icons">folder_open</i>'+window.location.href;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        document.getElementById("locatie").innerHTML = "Geolocation is not supported by this browser.";
    }

    document.getElementById("browser").innerHTML='<i class="material-icons">vpn_lock</i>'+"Version "+navigator.userAgent;
}
function showPosition(position) {
    document.getElementById("locatie").innerHTML = '<i class="material-icons">location_on</i>'+"Latitude: " + position.coords.latitude +
    "   Longitude: " + position.coords.longitude;
}