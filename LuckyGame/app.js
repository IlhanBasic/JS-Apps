class Igrac {
    constructor(ime) {
        this.ime = ime;
        this.brojevi = [];
        this.brojPobedaRundi = 0;
    }

    izracunajZbirRundi(runda) {
        return this.brojevi[runda].kocka1 + this.brojevi[runda].kocka2;
    }

    odigrajRundu() {
        const prvaKocka = baciKocku();
        const drugaKocka = baciKocku();
        this.brojevi.push({
            kocka1: prvaKocka,
            kocka2: drugaKocka
        });
        return `${prvaKocka} + ${drugaKocka} = ${prvaKocka + drugaKocka}`; // Corrected the string template
    }
}

function baciKocku() {
    return Math.floor(Math.random() * 6) + 1;
}

function zapocniIgru() {
    const ime1 = document.getElementById("igrac1").value;
    const ime2 = document.getElementById("igrac2").value;
    if (ime1 === "" || ime2 === "") {
        alert("Morate uneti imena igraca");
        return;
    }
    const igrac1 = new Igrac(ime1);
    const igrac2 = new Igrac(ime2);
    const tbl = document.getElementById("tabela");
    kreirajZaglavlje(tbl, ime1, ime2);

    for (let i = 0; i < 11; i++) {
        const r1 = igrac1.odigrajRundu();
        const r2 = igrac2.odigrajRundu();
        kreirajRedPodataka(tbl, r1, r2);
        const z1 = igrac1.izracunajZbirRundi(i);
        const z2 = igrac2.izracunajZbirRundi(i);
        if (z1 > z2) {
            igrac1.brojPobedaRundi++;
        } else if (z1 < z2) {
            igrac2.brojPobedaRundi++;
        }
    }

    let elementZaglavlja = document.querySelectorAll("th");
    if (igrac1.brojPobedaRundi > igrac2.brojPobedaRundi) {
        elementZaglavlja[0].style.color = "green";
        elementZaglavlja[1].style.color = "red";
    } else if (igrac1.brojPobedaRundi < igrac2.brojPobedaRundi) {
        elementZaglavlja[0].style.color = "red";
        elementZaglavlja[1].style.color = "green";
    }
}

function kreirajZaglavlje(tbl, ime1, ime2) {
    const tr = document.createElement("tr");
    const th1 = document.createElement("th");
    const th2 = document.createElement("th");
    const t1 = document.createTextNode(ime1);
    const t2 = document.createTextNode(ime2);
    th1.appendChild(t1);
    th2.appendChild(t2);
    tr.appendChild(th1);
    tr.appendChild(th2);
    tbl.appendChild(tr);
}

function kreirajRedPodataka(tbl, r1, r2) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const t1 = document.createTextNode(r1);
    const t2 = document.createTextNode(r2);
    td1.appendChild(t1);
    td2.appendChild(t2);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbl.appendChild(tr);
}