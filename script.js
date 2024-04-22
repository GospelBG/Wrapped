import { animations } from "./public/animations.js";

let slide_data;
var bg;

var shouldIgnoreTap = false;

function chooseSide(e) {
  if (shouldIgnoreTap) {
    shouldIgnoreTap = false;
    return;
  }
  const clientX = e.clientX;
  const clientWidth = e.view.innerWidth

  if (clientX < clientWidth / 2) {
    console.log('left')
    slide_change = -1
    window.currentSleep.cancel();
  } else {
    console.log('right')
    slide_change = 1
    window.currentSleep.cancel();
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

  start(time, element, hasAnimOut = true) {
    this.remaining = time;
    this.element = element;
    this.duration = time;
    this.interval = 100;
    this.widthIncrement = 100 / (this.duration / this.interval);

    currentAnim.play();

    return new Promise((resolve) => {
      this.resolve = resolve;
      this.startTime = new Date();
      this.timeout = setTimeout(this.resolve, this.remaining);
      this.increaseWidthInterval = setInterval(() => {
        this.width += this.widthIncrement;
        this.remaining -= this.interval;

        var anim;
        if (animations[window.slide.animation+"_out"] != null) {
          anim = animations[window.slide.animation+"_out"];
        } else {
          anim = animations.normal_out;
        }
        if (hasAnimOut && this.remaining <= anim.duration) {
          anim.play();
          anim.finished.then(() => {
            this.width = `100%`;
            clearInterval(this.increaseWidthInterval)
          });
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

    btn_play.style.display = "block";
    btn_pause.style.display = "none";

    if (window.slide.img_type == "video") {
      document.getElementsByClassName("cover_video")[0].pause();
    }
    
    bg.pause();

    if (window.isAnimPlaying) currentAnim.pause();
  }

  resume() {
    if (this.timeout) {
      return;
    }
    btn_pause.style.display = "block";
    btn_play.style.display = "none";

    bg.play();
    if (window.slide.img_type == "video") {
      document.getElementsByClassName("cover_video")[0].play();
    }

    this.startTime = new Date();
    this.timeout = setTimeout(this.resolve, this.remaining);
    this.increaseWidthInterval = setInterval(() => {
      this.width += this.widthIncrement;
      if (parseFloat(this.width) >= 100) {
        this.width = `100%`;
        clearInterval(this.increaseWidthInterval)
      } else {
        this.element.style.width = `${this.width}%`;
      }
    }, this.interval);

    if (window.isAnimPlaying) currentAnim.play();
    
    return this.promise;
  }

  cancel() {
    if (slide_change == 1) {
      this.element.style.width = `100%`;
    } else {
      this.element.style.width = `0%`;
    }

    bg.style.display = "none";
    currentAnim.pause();
    currentAnim.reset();

    clearTimeout(this.timeout);
    this.timeout = null;
    clearInterval(this.increaseWidthInterval);
    this.increaseWidthInterval = null;
    this.width = 0;
    
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

function closeSelf() {
  window.close();
}

const main = document.querySelector("main");
let statusCount = 2;

var slide_change = 1;
window.currentSleep;

var currentAnim;
window.isAnimPlaying = false;

window.slide = null;

async function slides() {
  var header = document.getElementById('header');
  var sub = document.getElementById('subtitle');
  var img = document.getElementsByTagName("img")[0];

  for (var i = 1; i <= Object.keys(slide_data).length; i = i + slide_change) {
    if (i == Object.keys(slide_data).length && slide_change == 1) {
      for (let j = 1; j <= Object.keys(slide_data).length; j++) {
        bar = document.getElementById(`bar_${j}`);
        bar.style.width = `0%`;
      }
      i = 0;
    }

    img = document.getElementsByTagName("img")[0]; // Reset img

    if (isAnimPlaying) {
      console.log(currentAnim)
      currentAnim.pause();
    }
    
    // Reset Styling
    header.style = ""
    sub.style = ""
    
    if (i == 0) {
      i = 1;
    }

    if (bg != null) {
      bg.style.display = "none"; // Reset bg
    }

    window.slide = slide_data[i]
    slide_change = 1

    btn_pause.style.display = "block";
    btn_play.style.display = "none";

    main.style.fontSize = "4rem";
    main.style.color = "white";

    if (window.slide.text != null) {
      header.innerHTML = window.slide.text;

      if (window.slide.animation == null) {
        window.slide.animation = "normal";
      }
      var animTargets = '#header';
      if (window.slide.animateSub != false) {
        animTargets += ', #subtitle';
      }

      currentAnim = animations[window.slide.animation];     
    } else {
      header.innerHTML = "<h2></h2>"
    }
      
    if (window.slide.sub != null) {
      sub.innerHTML = window.slide.sub;
      sub.style.position = ''
    } else {
      sub.innerHTML = ""
      sub.style.position = 'absolute'
    }

    if (window.slide.img != null) {
      if (window.slide.img_type == "video") {
        img.className = "cover_img_hidden" //Hide "real" image

        img = document.getElementsByClassName("cover_video")[0];
        img.className = "cover_video cover_img"
        img.autoplay = true;
      } else {
        document.getElementsByClassName("cover_video")[0].className = "cover_video cover_img_hidden"
        img.className = "cover_img"
      }
      img.src = window.slide.img;
      console.log(img.tagName)
    } else {
      document.getElementsByClassName("cover_video")[0].className = "cover_video cover_img_hidden"
      img.className = "cover_img_hidden"
    }

    if (window.slide.bg != null) {
      bg = document.getElementsByClassName("bg_"+window.slide.bg)[0];
      bg.style.display = "inherit";
      bg.currentTime = 0;
      bg.play();
    }
  
    main.dataset.status = statusCount;
    main.style.background = `rgb(${i * 5}, ${i * 5}, ${
      i * 5
    })`;
  
    console.log(i)
    var bar = document.querySelector(`#bar_${i}`);

    window.currentSleep = new Sleep();
    await window.currentSleep.start(window.slide.time * 1000, bar, bar.maxWidth);
  }
}

function dataStatusFunc() {
  for (let i = 0; i < 30; i++) {
    let shape = document.createElement("div");
    shape.setAttribute("class", `shape-${i}`);
    main.appendChild(shape);
  }
}

document.getElementsByClassName('container')[0].addEventListener('long-press', (e) => {
  shouldIgnoreTap = true;
  window.currentSleep.pause();
});

var isStandalone = false;
if ((("standalone" in window.navigator) && window.navigator.standalone) || localStorage.getItem("override_pwa") == "true") {
  isStandalone = true;
  document.body.removeChild(document.getElementsByClassName("no_pwa")[0]);

  let box; 
  document.addEventListener('DOMContentLoaded', ()=>{
    box = document.querySelector('#touch');
    box.addEventListener('click', chooseSide);
  });
}

document.onreadystatechange = () => {
  if (isStandalone) {
    fetch('./public/slides.json')
      .then(response => response.json())
      .then(data => {
        slide_data = data;
    
        var bar_container = document.querySelector('.status-bar-container')
        for (var i = 1; i <= Object.keys(slide_data).length; i++) {
          var bar = document.createElement('div');
          bar.classList.add('status-bar')
          bar.style.width = `${100/Object.keys(slide_data).length}%`
          
          var childDiv = document.createElement('div');
          childDiv.classList.add('status-bar-progress');
          bar.appendChild(childDiv);
          childDiv.id = "bar_"+i;
          bar_container.appendChild(bar);
        }
        document.getElementsByClassName("container")[0].style.display = "";
        localStorage.clear();
        slides();
      })
      .catch(error => console.error('Error:', error));
  } else {
  console.log("Not in standalone mode");
  document.body.removeChild(document.getElementsByClassName("container")[0]);
  }
};
