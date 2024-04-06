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
  },
  11: {
    text: "4",
    time: 8
  },
  12: {
    text: "5",
    time: 8
  },
  13: {
    text: "6",
    time: 8
  },
  14: {
    text: "7",
    time: 8
  },
  15: {
    text: "8",
    time: 8
  },
  16: {
    text: "9",
    time: 8
  }

}

bar_container = document.querySelector('.status-bar-container')
for (i = 1; i <= Object.keys(slide_data).length; i++) {
  var bar = document.createElement('div');
  bar.classList.add('status-bar')
  bar.style.width = `${100/Object.keys(slide_data).length}%`
  
  var childDiv = document.createElement('div');
  childDiv.classList.add('status-bar-progress');
  bar.appendChild(childDiv);
  childDiv.id = "bar_"+i;
  bar_container.appendChild(bar);
}

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
    this.startTime = null;
    this.remaining = null;
    this.resolve = null;
    this.increaseWidthInterval = null;
    this.width = 0;
    this.element = null;
    this.duration = null;
    this.interval = null;
    this.widthIncrement = null;
  }

  start(time, element) {
    this.remaining = time;
    this.element = element;
    this.duration = time;
    this.interval = 100;
    this.widthIncrement = 100 / (this.duration / this.interval);

    return new Promise((resolve) => {
      this.resolve = resolve;
      this.startTime = new Date();
      this.timeout = setTimeout(this.resolve, this.remaining);
      this.increaseWidthInterval = setInterval(() => {
        this.width += this.widthIncrement;
        if (parseFloat(this.width) > 100) {
          this.width = `100%`;
        }
        this.element.style.width = `${this.width}%`;
      }, this.interval);
    });
  }

  pause() {
    clearTimeout(this.timeout);
    this.remaining -= new Date() - this.startTime;
    this.timeout = null;
    clearInterval(this.increaseWidthInterval);
    this.increaseWidthInterval = null;
  }

  resume() {
    if (this.timeout) {
      throw new Error('Sleep is not paused.');
    }
    this.startTime = new Date();
    this.timeout = setTimeout(this.resolve, this.remaining);
    this.increaseWidthInterval = setInterval(() => {
      this.width += this.widthIncrement;
      if (this.width > this.maxWidth) {
        this.width = this.maxWidth;
      }
      this.element.style.width = `${this.width}%`;
    }, this.interval);
    return this.promise;
  }

  cancel() {
    clearTimeout(this.timeout);
    this.timeout = null;
    clearInterval(this.increaseWidthInterval);
    this.increaseWidthInterval = null;
    this.width = 0;

    if (slide_change == 1) {
      this.element.style.width = `100%`;
    } else {
      this.element.style.width = `0%`;
    }

    this.resolve();
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
  var img = document.getElementById("img");

  for (i = 1; i <= Object.keys(slide_data).length; i = i + slide_change) {
    if (i == 0) {
      i = 1;
    }

    var slide = slide_data[i]
    slide_change = 1

    btn_pause.style.display = "block";
    btn_play.style.display = "none";

    if (slide.text != "$ANIMATION") {
      main.style.fontSize = "4rem";
      main.style.color = "white";
      header.innerHTML = slide.text;

      if (slide.sub != null) {
        sub.innerHTML = slide.sub;
      } else {
        sub.innerHTML = ""
      }

      if (slide.img != null) {
        img.src = slide.img;
        img.className = "cover_img"
      } else {
        img.className = "cover_img_hidden"
      }
    
      main.dataset.status = statusCount;
      main.style.background = `rgb(${i * 5}, ${i * 5}, ${
        i * 5
      })`;
    }
  
    console.log(i)
    bar = document.querySelector(`#bar_${i}`);

    currentSleep = new Sleep();
    await currentSleep.start(slide.time * 1000, bar, bar.maxWidth)

    if (i == Object.keys(slide_data).length && slide_change == 1) {
      for (let j = 1; j <= Object.keys(slide_data).length; j++) {
        bar = document.getElementById(`bar_${j}`);
        bar.style.width = `0%`;
      }
      i = 0;
    }
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