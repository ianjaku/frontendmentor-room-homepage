
const imgEls = document.querySelectorAll(".hero__img");
let currentIndex = 0;
let sliding = false;
let nextInterval = null;

function createInterval() {
  nextInterval = setInterval(showNextImage, 5000)
}
createInterval();

function clearInterv() {
  if (nextInterval == null) return;
  clearInterval(nextInterval);
}

function showImageWithIndex(newIndex, direction) {
  if (imgEls.length === 0) return;
  if (sliding) return;
  sliding = true;
  
  clearInterv();

  const currImage = imgEls[currentIndex];
  const nextImage = imgEls[newIndex];

  const enterClass = `hero__img--enter-${direction}`;
  const activeClass = `hero__img--active`;

  nextImage.classList.add(enterClass);

  setTimeout(() => {
    nextImage.classList.remove(enterClass);
    nextImage.classList.add(activeClass);
    currImage.classList.remove(activeClass);
    sliding = false;
    createInterval();
  }, 500);

  currentIndex = newIndex;
}

function showNextImage() {
  showImageWithIndex(nextIndex(), "right");
}

function showPrevImage() {
  showImageWithIndex(prevIndex(), "left");
}

function nextIndex() {
  if (currentIndex + 1 >= imgEls.length) {
    return 0;
  }
  return currentIndex + 1;
}

function prevIndex() {
  if (currentIndex - 1 < 0) {
    return imgEls.length - 1;
  }
  return currentIndex - 1;
}

const prevButtonEl = document.querySelector(".hero__button--prev");
const nextButtonEl = document.querySelector(".hero__button--next");

prevButtonEl.addEventListener("click", showPrevImage);
nextButtonEl.addEventListener("click", showNextImage);
