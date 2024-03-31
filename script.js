let box; 

document.addEventListener('DOMContentLoaded', ()=>{
  box = document.querySelector('#touch');
  box.addEventListener('click', chooseSide);
});

function chooseSide(e) {
  const clientX = e.clientX;
  const clientWidth = e.view.innerWidth

  if (clientX < clientWidth / 2) {
    console.log('left')
    slide_change = -1
    currentSleep.cancel();
  } else {
    console.log('right')
    slide_change = 1
    currentSleep.cancel();
  }
}

class Sleep {
  constructor() {
    this.timeout = null;
    this.remaining = 0;
    this.promise = null;
    this.resolve = null;
    this.reject = null;
    this.startTime = null;
  }

  start(ms) {
    this.remaining = ms;
    this.startTime = new Date();
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.timeout = setTimeout(resolve, ms);
    });
    return this.promise;
  }

  pause() {
    clearTimeout(this.timeout);
    this.remaining -= new Date() - this.startTime;
    this.timeout = null;
  }

  resume() {
    if (this.timeout) {
      throw new Error('Sleep is not paused.');
    }
    this.startTime = new Date();
    this.timeout = setTimeout(this.resolve, this.remaining);
    return this.promise;
  }

  cancel() {
    clearTimeout(this.timeout);
    this.timeout = null;
    this.resolve();
  }
}

const slide_data = {
  1: {
    text: "$ANIMATION",
    time: 3
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

const btn_pause = document.getElementById("pause");
const btn_play = document.getElementById("play");
function pause() {
  btn_play.style.display = "block";
  btn_pause.style.display = "none";
  currentSleep.pause();
}
function resume() {
  btn_pause.style.display = "block";
  btn_play.style.display = "none";
  currentSleep.resume();
}

const main = document.querySelector("main");
let statusCount = 2;
dataStatusFunc();


var slide_change = 1;
let currentSleep;

async function slides() {
  var header = document.querySelector('#header');
  var sub = document.querySelector('#subtitle');

  for (i = 1; i <= Object.keys(slide_data).length; i = i + slide_change) {
    var slide = slide_data[i]
    slide_change = 1
    if (slide.text != "$ANIMATION") {
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
    }
  
    /*dataStatusFunc();*/
    console.log(i)
    currentSleep = new Sleep();
    await currentSleep.start(slide.time * 1000)
    console.log("A")
  }

}

function dataStatusFunc() {
  for (let i = 0; i < 30; i++) {
    let shape = document.createElement("div");
    shape.setAttribute("class", `shape-${i}`);
    main.appendChild(shape);
  }
}

slides()