var sleepSetTimeout_ctrl;
function sleep(ms) {
  clearInterval(sleepSetTimeout_ctrl);
  return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}

const slide_data = {
  1: {
    text: "$ANIMATION",
    time: 8
  },
  2: {
    text: "1",
    time: 1
  },
  3: {
    text: "Saluda a tu artista top, Bizarrap", // Test Placeholder
    sub: "Estás entre el <b>5%</b> de los fans más fieles y has disfrutado de <b>290</b> minutos en su compañía.",
    time: 99999999999999999
  },
  4: {
    text: "3",
    time: 8
  },
  5: {
    text: "4",
    time: 8
  },
  6: {
    text: "5",
    time: 8
  },
  7: {
    text: "6",
    time: 8
  },
  8: {
    text: "7",
    time: 8
  },
  9: {
    text: "8",
    time: 8
  },
  10: {
    text: "9",
    time: 8
  }

}

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

async function slides() {
  var header = document.querySelector('#header');
  var sub = document.querySelector('#subtitle');

  for (i = 1; i <= Object.keys(slide_data).length; i++) {
    var slide = slide_data[i]
    if (slide.text == "$ANIMATION") {
      await sleep(slide.time * 1000)
      continue
    } else {
      main.style.fontSize = "4rem";
      main.style.color = "white";
      header.innerHTML = slide.text;

      if (slide.sub != null) {
        sub.innerHTML = slide.sub;
      } else {
        sub.innerHTML = ""
      }

      /*main.innerHTML = slide.text*/
    
      main.dataset.status = statusCount;
      main.style.background = `rgb(${i * 5}, ${i * 5}, ${
        i * 5
      })`;
    
      /*dataStatusFunc();*/
      console.log(i)
      await sleep(slide.time * 1000)
      console.log("A")
    }
  }

}

function dataStatusFunc() {
  for (let i = 0; i < 30; i++) {
    let shape = document.createElement("div");
    shape.setAttribute("class", `shape-${i}`);
    main.appendChild(shape);
  }

slides()