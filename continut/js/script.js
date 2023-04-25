var rectangle=0;
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
    const canvas = document.getElementById('plansaDesen')
    canvas.addEventListener('mousedown', function(e) {
        getCursorPosition(canvas, e)
    })
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
function mousePrint(e){
    console.log(e.clientX + " " + e.clientY);
}

function getCursorPosition(canvas, event) {
    var ctx = canvas.getContext("2d");
    var rect = event.target.getBoundingClientRect();
    if(rectangle==0){
        clx = event.clientX - rect.left;
        cly= event.clientY -rect.top;
        console.log(clx + " "+ cly);
        rectangle++;
        console.log(rectangle);
    }else{
        ulx = event.clientX - rect.left;
        uly= event.clientY -rect.top;
        console.log(ulx + " "+ uly);
        rectangle=0;

        if(ulx > clx){
            var temp = clx;
            clx=ulx;
            ulx=temp;
        }
        if (uly > cly){
            var temp = cly;
            cly=uly;
            uly=temp;
        }
        ctx.fillStyle=document.getElementById("culoareTabel").value;
        ctx.strokeStyle=document.getElementById("culoareTabel").value;
        ctx.fillRect(clx,cly,ulx - clx,uly - cly);
        ctx.strokeRect(clx,cly,ulx -clx,uly - cly);
        
    }
}



function schimbaContinut(resursa,jsFisier,jsFunctie){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("continut").innerHTML = this.responseText;
            if (jsFisier) {
                var elementScript = document.createElement('script');
                elementScript.onload = function () {
                    console.log("hello");
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                };
                elementScript.src = jsFisier;
                document.body.appendChild(elementScript);
            } else {
                if (jsFunctie) {
                    window[jsFunctie]();
                }
            }
        }
    };
  xhttp.open("GET", resursa+".html", true);
  xhttp.send();
}