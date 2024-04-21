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
    duration: 500,
    easing: 'cubicBezier(0.3, 0.75, 0.5, 1)'
  })
  .add({
    begin: function() {
      window.isAnimPlaying = true;
    },
    targets: ['#header', '#subtitle', '#img'],
    translateY: [0, -75],
    opacity: [1, 0],
    complete: function() {
      window.isAnimPlaying = false;
    }
  }),
  "title_top":anime.timeline({
    autoplay: false,
    duration: 1000,
    easing: 'cubicBezier(0.3, 0.75, 0.5, 1)'
  })
  .add({
    begin: function() {
      window.isAnimPlaying = true;
    },
    targets: '#header',
    translateY: ['-350%', '-300%'],
    opacity: [0, 1],
    scale: [1, 1],
    complete: function() {
      window.isAnimPlaying = false;
    }
  }).add({
    targets: ['#subtitle', '#img'],
    translateY: ['-150%', '-100%'],
    opacity: [0, 1]
  }),
  "big_title": anime.timeline({     
    autoplay: false,
    duration: 1000,
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
    duration: 1000,
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
    scale: [1, 1]
  })
  .add({
    targets: ['#subtitle', '#img'],
    scale: [1, 1],
    translateY: ["75px", "0px"],
    opacity: [0, 1],
    delay: 500,
    complete: function() {
      window.isAnimPlaying = false;
    }
  })
}