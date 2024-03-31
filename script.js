const volumeON = document.getElementById("volume-on");
const volumeOFF = document.getElementById("volume-off");
function volumeOn() {
  volumeOFF.style.display = "block";
  volumeON.style.display = "none";
}
function volumeOff() {
  volumeON.style.display = "block";
  volumeOFF.style.display = "none";
}

const main = document.querySelector("main");
let statusCount = 2;
dataStatusFunc();

setInterval(() => {
  main.innerHTML = `${statusCount}`;
  main.style.fontSize = "4rem";
  main.style.color = "white";

  main.dataset.status = statusCount;
  main.style.background = `rgb(${statusCount * 5}, ${statusCount * 5}, ${
    statusCount * 5
  })`;

  dataStatusFunc();

  statusCount += 1;
  if (statusCount > 10) {
    statusCount = 1;
  }
}, 18000);

function dataStatusFunc() {
  for (let i = 0; i < 30; i++) {
    let shape = document.createElement("div");
    shape.setAttribute("class", `shape-${i}`);
    main.appendChild(shape);
  }
}