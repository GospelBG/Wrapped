export let animations = {
  "normal":anime.timeline({
    autoplay: false,
    duration: 1000,
    easing: 'cubicBezier(0.3, 0.75, 0.5, 1)'
  })
  .add({
    begin: function() {
      window.isAnimPlaying = true;
    },
    targets: ['#header', '#subtitle', '#img'],
    translateY: [75, 0],
    opacity: [0, 1],
    scale: [1, 1],
    complete: function() {
      window.isAnimPlaying = false;
    }
  }),
  "normal_out": anime.timeline({
    autoplay: false,
    easing: 'cubicBezier(0.3, 0.75, 0.5, 1)'
  })
  .add({
    begin: function() {
      window.isAnimPlaying = true;
    },
    targets: ['#header', '#subtitle', '#img'],
    translateY: [0, -75],
    opacity: [1, 0],
    duration: 500,
    complete: function() {
      window.isAnimPlaying = false;
    }
  }),
  "sub_change":anime.timeline({
    autoplay: false
  })
  .add({
    begin: function() {
      window.isAnimPlaying = true;
    },
    targets: '#subtitle',
    easing: 'cubicBezier(0.3, 0.75, 0.5, 1)',
    translateY: [75, 0],
    opacity: [0, 1],
    scale: [1, 1],
    duration: 250,
  }).add({
    easing: 'linear',
    targets: '#img',
    translateY: [0, 0],
    opacity: [0, 1],
    delay: 0,
    offset: 0,
    duration: 150,
    complete: function() {
      window.isAnimPlaying = false;
    }
  
  }),
  "sub_change_out": anime.timeline({
    autoplay: false
  })
  .add({
    begin: function() {
      window.isAnimPlaying = true;
    },
    easing: 'cubicBezier(0.3, 0.75, 0.5, 1)',
    targets: '#subtitle',
    translateY: [0, -75],
    opacity: [1, 0],
    duration: 250,
  }).add({
    easing: 'linear',
    targets: '#img',
    translateY: [0, 0],
    opacity: [1, 0],
    delay: 0,
    offset: 0,
    duration: 150,
    complete: function() {
      window.isAnimPlaying = false;
    }
  }),
  "intro" : anime.timeline({
    autoplay: false,
    easing: 'linear',
    complete: function() {
      window.isAnimPlaying = false;
    }
  }).add({
    begin: function() {
      window.isAnimPlaying = true;
    },
    targets: '#header',
    scale: [0, 1],
    delay: 3025,
    duration: 750
  }),
  "title_top":anime.timeline({
    autoplay: false,
    duration: 1000,
    easing: 'cubicBezier(0.3, 0.75, 0.5, 1)'
  })
  .add({
    begin: function() {
      window.isAnimPlaying = true;
      document.getElementById('header').style.position = "fixed";
    },
    targets: '#header',
    top: ['2.5%', '7%'],
    opacity: [0, 1],
    scale: [1, 1],
    duration: 500
  }).add({
    targets: ['#subtitle', '#img'],
    translateY: ['75px', '0px'],
    opacity: [0, 1],
    duration: 500,
    delay: 1000,
    complete: function() {
      window.isAnimPlaying = false;
    }
  }),

  "title_top_out":anime.timeline({
    autoplay: false,
    easing: 'cubicBezier(0.3, 0.75, 0.5, 1)'
  }).add({
    begin: function() {
      window.isAnimPlaying = true;
    },
    targets: '#header',
    top: ['7%', '2.5%'],
    opacity: [1, 0],
    duration: 1000
  }).add({
    targets: ['#subtitle', '#img'],
    translateY: ['0px', '-75px'],
    opacity: [1, 0],
    offset: 0,
    complete: function() {
      window.isAnimPlaying = false;
      document.getElementById('header').style.position = "";
    }
  }),
  "big_title": anime.timeline({     
    autoplay: false,
    easing: 'cubicBezier(0.3, 0.75, 0.5, 1)'
  })
  .add({
    begin: function() {
      window.isAnimPlaying = true;
      document.querySelector('#header').style.opacity = 0;
      document.querySelector('#subtitle').style.opacity = 0;
    },
    targets: '#header',
    translateY: ["225px", "100px"],
    opacity: [0, 1],
    scale: [2, 2],
    delay: 250
  })
  .add({
    targets: '#header',
    translateY: ["100px", "0px"],
    scale: [2, 1],
    delay: 1500
  })
  .add({
    targets: ['#subtitle', '#img'],
    translateY: ["75px", "0px"],
    opacity: [0, 1],
    delay: 500,
    complete: function() {
      window.isAnimPlaying = false;
    }
  }),

  "subtitle_delay" : anime.timeline({
    autoplay: false,
    easing: 'cubicBezier(0.3, 0.75, 0.5, 1)'
  })
  .add({
    begin: function() {
      window.isAnimPlaying = true;
      document.querySelector('#header').style.opacity = 0;
      document.querySelector('#subtitle').style.opacity = 0;
    },
    targets: '#header',
    translateY: ["75px", "0px"],
    opacity: [0, 1],
    scale: [1, 1],
    duration: 1000
  })
  .add({
    targets: ['#subtitle', '#img'],
    scale: [1, 1],
    translateY: ["75px", "0px"],
    opacity: [0, 1],
    duration: 1000,
    complete: function() {
      window.isAnimPlaying = false;
    }
  })
}