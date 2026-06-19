const tsTrack = document.getElementById("tsTrack");
const tsSlides = Array.from(document.querySelectorAll(".ts-carousel__slide"));

const tsPrev = document.getElementById("tsPrev");
const tsNext = document.getElementById("tsNext");
const tsDotsWrap = document.getElementById("tsDots");

let tsIndex = 0;

// Build dots
tsSlides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "ts-carousel__dot";
  dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
  dot.addEventListener("click", () => tsGoTo(i));
  tsDotsWrap.appendChild(dot);
});

const tsDots = Array.from(document.querySelectorAll(".ts-carousel__dot"));

function tsUpdate() {
  tsTrack.style.transform = `translateX(-${tsIndex * 100}%)`;

  tsDots.forEach((d) => d.classList.remove("active"));
  if (tsDots[tsIndex]) tsDots[tsIndex].classList.add("active");
}

function tsGoTo(i) {
  tsIndex = i;
  tsUpdate();
}

function tsGoNext() {
  tsIndex = (tsIndex + 1) % tsSlides.length;
  tsUpdate();
}

function tsGoPrev() {
  tsIndex = (tsIndex - 1 + tsSlides.length) % tsSlides.length;
  tsUpdate();
}

tsNext.addEventListener("click", tsGoNext);
tsPrev.addEventListener("click", tsGoPrev);

// Swipe support
let startX = 0;

tsTrack.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

tsTrack.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 60) {
    if (diff > 0) tsGoNext();
    else tsGoPrev();
  }
});

// Init
tsUpdate();

// AUTO SLIDE
setInterval(() => {
  tsGoNext();
}, 5000);

