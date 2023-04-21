function incarcaPersoane(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           document.getElementById("persoaneHTML").innerHTML = this.responseText;
           
        }
    };
    xhttp.open("GET", "resurse/persoane.xml", true);
    xhttp.send();
    xmlDoc= this.responseXML;
    var table = document.createElement('table');
    x= xmlDoc.getElementsByTagName('persoana');
    for(i=0 ; i<x.length ; i++){
        var persoana=x[i];
        var tr=table.insertRow();
        var td= tr.insertCell();
        td.colSpan=3;
        td.innerHTML=persoana.getAttribute('nume');
    }
    document.body.appendChild(table);
}

function verificaUtilizator(nume,parola){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           const user = JSON.parse(this.response);
           if(nume == user[0].utilizator){
                if(parola == user[0].parola){
                    document.getElementById("result").innerHTML="Utilizatorul a fost gasit cu succes";
                }else{
                    document.getElementById("result").innerHTML="Parola este gresita";
                }
           }else{
                document.getElementById("result").innerHTML="Numele de utilizator nu a fost gasit";
           }
        }
    };
    xhttp.open("GET", "resurse/utilizatori.json", true);
    xhttp.send();
}

function adaugaUtilizator(nume,parola){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "resurse/utilizatori.json", true);
    //xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(nume != '' && parola != ''){
                console.log("SUCCES");
            }else{
                document.getElementById("warning").innerHTML="Completati campurile Nume si Parola!";
            }
        }
    };
    var data = JSON.stringify({
        "utilizator" : nume,
        "parola": parola
    });
    xhttp.send(data);
}

