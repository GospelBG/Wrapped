var animations;
import('./public/animations.js').then(module => {
  animations = module.animations;
});

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
        if (animations[slide.animation+"_out"] != null) {
          anim = animations[slide.animation+"_out"];
        } else {
          anim = animations.normal_out;
        }
        if (hasAnimOut && this.remaining <= anim.duration && !isAnimPlaying) {
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

    if (slide.img_type == "video") {
      document.getElementsByClassName("cover_video")[0].pause();
    }
    
    bg.pause();

    if (isAnimPlaying) currentAnim.pause();
  }

  resume() {
    if (this.timeout) {
      return;
    }
    btn_pause.style.display = "block";
    btn_play.style.display = "none";

    bg.play();
    if (slide.img_type == "video") {
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

    if (isAnimPlaying) currentAnim.play();
    
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

shouldAudioBeMuted = false;
function volumeOn() {
  volumeOFF.style.display = "block";
  volumeON.style.display = "none";
  shouldAudioBeMuted = true;

  if (slide.img_type == "video") {
    document.getElementsByClassName("cover_video")[0].muted = shouldAudioBeMuted;
  }
}
function volumeOff() {
  volumeON.style.display = "block";
  volumeOFF.style.display = "none";
  shouldAudioBeMuted = false;

  if (slide.img_type == "video") {
    document.getElementsByClassName("cover_video")[0].muted = shouldAudioBeMuted;
  }
}

const btn_pause = document.getElementById("pause");
const btn_play = document.getElementById("play");

function closeSelf() {
  window.close();
}

const main = document.querySelector("main");
let statusCount = 2;

var slide_change = 1;
var currentSleep;

var currentAnim;
isAnimPlaying = false;

slide = null;

async function slides() {
  var header = document.getElementById('header');
  var sub = document.getElementById('subtitle');
  var img = document.getElementsByTagName("img")[0];

  for (var i = 1; i <= Object.keys(slide_data).length + 1; i = i + slide_change) {
    if (i >= Object.keys(slide_data).length + 1 && slide_change == 1) {
      for (let j = 1; j <= Object.keys(slide_data).length; j++) {
        currentSleep.cancel(); // Cancel current sleep to avoid bar animation
        bar = document.getElementById(`bar_${j}`);
        bar.style.width = `0%`;
      }
      i = 0;
    }

    img = document.getElementsByTagName("img")[0]; // Reset img

    if (isAnimPlaying) {
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

    slide = slide_data[i]
    slide_change = 1

    btn_pause.style.display = "block";
    btn_play.style.display = "none";

    main.style.fontSize = "4rem";
    main.style.color = "white";

    if (slide.text != null) {
      header.innerHTML = slide.text;
      header.id = "header"

      if (slide.animation == null) {
        slide.animation = "normal";
      }
      var animTargets = '#header';
      if (slide.animateSub != false) {
        animTargets += ', #subtitle';
      }

      if (slide.header_style != null) {
        header.style = slide.style;
      }

      currentAnim = animations[slide.animation];
    } else {
      header.innerHTML = "<h2></h2>"
      header.id = "header"
    }
      
    if (slide.sub != null) {
      sub.innerHTML = slide.sub;
      sub.style.position = ''

      if (slide.sub_style != null) {
        sub.style = slide.sub_style;
      }

    } else {
      sub.innerHTML = ""
      sub.style.position = 'absolute'
    }

    if (slide.img != null) {
      if (slide.img_type == "video") {
        img.className = "cover_img_hidden" //Hide "real" image

        img = document.getElementsByClassName("cover_video")[0];
        img.className = "cover_video cover_img"
        img.autoplay = true;
        img.muted = shouldAudioBeMuted;
      } else {
        document.getElementsByClassName("cover_video")[0].className = "cover_video cover_img_hidden"
        img.className = "cover_img"
      }
      img.src = slide.img;
    } else {
      document.getElementsByClassName("cover_video")[0].className = "cover_video cover_img_hidden"
      img.className = "cover_img_hidden"
    }

    if (slide.bg != null) {
      bg = document.getElementsByClassName("bg_"+slide.bg)[0];
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

    currentSleep = new Sleep();
    await currentSleep.start(slide.time * 1000, bar, bar.maxWidth);
  }
}

document.getElementsByTagName("main")[0].addEventListener('long-press', (e) => {
  shouldIgnoreTap = true;
  currentSleep.pause();
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

