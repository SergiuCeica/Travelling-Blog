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

function addRow(){
    var table = document.getElementById("tabelJS");
    var position=document.getElementById("position");
    var tr= table.insertRow(position.value);
    var color = document.getElementById("culoareTabel");
    tr.style.backgroundColor = color.value;
    var colNr=table.rows[0].cells.length;
    for(let i =0;i<colNr;i++){
        var cell=tr.insertCell(i);
        cell.innerHTML="s";
    }
    
}

function addColumn(){
    var table = document.getElementById("tabelJS");
    var position=document.getElementById("position");
    var td= table.insertColumn(position.value);
    var color = document.getElementById("culoareTabel");
    td.style.backgroundColor = color.value;
    var rowNr=table.rows.length;
    console.log(rowNr);

}

function drawRect(){
    var canvas = document.getElementById("canvas");
    var overlay = document.getElementById("overlay");
    var ctx = canvas.getContext("2d");
    var ctxo = overlay.getContext("2d");

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctxo.strokeStyle = "blue";
    ctxo.lineWidth = 3;

    var $canvas = $("#canvas");
    var canvasOffset = $canvas.offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var scrollX = $canvas.scrollLeft();
    var scrollY = $canvas.scrollTop();

    var startX;
    var startY;
    
    if(localStorage.clickCount){
        if(localStorage.clickCount == 1){
            
        }else if(localStorage.clickCount == 2){

        }
    }else{
        localStorage.clickCount=1;
    }
}

function schimbaContinut(resursa){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("continut").innerHTML = this.responseText;
        }
    };
  xhttp.open("GET", resursa+".html", true);
  xhttp.send();
}