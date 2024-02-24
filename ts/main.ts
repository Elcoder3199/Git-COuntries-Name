let search = document.getElementById("search") as HTMLInputElement,
  btnSearch = document.getElementById("btn-search") as HTMLInputElement,
  boxes = document.querySelector(".boxes") as HTMLElement,
  searchValue = search.value;
let datalen: any;
let noDa = document.querySelector(".no-data") as HTMLElement;
let arr: any;
let preloader = document.querySelector(".preloader") as HTMLElement;
btnSearch.addEventListener("click", startSearch);

async function startSearch() {
  if (search.value === "") {
    noDa.style.display = "block";
    boxes.innerHTML = "";
    noDa.innerHTML = "<span>Please Enter Country Name</span>";
  } else if (!window.navigator.onLine) {
    noDa.style.display = "block";
    noDa.innerHTML = "<span>Check Your Internet Connection</span>";
  } else {
    boxes.innerHTML = "";
    noDa.style.display = "none";
    preloader.style.display = "flex";
    await fetch(`https://restcountries.com/v3.1/name/${search.value}`)
      .then((reponse) => reponse.json())
      .then((data) => {
        showData(data, data.length);
        preloader.style.display = "none";
      })
      .catch((resolve) => console.log(resolve));
  }
}

function showData(data: any, datalen: number) {

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
    let countNameText = document.createTextNode(
      `Country Name : ${data[i].name.common}`
    );
    let nameCoun = data[i].name.common;
    countName.append(countNameText);
    div.append(countName);

    let population = document.createElement("div"),
      populationText = document.createTextNode(
        `population : ${data[i].population} citizen`
      );
    population.append(populationText);
    div.append(population);

    if (data[i].capital !== undefined) {
      let capital = document.createElement("div"),
        capitalText = document.createTextNode(`capital : ${data[i].capital}`);
      capital.className = "capital";
      capital.append(capitalText);
      div.append(capital);
    }
    // Region Of the Country
    let region = document.createElement("div"),
      regionText = document.createTextNode(`region : ${data[i].region}`);
    region.append(regionText);
    div.append(region);

    // Start Of Week in  Country
    let startOfWeek = document.createElement("div"),
      startOfWeekText = document.createTextNode(
        `start Of Week : ${data[i].startOfWeek}`
      );
    startOfWeek.appendChild(startOfWeekText);
    div.appendChild(startOfWeek);

    // continents Name
    let continents = document.createElement("div"),
      continentsText = document.createTextNode(
        `continent : ${data[i].continents}`
      );
    continents.appendChild(continentsText);
    div.appendChild(continents);

    // Location of country in google maps
    let maps = document.createElement("a"),
      mapsText = document.createTextNode("Google Maps");
    maps.append(mapsText);
    maps.href = data[i].maps.googleMaps;
    maps.setAttribute("target", "_blank");
    maps.className = "maps";
    div.append(maps);
    boxes.append(div);
    console.log(data);

  }

}

let theForm = document.querySelector(".form") as HTMLFormElement;
theForm.addEventListener("submit", (e) => e.preventDefault());
document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    btnSearch.click();
  }
});
// https://restcountries.com/v3.1/name/{name}
