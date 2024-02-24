"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let search = document.getElementById("search"), btnSearch = document.getElementById("btn-search"), boxes = document.querySelector(".boxes"), searchValue = search.value;
let datalen;
let noDa = document.querySelector(".no-data");
let arr;
let preloader = document.querySelector(".preloader");
btnSearch.addEventListener("click", startSearch);
function startSearch() {
    return __awaiter(this, void 0, void 0, function* () {
        if (search.value === "") {
            noDa.style.display = "block";
            boxes.innerHTML = "";
            noDa.innerHTML = "<span>Please Enter Country Name</span>";
        }
        else if (!window.navigator.onLine) {
            noDa.style.display = "block";
            noDa.innerHTML = "<span>Check Your Internet Connection</span>";
        }
        else {
            boxes.innerHTML = "";
            noDa.style.display = "none";
            preloader.style.display = "flex";
            yield fetch(`https://restcountries.com/v3.1/name/${search.value}`)
                .then((reponse) => reponse.json())
                .then((data) => {
                showData(data, data.length);
                preloader.style.display = "none";
            })
                .catch((resolve) => console.log(resolve));
        }
    });
}
function showData(data, datalen) {
    for (let i = 0; i < datalen; i++) {
        let div = document.createElement("div");
        div.className = "box";
        let imgBox = document.createElement("div");
        imgBox.className = "img-box";
        let img = document.createElement("img");
        img.className = "flag-img";
        img.src = data[i].flags.png;
        imgBox.append(img);
        div.append(imgBox);
        let countName = document.createElement("div");
        countName.className = "country-name";
        let countNameText = document.createTextNode(`Country Name : ${data[i].name.common}`);
        let nameCoun = data[i].name.common;
        countName.append(countNameText);
        div.append(countName);
        let population = document.createElement("div"), populationText = document.createTextNode(`population : ${data[i].population} citizen`);
        population.append(populationText);
        div.append(population);
        if (data[i].capital !== undefined) {
            let capital = document.createElement("div"), capitalText = document.createTextNode(`capital : ${data[i].capital}`);
            capital.className = "capital";
            capital.append(capitalText);
            div.append(capital);
        }
        // Region Of the Country
        let region = document.createElement("div"), regionText = document.createTextNode(`region : ${data[i].region}`);
        region.append(regionText);
        div.append(region);
        // Start Of Week in  Country
        let startOfWeek = document.createElement("div"), startOfWeekText = document.createTextNode(`start Of Week : ${data[i].startOfWeek}`);
        startOfWeek.appendChild(startOfWeekText);
        div.appendChild(startOfWeek);
        // continents Name
        let continents = document.createElement("div"), continentsText = document.createTextNode(`continent : ${data[i].continents}`);
        continents.appendChild(continentsText);
        div.appendChild(continents);
        // Location of country in google maps
        let maps = document.createElement("a"), mapsText = document.createTextNode("Google Maps");
        maps.append(mapsText);
        maps.href = data[i].maps.googleMaps;
        maps.setAttribute("target", "_blank");
        maps.className = "maps";
        div.append(maps);
        boxes.append(div);
        console.log(data);
    }
}
let theForm = document.querySelector(".form");
theForm.addEventListener("submit", (e) => e.preventDefault());
document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        btnSearch.click();
    }
});
// https://restcountries.com/v3.1/name/{name}
