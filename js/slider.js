import Hammer from "hammerjs";
import heroContent from "./hero_content";

const imgEls = document.querySelectorAll(".hero__img");
const heroContentEl = document.querySelector(".hero__content");
const heroTitleEl = heroContentEl.querySelector(".hero__title");
const heroTextEl = heroContentEl.querySelector(".hero__text");

const activeClass = `hero__img--active`;
const hideContentClass = `hero__content--fade-out`;
const showContentClass = `hero__content--fade-in`;


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

  nextImage.classList.add(enterClass);
  setContentForIndex(newIndex);

  setTimeout(() => {
    nextImage.classList.remove(enterClass);
    nextImage.classList.add(activeClass);
    currImage.classList.remove(activeClass);
    sliding = false;
    createInterval();
  }, 500);

  currentIndex = newIndex;
}

function setContentForIndex(index) {
  const content = heroContent[index];
  heroContentEl.classList.remove(showContentClass);
  heroContentEl.classList.add(hideContentClass);
  setTimeout(() => {
    heroTitleEl.innerHTML = content.title;
    heroTextEl.innerHTML = content.text;
    heroContentEl.classList.remove(hideContentClass);
    heroContentEl.classList.add(showContentClass);
  }, 250);
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

const heroEl = document.querySelector(".hero");
const mc = new Hammer.Manager(heroEl);
mc.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_HORIZONTAL }));
mc.on("swiperight", e => {
  showPrevImage();
})
mc.on("swipeleft", e => {
  showNextImage();
})
