function afiseazaData(){
    var currentdate = new Date(); 
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    document.getElementById("data").innerHTML=currentdate;
    document.getElementById("url").innerHTML=window.location.href;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        document.getElementById("locatie").innerHTML = "Geolocation is not supported by this browser.";
    }

    document.getElementById("browser").innerHTML="Version "+navigator.userAgent;
}
function showPosition(position) {
    document.getElementById("locatie").innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}