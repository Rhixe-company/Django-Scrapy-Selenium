const slider = document.getElementById("slider") as HTMLBodyElement;
const dots = document.getElementById("dots") as HTMLBodyElement;
const leftBtn = document.getElementById("left") as HTMLBodyElement;
const rightBtn = document.getElementById("right") as HTMLBodyElement;
const slide = document.querySelectorAll("#slider li");
const dot = document.querySelectorAll("#dots li");

let idx = 0;

let interval = setInterval(run, 9000);

function run() {
  idx++;
  changeSlider();
  changeDot();
}

function changeSlider() {
  if (idx > slide.length - 1) {
    idx = 0;
  } else if (idx < 0) {
    idx = slide.length - 1;
  }
  if (idx == 0) {
    slider.style.transform = `translate3d(-${idx}%, 0px, 0px)`;
  } else {
    slider.style.transform = `translate3d(-${idx}00%, 0px, 0px)`;
  }
}

function changeDot() {
  for (let myindex = 0; myindex < dot.length; myindex++) {
    const myelement = dot[myindex];
    if (myelement.classList.value == "dot selected") {
      myelement.classList.remove("selected");
    }
  }
  dot[idx].classList.add("selected");
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(run, 9000);
}

rightBtn.addEventListener("click", () => {
  idx++;
  changeSlider();
  changeDot();
  resetInterval();
});

leftBtn.addEventListener("click", () => {
  idx--;
  changeSlider();
  changeDot();
  resetInterval();
});
