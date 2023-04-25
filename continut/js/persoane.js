function incarcaPersoane(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(this.response,"text/xml");
            var table=document.getElementById("tabelPersoane");
            console.log(xmlDoc);
            x= xmlDoc.getElementsByTagName('persoana');
            console.log(x);
            for(i=0 ; i<x.length ; i++){
                var persoana=x[i];
                var tr=table.insertRow(1);
                var tdNume= tr.insertCell();
                var tdPrenume= tr.insertCell();
                var tdVarsta= tr.insertCell();
                var tdOcupatie= tr.insertCell();
                tdNume.innerHTML=persoana.childNodes[1].innerHTML;
                tdPrenume.innerHTML=persoana.childNodes[3].innerHTML;
                tdVarsta.innerHTML=persoana.childNodes[5].innerHTML;
                tdOcupatie.innerHTML=persoana.childNodes[7].innerHTML;
            }
            table.style="display:inline;";
            document.getElementById("wait").style="display:none;";
        }
    };
    xhttp.open("GET", "resurse/persoane.xml", true);
    xhttp.send();
}

function verificaUtilizator(nume,parola){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           const user = JSON.parse(this.response);
           for(i=0;i<user.length;i++){
                if(nume == user[i].utilizator){
                        if(parola == user[i].parola){
                            document.getElementById("result").innerHTML="Utilizatorul a fost gasit cu succes";
                            break;
                        }else{
                            document.getElementById("result").innerHTML="Parola este gresita";
                        }
                }else{
                        document.getElementById("result").innerHTML="Numele de utilizator nu a fost gasit";
                }
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

