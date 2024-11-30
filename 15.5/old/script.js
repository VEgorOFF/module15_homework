const wsUri = "wss://echo-ws-service.herokuapp.com/";

const output = document.querySelector(".output");
const btnSend = document.querySelector(".send");
const mess = document.querySelector(".mess");
const btnGps = document.querySelector(".gps");

let websocket = new WebSocket(wsUri);

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.innerHTML = message;
  output.appendChild(pre);
}

btnSend.addEventListener("click", () => {
  const message = mess.value;
  writeToScreen("SENT: " + message);
  websocket.send(message);
  websocket.onmessage = function (evt) {
    writeToScreen(`<span style="color: blue;">RESPONSE:` + evt.data + `</span>`);
  };
});

const error = () => {
  textcontent = "Невозможно получить местоположение";
};

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const link = document.createElement("a");
  link.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  link.textcontent = "Геопозиция";

  mess.appendChild(link);
  writeToScreen(link);
  websocket.send(link);
  // websocket.onmessage = function (evt) {
  //   writeToScreen(`<span style="color: blue;">RESPONSE:` + evt.data + `</span>`);
  // };
};

btnGps.addEventListener("click", () => {
  // mess.href = "";
  // mess.textcontent = "";

  if (!navigator.geolocation) {
    mess.textContent = "Геолокация не поддерживается вашим браузером";
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});
