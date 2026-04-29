/* ---- Document Variables ---- */
let w = window.innerWidth;
let h = window.innerHeight;

let defScale = 15;
let circleScale = defScale;
let defSpace = 8;
let gridSpace = defSpace;
let defSample = 2;
let pixelSample = defSample;

let centreX, centreY, rows, cols;
let originX, originY;
let animatedImg;

const halftoneColour = "#0d0c1d";
const backgroundColour = "#f8eee6";

let animationProgress = 0;
let animationSpeed = 0.005;
let expanding = true;
let isPlaying = false;

/* ---- p5 Functions ---- */

function setup() {
  createCanvas(w, h);
  frameRate(60);
  noLoop();

  originX = w / 2;
  originY = h / 2;

  loadImage("./assets/WordmarkAnimation1.png", (img) => {
    animatedImg = img;
    centreImage();
    loop(); // start the draw loop only once image is ready
  });

  const playPauseButton = document.querySelector("#playPauseButton");
  playPauseButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    playPauseButton.textContent = isPlaying ? "Pause" : "Play";
  });

  const animationSlider = document.querySelector("#animationSlider");
  animationSlider.addEventListener("input", () => {
    if (!isPlaying) {
      animationProgress = animationSlider.value / 100;
      redraw();
    }
  });
}

function draw() {
  background(backgroundColour);

  if (!animatedImg) return;

  noStroke();
  fill(halftoneColour);

  centreImage();
  drawHalftone();

  if (isPlaying) {
    updateAnimation();
    const animationSlider = document.querySelector("#animationSlider");
    animationSlider.value = animationProgress * 100;
  }
}

function windowResized() {
  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);
  originX = w / 2;
  originY = h / 2;
  centreImage();
}

/* ---- Custom Functions ---- */

function centreImage() {
  if (!animatedImg) return;
  cols = floor(animatedImg.width / pixelSample);
  rows = floor(animatedImg.height / pixelSample);
  centreX = w / 2 - (cols * gridSpace) / 2;
  centreY = h / 2 - (rows * gridSpace) / 2;
}

function drawHalftone() {
  if (!animatedImg) return;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let a = alpha(animatedImg.get(i * pixelSample, j * pixelSample));

      if (a > 79) {
        let scaleFactor = map(a, 80, 255, 0, 1);
        let x = i * gridSpace + centreX;
        let y = j * gridSpace + centreY;
        circle(x, y, circleScale * scaleFactor);
      }
    }
  }
}

function updateAnimation() {
  if (expanding) {
    animationProgress += animationSpeed;
    if (animationProgress >= 1) {
      animationProgress = 1;
      expanding = false;
    }
  } else {
    animationProgress -= animationSpeed;
    if (animationProgress <= 0) {
      animationProgress = 0;
      expanding = true;
    }
  }

  let easedT = easeInOutCubic(animationProgress);
  let easedTOffset = easedT * 0.9;

  circleScale = map(easedTOffset, 0, 1, defScale * 0, defScale * 1.3);
  gridSpace = map(easedT, 0, 1, defSpace * 1.3, defSpace * 1.5);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
}
