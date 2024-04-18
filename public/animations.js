export let animations = {
  "normal": {
      keyframes: [
        {scale: 1, duration: 0},
        {translateY: 75, opacity: 0, scale: 1, duration: 0},
        {translateY: 0, opacity: 1, delay: 250}
      ],
      duration: 1000,
      easing: 'cubicBezier(0.3, 0.75, 0.5, 1)'
    },
  "normal_out": {
    targets: '#header, #subtitle',
    keyframes: [
      {translateY: 0, opacity: 1},
      {translateY: -75, opacity: 0}
    ],
    autoplay: false,
    duration: 500,
    easing: 'cubicBezier(0.3, 0.75, 0.5, 1)'
  },
  "TIMELINE-FullscreenTitle-Subtitle": anime.timeline({     
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
    translateY: [225, 150],
    opacity: [0, 1],
    scale: [2, 2],
    delay: 250
  })
  .add({
    targets: '#header',
    translateY: [150, 0],
    scale: [2, 1],
    delay: 1500
  })
  .add({
    targets: '#subtitle',
    translateY: [75, 0],
    opacity: [0, 1],
    delay: 500,
    finish: function() {
      window.isAnimPlaying = false;
    }
  }),

  "TIMELINE-TitleFirst" : anime.timeline({
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
    translateY: [75, 0],
    opacity: [0, 1],
    scale: [1, 1]
  })
  .add({
    targets: '#subtitle',
    scale: [1, 1],
    translateY: [75, 0],
    opacity: [0, 1],
    delay: 500,
    finish: function() {
      window.isAnimPlaying = false;
    }
  })
}