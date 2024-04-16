import { transformedTangentView } from "three/examples/jsm/nodes/Nodes.js";

export let animations = {
    "normal": {
        keyframes: [
          {translateY: 75, opacity: 0},
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
      }
}
