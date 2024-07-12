// import { ispis, kvadrat } from "./src/funkcije";
// import Student from "./src/student";
// let tarik = new Student('Tarik','Zircanin');
// tarik.predstaviSe();
// let kv = kvadrat(5);
// ispis("Poruka iz eksportovane funkcije " + kv);

import { checkUser, registerUser } from "./src/login";
import Service from "./src/service";
import "./src/stilovi.sass";

//button za logout
const btnlogout = document.getElementById('btnlogout');
btnlogout.addEventListener('click', (event)=>{
    // localStorage.removeItem('ulogovan');
    localStorage.clear();
});
//button za prikaz planeta (samo ako je korisnik ulogovan tj provera localStorage)
const btnshow = document.getElementById('btnplanete');
btnshow.addEventListener('click',(event) =>{
    const value = localStorage.getItem('ulogovan');
    console.log(value);
    if(value){
        const service = new Service();
        service.getPlanetsFetch();
    }
    else{
        alert("Niste ulogovani");
    }
});
// prikazati kroz listu planete koje su dosle sa servera
const btn = document.getElementById('btn');
btn.addEventListener('click', (event) =>{
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    checkUser(username,password);
})
