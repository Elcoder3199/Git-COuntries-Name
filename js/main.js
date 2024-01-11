let search = document.getElementById("search"),
  btnSearch = document.getElementById("btn-search"),
  boxes = document.querySelector(".boxes"),
  searchValue = search.value;
let datalen;
let arr;
btnSearch.addEventListener("click", function () {
  fetch(`https://restcountries.com/v3.1/name/${search.value}`)
    .then((reponse) => reponse.json())
    .then((data) => {
      showData(data, data.length);
    })
    .catch((resolve) => console.log(resolve));
});

function showData(data, datalen) {
  boxes.innerHTML = "";
  if (search.value !== "") {
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
      nameCoun = data[i].name.common;
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
  } else {
    alert("Please Type In This Field");
  }
}

// https://restcountries.com/v3.1/name/{name}
document
  .querySelector(".form")
  .addEventListener("submit", (e) => e.preventDefault());
document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    btnSearch.click();
  }
});
