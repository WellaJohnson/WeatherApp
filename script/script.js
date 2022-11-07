// fetch(weatherUrl)
//   .then((response) => response.json())
//   .then((response) =>
//     console.log(
//       response.list.forEach((element) => {
//         const clone = document.importNode(template.content, true);
//         main.appendChild();
//       })
//     )
//   );

//   "https://api.openweathermap.org/data/2.5/forecast?lat=50.6333&lon=5.56667&appid=021c5879236ada602d5a9112f5c1708e&units=metric&lang=fr&cnt=7";

// const template = document.querySelector("template");
// console.log(template);

// const main = document.querySelector("main");

// clone.getElementById("maxTemp")

const apiKey = "021c5879236ada602d5a9112f5c1708e";
const latLiege = 50.6333;
const lonLiege = 5.56667;
const langage = "fr";
const counter = 7;

const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latLiege}&lon=${lonLiege}&appid=${apiKey}&cnt=${counter}&lang=$ {langage}&units=metric`;
console.log(weatherUrl);

function fetchingDatas() {
  return fetch(weatherUrl).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      return response.json().then((error) => {
        console.log(error);
        throw new Error("Something went wrong - server-side");
      });
    }
  });
}

async function displayDatas() {
  const calls = (await fetchingDatas()) || [];
  const callList = calls.list;
  callList.forEach((call) => {
    const templateElement = document.importNode(
      document.querySelector("template").content,
      true
    );
    templateElement.getElementById("date").textContent = call.dt_txt;
    // templateElement.getElementById("icon").textContent = call.weather[0].icon;
    templateElement.getElementById("maxTemp").textContent = `${Math.round(
      call.main.temp_max
    )} °C`;
    templateElement.getElementById("minTemp").textContent = `${Math.round(
      call.main.temp_min
    )} °C`;
    templateElement.getElementById("windSpeed").textContent = call.wind.speed;
    templateElement.getElementById("description").textContent =
      call.weather[0].description;

    document.querySelector("main").appendChild(templateElement);
  });
}
displayDatas();

// const slidesContainer = document.getElementById("slides-container");
// const slide = document.querySelector(".slide");
