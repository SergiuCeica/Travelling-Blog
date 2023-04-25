function Produs(name,cant,id){
    this.nume=name;
    this.cantitate=cant;
    this.id=id;
}
const produse=[];

class salvareLista{
    constructor(lista){
        this.produse=lista;
    }
    salvare(){}
}
class salvareWebStorage extends salvareLista{
    constructor(lista){
        super(lista);
    }
    salvare(){
        localStorage.setItem("listaCumparaturi",lista);
    }
}

class salvareIndexDB extends salvareLista{
    constructor(lista){
        super(lista);
        const request = window.indexedDB.open("MyTestDatabase", 3);
        let db;
        request.onerror = (event) => {
            console.error(`Database error: ${event.target.errorCode}`);
        };
        request.onsuccess = (event) => {
            db = event.target.result;
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
        
            const objectStore = db.createObjectStore("produse", { keyPath: "id" });
          
            objectStore.createIndex("nume", "nume", { unique: false });
          
            objectStore.transaction.oncomplete = (event) => {
              const customerObjectStore = db
                .transaction("produse", "readwrite")
                .objectStore("produse");
              customerData.forEach((customer) => {
                customerObjectStore.add(customer);
              });
            };
          };
    }
    salvare(){
        
    }
}

function adaugaProdus(nume,cantitate){
    const produs=new Produs(nume,cantitate,produse.length+1);
    produse.push(produs);
    localStorage.setItem("produs",produs);
    const myWorker = new Worker("js/worker.js");
    myWorker.postMessage(JSON.stringify({"nume":produs.nume, "cantitate":produs.cantitate, "id": produs.id}));
    console.log("Message posted to worker");
    myWorker.onmessage = (e) => {
        var result = e.data;
        console.log("Message received from worker");
        var table = document.getElementById("listaCumparaturi");
        var tr= table.insertRow(produse.length);
        for(let i =0;i<3;i++){
        var cell=tr.insertCell(i);
            if(i==0) cell.innerHTML= result.id;
            else if(i==1) cell.innerHTML=result.nume;
            else if(i==2) cell.innerHTML=result.cantitate;
        }
    };
}